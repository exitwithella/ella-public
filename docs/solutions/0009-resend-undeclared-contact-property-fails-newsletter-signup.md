---
title: Resend contact create fails the whole newsletter signup when a custom property is undeclared
date: 2026-10-20
category: integration-issues
module: email-provider
problem_type: integration_issue
component: email_processing
symptoms:
  - "Before the retry, subscribe() threw EmailProviderError when the first Resend response was a 4xx whose body mentioned an undeclared properties key"
  - "That thrown create did not send a follow-up, so segments on the same body were not submitted"
  - "A response that was neither 409 nor an already-exists body was a hard error, including the undeclared-property 4xx"
root_cause: wrong_api
resolution_type: code_fix
severity: high
tags: [resend, newsletter, contacts, email-provider, properties, segments, signup]
---

# Resend contact create fails the whole newsletter signup when a custom property is undeclared

## Problem

Newsletter signup posts to Resend's Create Contact API (`POST https://api.resend.com/contacts`) with a `source` contact property (`footer`, `blog-sidebar`, and similar) and optional `segments: [{ id }]`. Per [Resend's contact properties docs](https://resend.com/docs/dashboard/contacts/properties), a custom property key must already exist on the account or the create is rejected. This repo does not record a live Resend response for that case. The client treats a 4xx whose body matches `/propert/i` as a failed create, then retries once without `properties`. Until `source` exists on the account, that retry is what lets signup return success and still send segments. The retry is on branch `cursor/resend-newsletter-6650` and is not on `main`.

## Symptoms

- Before the retry, a response that was neither ok, nor status 409, nor a body matching `/already exists/i` was thrown as `EmailProviderError`. An undeclared-property 4xx was in that thrown set. The throw did not send another request, so segments on that body were not submitted.
- The unit test's first response is HTTP 422 with `Invalid properties — the following properties do not exist: source`. `subscribe()` then POSTs once more without `properties` and resolves. The second body still has `segments`.
- The same call without an undeclared property succeeds when the first response is ok, or is treated as success when the status is 409 or the body matches `/already exists/i`.
- A non-property client error, such as `Invalid email address` at 422, still fails the signup. That path POSTs once.

## What Didn't Work

- Treating an undeclared-property 4xx like any other response that was neither ok, nor 409, nor an `/already exists/i` body: a hard `EmailProviderError`. Failing closed there drops the segment membership the same request was trying to set, because segments are only sent on the contact POST.
- Assuming an undeclared property would be ignored, or that only that field would be rejected. Resend's docs say the property must already exist. The client does not inspect which key failed. On the matching 4xx it treats the whole create as failed and, on retry, deletes the entire `properties` object.

## Solution

`subscribe()` in `src/lib/email-provider.ts` still sends `source` and segments on the first request. On an undeclared-property failure it copies the body, drops `properties`, and posts again so segments stay on the retry.

`isUndeclaredProperty` is a 4xx whose body matches `/propert/i`:

```ts
// src/lib/email-provider.ts
function isUndeclaredProperty(status: number, errorBody: string): boolean {
  return status >= 400 && status < 500 && /propert/i.test(errorBody)
}
```

The retry copies the body, deletes `properties`, and posts that copy. `segments` is left in place:

```ts
// src/lib/email-provider.ts
if (body.properties && isUndeclaredProperty(res.status, errorBody)) {
  const withoutProperties: ContactBody = { ...body }
  delete withoutProperties.properties
  res = await postContact(apiKey, withoutProperties)
  if (res.ok) return
  errorBody = await res.text().catch(() => '')
  if (isExistingContact(res.status, errorBody)) return
}
```

`isExistingContact` is status 409 or a body matching `/already exists/i` (`src/lib/email-provider.ts`). That match returns immediately on the first attempt and again after the retry. Neither return issues a follow-up update, so segment membership is not changed for a contact that already exists.

A 4xx that is not a property error does not enter the retry. The unit test posts `source: 'footer'` with body `Invalid email address` and expects a single `fetch` plus `EmailProviderError` (`tests/unit/email-provider.unit.spec.ts`). The guard is `body.properties && isUndeclaredProperty(...)`; `Invalid email address` fails the `/propert/i` test.

If the retry itself is not ok and is not an existing-contact response, `subscribe()` throws `EmailProviderError` with the latest status. A property 422 followed by a 500 throws with `status: 500`.

The happy-path mapping is unchanged: `source` becomes `properties: { source }`, and `segmentIds` become `segments: [{ id }]`.

## Why This Works

Resend's docs require each custom property key to exist before a create may set it. This tree does not prove that dashboard step. What the client does is narrower: `source` is stored as analytics metadata on `properties`, and segment membership is a separate field. If the stripped retry is ok, `subscribe()` returns and the second body still contains `segments` and omits `properties`. When the first response is ok, `subscribe()` returns at that check and does not retry.

The detector stays narrow on purpose. Status must be 400–499 and the body must match `/propert/i`, so an invalid email, a 5xx, or any other non-property failure is not retried as if it were a missing key. Existing-contact handling stays a pure success return on either attempt, matching the earlier Loops behavior of not re-syncing segments.

## Prevention

- Declare the `source` contact property in the Resend dashboard before relying on it for analytics. Custom property keys must already exist. Until that property exists, signups succeed without `source` recorded.
- Any new key added under `properties` shares that object. The retry deletes the entire `properties` object and does not remove a single key.
- Keep the single retry. Removing it makes an undeclared `source` fail signup and drop segment attachment again.
- Keep the unit split between a property 422 and a non-property 422. The property case must POST twice and retain `segments`. The non-property case (`Invalid email address`) must POST once and throw. A failed retry must surface the second response's status.
