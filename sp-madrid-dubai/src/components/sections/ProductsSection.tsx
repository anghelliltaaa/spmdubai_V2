'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';
import { Home, Car, Package, CreditCard, Building2, User, ShoppingBag, BarChart2, Search, FileSearch, MapPin, Globe, Shield } from 'lucide-react';

const PRODUCTS_EN = [
  {
    id: 'secured',
    title: 'Secured Products',
    desc: 'Specialized recovery for asset-backed lending across the GCC region.',
    items: [
      { icon: Home,     label: 'Housing Finance' },
      { icon: Car,      label: 'Auto Finance' },
      { icon: Package,  label: 'Asset-Backed Loans' },
    ],
  },
  {
    id: 'unsecured',
    title: 'Unsecured Products',
    desc: 'Expert recovery services for credit cards, personal loans, and SME financing.',
    items: [
      { icon: CreditCard,  label: 'Credit Cards' },
      { icon: Building2,   label: 'SME Loans' },
      { icon: User,        label: 'Personal Loans' },
      { icon: ShoppingBag, label: 'Buy Now Pay Later' },
    ],
  },
  {
    id: 'audit',
    title: 'Audit Recovery',
    desc: 'Advanced portfolio analysis and write-off recovery across all asset classes.',
    items: [
      { icon: BarChart2,  label: 'Portfolio Analysis' },
      { icon: FileSearch, label: 'Write-off Recovery' },
      { icon: Search,     label: 'Skip Tracing' },
    ],
  },
  {
    id: 'accounts',
    title: 'Local & International Accounts',
    desc: 'Comprehensive account management extending across domestic borders and overseas jurisdictions.',
    items: [
      { icon: MapPin,  label: 'Local UAE Collections' },
      { icon: Shield,  label: 'GCC-Wide Recovery' },
      { icon: Globe,   label: 'International Enforcement' },
    ],
  },
];

const PRODUCTS_AR = [
  {
    id: 'secured',
    title: 'المنتجات المضمونة',
    desc: 'استرداد متخصص للإقراض المدعوم بالأصول عبر منطقة الخليج العربي.',
    items: [
      { icon: Home,     label: 'تمويل الإسكان' },
      { icon: Car,      label: 'تمويل السيارات' },
      { icon: Package,  label: 'القروض المدعومة بالأصول' },
    ],
  },
  {
    id: 'unsecured',
    title: 'المنتجات غير المضمونة',
    desc: 'خدمات استرداد متخصصة لبطاقات الائتمان والقروض الشخصية وتمويل المنشآت الصغيرة.',
    items: [
      { icon: CreditCard,  label: 'بطاقات الائتمان' },
      { icon: Building2,   label: 'قروض المنشآت الصغيرة' },
      { icon: User,        label: 'القروض الشخصية' },
      { icon: ShoppingBag, label: 'اشترِ الآن وادفع لاحقًا' },
    ],
  },
  {
    id: 'audit',
    title: 'استرداد التدقيق',
    desc: 'تحليل متقدم للمحافظ واسترداد الديون المشطوبة عبر جميع فئات الأصول.',
    items: [
      { icon: BarChart2,  label: 'تحليل المحافظ' },
      { icon: FileSearch, label: 'استرداد الديون المشطوبة' },
      { icon: Search,     label: 'تتبع المدينين' },
    ],
  },
  {
    id: 'accounts',
    title: 'الحسابات المحلية والدولية',
    desc: 'إدارة شاملة للحسابات تمتد عبر الحدود المحلية والاختصاصات القضائية الدولية.',
    items: [
      { icon: MapPin,  label: 'التحصيل المحلي في الإمارات' },
      { icon: Shield,  label: 'الاسترداد في دول مجلس التعاون' },
      { icon: Globe,   label: 'التنفيذ الدولي' },
    ],
  },
];

export function ProductsSection() {
  const { locale } = useLang();
  const [openIndex, setOpenIndex] = useState<number>(0); // first open by default
  const PRODUCTS = locale === 'ar' ? PRODUCTS_AR : PRODUCTS_EN;

  return (
    <section
      id="products"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Products"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <SectionHeader
          eyebrow={locale === 'ar' ? 'مصمَّم للمؤسسات المالية' : 'Built for Financial Institutions'}
          title={locale === 'ar' ? 'حلول استرداد شاملة' : 'Comprehensive Recovery Solutions'}
          sub={locale === 'ar'
            ? 'حلول استرداد متكاملة عبر المحافظ المضمونة وغير المضمونة'
            : 'Comprehensive recovery solutions across secured and unsecured portfolios'}
          align="center"
        />

        {/* Accordion */}
        <motion.div
          className="flex flex-col divide-y divide-[var(--bg-border)]"
          style={{ borderTop: '1px solid var(--bg-border)', borderBottom: '1px solid var(--bg-border)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        >
          {PRODUCTS.map((product, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={product.id} style={{ borderColor: 'var(--bg-border)' }}>
                {/* Accordion header */}
                <button
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between py-4 sm:py-5 px-2 text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Index number */}
                    <span
                      className="font-sans text-[11px] font-bold tracking-widest shrink-0"
                      style={{ color: isOpen ? 'var(--gold)' : 'var(--text-faint)', minWidth: '2ch' }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="font-bold text-[15px] sm:text-[17px] leading-tight transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        color: isOpen ? 'var(--text-primary)' : 'var(--text-muted)',
                      }}
                    >
                      {product.title}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                    style={{ color: isOpen ? 'var(--gold)' : 'var(--text-faint)', flexShrink: 0 }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                {/* Accordion body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="pb-6 px-2">
                        <p
                          className="font-sans text-[14px] font-light leading-[1.8] mb-5"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          {product.desc}
                        </p>
                        <motion.div
                          className="flex flex-wrap gap-3"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.06 } },
                          }}
                        >
                          {product.items.map((item) => {
                            const Icon = item.icon;
                            return (
                              <motion.div
                                key={item.label}
                                variants={{
                                  hidden:  { opacity: 0, x: -12 },
                                  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: EASE_OUT_EXPO } },
                                }}
                                className="flex items-center gap-2.5 px-4 py-2.5 border"
                                style={{
                                  background:  'var(--bg-card-2)',
                                  borderColor: 'var(--bg-border)',
                                }}
                              >
                                <Icon size={15} color="var(--gold)" aria-hidden="true" />
                                <span
                                  className="font-sans text-[13px] font-medium"
                                  style={{ color: 'var(--text-primary)' }}
                                >
                                  {item.label}
                                </span>
                              </motion.div>
                            );
                          })}
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
