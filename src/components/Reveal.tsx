import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'
import { easing } from '../theme'

const MotionBox = motion.create(Box)

export default function Reveal({
  children,
  delay = 0,
  y = 22,
  sx,
}: {
  children: ReactNode
  delay?: number
  y?: number
  sx?: SxProps<Theme>
}) {
  const reduced = useReducedMotion()
  return (
    <MotionBox
      sx={sx}
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{ duration: 0.7, delay, ease: easing }}
    >
      {children}
    </MotionBox>
  )
}
