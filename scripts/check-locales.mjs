/**
 * Validates the translation files. Runs as part of `npm run build`, so a
 * broken or half-finished translation cannot reach production.
 *
 * Checks:
 *   1. Both locales have exactly the same key structure and array lengths.
 *   2. No empty or whitespace-only strings.
 *   3. No stray double spaces, or leading/trailing whitespace.
 *   4. Interpolation placeholders ({{name}}) match between locales.
 *   5. Strings identical in both locales are proper nouns or explicitly
 *      allowed — anything else is probably untranslated.
 *   6. Arabic strings actually contain Arabic script (catches copy-paste of
 *      the English value into the Arabic file).
 *
 * Run: npm run check:locales
 */
import { readFileSync } from 'node:fs'

const read = (lng) => JSON.parse(readFileSync(new URL(`../src/i18n/locales/${lng}.json`, import.meta.url), 'utf8'))
const en = read('en')
const ar = read('ar')

const problems = []
const fail = (where, message) => problems.push(`${where}\n    ${message}`)

/* ---------------------------------------------------------------- structure */

function compare(a, b, path = '') {
  const at = Array.isArray(a) ? 'array' : typeof a
  const bt = Array.isArray(b) ? 'array' : typeof b

  if (at !== bt) return fail(path, `type differs: en is ${at}, ar is ${bt}`)

  if (at === 'array') {
    if (a.length !== b.length) return fail(path, `array length differs: en has ${a.length}, ar has ${b.length}`)
    a.forEach((v, i) => compare(v, b[i], `${path}[${i}]`))
    return
  }

  if (at === 'object') {
    const ak = Object.keys(a)
    const bk = Object.keys(b)
    for (const k of ak) if (!bk.includes(k)) fail(path || '(root)', `key "${k}" is missing from ar`)
    for (const k of bk) if (!ak.includes(k)) fail(path || '(root)', `key "${k}" is missing from en`)
    for (const k of ak) if (bk.includes(k)) compare(a[k], b[k], path ? `${path}.${k}` : k)
  }
}

compare(en, ar)

/* ------------------------------------------------------------------ strings */

/**
 * Values that stay in Latin script in the Arabic file on purpose: technology
 * names, brand names and handles are not transliterated in Arabic technical
 * writing — developers write "Kubernetes", not "كوبرنيتس", in a stack list.
 */
const LATIN_IN_ARABIC_OK = [
  'stack.groups', // every technology name
  'work.roles', // org names and per-role stack arrays
  'projects.items', // project names and stack arrays
  'meta.switchTo',
  'meta.switchLabel',
  'contact.githubLabel',
  'contact.linkedinLabel',
  'contact.upworkLabel',
  'about.stats', // numeric values
]

function eachString(obj, visit, path = '') {
  if (typeof obj === 'string') return visit(path, obj)
  if (Array.isArray(obj)) return obj.forEach((v, i) => eachString(v, visit, `${path}[${i}]`))
  if (obj && typeof obj === 'object') {
    for (const [k, v] of Object.entries(obj)) eachString(v, visit, path ? `${path}.${k}` : k)
  }
}

const placeholders = (s) => (s.match(/\{\{[^}]+\}\}/g) ?? []).sort().join(',')
const exempt = (path) => LATIN_IN_ARABIC_OK.some((p) => path.startsWith(p))

for (const [lng, data] of [['en', en], ['ar', ar]]) {
  eachString(data, (path, value) => {
    if (value.trim() === '') fail(`${lng} ${path}`, 'empty string')
    if (value !== value.trim()) fail(`${lng} ${path}`, 'leading or trailing whitespace')
    if (/ {2}/.test(value)) fail(`${lng} ${path}`, 'double space')
  })
}

const ARABIC_SCRIPT = /[؀-ۿ]/

eachString(en, (path, value) => {
  const arValue = path.split(/[.[\]]/).filter(Boolean).reduce((o, k) => o?.[k], ar)
  if (typeof arValue !== 'string') return

  if (placeholders(value) !== placeholders(arValue)) {
    fail(path, `interpolation placeholders differ: en "${placeholders(value)}" vs ar "${placeholders(arValue)}"`)
  }

  if (exempt(path)) return

  if (value === arValue && value.length > 3) {
    fail(path, `identical in both locales — untranslated? "${value}"`)
  }

  if (!ARABIC_SCRIPT.test(arValue) && arValue.length > 3) {
    fail(`ar ${path}`, `no Arabic script in a translated value: "${arValue}"`)
  }
})

/* ------------------------------------------------------------------ report */

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} locale problem(s):\n`)
  for (const p of problems) console.error(`  ${p}\n`)
  process.exit(1)
}

let count = 0
eachString(en, () => (count += 1))
console.log(`✓ locales valid — ${count} keys, en + ar in sync`)
