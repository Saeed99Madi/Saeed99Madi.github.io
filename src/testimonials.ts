/**
 * Client feedback, transcribed verbatim from the verified Upwork work history
 * at upwork.com/freelancers/saidmadi1.
 *
 * These are quoted exactly as the clients wrote them — including the typos.
 * A testimonial that has been tidied up reads like marketing copy; one that
 * still says "stoppered" reads like a real person typed it.
 *
 * The quotes are NOT in the locale files: translating someone else's words and
 * presenting them as their quote would be putting words in their mouth. Only
 * the surrounding labels are translated.
 */
export interface Testimonial {
  /** The client's own words, unedited. */
  quote: string
  /** As shown on Upwork — first name and initial, which is all the platform exposes. */
  author: string
  /** Role, where the client stated one. */
  role?: string
  /** Project or job title the review was left against. */
  project: string
  date: string
  rating: 5
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'I already worked with said on many projects, and he has proven himself as a very dedicated Engineer. What made him one of the top Engineers I worked with was his commitment and his leadership skills, which made his team members comfortable to work with. I was always impressed by his ability to create a friendly environment around him, the thing that made him an excellent leader. Not to mention how stoppered he is when it comes to problem-solving, and his boldness against new challenges. I absolutely will keep working with him more in the future.',
    author: 'Ahmad A.',
    role: 'Project Manager',
    project: 'E-commerce',
    date: 'Dec 2022',
    rating: 5,
  },
  {
    quote:
      'He is excellent as always! Have completed tasks thoroughly and fast as well! Appreciate his effort and time on this project! He is the go-to for full-stack developer! I have been working with him for multiple times already! Hope to work with him as always!',
    author: 'Upwork client',
    project: 'Full Stack Developer (Node.js + React)',
    date: 'May 2023',
    rating: 5,
  },
  {
    quote:
      'Madi has displayed excellent quality works and he completed tasks fast as well! Happy to work with him again! Definitely would recommend him to anyone who is seeking a full-stack developer!',
    author: 'Upwork client',
    project: 'Full-Stack Developer for Web',
    date: 'Apr 2023',
    rating: 5,
  },
  {
    quote: 'Fast and professional 100%',
    author: 'Upwork client',
    project: 'Neighborhood project',
    date: 'Jun 2023',
    rating: 5,
  },
]

/** Headline numbers, straight from the Upwork work history. */
export const upworkStats = {
  completedJobs: 5,
  averageRating: '5.0',
  profileUrl: 'https://www.upwork.com/freelancers/saidmadi1',
}
