import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { palette, line, fonts, scale } from '../theme'
import { useDevice } from '../hooks/useDevice'
import Reveal from './Reveal'
import Kicker from './Kicker'
import Section from './Section'
import Chip from './Chip'

interface Role {
  period: string
  title: string
  org: string
  meta: string
  note: string
  stack: string[]
}

function RoleBody({ role }: { role: Role }) {
  return (
    <Box>
      <Stack direction="row" sx={{ flexWrap: 'wrap', alignItems: 'baseline', gap: 1.5 }}>
        <Typography component="h3" sx={{ fontSize: scale.entry, fontWeight: 600, color: palette.paper, m: 0 }}>
          {role.title}
        </Typography>
        <Typography sx={{ fontFamily: fonts.mono, fontSize: 13, color: palette.signal }}>{role.org}</Typography>
      </Stack>

      <Typography variant="overline" sx={{ color: palette.faint, display: 'block', mt: 1 }}>
        {role.meta}
      </Typography>

      <Typography sx={{ color: palette.muted, mt: 1.5, maxWidth: 640 }}>{role.note}</Typography>

      <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mt: 2 }}>
        {role.stack.map((s) => (
          <Chip key={s} label={s} />
        ))}
      </Stack>
    </Box>
  )
}

/** Phones: a rail with the date as a marker, rather than a lonely date line. */
function PhoneTimeline({ roles }: { roles: Role[] }) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {roles.map((role, i) => (
        <Reveal key={i} delay={0.04 * i}>
          <Box
            component="li"
            sx={{
              position: 'relative',
              ps: 0,
              paddingInlineStart: 3,
              pb: 4,
              '&::before': {
                content: '""',
                position: 'absolute',
                insetInlineStart: 4,
                top: 14,
                bottom: 0,
                width: '1px',
                bgcolor: line.medium,
              },
              '&:last-of-type': { pb: 0, '&::before': { display: 'none' } },
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                insetInlineStart: 0,
                top: 6,
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: palette.signal,
              }}
            />
            <Typography variant="overline" sx={{ color: palette.signal, display: 'block', mb: 1 }}>
              {role.period}
            </Typography>
            <RoleBody role={role} />
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}

/** Tablet and up: a two-column ledger, dates ranged against a rule. */
function LedgerTimeline({ roles }: { roles: Role[] }) {
  return (
    <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {roles.map((role, i) => (
        <Reveal key={i} delay={0.04 * i}>
          <Box
            component="li"
            sx={{
              display: 'grid',
              gridTemplateColumns: { sm: '150px minmax(0, 1fr)', md: '190px minmax(0, 1fr)' },
              gap: { sm: 3, md: 5 },
              py: { sm: 3.5, md: 4.5 },
              borderTop: '1px solid',
              borderColor: line.soft,
              transition: 'padding-inline-start .45s cubic-bezier(.16,1,.3,1)',
              '@media (hover: hover)': { '&:hover': { paddingInlineStart: { md: 2 } } },
              '&:last-of-type': { borderBottom: '1px solid', borderColor: line.soft },
            }}
          >
            <Typography variant="overline" sx={{ color: palette.signal, pt: { md: 0.5 }, whiteSpace: 'nowrap' }}>
              {role.period}
            </Typography>
            <RoleBody role={role} />
          </Box>
        </Reveal>
      ))}
    </Box>
  )
}

export default function Work() {
  const { t } = useTranslation()
  const { isPhone } = useDevice()
  const roles = t('work.roles', { returnObjects: true })

  return (
    <Section id="work" labelledBy="work-title">
      <Reveal>
        <Kicker index="02">{t('work.kicker')}</Kicker>
      </Reveal>
      <Reveal delay={0.06}>
        <Typography id="work-title" variant="h2" sx={{ fontSize: scale.sectionTitle, color: palette.paper, mb: { xs: 4, md: 7 } }}>
          {t('work.title')}
        </Typography>
      </Reveal>
      {isPhone ? <PhoneTimeline roles={roles} /> : <LedgerTimeline roles={roles} />}
    </Section>
  )
}
