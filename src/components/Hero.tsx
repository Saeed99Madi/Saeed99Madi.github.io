import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import MailIcon from '@mui/icons-material/MailOutlineRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale, easing } from '../theme'
import { profile } from '../config'
import { useDevice } from '../hooks/useDevice'
import Chip from './Chip'

const MotionBox = motion.create(Box)

const rise = (delay: number, reduced: boolean | null) => ({
  initial: reduced ? { opacity: 0 } : { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: easing },
})

export default function Hero() {
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const { isLandscapeCompact } = useDevice()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'
  const tags = t('hero.tags', { returnObjects: true })

  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      {/* Engineering-drawing grid. Sits behind everything, barely visible. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(${line.soft} 1px, transparent 1px),
                            linear-gradient(90deg, ${line.soft} 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 40%, #000 30%, transparent 75%)',
          opacity: 0.7,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          pt: { xs: 9, md: 12 },
          pb: { xs: 4, md: 8 },
          px: { xs: 2, sm: 3, md: 5, lg: 6 },
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 1180,
            mx: 'auto',
            display: 'grid',
            gridTemplateColumns: isLandscapeCompact
              ? 'minmax(0, 0.3fr) minmax(0, 0.7fr)'
              : { xs: '1fr', md: 'minmax(0, 1.15fr) minmax(0, 0.85fr)' },
            gap: { xs: 3.5, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box sx={{ order: { xs: 2, md: 1 } }}>
            <MotionBox {...rise(0.05, reduced)}>
              <Stack direction="row" spacing={1.25} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1, mb: { xs: 1.5, md: 2.5 } }}>
                <Box
                  sx={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    bgcolor: palette.live,
                    boxShadow: `0 0 0 4px ${alpha(palette.live, 0.16)}`,
                    flexShrink: 0,
                  }}
                />
                <Typography variant="overline" sx={{ color: palette.live, whiteSpace: 'nowrap' }}>
                  {t('hero.available')}
                </Typography>
                {/* '1px', not 1: MUI's sizing system reads a bare 1 as 100%. */}
                <Box sx={{ width: '1px', height: 12, bgcolor: line.medium, flexShrink: 0 }} />
                <Typography variant="overline" sx={{ color: palette.muted, whiteSpace: 'nowrap' }}>
                  {t('hero.location')}
                </Typography>
              </Stack>
            </MotionBox>

            <MotionBox {...rise(0.13, reduced)}>
              <Typography
                variant="h1"
                sx={{ color: palette.paper, fontSize: isLandscapeCompact ? 'clamp(1.8rem, 8svh, 2.6rem)' : scale.hero }}
              >
                {isRtl ? profile.nameAr : profile.first}
                {!isRtl && (
                  <Box component="span" sx={{ display: 'block' }}>
                    {profile.last}
                    <Box component="span" sx={{ color: palette.signal }}>.</Box>
                  </Box>
                )}
              </Typography>
            </MotionBox>

            <MotionBox {...rise(0.22, reduced)} sx={{ mt: { xs: 1.5, md: 2.5 } }}>
              <Typography
                sx={{
                  fontFamily: isRtl ? fonts.arabic : fonts.mono,
                  fontSize: { xs: 13, md: 14.5 },
                  letterSpacing: isRtl ? 0 : '0.04em',
                  color: palette.signal,
                }}
              >
                {t('hero.role')}
              </Typography>
            </MotionBox>

            <MotionBox {...rise(0.3, reduced)} sx={{ mt: { xs: 2, md: 3 }, maxWidth: 520 }}>
              <Typography sx={{ fontSize: isLandscapeCompact ? '0.95rem' : scale.lead, lineHeight: isRtl ? 1.9 : 1.6, color: palette.muted }}>
                {t('hero.headline')}
              </Typography>
            </MotionBox>

            <MotionBox
              {...rise(0.38, reduced)}
              sx={{ mt: { xs: 2.5, md: 3.5 }, display: isLandscapeCompact ? 'none' : 'block' }}
            >
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 1 }}>
                {tags.map((tag) => (
                  <Chip key={tag} label={tag} />
                ))}
              </Stack>
            </MotionBox>

            <MotionBox {...rise(0.46, reduced)} sx={{ mt: { xs: 3, md: 4.5 } }}>
              <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'center', gap: { xs: 1.25, sm: 2 } }}>
                <Button
                  href={`mailto:${profile.email}`}
                  variant="contained"
                  startIcon={<MailIcon />}
                  sx={{ fontSize: 13, bgcolor: palette.signal, color: palette.base, '&:hover': { bgcolor: palette.signalDeep } }}
                >
                  {t('contact.emailLabel')}
                </Button>
                <Button
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<GitHubIcon />}
                  sx={{
                    fontSize: 13,
                    color: palette.paper,
                    border: '1px solid',
                    borderColor: line.medium,
                    '&:hover': { borderColor: palette.paper, bgcolor: 'transparent' },
                  }}
                >
                  {t('contact.githubLabel')}
                </Button>
              </Stack>
            </MotionBox>
          </Box>

          <MotionBox
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 32, scale: 1.02 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: easing }}
            sx={{
              order: { xs: 1, md: 2 },
              position: 'relative',
              justifySelf: { xs: 'center', md: 'end' },
              width: '100%',
              maxWidth: isLandscapeCompact
                ? 'min(150px, 52svh)'
                : { xs: 'min(210px, 24svh)', sm: 'min(280px, 32svh)', md: 340, lg: 380 },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                inset: 0,
                // insetInline* so the offset frame flips with the layout.
                transform: 'translate(14px, 14px)',
                border: '1px solid',
                borderColor: alpha(palette.signal, 0.55),
                borderRadius: 1,
                display: { xs: 'none', sm: 'block' },
              }}
            />
            <Box
              sx={{
                position: 'relative',
                aspectRatio: '899 / 1200',
                overflow: 'hidden',
                borderRadius: 1,
                bgcolor: palette.surface,
                border: '1px solid',
                borderColor: line.medium,
              }}
            >
              <Box
                component="img"
                src={profile.portrait}
                alt={t('hero.portraitAlt')}
                width={899}
                height={1200}
                fetchPriority="high"
                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  )
}
