# Licences and attribution

This repository mixes three kinds of material. They are **not** all under the
same licence — please read before reusing anything.

## 1. Source code — MIT

Everything under `src/`, `scripts/`, `.github/` and the build configuration is
released under the MIT Licence ([LICENSE](LICENSE)). The theme system, the
RTL/Emotion setup and the i18n layer are yours to reuse, with attribution.

## 2. Photograph and personal details — © Said Madi, all rights reserved

**Not** covered by the MIT licence:

- `src/assets/portrait.jpg` and `public/og.png` — photographs of Said Madi.
- The biography, career history and contact details in `src/i18n/locales/*.json`.
- The name "Said Madi" / "سعيد ماضي".

These are personal data and a personal likeness. If you fork this repository as
a template, **delete those files and replace the locale content with your own.**

## 3. Fonts — SIL Open Font License 1.1

`public/fonts/` contains IBM Plex Sans, IBM Plex Sans Arabic and IBM Plex Mono,
all by IBM and all under the SIL Open Font License 1.1. The full licence is in
[public/fonts/OFL.txt](public/fonts/OFL.txt). The OFL permits redistribution
bundled with this site; it does not permit selling the fonts on their own.

## 4. Dependencies

All runtime dependencies are MIT-licensed: React, MUI, Emotion, Framer Motion,
i18next, react-i18next, stylis and stylis-plugin-rtl. Run `npm run licenses`
for the current breakdown.
