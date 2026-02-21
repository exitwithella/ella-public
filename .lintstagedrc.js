export default {
  '**/*.{js,jsx,ts,tsx,json,jsonc,css}': ['oxlint --fix', 'oxfmt --write'],
  '**/*.{ts,tsx}': () => 'tsc --noEmit',
}
