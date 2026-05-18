'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { SectionHeader } from '@/components/ui/section-header';
import { useLang } from '@/contexts/LangContext';

const IMAGES = [
  '/images/office/dubaioffice.jpeg',
  '/images/office/dubaioffice1.jpeg',
  '/images/office/dubaioffice2.jpeg',
  '/images/office/dubaioffice3.jpeg',
  '/images/office/dubaioffice4.jpeg',
];

// Duplicate 4× so the strip is always wider than any screen
const STRIP = [...IMAGES, ...IMAGES, ...IMAGES, ...IMAGES];
const DURATION = 28; // seconds for one full loop (25% of strip)

export function OfficeCarousel() {
  const { t } = useLang();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      id="office"
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ background: 'var(--bg)' }}
      aria-label="Visit Us in Dubai"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.04) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 mb-10">
        <SectionHeader
          eyebrow={t.office_eyebrow}
          title={t.office_title}
          sub={t.office_sub}
          align="center"
        />
      </div>

      {/* Infinite scroll strip — dir=ltr so RTL doesn't reverse it */}
      <div dir="ltr" className="relative overflow-hidden w-full">
        {/* Fade edges */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
          style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
          style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
          aria-hidden="true"
        />

        <style>{`
          @keyframes office-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-25%); }
          }
          .office-strip:hover { animation-play-state: paused; }
        `}</style>

        <div
          className="office-strip flex items-stretch gap-3"
          style={{
            animation: `office-scroll ${DURATION}s linear infinite`,
            width: 'max-content',
            willChange: 'transform',
          }}
        >
          {STRIP.map((src, i) => (
            <button
              key={i}
              onClick={() => setLightbox(src)}
              className="relative shrink-0 overflow-hidden group focus:outline-none"
              style={{
                width:  'clamp(200px, 22vw, 300px)',
                height: 'clamp(240px, 28vw, 360px)',
                border: '1px solid var(--bg-border)',
                borderRadius: 0,
                padding: 0,
                background: 'none',
                cursor: 'pointer',
              }}
              aria-label={`View office photo ${(i % IMAGES.length) + 1}`}
            >
              <img
                src={src}
                alt={`SPM Dubai office ${(i % IMAGES.length) + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                draggable={false}
              />
              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                style={{ background: 'rgba(6,10,20,0.35)' }}
                aria-hidden="true"
              >
                <div
                  className="font-sans text-[10px] font-bold tracking-[0.25em] uppercase px-3 py-1.5"
                  style={{
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  View
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setLightbox(null)}
            style={{ background: 'rgba(4,6,12,0.88)', backdropFilter: 'blur(8px)' }}
          >
            <motion.div
              className="relative"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '95vw', maxHeight: '90vh' }}
            >
              <img
                src={lightbox}
                alt="Office"
                className="block object-contain"
                style={{ maxWidth: '95vw', maxHeight: '90vh', border: '1px solid rgba(201,168,76,0.3)' }}
              />
              {/* Close button */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 transition-colors"
                style={{
                  background: 'rgba(6,10,20,0.7)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  color: '#fff',
                  backdropFilter: 'blur(4px)',
                }}
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
