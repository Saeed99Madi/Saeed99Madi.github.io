import portrait from './assets/portrait.jpg'

/** Language-independent facts. Everything translatable lives in src/i18n/locales. */
export const profile = {
  name: 'Said Madi',
  nameAr: 'سعيد ماضي',
  first: 'Said',
  last: 'Madi',
  email: 'saed.dev9@gmail.com',
  github: 'https://github.com/Saeed99Madi',
  githubHandle: 'Saeed99Madi',
  linkedin: 'https://www.linkedin.com/in/saedmadi/',
  upwork: 'https://www.upwork.com/freelancers/~01761b751cf50bf51d',
  // Imported, not a string path: Vite hashes it for cache-busting and prefixes
  // the deploy base. A literal '/portrait.jpg' 404s under a base path.
  portrait,
} as const

/**
 * Repository links and star counts for the projects section, paired
 * positionally with projects.items in the locale files.
 * Stars were accurate on 2026-09-22; refresh with `npm run stars`.
 */
export const projectLinks = [
  { repo: 'https://github.com/Saeed99Madi/MSS-E-Commarce', live: null, stars: 24 },
  { repo: 'https://github.com/Saeed99Madi/NextJS-ChatGpt-Typescript', live: 'https://next-js-chat-gpt-typescript.vercel.app', stars: 5 },
  { repo: 'https://github.com/Saeed99Madi/peace-seeker', live: null, stars: 0 },
  { repo: 'https://github.com/Saeed99Madi/full-stack-assignment', live: null, stars: 1 },
] as const

export const sections = ['about', 'work', 'projects', 'contact'] as const
