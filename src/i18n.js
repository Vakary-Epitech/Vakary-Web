import { createI18n } from 'vue-i18n'
import fr from './locales/fr.json'
import en from './locales/en.json'


export default createI18n({
  legacy: false,
  locale: 'fr',
  fallbackLocale: 'fr',
  globalInjection: true,
  messages: {
    en: en,
    fr: fr,
  }
});