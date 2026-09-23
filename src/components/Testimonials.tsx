import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import StarIcon from '@mui/icons-material/StarRounded'
import VerifiedIcon from '@mui/icons-material/VerifiedRounded'
import ArrowIcon from '@mui/icons-material/ArrowOutwardRounded'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale, monoOrArabic } from '../theme'
import { testimonials, upworkStats } from '../testimonials'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

function Stars() {
  return (
    <Stack direction="row" spacing={0.25} aria-hidden>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} sx={{ fontSize: 15, color: palette.signal }} />
      ))}
    </Stack>
  )
}

export default function Testimonials() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'

  return (
    <Section id="testimonials" labelledBy="testimonials-title" sx={{ bgcolor: palette.surface }}>
      <Reveal>
        <Kicker index="04">{t('testimonials.kicker')}</Kicker>
      </Reveal>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) auto' },
          gap: { xs: 2.5, md: 5 },
          alignItems: 'end',
          mb: { xs: 4, md: 6 },
        }}
      >
        <Box>
          <Reveal delay={0.06}>
            <Typography
              id="testimonials-title"
              variant="h2"
              sx={{ fontSize: scale.sectionTitle, color: palette.paper }}
            >
              {t('testimonials.title')}
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Typography sx={{ color: palette.muted, mt: 2, maxWidth: 560 }}>
              {t('testimonials.intro')}
            </Typography>
          </Reveal>
        </Box>

        {/* Headline numbers. Kept adjacent to the intro so the claim and the
            evidence for it are read together. */}
        <Reveal delay={0.14}>
          <Stack direction="row" spacing={{ xs: 3, md: 4 }}>
            {[
              { value: upworkStats.averageRating, label: t('testimonials.avgLabel'), stars: true },
              { value: String(upworkStats.completedJobs), label: t('testimonials.jobsLabel') },
            ].map((stat) => (
              <Box key={stat.label}>
                <Typography
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: { xs: '1.9rem', md: '2.3rem' },
                    fontWeight: 500,
                    color: palette.signal,
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </Typography>
                {stat.stars ? <Box sx={{ mt: 0.75 }}><Stars /></Box> : null}
                <Typography variant="overline" sx={{ color: palette.faint, display: 'block', mt: 0.75 }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Reveal>
      </Box>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
          gap: { xs: 1.5, md: 2 },
          alignItems: 'start',
        }}
      >
        {testimonials.map((item, i) => (
          <Reveal key={item.quote.slice(0, 40)} delay={0.04 * i} sx={{ height: '100%' }}>
            <Box
              component="figure"
              sx={{
                m: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                p: { xs: 2.5, md: 3 },
                bgcolor: palette.surfaceHigh,
                border: '1px solid',
                borderColor: line.soft,
                borderRadius: 1,
                transition: 'border-color .35s ease',
                '@media (hover: hover)': { '&:hover': { borderColor: alpha(palette.signal, 0.4) } },
              }}
            >
              <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Stars />
                <Stack direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
                  <VerifiedIcon sx={{ fontSize: 14, color: palette.faint }} />
                  <Typography sx={{ fontFamily: monoOrArabic(isRtl), fontSize: 10.5, letterSpacing: isRtl ? 0 : '0.1em', color: palette.faint }}>
                    {t('testimonials.verified')}
                  </Typography>
                </Stack>
              </Stack>

              {/*
                The quotes stay in English in both locales: these are other
                people's words, and translating them would be putting words in
                their mouths. `dir="ltr"` keeps the punctuation from scrambling
                when the page is in Arabic.
              */}
              <Typography
                component="blockquote"
                dir="ltr"
                sx={{
                  m: 0,
                  color: palette.paper,
                  fontSize: { xs: '0.95rem', md: '1rem' },
                  lineHeight: 1.75,
                  flexGrow: 1,
                  textAlign: 'start',
                  '&::before': { content: '"\\201C"' },
                  '&::after': { content: '"\\201D"' },
                }}
              >
                {item.quote}
              </Typography>

              <Box
                component="figcaption"
                sx={{ mt: 2.5, pt: 2, borderTop: '1px solid', borderColor: line.soft }}
              >
                <Typography sx={{ fontWeight: 600, color: palette.paper, fontSize: '0.9rem' }}>
                  {item.author}
                  {item.role ? (
                    <Box component="span" sx={{ color: palette.muted, fontWeight: 400 }}>
                      {' · '}
                      {item.role}
                    </Box>
                  ) : null}
                </Typography>
                <Typography
                  dir="ltr"
                  sx={{
                    fontFamily: fonts.mono,
                    fontSize: 11.5,
                    color: palette.faint,
                    mt: 0.5,
                    textAlign: 'start',
                  }}
                >
                  {item.project} · {item.date}
                </Typography>
              </Box>
            </Box>
          </Reveal>
        ))}
      </Box>

      <Reveal delay={0.2}>
        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <Link
            href={upworkStats.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            underline="hover"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              color: palette.signal,
              fontFamily: isRtl ? fonts.arabic : fonts.mono,
              fontSize: 13,
            }}
          >
            {t('testimonials.viewAll')}
            <ArrowIcon sx={{ fontSize: 14, transform: isRtl ? 'scaleX(-1)' : 'none' }} />
          </Link>
        </Box>
      </Reveal>
    </Section>
  )
}
