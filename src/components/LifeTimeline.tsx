import { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { palette, line, scale, easing } from '../theme'
import { lifeEntries } from '../life'
import type { LifeImage } from '../life'
import Lightbox from './Lightbox'

const MotionBox = motion.create(Box)

/**
 * Photo arrangement adapts to how many there are, rather than forcing every
 * chapter into the same grid. One photo gets the full column; two sit side by
 * side; three or more fall into a grid where the first image spans two columns,
 * so the set still has a lead image instead of reading as a contact sheet.
 */
function galleryColumns(count: number) {
  if (count === 1) return { xs: '1fr' }
  if (count === 2) return { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }
  return { xs: '1fr', sm: 'repeat(2, minmax(0, 1fr))' }
}

function Photo({
  image,
  alt,
  eager,
  onOpen,
  span,
}: {
  image: LifeImage
  alt: string
  eager: boolean
  onOpen: () => void
  span?: boolean
}) {
  return (
    <Box
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onOpen()
        }
      }}
      sx={{
        gridColumn: span ? { sm: 'span 2' } : undefined,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 1.5,
        border: '1px solid',
        borderColor: line.soft,
        bgcolor: palette.surface,
        cursor: 'zoom-in',
        lineHeight: 0,
        transition: 'border-color .4s ease, transform .5s cubic-bezier(.16,1,.3,1)',
        '&:focus-visible': { outline: `2px solid ${palette.signal}`, outlineOffset: 3 },
        '@media (hover: hover)': {
          '&:hover': { borderColor: alpha(palette.signal, 0.55), transform: 'translateY(-3px)' },
          '&:hover img': { transform: 'scale(1.03)', filter: 'saturate(1.05)' },
        },
      }}
    >
      <Box
        component="img"
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        sx={{
          display: 'block',
          width: '100%',
          height: 'auto',
          // Very tall phone shots would otherwise dominate the page.
          maxHeight: { xs: 460, md: 560 },
          objectFit: 'cover',
          objectPosition: 'center',
          transition: 'transform .6s cubic-bezier(.16,1,.3,1), filter .4s ease',
        }}
      />
    </Box>
  )
}

export default function LifeTimeline() {
  const { t, i18n } = useTranslation()
  const reduced = useReducedMotion()
  const isRtl = i18n.dir(i18n.resolvedLanguage ?? i18n.language) === 'rtl'
  const entries = t('life.entries', { returnObjects: true })

  // Which chapter's gallery is open, and at which photo.
  const [viewer, setViewer] = useState<{ chapter: number; index: number } | null>(null)

  return (
    <Box sx={{ position: 'relative' }}>
      {/* The rail. Fades in and out at both ends so it reads as a thread
          rather than a hard-stopped border. */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          insetInlineStart: { xs: 5, md: 7 },
          top: 8,
          bottom: 8,
          width: '2px',
          background: `linear-gradient(to bottom,
            transparent,
            ${alpha(palette.signal, 0.5)} 6%,
            ${line.medium} 22%,
            ${line.medium} 80%,
            transparent)`,
        }}
      />

      <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
        {lifeEntries.map((entry, i) => {
          const copy = entries[i]
          const images = entry.images ?? []
          const isLast = i === lifeEntries.length - 1
          const marker = entry.year === 'Now' ? t('life.nowLabel') : entry.year

          return (
            <Box component="li" key={i}>
            <MotionBox
              key={i}
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -8% 0px' }}
              transition={{ duration: 0.7, ease: easing }}
              sx={{
                position: 'relative',
                paddingInlineStart: { xs: 4, md: 6 },
                pb: isLast ? 0 : { xs: 6, md: 9 },
              }}
            >
              {/* Node on the rail. The final one is larger and glows — it is
                  the present, and the story stops there. */}
              <Box
                aria-hidden
                sx={{
                  position: 'absolute',
                  insetInlineStart: 0,
                  top: 6,
                  width: isLast ? 14 : 12,
                  height: isLast ? 14 : 12,
                  borderRadius: '50%',
                  bgcolor: isLast ? palette.signal : palette.base,
                  border: '2px solid',
                  borderColor: palette.signal,
                  boxShadow: isLast ? `0 0 0 6px ${alpha(palette.signal, 0.16)}` : 'none',
                }}
              />

              {marker ? (
                <Typography
                  variant="overline"
                  sx={{ color: palette.signal, display: 'block', mb: 1 }}
                >
                  {marker}
                </Typography>
              ) : null}

              <Typography
                component="h2"
                sx={{
                  fontSize: scale.entry,
                  fontWeight: 600,
                  color: palette.paper,
                  m: 0,
                  lineHeight: isRtl ? 1.5 : 1.2,
                }}
              >
                {copy.title}
              </Typography>

              <Typography
                sx={{
                  color: palette.muted,
                  mt: 1.5,
                  maxWidth: 620,
                  fontSize: isLast ? scale.lead : undefined,
                }}
              >
                {copy.caption}
              </Typography>

              {images.length > 0 ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: galleryColumns(images.length),
                    gap: { xs: 1.25, md: 1.75 },
                    mt: { xs: 2.5, md: 3 },
                  }}
                >
                  {images.map((image, j) => (
                    <Photo
                      key={image.src}
                      image={image}
                      alt={`${t('life.altPrefix')} ${copy.title}`}
                      eager={i === 0 && j === 0}
                      span={images.length > 2 && j === 0}
                      onOpen={() => setViewer({ chapter: i, index: j })}
                    />
                  ))}
                </Box>
              ) : null}
            </MotionBox>
            </Box>
          )
        })}
      </Box>

      <Lightbox
        images={viewer === null ? [] : (lifeEntries[viewer.chapter].images ?? [])}
        index={viewer?.index ?? null}
        alt={viewer === null ? '' : `${t('life.altPrefix')} ${entries[viewer.chapter].title}`}
        onClose={() => setViewer(null)}
        onNavigate={(index) => setViewer((v) => (v ? { ...v, index } : v))}
      />
    </Box>
  )
}
