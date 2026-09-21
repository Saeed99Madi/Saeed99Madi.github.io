import Box from '@mui/material/Box'
import { palette, line, fonts } from '../theme'

const ARABIC_SCRIPT = /[\u0600-\u06FF]/

/**
 * A small tag. Technology names render in mono — they are proper nouns from
 * code — but an Arabic label switches to the Arabic face, because IBM Plex
 * Mono has no Arabic coverage and would fall back to a mismatched font.
 */
export default function Chip({ label }: { label: string }) {
  const isArabic = ARABIC_SCRIPT.test(label)
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        px: 1.2,
        py: 0.45,
        border: '1px solid',
        borderColor: line.medium,
        borderRadius: 1,
        fontFamily: isArabic ? fonts.arabic : fonts.mono,
        fontSize: { xs: 11, md: 11.5 },
        lineHeight: 1.6,
        color: palette.muted,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </Box>
  )
}
