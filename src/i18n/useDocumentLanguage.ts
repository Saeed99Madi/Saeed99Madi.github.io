import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { supportedLngs } from './index'

/**
 * Keeps <html lang>/<html dir>, the document title, the meta + OG description
 * and the hreflang alternates in sync with the active language.
 *
 * `dir` matters more here than on a Latin-only site: it is what makes the
 * browser lay out the page right-to-left for Arabic, and what screen readers
 * use to announce text in the right order.
 */
export function useDocumentLanguage() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    const lang = i18n.resolvedLanguage ?? i18n.language
    document.documentElement.lang = lang
    document.documentElement.dir = i18n.dir(lang)
    document.title = t('meta.title')

    const description = t('meta.description')
    const setMeta = (selector: string, value: string) => {
      const el = document.querySelector<HTMLMetaElement>(selector)
      if (el) el.content = value
    }
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:title"]', t('meta.title'))
    setMeta('meta[property="og:locale"]', lang === 'ar' ? 'ar_PS' : 'en_US')
  }, [t, i18n, i18n.resolvedLanguage])

  // hreflang alternates depend on the deployed URL, so they are written once.
  useEffect(() => {
    const created: HTMLLinkElement[] = []
    const add = (hreflang: string, lng: string) => {
      const url = new URL(window.location.href)
      url.searchParams.set('lang', lng)
      url.hash = ''
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = url.toString()
      document.head.appendChild(link)
      created.push(link)
    }
    supportedLngs.forEach((lng) => add(lng, lng))
    add('x-default', 'en')
    return () => created.forEach((l) => l.remove())
  }, [])
}
