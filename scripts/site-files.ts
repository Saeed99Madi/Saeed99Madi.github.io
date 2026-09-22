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

  const urlEntry = (path: string) => {
    const loc = `${base}${path}`
    const alternates = languages
      .map((lng) => `    <xhtml:link rel="alternate" hreflang="${lng}" href="${loc}?lang=${lng}"/>`)
      .join('\n')
    return `  <url>
    <loc>${loc}</loc>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}"/>
    <changefreq>monthly</changefreq>
    <priority>${path === '' ? '1.0' : '0.8'}</priority>
  </url>`
  }

  return {
    name: 'site-files',
    apply: 'build',
    generateBundle() {
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
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${paths.map(urlEntry).join('\n')}
</urlset>
`,
      })
    },
  }
}
