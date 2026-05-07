'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { Locale, Translations } from '@/lib/translations';
import { locales } from '@/lib/translations';

interface LangContextValue {
  locale: Locale;
  t: Translations;
  toggle: () => void;
  isRTL: boolean;
}

const LangContext = createContext<LangContextValue>({
  locale: 'en',
  t: locales.en,
  toggle: () => {},
  isRTL: false,
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Locale | null;
    if (saved === 'en' || saved === 'ar') {
      setLocale(saved);
      document.documentElement.setAttribute('lang', saved);
      document.documentElement.setAttribute('dir', saved === 'ar' ? 'rtl' : 'ltr');
    }
  }, []);

  const toggle = useCallback(() => {
    setLocale((prev) => {
      const next: Locale = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('lang', next);
      document.documentElement.setAttribute('lang', next);
      document.documentElement.setAttribute('dir', next === 'ar' ? 'rtl' : 'ltr');
      return next;
    });
  }, []);

  return (
    <LangContext.Provider
      value={{ locale, t: locales[locale], toggle, isRTL: locale === 'ar' }}
    >
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
