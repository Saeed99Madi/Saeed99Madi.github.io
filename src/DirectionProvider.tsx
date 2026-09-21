import { useMemo } from 'react'
import type { ReactNode } from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useTranslation } from 'react-i18next'
import { buildTheme } from './theme'

/**
 * Real bidirectional support, not a mirrored stylesheet.
 *
 * Emotion generates the CSS, so flipping has to happen in Emotion's pipeline:
 * `stylis-plugin-rtl` rewrites physical properties (margin-left → margin-right,
 * transform translations, border radii) as the styles are serialised. The cache
 * key differs per direction so the two sets of generated class names never
 * collide when the visitor switches language.
 *
 * MUI also needs `theme.direction` to mirror its own components (Drawer anchor,
 * icon rotation), which `buildTheme` sets.
 */
const caches = {
  ltr: createCache({ key: 'mui', stylisPlugins: [prefixer] }),
  rtl: createCache({ key: 'mui-rtl', stylisPlugins: [prefixer, rtlPlugin] }),
}

export default function DirectionProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation()
  const direction = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl' ? 'rtl' : 'ltr'

  const theme = useMemo(() => buildTheme(direction), [direction])

  return (
    <CacheProvider value={caches[direction]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  )
}
