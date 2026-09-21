# Said Madi — Portfolio

Single-page portfolio for Said Madi, software engineer (AI platforms, Gaza).
Vite + React + TypeScript + MUI. **Bilingual English / Arabic with real RTL.**

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # locale check + typecheck + production bundle into dist/
npm run preview  # serve the built bundle
```

## Where things live

| What | File |
|---|---|
| Colours, type scale, MUI theme (per direction) | [src/theme.ts](src/theme.ts) |
| RTL/LTR switching (Emotion cache + theme) | [src/DirectionProvider.tsx](src/DirectionProvider.tsx) |
| Non-translatable facts (email, links, repo stars) | [src/config.ts](src/config.ts) |
| All copy, both languages | [src/i18n/locales/en.json](src/i18n/locales/en.json), [src/i18n/locales/ar.json](src/i18n/locales/ar.json) |
| Sections | [src/components/](src/components/) |

## Editing the content

**All text is in the two locale files** — nothing is hard-coded in components.
The files are key-for-key identical; adding a key to one without the other fails
the build.

Arrays pair positionally between languages *and* with `src/config.ts`: the
project cards read their repo URLs and star counts from `projectLinks`, and the
spoken-language bars read their percentages from `LANGUAGE_LEVELS` in
[src/components/Stack.tsx](src/components/Stack.tsx). Keep the same order in
both languages.

## How the bilingual layer works

This is genuine bidirectional support, not a mirrored stylesheet.

- **Emotion does the flipping.** `stylis-plugin-rtl` rewrites physical CSS
  properties (`margin-left` → `margin-right`, transforms, border radii) as
  styles are serialised. Two Emotion caches with different keys (`mui`,
  `mui-rtl`) keep the generated class names from colliding when the visitor
  switches language mid-session.
- **MUI needs `theme.direction`** to mirror its own components — the Drawer
  anchors to the opposite side, icons rotate. `buildTheme(direction)` sets it.
- **Arabic gets its own typography.** Looser line-height (the final *yaa*'s tail
  descends well below the baseline), no uppercase or letter-spacing on labels
  (Arabic has no case, and tracking breaks letter joining), and IBM Plex Sans
  Arabic rather than a fallback face.
- **Latin stays Latin.** Technology names are not transliterated in Arabic
  technical writing — a stack list says `Kubernetes`, not `كوبرنيتس`. The
  `Chip` component detects script per label and picks the right font.
- **Detection order**: `?lang=` → `localStorage` → browser language → `<html lang>`.
  `ar-PS`, `ar-EG` etc. all resolve to `ar`.
- `<html lang>` and `<html dir>` follow the active language, so screen readers
  announce text in the right order.

### The locale checker

`npm run check:locales` runs as part of `npm run build` and in CI. It verifies
key and array parity, empty strings, stray whitespace, `{{placeholder}}` parity,
values left untranslated, and that Arabic values actually contain Arabic script
(catching a copy-pasted English string). Technology and brand names are
allowlisted, since those legitimately stay in Latin.

## SEO

- One `<h1>`, then `<h2>` per section, `<h3>` per entry — no skipped levels.
- **JSON-LD `Person`** with `sameAs` pointing at GitHub, LinkedIn and Upwork.
  That is the part that matters: it tells search engines the site and those
  profiles are one entity, so they consolidate instead of competing.
- `canonical`, plus `hreflang` alternates for `en`, `ar` and `x-default`,
  written at runtime and mirrored in the sitemap.
- Open Graph and Twitter cards with a 1200x630 image (`public/og.png`), an
  absolute URL and an explicit type — WhatsApp, LinkedIn and Slack all read
  different subsets of these tags.
- `robots.txt` and `sitemap.xml` are generated at build time from
  `VITE_SITE_URL` by [scripts/site-files.ts](scripts/site-files.ts).
- A `noscript` block carries the name, pitch and contact details, so the page
  is not blank to a crawler that does not execute JavaScript.

## Security

- **CSP** via meta tag, allowing **no third-party origin**. `style-src` keeps
  `'unsafe-inline'` because Emotion injects `<style>` at runtime and a static
  host cannot mint per-request nonces. Moving to a host that can set real
  headers means moving the CSP there and adding `frame-ancestors`.
- **Fonts are self-hosted** (`npm run fonts:fetch`). Hotlinking Google Fonts
  sends every visitor's IP to Google and would force a third-party origin into
  the CSP.
- **No analytics, cookies or third-party scripts**, so no consent banner is
  needed. `localStorage` holds one key (`sm-lang`) and never leaves the browser.
- External links carry `rel="noopener noreferrer"`.
- `npm run audit` checks production dependencies; Dependabot opens grouped
  monthly PRs.
- An error boundary catches render crashes and still shows contact details,
  using dependency-free inline markup so it works even if the theme, the RTL
  cache or i18n is what broke.

## Responsive and adaptive

Adaptive, not only responsive — different component trees per device class,
not one tree reflowed:

- Work history renders as a **dot-and-rail timeline on phones** and a
  **two-column ledger** from tablet up.
- A **touch-only action bar** appears at the bottom once the hero scrolls away;
  pointer devices never see it.
- The hero switches to **columns on a sideways phone**, where height is scarce.
- Section intros go **sticky on large pointer screens** only.
- `prefers-reduced-motion` is respected throughout.

## Deploying

`npm run build` produces a static `dist/`. Pushing to `main` deploys to GitHub
Pages via [.github/workflows/deploy.yml](.github/workflows/deploy.yml).

The deployed URL lives in **one place**: `VITE_SITE_URL`. To move host, edit
`.env` (`VITE_SITE_URL` and `BASE_PATH`) and mirror both in the workflow's
`env:` block. `BASE_PATH` is `/` for a user/org site or custom domain, and
`/<repo>/` for a project site.

## Replacing the photo

Overwrite `src/assets/portrait.jpg` — nothing else needs to change; Vite hashes
and rebases it automatically. Keep roughly a 3:4 portrait crop. Then regenerate
`public/og.png` (1200x630) so the share card matches, keeping it under ~300 KB —
WhatsApp silently skips larger images.
