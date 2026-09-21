import Button from '@mui/material/Button'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette } from '../theme'
import { supportedLngs } from '../i18n'

export default function LanguageSwitcher({ fullWidth = false }: { fullWidth?: boolean }) {
  const { t, i18n } = useTranslation()
  const current = i18n.resolvedLanguage ?? i18n.language
  const next = supportedLngs.find((l) => l !== current) ?? 'en'

  return (
    <Button
      onClick={() => void i18n.changeLanguage(next)}
      lang={next}
      aria-label={t('meta.switchTo')}
      title={t('meta.switchTo')}
      fullWidth={fullWidth}
      sx={{
        minWidth: 0,
        px: 1.5,
        py: 0.4,
        border: '1px solid',
        borderColor: alpha(palette.signal, 0.45),
        color: palette.signal,
        fontSize: 12.5,
        lineHeight: 1.7,
        '&:hover': { bgcolor: palette.signal, color: palette.base, borderColor: palette.signal },
      }}
    >
      {t('meta.switchLabel')}
    </Button>
  )
}
