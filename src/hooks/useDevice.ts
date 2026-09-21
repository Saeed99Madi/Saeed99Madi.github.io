import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

/**
 * Device-class hooks. These drive *adaptive* decisions — rendering a different
 * component tree per class — as opposed to responsive `sx` breakpoints, which
 * only reflow one tree.
 *
 * `noSsr` because this app is client-rendered: the query is read synchronously
 * on first paint, so there is no wrong-layout flash to correct.
 */
export function useDevice() {
  const theme = useTheme()

  const isPhone = useMediaQuery(theme.breakpoints.down('sm'), { noSsr: true })
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), { noSsr: true })

  /** Touch-primary input: no hover affordances, bigger tap targets. */
  const isTouch = useMediaQuery('(hover: none) and (pointer: coarse)', { noSsr: true })

  /** Phone held sideways: width to spare, almost no height. */
  const isLandscapeCompact = useMediaQuery('(max-height: 520px) and (orientation: landscape)', { noSsr: true })

  return { isPhone, isDesktop, isTouch, isLandscapeCompact }
}
