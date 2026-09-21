import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { palette, fonts } from '../theme'

export default function Kicker({ children, index }: { children: string; index?: string }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 2, md: 3 } }}>
      {index ? (
        <Typography
          component="span"
          sx={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.14em', color: palette.faint }}
        >
          {index}
        </Typography>
      ) : null}
      {/* marginInline, not marginLeft: this flips automatically under RTL. */}
      <Box sx={{ width: { xs: 22, md: 32 }, height: 2, bgcolor: palette.signal }} />
      <Typography variant="overline" sx={{ color: palette.signal }}>
        {children}
      </Typography>
    </Box>
  )
}
