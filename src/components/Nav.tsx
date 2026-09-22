import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/MenuRounded'
import CloseIcon from '@mui/icons-material/CloseRounded'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts } from '../theme'
import { profile, sections, pages } from '../config'
import LanguageSwitcher from './LanguageSwitcher'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import { useWhatsAppHref } from '../useWhatsApp'

export default function Nav() {
  const { t, i18n } = useTranslation()
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const whatsapp = useWhatsAppHref()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLink = {
    fontFamily: isRtl ? fonts.arabic : fonts.mono,
    fontSize: isRtl ? 14 : 12.5,
    letterSpacing: isRtl ? 0 : '0.1em',
    textTransform: isRtl ? 'none' : ('uppercase' as const),
    color: palette.muted,
    transition: 'color .3s ease',
    '&:hover': { color: palette.paper },
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          position: 'fixed',
          insetInline: 0,
          top: 0,
          zIndex: 1200,
          pt: 'env(safe-area-inset-top, 0px)',
          transition: 'background-color .4s ease, border-color .4s ease',
          backgroundColor: solid ? palette.base : 'transparent',
          borderBottom: '1px solid',
          borderColor: solid ? line.soft : 'transparent',
        }}
      >
        <Stack
          direction="row"
          sx={{
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            px: { xs: 2, sm: 3, md: 5, lg: 6 },
            height: { xs: 62, md: 74 },
          }}
        >
          <Link
            href="#top"
            underline="none"
            sx={{
              color: palette.paper,
              fontFamily: isRtl ? fonts.arabic : fonts.mono,
              fontWeight: 600,
              fontSize: { xs: 15, md: 16 },
              letterSpacing: isRtl ? 0 : '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {isRtl ? profile.nameAr : profile.name}
            {!isRtl && (
              <Box component="span" sx={{ color: palette.signal }}>
                .
              </Box>
            )}
          </Link>

          <Stack direction="row" spacing={{ md: 2.5, lg: 3.5 }} sx={{ alignItems: 'center' }}>
            <Stack direction="row" spacing={{ md: 2.5, lg: 3.5 }} sx={{ display: { xs: 'none', md: 'flex' } }}>
              {sections.map((id) => (
                <Link key={id} href={`#${id}`} underline="none" sx={navLink}>
                  {t(`nav.${id}` as const)}
                </Link>
              ))}
              {pages.map((page) => (
                <Link key={page.key} href={page.href} underline="none" sx={navLink}>
                  {t(`nav.${page.key}` as const)}
                </Link>
              ))}
            </Stack>

            <LanguageSwitcher />

            <Button
              href={`mailto:${profile.email}`}
              variant="contained"
              sx={{
                display: { xs: 'none', md: 'inline-flex' },
                fontSize: 12.5,
                py: 0.8,
                bgcolor: palette.signal,
                color: palette.base,
                '&:hover': { bgcolor: palette.signalDeep },
              }}
            >
              {t('nav.contact')}
            </Button>

            <IconButton
              onClick={() => setOpen(true)}
              aria-label={t('nav.openMenu')}
              sx={{ display: { xs: 'inline-flex', md: 'none' }, color: palette.paper, mx: -1 }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      <Drawer
        // The anchor flips with the document direction so the panel always
        // slides in from the same side the menu button sits on.
        anchor={isRtl ? 'left' : 'right'}
        open={open}
        onClose={() => setOpen(false)}
        slotProps={{
          paper: {
            sx: {
              width: { xs: '86vw', sm: 340 },
              maxWidth: 400,
              bgcolor: palette.surface,
              backgroundImage: 'none',
              borderInlineStart: '1px solid',
              borderColor: line.soft,
              px: 3,
              pt: 'calc(18px + env(safe-area-inset-top, 0px))',
              pb: 'calc(28px + env(safe-area-inset-bottom, 0px))',
            },
          },
        }}
      >
        <Stack sx={{ height: '100%' }}>
          <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 5 }}>
            <Typography sx={{ fontFamily: isRtl ? fonts.arabic : fonts.mono, fontWeight: 600, fontSize: 15 }}>
              {isRtl ? profile.nameAr : profile.name}
            </Typography>
            <IconButton onClick={() => setOpen(false)} aria-label={t('nav.closeMenu')} sx={{ color: palette.paper, mx: -1 }}>
              <CloseIcon />
            </IconButton>
          </Stack>

          <Stack component="nav" spacing={0.5}>
            {[...sections.map((id) => ({ key: id, href: `#${id}` })), ...pages].map(({ key: id, href }) => (
              <Link
                key={id}
                href={href}
                onClick={() => setOpen(false)}
                underline="none"
                sx={{
                  color: palette.paper,
                  fontSize: { xs: '1.5rem', sm: '1.7rem' },
                  fontWeight: 600,
                  lineHeight: 1.7,
                  '&:active': { color: palette.signal },
                }}
              >
                {t(`nav.${id}` as const)}
              </Link>
            ))}
          </Stack>

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} sx={{ pt: 4, borderTop: '1px solid', borderColor: line.soft }}>
            <Link
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: palette.signal, fontFamily: fonts.mono, fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 1 }}
            >
              <WhatsAppIcon sx={{ fontSize: 17 }} />
              {t('contact.whatsappLabel')}
            </Link>
            <Link
              href={`mailto:${profile.email}`}
              underline="hover"
              sx={{ color: palette.muted, fontFamily: fonts.mono, fontSize: 13, wordBreak: 'break-all' }}
            >
              {profile.email}
            </Link>
            <Link
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ color: palette.muted, fontFamily: fonts.mono, fontSize: 13 }}
            >
              github.com/{profile.githubHandle}
            </Link>
            <Box>
              <Typography variant="overline" sx={{ color: palette.faint, display: 'block', mb: 1 }}>
                {t('nav.language')}
              </Typography>
              <Box sx={{ display: 'inline-flex' }}>
                <LanguageSwitcher />
              </Box>
            </Box>
          </Stack>
        </Stack>
      </Drawer>
    </>
  )
}
