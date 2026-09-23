import { createTheme, alpha } from '@mui/material/styles'
import type { Direction } from '@mui/material/styles'

/**
 * Design tokens. Semantic names only — no component hard-codes a hex value,
 * so the whole identity can be re-pitched from this one file.
 *
 * Graphite and a single amber signal. Most engineering portfolios reach for
 * blue, violet or terminal-green; amber on graphite reads warmer and is rarer,
 * and it survives both the dark UI and the amber-on-white print case.
 */
export const palette = {
  /** Page ground. */
  base: '#0E1013',
  /** Raised panels and cards. */
  surface: '#16191E',
  /** Panels raised above a surface (nested cards, code blocks). */
  surfaceHigh: '#1D2127',
  /** Primary text. Warm off-white, never pure #FFF — less glare on graphite. */
  paper: '#ECEAE5',
  /** Secondary text. */
  muted: '#9AA0AB',
  /** Dimmest legible text: timestamps, counters. */
  faint: '#6B7280',
  /** The single accent. Rules, kickers, one CTA — kept rare so it still means something. */
  signal: '#E9A23B',
  signalDeep: '#C8821F',
} as const

export const line = {
  soft: alpha(palette.paper, 0.1),
  medium: alpha(palette.paper, 0.18),
  strong: alpha(palette.paper, 0.32),
}

/**
 * IBM Plex, chosen because one superfamily covers everything this site needs:
 * Latin text, a real mono for technical labels, and Arabic designed alongside
 * the Latin rather than bolted on. That keeps EN and AR visually consistent
 * instead of the usual mismatched-Arabic-fallback problem. All SIL OFL.
 */
const sans = "'IBM Plex Sans', 'IBM Plex Sans Arabic', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
const arabic = "'IBM Plex Sans Arabic', 'IBM Plex Sans', -apple-system, sans-serif"
const mono = "'IBM Plex Mono', ui-monospace, 'SF Mono', Menlo, monospace"

export const fonts = { sans, arabic, mono }

/**
 * Mono for Latin, the Arabic sans for Arabic.
 *
 * IBM Plex Mono carries no Arabic glyphs, so Arabic set in it falls back to
 * some monospace face on the device — and monospacing Arabic breaks the
 * cursive joining, rendering "اللغة الأم" as separated stubs. Any label that
 * can hold translated text has to go through here; `fonts.mono` on its own is
 * only safe for strings that are always Latin, like a tech name or a year.
 */
export const monoOrArabic = (isRtl: boolean) => (isRtl ? arabic : mono)

/** Fluid type ramp — one source of truth for every oversized heading. */
export const scale = {
  hero: 'clamp(2.75rem, 9vw, 6.5rem)',
  sectionTitle: 'clamp(1.9rem, 5vw, 3.25rem)',
  statement: 'clamp(1.4rem, 3.2vw, 2.1rem)',
  entry: 'clamp(1.15rem, 2.4vw, 1.6rem)',
  card: 'clamp(1.1rem, 2vw, 1.375rem)',
  lead: 'clamp(1rem, 1.3vw, 1.15rem)',
  body: 'clamp(0.9375rem, 1.1vw, 1rem)',
}

export const easing = [0.16, 1, 0.3, 1] as const

/**
 * The theme is built per direction: MUI needs `direction` to mirror its own
 * components, and Arabic gets a slightly looser line-height because the script
 * carries taller ascenders and lower descenders than Latin at the same size.
 */
export function buildTheme(direction: Direction) {
  const isRtl = direction === 'rtl'
  const bodyFont = isRtl ? arabic : sans

  return createTheme({
    direction,
    palette: {
      mode: 'dark',
      primary: { main: palette.signal, dark: palette.signalDeep, contrastText: palette.base },
      background: { default: palette.base, paper: palette.surface },
      text: { primary: palette.paper, secondary: palette.muted },
      divider: line.soft,
    },
    shape: { borderRadius: 4 },
    typography: {
      fontFamily: bodyFont,
      h1: { fontFamily: bodyFont, fontWeight: 600, lineHeight: isRtl ? 1.45 : 0.98, letterSpacing: isRtl ? 0 : '-0.035em' },
      h2: { fontFamily: bodyFont, fontWeight: 600, lineHeight: isRtl ? 1.5 : 1.05, letterSpacing: isRtl ? 0 : '-0.025em' },
      h3: { fontFamily: bodyFont, fontWeight: 600, lineHeight: isRtl ? 1.5 : 1.25, letterSpacing: isRtl ? 0 : '-0.015em' },
      overline: {
        // Arabic has no case, so uppercase + wide tracking would mangle it.
        fontFamily: isRtl ? arabic : mono,
        fontSize: isRtl ? '0.8125rem' : '0.6875rem',
        fontWeight: 500,
        letterSpacing: isRtl ? 0 : '0.18em',
        textTransform: isRtl ? 'none' : 'uppercase',
        lineHeight: 1.5,
      },
      body1: { fontSize: scale.body, lineHeight: isRtl ? 1.9 : 1.7, fontWeight: 400 },
      button: { fontFamily: isRtl ? arabic : mono, fontWeight: 500, letterSpacing: isRtl ? 0 : '0.06em', textTransform: 'none' },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '::selection': { background: palette.signal, color: palette.base },
          html: { scrollBehavior: 'smooth', WebkitFontSmoothing: 'antialiased' },
          // `clip`, not `hidden`: hidden makes body a scroll container, which
          // silently breaks every `position: sticky` on the page.
          body: { overflowX: 'clip', backgroundColor: palette.base },
          ':focus-visible': { outline: `2px solid ${palette.signal}`, outlineOffset: 3 },
          '@media (prefers-reduced-motion: reduce)': { html: { scrollBehavior: 'auto' } },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: { root: { borderRadius: 999, paddingInline: 22, paddingBlock: 11 } },
      },
    },
  })
}
