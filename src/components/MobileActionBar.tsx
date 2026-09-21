import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import MailIcon from '@mui/icons-material/MailOutlineRounded'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts } from '../theme'
import { profile } from '../config'
import { useDevice } from '../hooks/useDevice'

/**
 * Touch-only: a thumb-reachable action bar that appears once the hero (which
 * already carries these actions) has scrolled away. Pointer devices never see
 * it — there the header CTA is always in reach.
 */
export default function MobileActionBar() {
  const { t, i18n } = useTranslation()
  const { isPhone, isTouch } = useDevice()
  const [shown, setShown] = useState(false)
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting), { threshold: 0 })
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  if (!isPhone && !isTouch) return null

  const item = {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 1,
    minHeight: 48, // 48px minimum tap target
    fontFamily: isRtl ? fonts.arabic : fonts.mono,
    fontSize: 13,
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        insetInline: 0,
        bottom: 0,
        zIndex: 1150,
        display: 'flex',
        bgcolor: palette.surfaceHigh,
        borderTop: '1px solid',
        borderColor: line.soft,
        pb: 'env(safe-area-inset-bottom, 0px)',
        transform: shown ? 'translateY(0)' : 'translateY(110%)',
        transition: 'transform .4s cubic-bezier(.16,1,.3,1)',
      }}
    >
      <Link href={`mailto:${profile.email}`} underline="none" sx={{ ...item, bgcolor: palette.signal, color: palette.base }}>
        <MailIcon sx={{ fontSize: 18 }} />
        {t('contact.emailLabel')}
      </Link>
      <Link
        href={profile.github}
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{ ...item, color: palette.paper }}
      >
        <GitHubIcon sx={{ fontSize: 18 }} />
        {t('contact.githubLabel')}
      </Link>
    </Box>
  )
}
