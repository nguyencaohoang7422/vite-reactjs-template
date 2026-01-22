import viJson from '@/shared/locales//vi.json';
import enJson from '@/shared/locales/en.json';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

export const defaultNS = 'en';
const i18n = i18next.createInstance();
const resources = {
  en: {
    common: enJson,
  },
  vi: {
    common: viJson,
  },
};

i18n.use(initReactI18next).init({
  lng: 'vi', // 'en'
  fallbackLng: 'vi',
  resources,
  interpolation: { escapeValue: false },
  compatibilityJSON: 'v4',
  debug: false,
  ns: ['common'],
  defaultNS: 'common',
});
export const runTimeTranslations = (runTimeData: any, lng: string, ns = 'translation') => {
  i18n.addResourceBundle(lng, ns, runTimeData, true, true);
};
export default i18n;
