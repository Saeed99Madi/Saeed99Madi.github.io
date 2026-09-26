import universityFriends from './assets/life/university-friends.jpg'
import gsgWorkspace from './assets/life/2020-gsg-workspace.jpg'
import codeAcademy from './assets/life/gsg-code-academy.jpg'
import caTeam7 from './assets/life/2023-ca-team7.jpg'
import instructorTrainees from './assets/life/instructor-trainees.jpg'
import instructorClassroom from './assets/life/instructor-classroom.jpg'
import instructorDesk from './assets/life/instructor-desk.jpg'
import familyFarm from './assets/life/family-farm.jpg'
import greenField from './assets/life/green-field.jpg'
import greenCactus from './assets/life/green-cactus.jpg'
import gym from './assets/life/gym.jpg'
import vladimir from './assets/life/vladimir.jpg'
import gsgCorridor from './assets/life/gsg-corridor.jpg'
import gsgCoffeeTable from './assets/life/gsg-coffee-table.jpg'
import gsgDesks from './assets/life/gsg-desks.jpg'
import gsgBeachDay from './assets/life/gsg-beach-day.jpg'
import gsgHubSelfie from './assets/life/gsg-hub-selfie.jpg'
import metaforeTeam from './assets/life/metafore-team.jpg'

/**
 * The Life page: a personal timeline, separate from the professional sections.
 *
 * An entry is one memory and can hold several photos — the instructor chapter
 * has four. Captions live in the locale files under `life.entries`, paired
 * positionally with this array, the same convention the rest of the site uses.
 *
 * To add a memory: drop the files in src/assets/life, import them, append an
 * entry here, and append its caption to BOTH en.json and ar.json. The locale
 * checker fails the build if the two drift apart.
 */
export interface LifeImage {
  /** Imported so Vite hashes it and rewrites the path for the deploy base. */
  src: string
  /** Intrinsic size, so the browser reserves space and the page does not jump. */
  width: number
  height: number
}

export interface LifeEntry {
  /**
   * Omitted entirely for a memory that is carried by its words rather than a
   * photograph — the present-day entry is one of those.
   */
  images?: LifeImage[]
  /** Optional marker. Omitted where the year is not confirmed. */
  year?: string
}

export const lifeEntries: LifeEntry[] = [
  { images: [{ src: universityFriends, width: 1080, height: 898 }] },
  { images: [{ src: gsgWorkspace, width: 1079, height: 613 }], year: '2020' },
  { images: [{ src: codeAcademy, width: 1079, height: 809 }] },
  {
    year: '2023',
    images: [
      { src: caTeam7, width: 1080, height: 817 },
      { src: instructorTrainees, width: 1079, height: 817 },
      { src: instructorClassroom, width: 1079, height: 616 },
      { src: instructorDesk, width: 1080, height: 1426 },
    ],
  },
  {
    images: [
      { src: gsgCorridor, width: 1079, height: 1079 },
      { src: gsgCoffeeTable, width: 1079, height: 850 },
      { src: gsgDesks, width: 762, height: 454 },
      { src: gsgBeachDay, width: 1079, height: 1079 },
    ],
  },
  { images: [{ src: gsgHubSelfie, width: 720, height: 960 }] },
  { images: [{ src: metaforeTeam, width: 1200, height: 900 }], year: '2025' },
  { images: [{ src: familyFarm, width: 1200, height: 675 }] },
  {
    images: [
      { src: greenField, width: 1079, height: 1080 },
      { src: greenCactus, width: 1080, height: 1030 },
    ],
  },
  { images: [{ src: gym, width: 1080, height: 2340 }] },
  { images: [{ src: vladimir, width: 1080, height: 601 }] },
  { year: 'Now' },
]
