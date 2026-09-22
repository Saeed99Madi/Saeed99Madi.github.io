import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './locales/en.json'
import ar from './locales/ar.json'

export const supportedLngs = ['en', 'ar'] as const
export type AppLanguage = (typeof supportedLngs)[number]

export const defaultNS = 'translation'
export const resources = { en: { translation: en }, ar: { translation: ar } } as const

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    defaultNS,
    fallbackLng: 'en',
    supportedLngs: [...supportedLngs],
    // ar-PS, ar-EG etc. all resolve to "ar" instead of falling back to English.
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      // English is the default for everyone. `navigator` is deliberately NOT
      // in this list: most visitors are recruiters and clients reading in
      // English, and an Arabic-locale browser was silently landing them on the
      // Arabic version. Arabic is now opt-in, via ?lang=ar or the switcher,
      // and the choice sticks in localStorage afterwards.
      order: ['querystring', 'localStorage', 'htmlTag'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'sm-lang',
      caches: ['localStorage'],
    },
    interpolation: { escapeValue: false },
    returnNull: false,
  })

export default i18n
