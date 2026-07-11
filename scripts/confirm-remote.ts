import { stdin, stdout } from 'node:process'
/**
 * Guardrail for commands that WRITE to the production Cloudflare D1 / R2.
 *
 * Prints a loud banner naming the target database and blocks until the operator
 * types the database name (or `yes`) to confirm. Used by `content:push`,
 * `seed:remote`, and `dev:remote` before any remote-binding write.
 *
 * Bypass in CI / non-interactive shells with `CONFIRM_REMOTE=yes`.
 *
 * Usage:  tsx scripts/confirm-remote.ts [action-label]
 */
import { createInterface } from 'node:readline/promises'

const DB_NAME = 'ella-public-payload'
const action = process.argv[2] || 'write to PRODUCTION'

const RED = '[31m'
const BOLD = '[1m'
const RESET = '[0m'

function banner() {
  const line = '='.repeat(64)
  stdout.write(`\n${RED}${BOLD}${line}\n`)
  stdout.write(`  ⚠  PRODUCTION TARGET: ${DB_NAME}\n`)
  stdout.write(`  You are about to: ${action}\n`)
  stdout.write(`  This hits the LIVE production database. There is no undo.\n`)
  stdout.write(`${line}${RESET}\n`)
}

async function main() {
  banner()

  if (process.env.CONFIRM_REMOTE === 'yes') {
    stdout.write('CONFIRM_REMOTE=yes set — proceeding without prompt.\n\n')
    return
  }

  if (!stdin.isTTY) {
    stdout.write(
      `\n${RED}Refusing to proceed: non-interactive shell and CONFIRM_REMOTE is not set.${RESET}\n`,
    )
    process.exit(1)
  }

  const rl = createInterface({ input: stdin, output: stdout })
  const answer = (
    await rl.question(`Type the database name "${DB_NAME}" (or "yes") to continue: `)
  ).trim()
  rl.close()

  if (answer !== DB_NAME && answer.toLowerCase() !== 'yes') {
    stdout.write(`\n${RED}Aborted — confirmation did not match.${RESET}\n`)
    process.exit(1)
  }

  stdout.write('\nConfirmed. Proceeding.\n\n')
}

await main()
