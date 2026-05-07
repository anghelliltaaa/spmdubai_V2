import { SITE } from '@/lib/constants';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: 'var(--bg-card)', borderTop: '1px solid var(--bg-border)' }}
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-0.5 mb-2">
              <span
                className="font-black text-[26px] leading-none text-[var(--text-primary)]"
                style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}
              >SP</span>
              <span
                className="font-black text-[26px] leading-none text-[var(--gold)]"
                style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}
              >M</span>
            </div>
            <p className="font-sans text-[9px] font-bold tracking-[0.28em] uppercase text-[var(--text-muted)] mb-4">
              S.P. Madrid — Dubai
            </p>
            <p className="font-sans text-[13px] font-light leading-[1.8] text-[var(--text-faint)] max-w-[240px]">
              DIFC-licensed debt recovery specialists. Protecting your receivables and your reputation across the Gulf.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[var(--gold)] mb-5">Navigation</h3>
            <ul className="space-y-3">
              {[
                ['Our Legacy', '#legacy'],
                ['By the Numbers', '#proof'],
                ['The Advantage', '#advantage'],
                ['Case Studies', '#stories'],
                ['Recovery Calculator', '#calculator'],
                ['Contact', '#contact'],
              ].map(([label, href]) => (
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
            <h3 className="font-sans text-[9px] font-black tracking-[0.3em] uppercase text-[var(--gold)] mb-5">Dubai Office</h3>
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
            © {year} S.P. Madrid. DIFC Licensed. All rights reserved.
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
