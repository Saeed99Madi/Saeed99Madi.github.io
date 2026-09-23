import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vite'

const here = dirname(fileURLToPath(import.meta.url))

/**
 * The site is a client-rendered React app, so the HTML on the wire is an empty
 * <div id="root">. Google runs JavaScript and eventually sees the real page,
 * but its render pass is a slow second queue — and the crawlers that never run
 * JavaScript at all (Bing, LinkedIn and Slack unfurls, GPTBot, PerplexityBot)
 * see nothing but the meta tags.
 *
 * So the <noscript> block carries a full text version of the page, generated
 * here from the same locale file the app renders from. Generating it rather
 * than hand-writing it is the point: hand-written fallback copy drifts away
 * from the real page within a release or two, and fallback text that no longer
 * matches what visitors see is cloaking.
 *
 * English only. It is the canonical language, and a second copy of everything
 * in Arabic on the same URL would just be duplicate content.
 */

interface Locale {
  hero: { role: string; location: string; headline: string; tags: string[]; portraitAlt: string }
  about: {
    title: string
    paragraphs: string[]
    stats: { value: string; label: string }[]
    educationTitle: string
    degree: string
    school: string
  }
  work: {
    title: string
    roles: { period: string; title: string; org: string; meta: string; note: string; bullets?: string[]; stack: string[] }[]
  }
  projects: { title: string; items: { name: string; year: string; summary: string; stack: string[] }[] }
  stack: { title: string; groups: { name: string; items: string[] }[] }
  contact: { title: string; body: string }
  life: { title: string; intro: string; entries: { title: string; caption: string }[] }
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const list = (items: string[]) => `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>`

function homeFallback(t: Locale, portrait: string | null): string {
  const roles = t.work.roles
    .map(
      (r) => `<article>
<h3>${esc(r.title)} — ${esc(r.org)}</h3>
<p><strong>${esc(r.period)}</strong> · ${esc(r.meta)}</p>
<p>${esc(r.note)}</p>
${r.bullets?.length ? list(r.bullets) : ''}
<p>${esc(r.stack.join(', '))}</p>
</article>`,
    )
    .join('\n')

  const projects = t.projects.items
    .map(
      (p) => `<article>
<h3>${esc(p.name)} <small>${esc(p.year)}</small></h3>
<p>${esc(p.summary)}</p>
<p>${esc(p.stack.join(', '))}</p>
</article>`,
    )
    .join('\n')

  const stack = t.stack.groups
    .map((g) => `<h3>${esc(g.name)}</h3>${list(g.items)}`)
    .join('\n')

  // The portrait is the only image Google can see without running JavaScript,
  // and it is the one that matters: a search for the name should return his
  // face. Intrinsic dimensions are spelled out so Image Search knows the shape
  // before it fetches the file.
  const photo = portrait
    ? `<p><img src="${portrait}" width="900" height="1200" alt="${esc(t.hero.portraitAlt)}" /></p>`
    : ''

  return `<h1>Said Madi — ${esc(t.hero.role)}</h1>
${photo}
<p><strong>${esc(t.hero.headline)}</strong></p>
<p>${esc(t.hero.location)} · ${esc(t.hero.tags.join(' · '))}</p>

<h2>${esc(t.about.title)}</h2>
${t.about.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('\n')}
${list(t.about.stats.map((s) => `${s.value} — ${s.label}`))}
<h3>${esc(t.about.educationTitle)}</h3>
<p>${esc(t.about.degree)}, ${esc(t.about.school)}</p>

<h2>${esc(t.work.title)}</h2>
${roles}

<h2>${esc(t.projects.title)}</h2>
${projects}

<h2>${esc(t.stack.title)}</h2>
${stack}

<h2>${esc(t.contact.title)}</h2>
<p>${esc(t.contact.body)}</p>
<p>
  <a href="mailto:saed.dev9@gmail.com">saed.dev9@gmail.com</a> ·
  <a href="tel:+970599266293">+970 599 266 293</a> ·
  <a href="https://github.com/Saeed99Madi">GitHub</a> ·
  <a href="https://www.linkedin.com/in/saedmadi/">LinkedIn</a> ·
  <a href="https://www.upwork.com/freelancers/~01761b751cf50bf51d">Upwork</a> ·
  <a href="https://www.instagram.com/said.madi.99">Instagram</a> ·
  <a href="https://www.facebook.com/saed.madi.94">Facebook</a>
</p>
<p><a href="./life/">Life — the road here</a></p>`
}

function lifeFallback(t: Locale): string {
  const entries = t.life.entries
    .map((e) => `<article><h2>${esc(e.title)}</h2><p>${esc(e.caption)}</p></article>`)
    .join('\n')

  return `<h1>${esc(t.life.title)} — Said Madi</h1>
<p>${esc(t.life.intro)}</p>
${entries}
<p><a href="../">Back to the portfolio</a></p>`
}

export function seoFallback({
  siteUrl,
  languages,
  base: assetBase,
}: {
  siteUrl: string
  languages: string[]
  /** Vite's `base`, so the emitted asset paths match the rest of the page. */
  base: string
}): Plugin {
  const base = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`
  const locale: Locale = JSON.parse(
    readFileSync(resolve(here, '../src/i18n/locales/en.json'), 'utf8'),
  )

  return {
    name: 'seo-fallback',
    apply: 'build',
    transformIndexHtml: {
      // 'post' rather than 'pre' so ctx.bundle is populated: the portrait is
      // imported as a module, so its final name carries a content hash that
      // only exists once the bundle is written. The hash is stable across
      // rebuilds while the file itself is unchanged, which is what Image
      // Search wants — a URL that does not move under it every deploy.
      order: 'post',
      handler(html, ctx) {
        const isLife = ctx.path.includes('life/')
        const path = isLife ? 'life/' : ''

        const portraitFile = Object.keys(ctx.bundle ?? {}).find((f) =>
          /(^|\/)portrait-[^/]*\.(jpg|jpeg|png|webp|avif)$/.test(f),
        )
        const portrait = portraitFile ? `${assetBase}${portraitFile}` : null
        if (!isLife && !portrait) {
          this.warn('seo-fallback: portrait asset not found; the fallback will have no image')
        }

        const body = isLife ? lifeFallback(locale) : homeFallback(locale, portrait)

        // hreflang belongs in the head as well as the sitemap: the sitemap is
        // a hint Google may not have crawled yet, the head is authoritative on
        // the page itself. ?lang= is what the language detector reads.
        const alternates = [
          ...languages.map(
            (lng) => `    <link rel="alternate" hreflang="${lng}" href="${base}${path}?lang=${lng}" />`,
          ),
          `    <link rel="alternate" hreflang="x-default" href="${base}${path}" />`,
        ].join('\n')

        return html
          .replace('<!-- SEO_FALLBACK -->', body)
          .replace('%PORTRAIT_URL%', portrait ? `${base}${portrait.replace(/^\//, '')}` : `${base}og.png`)
          .replace('</head>', `${alternates}\n  </head>`)
      },
    },
  }
}
