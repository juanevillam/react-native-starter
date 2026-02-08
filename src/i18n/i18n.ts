//#region Imports
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
//#endregion Imports

//#region Types
type Language = 'es' | 'en';
//#endregion Types

//#region Constants
const DEFAULT_LANGUAGE: Language = 'es';
//#endregion Constants

//#region Initialization
i18n.use(initReactI18next).init({
  resources: {
    es: { translation: es },
    en: { translation: en },
  },
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});
//#endregion Initialization

//#region Exports
export { type Language, DEFAULT_LANGUAGE };

export default i18n;
//#endregion Exports
