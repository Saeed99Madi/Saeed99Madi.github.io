import Box from '@mui/material/Box'
import type { ReactNode } from 'react'
import type { SxProps, Theme } from '@mui/material/styles'

export default function Section({
  id,
  children,
  sx,
  labelledBy,
}: {
  id?: string
  children: ReactNode
  sx?: SxProps<Theme>
  labelledBy?: string
}) {
  return (
    <Box
      id={id}
      component="section"
      aria-labelledby={labelledBy}
      sx={[
        {
          px: { xs: 2, sm: 3, md: 5, lg: 6 },
          py: { xs: 7, sm: 9, md: 13 },
          scrollMarginTop: { xs: 62, md: 74 },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Box sx={{ maxWidth: 1180, mx: 'auto', width: '100%' }}>{children}</Box>
    </Box>
  )
}
