import portrait from './assets/portrait.jpg'

/** Language-independent facts. Everything translatable lives in src/i18n/locales. */
export const profile = {
  name: 'Said Madi',
  nameAr: 'سعيد ماضي',
  first: 'Said',
  last: 'Madi',
  email: 'saed.dev9@gmail.com',
  phone: '+970 599 266 293',
  phoneHref: '+970599266293',
  /** wa.me wants the international number with no '+' or separators. */
  whatsapp: '970599266293',
  github: 'https://github.com/Saeed99Madi',
  githubHandle: 'Saeed99Madi',
  linkedin: 'https://www.linkedin.com/in/saedmadi/',
  upwork: 'https://www.upwork.com/freelancers/~01761b751cf50bf51d',
  // Imported, not a string path: Vite hashes it for cache-busting and prefixes
  // the deploy base. A literal '/portrait.jpg' 404s under a base path.
  portrait,
} as const

/**
 * Live URLs, public repositories and star counts for the projects section,
 * paired positionally with projects.items in the locale files.
 *
 * Client work has no public repository, so `repo` is null there; older
 * exercises have no live site, so `live` is null. The card renders whichever
 * links exist. Stars were accurate on 2026-09-22.
 */
export const projectLinks: { live: string | null; repo: string | null; stars: number }[] = [
  { live: 'https://renderforge.ai/', repo: null, stars: 0 },
  { live: 'https://peace-seekers.com/', repo: 'https://github.com/Saeed99Madi/peace-seeker', stars: 0 },
  { live: 'https://www.planundvolt.de/', repo: null, stars: 0 },
  { live: 'https://value-studio.com/', repo: null, stars: 0 },
  { live: null, repo: 'https://github.com/Saeed99Madi/MSS-E-Commarce', stars: 24 },
  { live: 'https://next-js-chat-gpt-typescript.vercel.app', repo: 'https://github.com/Saeed99Madi/NextJS-ChatGpt-Typescript', stars: 5 },
]

export const sections = ['about', 'work', 'projects', 'contact'] as const
