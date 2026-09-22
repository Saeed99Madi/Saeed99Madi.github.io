import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import ArrowIcon from '@mui/icons-material/ArrowBackRounded'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { useDocumentLanguage } from './i18n/useDocumentLanguage'
import { palette, line, fonts, scale } from './theme'
import { profile } from './config'
import LifeTimeline from './components/LifeTimeline'
import LanguageSwitcher from './components/LanguageSwitcher'
import SkipLink from './components/SkipLink'
import Reveal from './components/Reveal'
import Kicker from './components/Kicker'

export default function LifeApp() {
  useDocumentLanguage({ titleKey: 'life.metaTitle', descriptionKey: 'life.metaDescription' })
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'

  return (
    <Box sx={{ position: 'relative', minHeight: '100svh' }}>
      <SkipLink />

      <Box
        component="header"
        sx={{
          position: 'sticky',
          top: 0,
          zIndex: 1200,
          bgcolor: alpha(palette.base, 0.9),
          backdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: '1px solid',
          borderColor: line.soft,
          pt: 'env(safe-area-inset-top, 0px)',
        }}
      >
        <Box
          sx={{
            maxWidth: 1080,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 5, lg: 6 },
            height: { xs: 62, md: 72 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          {/* Relative href so the link is correct under any deploy base. */}
          <Link
            href="../"
            underline="none"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              color: palette.muted,
              fontFamily: isRtl ? fonts.arabic : fonts.mono,
              fontSize: 13,
              transition: 'color .3s ease',
              '&:hover': { color: palette.paper },
            }}
          >
            <ArrowIcon sx={{ fontSize: 17, transform: isRtl ? 'scaleX(-1)' : 'none' }} />
            {isRtl ? profile.nameAr : profile.name}
          </Link>
          <LanguageSwitcher />
        </Box>
      </Box>

      <Box component="main" id="main">
        {/* Intro */}
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 5, lg: 6 },
            pt: { xs: 6, md: 11 },
            pb: { xs: 4, md: 7 },
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `linear-gradient(${line.soft} 1px, transparent 1px),
                                linear-gradient(90deg, ${line.soft} 1px, transparent 1px)`,
              backgroundSize: '72px 72px',
              maskImage: 'radial-gradient(ellipse 70% 70% at 30% 0%, #000 20%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 30% 0%, #000 20%, transparent 72%)',
              opacity: 0.8,
            }}
          />
          <Box sx={{ maxWidth: 1080, mx: 'auto', position: 'relative' }}>
            <Reveal>
              <Kicker>{t('life.kicker')}</Kicker>
            </Reveal>
            <Reveal delay={0.06}>
              <Typography
                component="h1"
                sx={{
                  fontSize: scale.sectionTitle,
                  fontWeight: 600,
                  color: palette.paper,
                  letterSpacing: isRtl ? 0 : '-0.025em',
                  lineHeight: isRtl ? 1.35 : 1.05,
                }}
              >
                {t('life.title')}
              </Typography>
            </Reveal>
            <Reveal delay={0.12}>
              <Typography sx={{ color: palette.muted, maxWidth: 560, mt: 2.5, fontSize: scale.lead }}>
                {t('life.intro')}
              </Typography>
            </Reveal>
          </Box>
        </Box>

        {/* Timeline */}
        <Box sx={{ px: { xs: 2, sm: 3, md: 5, lg: 6 }, pb: { xs: 8, md: 14 } }}>
          <Box sx={{ maxWidth: 1080, mx: 'auto' }}>
            <LifeTimeline />
          </Box>
        </Box>
      </Box>

      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: line.soft,
          px: { xs: 2, sm: 3, md: 5, lg: 6 },
          py: 3,
          pb: 'calc(24px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <Box
          sx={{
            maxWidth: 1080,
            mx: 'auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1.5,
          }}
        >
          <Typography sx={{ fontFamily: isRtl ? fonts.arabic : fonts.mono, fontSize: 12, color: palette.faint }}>
            © {new Date().getFullYear()} {isRtl ? profile.nameAr : profile.name}
          </Typography>
          <Link
            href="../"
            underline="hover"
            sx={{ fontFamily: isRtl ? fonts.arabic : fonts.mono, fontSize: 12, color: palette.faint }}
          >
            {t('life.backHome')}
          </Link>
        </Box>
      </Box>
    </Box>
  )
}
