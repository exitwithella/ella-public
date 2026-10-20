export default {
  '**/*.{js,jsx,ts,tsx,json,jsonc,css}': [
    'oxlint --fix',
    'oxfmt --write --no-error-on-unmatched-pattern',
  ],
  '**/*.{ts,tsx}': () => 'tsc --noEmit',
}
