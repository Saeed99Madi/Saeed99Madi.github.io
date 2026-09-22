import { useTranslation } from 'react-i18next'
import { profile } from './config'

/** wa.me deep link with a prefilled message in the visitor's language. */
export function useWhatsAppHref() {
  const { t } = useTranslation()
  return `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(t('contact.whatsappMessage'))}`
}
