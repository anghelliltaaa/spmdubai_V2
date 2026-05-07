'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/useTheme';
import { useLang } from '@/contexts/LangContext';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const { theme, toggle } = useTheme();
  const { locale, t, toggle: toggleLang } = useLang();

  const NAV_LINKS = [
    { label: t.nav_legacy,      href: '#legacy' },
    { label: t.nav_commitment,  href: '#commitment' },
    { label: t.nav_caseStudies, href: '#stories' },
    { label: t.nav_calculator,  href: '#calculator' },
    { label: t.nav_contact,     href: '#contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // Determine active section via IntersectionObserver-like approach
      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 80) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center justify-between px-8 md:px-12',
        'backdrop-blur-xl border-b transition-all duration-300',
        scrolled ? 'border-[var(--gold-border)]' : 'border-[var(--bg-border-heavy)]'
      )}
      style={{ background: scrolled ? 'color-mix(in srgb, var(--bg) 97%, transparent)' : 'color-mix(in srgb, var(--bg) 82%, transparent)' }}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-3.5 shrink-0" aria-label="S.P. Madrid Dubai">
        <div className="flex items-baseline">
          <span
            className="font-black text-[28px] leading-none text-[var(--text-primary)] tracking-tight"
            style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}
          >
            SP
          </span>
          <span
            className="font-black text-[28px] leading-none text-[var(--gold)] tracking-tight"
            style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}
          >
            M
          </span>
        </div>
        <div className="w-px h-7 bg-white/20 shrink-0" aria-hidden="true" />
        <div>
          <div className="font-sans text-[11px] font-semibold tracking-[0.26em] uppercase text-[var(--text-mid)] leading-none">
            S.P. Madrid
          </div>
          <div className="font-sans text-[9px] font-normal tracking-[0.14em] uppercase text-[var(--gold)] mt-0.5">
            Dubai Office
          </div>
        </div>
      </Link>

      {/* Desktop nav */}
      <nav className="hidden lg:flex items-center gap-8" role="list" aria-label="Site navigation">
        {NAV_LINKS.map((link) => {
          const isActive = activeSection === link.href.replace('#', '');
          return (
            <a
              key={link.href}
              href={link.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'font-sans text-[11px] font-semibold tracking-widest uppercase transition-colors duration-200 relative group',
                isActive ? 'text-[var(--gold)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              )}
            >
              {link.label}
              <span
                className={cn(
                  'absolute -bottom-1 left-0 right-0 h-px bg-[var(--gold)] transition-transform duration-250 origin-left',
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                )}
                aria-hidden="true"
              />
            </a>
          );
        })}
      </nav>

      {/* CTA + Theme Toggle */}
      <div className="hidden lg:flex items-center gap-3">
        {/* Lang toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-0.5 font-sans text-[10px] font-semibold tracking-widest uppercase transition-colors duration-200 hover:text-[var(--gold)] px-1"
          style={{ color: 'var(--text-muted)' }}
          aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        >
          <span style={{ color: locale === 'en' ? 'var(--text-primary)' : 'var(--text-faint)' }}>EN</span>
          <span className="mx-0.5" style={{ color: 'var(--text-faint)' }}>|</span>
          <span style={{ color: locale === 'ar' ? 'var(--text-primary)' : 'var(--text-faint)' }}>AR</span>
        </button>
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center transition-colors duration-200 hover:text-[var(--gold)] overflow-hidden relative"
          style={{ color: 'var(--text-muted)' }}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -120, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 120, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </motion.span>
          </AnimatePresence>
        </button>
        <Button size="md" variant="gold" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
          {t.nav_consult}
        </Button>
      </div>

      {/* Mobile hamburger row */}
      <div className="lg:hidden flex items-center gap-2">
        {/* Mobile lang toggle */}
        <button
          onClick={toggleLang}
          className="flex items-center gap-0.5 font-sans text-[10px] font-semibold tracking-widest uppercase transition-colors duration-200 hover:text-[var(--gold)] px-1"
          style={{ color: 'var(--text-muted)' }}
          aria-label={locale === 'en' ? 'Switch to Arabic' : 'Switch to English'}
        >
          <span style={{ color: locale === 'en' ? 'var(--text-primary)' : 'var(--text-faint)' }}>EN</span>
          <span className="mx-0.5" style={{ color: 'var(--text-faint)' }}>|</span>
          <span style={{ color: locale === 'ar' ? 'var(--text-primary)' : 'var(--text-faint)' }}>AR</span>
        </button>
        <button
          onClick={toggle}
          className="w-9 h-9 flex items-center justify-center transition-colors duration-200 hover:text-[var(--gold)] overflow-hidden relative"
          style={{ color: 'var(--text-muted)' }}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={theme}
              initial={{ rotate: -120, opacity: 0, scale: 0.3 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 120, opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
            </motion.span>
          </AnimatePresence>
        </button>
        <button
          className="p-2 text-[var(--text-mid)] hover:text-[var(--gold)] transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu panel */}
      {mobileOpen && (
        <div
          className="absolute top-[72px] left-0 right-0 backdrop-blur-xl border-b border-[var(--gold-border)] lg:hidden"
          style={{ background: 'color-mix(in srgb, var(--bg) 97%, transparent)' }}
        >
          <nav className="flex flex-col py-4 px-8 gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="py-3 font-sans text-[11px] font-semibold tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--gold)] border-b border-[var(--bg-border)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-4 pb-2">
              <Button
                size="md"
                variant="gold"
                className="w-full"
                onClick={() => {
                  setMobileOpen(false);
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {t.nav_consult}
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
