'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('light');

  // Read from localStorage / system preference on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
      setThemeState(stored);
    } else {
      // Default: light
      applyTheme('light');
      setThemeState('light');
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', next);
      applyTheme(next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

function applyTheme(t: Theme) {
  const el = document.documentElement;
  if (t === 'dark') {
    el.setAttribute('data-theme', 'dark');
  } else {
    el.removeAttribute('data-theme');
  }
}
