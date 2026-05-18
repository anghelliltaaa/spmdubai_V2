'use client';

import { SITE } from '@/lib/constants';
import { useLang } from '@/contexts/LangContext';

export function Footer() {
  const year = new Date().getFullYear();
  const { t } = useLang();

  const NAV_LINKS = [
    [t.nav_legacy,      '#legacy'],
    [t.proof_eyebrow,   '#proof'],
    [t.adv_eyebrow,     '#advantage'],
    [t.nav_caseStudies, '#stories'],
    [t.nav_calculator,  '#calculator'],
    [t.nav_contact,     '#contact'],
  ] as const;

  return (
    <footer
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--bg-border)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <img
                src="/SPMDubaiLogo.svg"
                alt="S.P. Madrid Dubai"
                className="spm-logo h-5 w-auto"
              />
            </div>
            <p className="font-sans text-[13px] font-light leading-[1.8] text-[var(--text-faint)] max-w-[240px]">
              {t.footer_tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[var(--gold)] mb-5">{t.nav_contact}</h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(([label, href]) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-sans text-[13px] text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[var(--gold)] mb-5">{t.aspin_eyebrow}</h3>
            <address className="not-italic font-sans text-[13px] text-[var(--text-muted)] leading-[1.8] space-y-0.5">
              <p>Aspin Commercial Tower</p>
              <p>Dubai International Financial Centre</p>
              <p>Dubai, United Arab Emirates</p>
              <p className="mt-4">
                <a href={`mailto:${SITE.email}`} className="hover:text-[var(--gold)] transition-colors duration-200 break-all">
                  {SITE.email}
                </a>
              </p>
              <p>
                <a href={`tel:${SITE.phone}`} className="hover:text-[var(--gold)] transition-colors duration-200">
                  {SITE.phone}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid var(--bg-border)' }}
        >
          <p className="font-sans text-[11px] text-[var(--text-faint)]">
            © {year} S.P. Madrid. DIFC Licensed. {t.footer_rights}
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms', 'Compliance'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-sans text-[11px] text-[var(--text-faint)] hover:text-[var(--gold)] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
