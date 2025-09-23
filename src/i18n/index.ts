import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ko from './locales/ko.json';
import en from './locales/en.json';
import ja from './locales/ja.json';
import zh from './locales/zh.json';

const resources = {
  ko: {
    translation: ko
  },
  en: {
    translation: en
  },
  ja: {
    translation: ja
  },
  zh: {
    translation: zh
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ko',
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage', 'sessionStorage']
    }
  });

export default i18n;