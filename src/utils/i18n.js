import i18n from 'i18next';
import languageDetector from 'i18next-browser-languagedetector';
import xhr from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import en from '../locales/en/translation.json';
import vn from '../locales/vn/translation.json';

const isDev = process.env.NODE_ENV !== 'production';

i18n
  .use(xhr)
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translations: en,
      },
      vn: {
        translations: vn,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    debug: isDev,
    ns: 'translations',
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
      formatSeparator: ','
    },
    react: {
      wait: true,
    },
    backend: {
      loadPath: '../locales/{{lng}}/{{ns}}.json',
      addPath: '../locales/{{lng}}/{{ns}}.missing.json',
    }
  });

export default i18n;
