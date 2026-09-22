import { useEffect, useCallback } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/CloseRounded'
import PrevIcon from '@mui/icons-material/ChevronLeftRounded'
import NextIcon from '@mui/icons-material/ChevronRightRounded'
import { alpha } from '@mui/material/styles'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, easing } from '../theme'
import type { LifeImage } from '../life'

interface LightboxProps {
  images: LifeImage[]
  index: number | null
  onClose: () => void
  onNavigate: (next: number) => void
  alt: string
}

/**
 * Full-screen photo viewer. Kept deliberately small: no zoom, no thumbnails —
 * it exists so a face in a group photo is actually legible, nothing more.
 *
 * Arrow keys step through, Escape closes, and the arrows swap sides under RTL
 * so "next" always means "further along the story".
 */
export default function Lightbox({ images, index, onClose, onNavigate, alt }: LightboxProps) {
  const { i18n } = useTranslation()
  const reduced = useReducedMotion()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'
  const open = index !== null

  const step = useCallback(
    (delta: number) => {
      if (index === null) return
      onNavigate((index + delta + images.length) % images.length)
    },
    [index, images.length, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      // In RTL the visual "left" arrow means forward.
      if (e.key === 'ArrowRight') step(isRtl ? -1 : 1)
      if (e.key === 'ArrowLeft') step(isRtl ? 1 : -1)
    }
    window.addEventListener('keydown', onKey)
    // Stop the page behind scrolling while the viewer is up.
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose, step, isRtl])

  const image = index === null ? null : images[index]

  return (
    <AnimatePresence>
      {open && image ? (
        <Box
          component={motion.div}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          sx={{
            position: 'fixed',
            inset: 0,
            zIndex: 1300,
            bgcolor: alpha('#000', 0.92),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: { xs: 2, md: 6 },
            pb: 'calc(16px + env(safe-area-inset-bottom, 0px))',
          }}
        >
          <IconButton
            onClick={onClose}
            aria-label="Close"
            sx={{
              position: 'absolute',
              top: 'calc(12px + env(safe-area-inset-top, 0px))',
              insetInlineEnd: 12,
              color: palette.paper,
              bgcolor: alpha(palette.paper, 0.08),
              '&:hover': { bgcolor: alpha(palette.paper, 0.16) },
            }}
          >
            <CloseIcon />
          </IconButton>

          {images.length > 1 ? (
            <>
              <IconButton
                onClick={(e) => { e.stopPropagation(); step(-1) }}
                aria-label="Previous"
                sx={navButton('start')}
              >
                {isRtl ? <NextIcon /> : <PrevIcon />}
              </IconButton>
              <IconButton
                onClick={(e) => { e.stopPropagation(); step(1) }}
                aria-label="Next"
                sx={navButton('end')}
              >
                {isRtl ? <PrevIcon /> : <NextIcon />}
              </IconButton>
            </>
          ) : null}

          <Box
            component={motion.img}
            key={image.src}
            src={image.src}
            alt={alt}
            onClick={(e: React.MouseEvent) => e.stopPropagation()}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: easing }}
            sx={{
              maxWidth: '100%',
              maxHeight: '100%',
              objectFit: 'contain',
              borderRadius: 1,
              border: '1px solid',
              borderColor: line.soft,
            }}
          />

          {images.length > 1 ? (
            <Box
              sx={{
                position: 'absolute',
                bottom: 'calc(16px + env(safe-area-inset-bottom, 0px))',
                left: 0,
                right: 0,
                textAlign: 'center',
                fontFamily: fonts.mono,
                fontSize: 12.5,
                letterSpacing: '0.14em',
                color: alpha(palette.paper, 0.6),
                pointerEvents: 'none',
              }}
            >
              {String(index + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </Box>
          ) : null}
        </Box>
      ) : null}
    </AnimatePresence>
  )
}

const navButton = (side: 'start' | 'end') => ({
  position: 'absolute' as const,
  top: '50%',
  transform: 'translateY(-50%)',
  [side === 'start' ? 'insetInlineStart' : 'insetInlineEnd']: { xs: 4, md: 20 },
  color: palette.paper,
  bgcolor: alpha(palette.paper, 0.08),
  '&:hover': { bgcolor: alpha(palette.paper, 0.16) },
  display: { xs: 'none', sm: 'inline-flex' },
})
