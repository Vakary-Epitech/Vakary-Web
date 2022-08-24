import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'


export default createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en: en,
    fr: fr,
  }
})
