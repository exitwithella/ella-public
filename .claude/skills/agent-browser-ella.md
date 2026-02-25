---
name: agent-browser-ella
description: ELLA-specific browser automation patterns. Use alongside the official agent-browser skill when interacting with the ELLA dev site, Payload admin, or running visual reviews.
---

# ELLA Browser Automation

## Profile

A persistent Chromium profile at `.browser-profile/` is configured via `agent-browser.json`. All commands automatically use it — no `--profile` flag needed.

## First-Time Setup

If the profile doesn't exist yet:
1. Run `bash scripts/setup-browser-profile.sh`
2. Authenticate with Payload: `agent-browser --headed open http://localhost:3000/admin`
3. Log in manually, then close the browser — the session persists in the profile

## Common Workflows

### Visual page review
```bash
agent-browser open http://localhost:3000 && agent-browser screenshot
```

### Interactive element inspection
```bash
agent-browser snapshot -i          # get refs (@e1, @e2, ...)
agent-browser click @e3            # interact with a ref
agent-browser snapshot -i          # re-snapshot — refs are invalidated after DOM changes
```

### Mobile responsive check
```bash
agent-browser set device "iPhone 14"
agent-browser open http://localhost:3000
agent-browser screenshot mobile-home.png
```

### Payload admin (uses saved auth)
```bash
agent-browser open http://localhost:3000/admin
agent-browser snapshot -i
```

### Visual diff after changes
```bash
agent-browser screenshot --annotate before.png
# ... make changes ...
agent-browser open http://localhost:3000  # reload
agent-browser diff screenshot --baseline before.png
```

## Key URLs

| URL | Page |
|-----|------|
| `http://localhost:3000` | Homepage |
| `http://localhost:3000/admin` | Payload CMS admin |
| `http://localhost:3000/platform` | Platform page |
| `http://localhost:3000/solutions/exit-planning` | Exit Planning |
| `http://localhost:3000/pricing` | Pricing |

## Tips

- Always re-snapshot after navigation or form submission — refs are invalidated
- Use `--headed` when the user wants to watch or for manual auth steps
- Chain commands with `&&` when you don't need to parse intermediate output
- `agent-browser get url` and `agent-browser get title` for quick orientation
- The dev server must be running (`pnpm dev`) before using agent-browser
