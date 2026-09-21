import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts } from '../theme'
import { profile } from '../config'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'
  const font = isRtl ? fonts.arabic : fonts.mono

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: palette.base,
        borderTop: '1px solid',
        borderColor: line.soft,
        px: { xs: 2, sm: 3, md: 5, lg: 6 },
        py: 3,
        // Phones carry a fixed action bar over the bottom of the page.
        pb: { xs: 'calc(76px + env(safe-area-inset-bottom, 0px))', md: 'calc(24px + env(safe-area-inset-bottom, 0px))' },
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.5}
        sx={{ justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, maxWidth: 1180, mx: 'auto' }}
      >
        <Typography sx={{ fontFamily: font, fontSize: 12, color: palette.faint }}>
          © {new Date().getFullYear()} {isRtl ? profile.nameAr : profile.name}. {t('footer.rights')}
        </Typography>
        <Stack direction="row" spacing={2.5} sx={{ alignItems: 'center' }}>
          <Typography sx={{ fontFamily: font, fontSize: 12, color: palette.faint, display: { xs: 'none', sm: 'block' } }}>
            {t('footer.builtWith')}
          </Typography>
          <Link href="#top" underline="hover" sx={{ fontFamily: font, fontSize: 12, color: palette.faint }}>
            ↑ {t('footer.toTop')}
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}
