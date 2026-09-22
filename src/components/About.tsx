import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { useTranslation } from 'react-i18next'
import { palette, fonts, scale } from '../theme'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

export default function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true })
  const stats = t('about.stats', { returnObjects: true })

  return (
    <Section id="about" labelledBy="about-title" sx={{ bgcolor: palette.surface }}>
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.8fr 1.2fr' }, gap: { xs: 3.5, md: 6, lg: 8 } }}>
        {/* Sticky only on tall pointer screens; on a short or touch screen it
            would just steal the viewport. */}
        <Box sx={{ position: { lg: 'sticky' }, top: { lg: 116 }, alignSelf: { lg: 'start' } }}>
          <Reveal>
            <Kicker index="01">{t('about.kicker')}</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Typography id="about-title" variant="h2" sx={{ fontSize: scale.statement, color: palette.paper, maxWidth: 380 }}>
              {t('about.title')}
            </Typography>
          </Reveal>
        </Box>

        <Box>
          {paragraphs.map((p, i) => (
            <Reveal key={i} delay={0.08 + i * 0.07}>
              <Typography sx={{ fontSize: scale.lead, color: palette.muted, mb: 3 }}>{p}</Typography>
            </Reveal>
          ))}

          <Reveal delay={0.24}>
            <Divider sx={{ my: { xs: 3.5, md: 5 } }} />
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 3, sm: 5, md: 7 } }}>
              {stats.map((s) => (
                <Box key={s.label} sx={{ minWidth: 92 }}>
                  <Typography
                    sx={{
                      fontFamily: fonts.mono,
                      fontSize: { xs: '1.9rem', md: '2.4rem' },
                      fontWeight: 500,
                      color: palette.signal,
                      lineHeight: 1,
                    }}
                  >
                    {s.value}
                  </Typography>
                  <Typography variant="overline" sx={{ color: palette.faint, mt: 1, display: 'block' }}>
                    {s.label}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Reveal>

          <Reveal delay={0.3}>
            <Divider sx={{ my: { xs: 3.5, md: 5 } }} />
            <Typography variant="overline" sx={{ color: palette.signal, display: 'block', mb: 1.5 }}>
              {t('about.educationTitle')}
            </Typography>
            <Typography sx={{ fontWeight: 600, color: palette.paper }}>{t('about.degree')}</Typography>
            <Typography sx={{ color: palette.muted, mt: 0.5 }}>{t('about.school')}</Typography>
          </Reveal>
        </Box>
      </Box>
    </Section>
  )
}
