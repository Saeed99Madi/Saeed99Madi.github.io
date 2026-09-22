import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import GitHubIcon from '@mui/icons-material/GitHub'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import WorkIcon from '@mui/icons-material/WorkOutlineRounded'
import ArrowIcon from '@mui/icons-material/ArrowOutwardRounded'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale } from '../theme'
import { profile } from '../config'
import { useWhatsAppHref } from '../useWhatsApp'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'
  const whatsapp = useWhatsAppHref()

  const links = [
    { label: t('contact.githubLabel'), href: profile.github, icon: <GitHubIcon sx={{ fontSize: 18 }} /> },
    { label: t('contact.linkedinLabel'), href: profile.linkedin, icon: <LinkedInIcon sx={{ fontSize: 18 }} /> },
    { label: t('contact.upworkLabel'), href: profile.upwork, icon: <WorkIcon sx={{ fontSize: 18 }} /> },
  ]

  return (
    <Section id="contact" labelledBy="contact-title" sx={{ bgcolor: palette.surface }}>
      <Reveal>
        <Kicker index="05">{t('contact.kicker')}</Kicker>
      </Reveal>

      <Reveal delay={0.06}>
        <Typography id="contact-title" variant="h2" sx={{ fontSize: scale.sectionTitle, color: palette.paper, maxWidth: 760 }}>
          {t('contact.title')}
        </Typography>
      </Reveal>

      <Reveal delay={0.12}>
        <Typography sx={{ color: palette.muted, maxWidth: 520, mt: 2.5, fontSize: scale.lead }}>
          {t('contact.body')}
        </Typography>
      </Reveal>

      <Reveal delay={0.18}>
        <Box sx={{ mt: { xs: 4, md: 6 } }}>
          <Button
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            size="large"
            startIcon={<WhatsAppIcon />}
            sx={{
              fontSize: 14,
              py: 1.3,
              px: 3,
              bgcolor: palette.signal,
              color: palette.base,
              '&:hover': { bgcolor: palette.signalDeep },
            }}
          >
            {t('contact.whatsappLabel')} · {profile.phone}
          </Button>
        </Box>
      </Reveal>

      <Reveal delay={0.22}>
        <Box sx={{ mt: { xs: 3, md: 4 } }}>
          <Link
            href={`mailto:${profile.email}`}
            underline="none"
            sx={{
              display: 'inline-block',
              fontFamily: fonts.mono,
              fontSize: 'clamp(1.05rem, 4.2vw, 2.25rem)',
              color: palette.paper,
              overflowWrap: 'anywhere',
              borderBottom: '1px solid',
              borderColor: line.strong,
              pb: 0.5,
              transition: 'color .3s ease, border-color .3s ease',
              '&:hover': { color: palette.signal, borderColor: palette.signal },
            }}
          >
            {profile.email}
          </Link>
        </Box>
      </Reveal>

      <Reveal delay={0.24}>
        <Stack direction="row" sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 1.5 }, mt: { xs: 3.5, md: 5 } }}>
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 1.1,
                minHeight: 44,
                border: '1px solid',
                borderColor: line.medium,
                borderRadius: 999,
                color: palette.paper,
                fontFamily: isRtl ? fonts.arabic : fonts.mono,
                fontSize: 13,
                transition: 'border-color .3s ease, color .3s ease',
                '&:hover': { borderColor: palette.signal, color: palette.signal },
              }}
            >
              {l.icon}
              {l.label}
              <ArrowIcon sx={{ fontSize: 14, opacity: 0.6, transform: isRtl ? 'scaleX(-1)' : 'none' }} />
            </Link>
          ))}
        </Stack>
      </Reveal>

      <Reveal delay={0.3}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2.5, sm: 6 }}
          sx={{ mt: { xs: 4, md: 6 }, pt: 3.5, borderTop: '1px solid', borderColor: line.soft }}
        >
          <Box>
            <Typography variant="overline" sx={{ color: palette.faint, display: 'block', mb: 0.8 }}>
              {t('contact.phoneLabel')}
            </Typography>
            <Link
              href={`tel:${profile.phoneHref}`}
              underline="hover"
              sx={{ color: palette.paper, fontFamily: fonts.mono, fontSize: 14, direction: 'ltr', display: 'inline-block' }}
            >
              {profile.phone}
            </Link>
          </Box>
          <Box>
            <Typography variant="overline" sx={{ color: palette.faint, display: 'block', mb: 0.8 }}>
              {t('contact.basedLabel')}
            </Typography>
            <Typography sx={{ color: palette.paper, fontFamily: isRtl ? fonts.arabic : fonts.mono, fontSize: 14 }}>
              {t('contact.location')}
            </Typography>
          </Box>
        </Stack>
      </Reveal>
    </Section>
  )
}
