// LanguageContext
// Single source of truth for the prototype's language. Wraps the whole app in
// App.js; every component reads the current language via `useLang()` and the
// helper hook `useT()` which returns a translator function bound to that
// language.
//
// Only two languages are supported: 'id' (Bahasa Indonesia, default) and 'en'
// (English glosses for non-Indonesian-speaking tutors / reviewers).

import { createContext, useContext } from 'react';
import { strings } from './data/strings';

export const LanguageContext = createContext('id');

export function useLang() {
  return useContext(LanguageContext);
}

// Returns a `t(key)` function. Usage:
//   const t = useT();
//   <Text>{t('home.greeting')}</Text>
export function useT() {
  const lang = useLang();
  return (key) => {
    const entry = strings[key];
    if (!entry) return key; // fallback: show the key itself so the gap is obvious
    return entry[lang] ?? entry.id ?? key;
  };
}

// Helper for translating fields on dummy-data records that carry both `field`
// and `field_en` variants. Falls back to the Indonesian default if the
// English variant is missing.
export function loc(record, key, lang) {
  if (!record) return '';
  if (lang === 'en' && record[`${key}_en`] !== undefined) {
    return record[`${key}_en`];
  }
  return record[key];
}
