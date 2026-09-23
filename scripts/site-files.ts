import type { Plugin } from 'vite'

interface SiteFilesOptions {
  /** Canonical public URL of the deployed site. */
  siteUrl: string
  /** Language codes to emit hreflang alternates for. */
  languages: string[]
  /** Paths relative to the site root, e.g. '' for the home page, 'life/'. */
  paths?: string[]
}

/**
 * Emits robots.txt and sitemap.xml at build time so the deployed URL lives in
 * exactly one place (VITE_SITE_URL) instead of being hardcoded across files.
 */
export function siteFiles({ siteUrl, languages, paths = [''] }: SiteFilesOptions): Plugin {
  const base = siteUrl.endsWith('/') ? siteUrl : `${siteUrl}/`

  const urlEntry = (path: string, images: string[] = []) => {
    const loc = `${base}${path}`
    const alternates = languages
      .map((lng) => `    <xhtml:link rel="alternate" hreflang="${lng}" href="${loc}?lang=${lng}"/>`)
      .join('\n')
    // The image extension is how Google Images is told about a picture it
    // would otherwise have to find by rendering the page. The portrait is the
    // one that matters: a search for the name should return his face.
    const imageEntries = images
      .map((src) => `    <image:image><image:loc>${src}</image:loc></image:image>`)
      .join('\n')

    return `  <url>
    <loc>${loc}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>${imageEntries ? `\n${imageEntries}` : ''}
    <changefreq>monthly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`
  }

  return {
    name: 'site-files',
    apply: 'build',
    generateBundle(_options, bundle) {
      const portrait = Object.keys(bundle).find((f) =>
        /(^|\/)portrait-[^/]*\.(jpg|jpeg|png|webp|avif)$/.test(f),
      )

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\n\nSitemap: ${base}sitemap.xml\n`,
      })

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemaps/image/1.1">
${paths.map((path) => urlEntry(path, path === '' && portrait ? [`${base}${portrait}`] : [])).join('\n')}
</urlset>
`,
      })
    },
  }
}
