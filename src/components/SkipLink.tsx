import Link from '@mui/material/Link'
import { useTranslation } from 'react-i18next'
import { palette, fonts } from '../theme'

export default function SkipLink() {
  const { t } = useTranslation()
  return (
    <Link
      href="#main"
      sx={{
        position: 'absolute',
        insetInlineStart: 16,
        top: -60,
        zIndex: 1400,
        px: 2,
        py: 1,
        bgcolor: palette.signal,
        color: palette.base,
        fontFamily: fonts.mono,
        fontSize: 13,
        borderRadius: 1,
        transition: 'top .2s ease',
        '&:focus-visible': { top: 'calc(12px + env(safe-area-inset-top, 0px))' },
      }}
    >
      {t('nav.skipToContent')}
    </Link>
  )
}
