import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import StarIcon from '@mui/icons-material/StarRounded'
import ArrowIcon from '@mui/icons-material/ArrowOutwardRounded'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale } from '../theme'
import { projectLinks } from '../config'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'
import Chip from './Chip'

export default function Projects() {
  const { t, i18n } = useTranslation()
  const items = t('projects.items', { returnObjects: true })
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'

  return (
    <Section id="projects" labelledBy="projects-title" sx={{ bgcolor: palette.surface }}>
      <Reveal>
        <Kicker index="03">{t('projects.kicker')}</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Typography
          id="projects-title"
          variant="h2"
          sx={{ fontSize: scale.sectionTitle, color: palette.paper, mb: { xs: 4, md: 7 } }}
        >
          {t('projects.title')}
        </Typography>
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {items.map((item, i) => {
          const links = projectLinks[i]
          return (
            <Reveal key={item.name} delay={0.04 * i} sx={{ height: '100%' }}>
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  p: { xs: 2.5, md: 3 },
                  bgcolor: palette.surfaceHigh,
                  border: '1px solid',
                  borderColor: line.soft,
                  borderRadius: 1,
                  transition: 'border-color .35s ease, transform .35s cubic-bezier(.16,1,.3,1)',
                  '@media (hover: hover)': {
                    '&:hover': { borderColor: alpha(palette.signal, 0.5), transform: 'translateY(-3px)' },
                  },
                }}
              >
                <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                  <Typography component="h3" sx={{ fontSize: scale.card, fontWeight: 600, color: palette.paper, m: 0 }}>
                    {item.name}
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexShrink: 0 }}>
                    {links.stars > 0 ? (
                      <Stack
                        direction="row"
                        spacing={0.4}
                        sx={{ alignItems: 'center' }}
                        aria-label={`${links.stars} ${t('projects.starsLabel')}`}
                      >
                        <StarIcon sx={{ fontSize: 15, color: palette.signal }} />
                        <Typography sx={{ fontFamily: fonts.mono, fontSize: 12.5, color: palette.muted }}>
                          {links.stars}
                        </Typography>
                      </Stack>
                    ) : null}
                    <Typography sx={{ fontFamily: fonts.mono, fontSize: 12.5, color: palette.faint, whiteSpace: 'nowrap' }}>
                      {item.year}
                    </Typography>
                  </Stack>
                </Stack>

                <Typography sx={{ color: palette.muted, mt: 1.5, flexGrow: 1 }}>{item.summary}</Typography>

                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mt: 2.5 }}>
                  {item.stack.map((s) => (
                    <Chip key={s} label={s} />
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  spacing={2.5}
                  sx={{ mt: 2.5, pt: 2, borderTop: '1px solid', borderColor: line.soft, flexWrap: 'wrap' }}
                >
                  {links.live ? (
                    <Link
                      href={links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: palette.signal,
                        fontFamily: isRtl ? fonts.arabic : fonts.mono,
                        fontSize: 12.5,
                      }}
                    >
                      {t('projects.liveLabel')}
                      {/* The arrow points away from the text in both directions. */}
                      <ArrowIcon sx={{ fontSize: 14, transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                    </Link>
                  ) : null}
                  {links.repo ? (
                    <Link
                      href={links.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="hover"
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: palette.muted,
                        fontFamily: isRtl ? fonts.arabic : fonts.mono,
                        fontSize: 12.5,
                      }}
                    >
                      {t('projects.viewLabel')}
                      <ArrowIcon sx={{ fontSize: 14, transform: isRtl ? 'scaleX(-1)' : 'none' }} />
                    </Link>
                  ) : null}
                </Stack>
              </Box>
            </Reveal>
          )
        })}
      </Box>
    </Section>
  )
}
