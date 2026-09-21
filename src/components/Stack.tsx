import Box from '@mui/material/Box'
import MuiStack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { motion, useReducedMotion } from 'framer-motion'
import { alpha } from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale, easing } from '../theme'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'
import Chip from './Chip'

/** Spoken-language proficiency, paired positionally with stack.languages. */
const LANGUAGE_LEVELS = [100, 85]

export default function TechStack() {
  const { t } = useTranslation()
  const reduced = useReducedMotion()
  const groups = t('stack.groups', { returnObjects: true })
  const languages = t('stack.languages', { returnObjects: true })

  return (
    <Section id="stack" labelledBy="stack-title">
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.4fr 0.6fr' }, gap: { xs: 5, md: 7 } }}>
        <Box>
          <Reveal>
            <Kicker index="04">{t('stack.kicker')}</Kicker>
          </Reveal>
          <Reveal delay={0.06}>
            <Typography
              id="stack-title"
              variant="h2"
              sx={{ fontSize: scale.statement, color: palette.paper, mb: { xs: 3.5, md: 5 } }}
            >
              {t('stack.title')}
            </Typography>
          </Reveal>

          <Box sx={{ display: 'grid', gap: { xs: 2.5, md: 3 } }}>
            {groups.map((group, i) => (
              <Reveal key={group.name} delay={0.04 * i}>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '140px minmax(0, 1fr)' },
                    gap: { xs: 1, sm: 2.5 },
                    alignItems: 'start',
                    pb: { xs: 2.5, md: 3 },
                    borderBottom: '1px solid',
                    borderColor: line.soft,
                  }}
                >
                  <Typography variant="overline" sx={{ color: palette.faint, pt: 0.5 }}>
                    {group.name}
                  </Typography>
                  <MuiStack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                    {group.items.map((item) => (
                      <Chip key={item} label={item} />
                    ))}
                  </MuiStack>
                </Box>
              </Reveal>
            ))}
          </Box>
        </Box>

        <Box sx={{ position: { lg: 'sticky' }, top: { lg: 116 }, alignSelf: { lg: 'start' } }}>
          <Reveal delay={0.1}>
            <Typography variant="overline" sx={{ color: palette.signal, display: 'block', mb: 2.5 }}>
              {t('stack.languagesTitle')}
            </Typography>
            <MuiStack spacing={3}>
              {languages.map((l, i) => {
                const value = LANGUAGE_LEVELS[i] ?? 0
                return (
                  <Box key={l.name}>
                    <MuiStack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'baseline', gap: 1.5, mb: 1 }}>
                      <Typography sx={{ fontWeight: 600, color: palette.paper }}>{l.name}</Typography>
                      <Typography sx={{ fontFamily: fonts.mono, fontSize: 11.5, color: palette.faint }}>
                        {l.level}
                      </Typography>
                    </MuiStack>
                    <Box
                      role="meter"
                      aria-label={l.name}
                      aria-valuenow={value}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuetext={l.level}
                      sx={{ height: 6, bgcolor: alpha(palette.paper, 0.1), borderRadius: 999, overflow: 'hidden' }}
                    >
                      <Box
                        component={motion.div}
                        initial={{ width: reduced ? `${value}%` : 0 }}
                        whileInView={{ width: `${value}%` }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 1, delay: 0.1 + i * 0.12, ease: easing }}
                        sx={{ height: '100%', bgcolor: palette.signal, borderRadius: 999 }}
                      />
                    </Box>
                  </Box>
                )
              })}
            </MuiStack>
          </Reveal>
        </Box>
      </Box>
    </Section>
  )
}
