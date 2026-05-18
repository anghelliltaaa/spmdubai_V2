'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '@/components/ui/section-header';
import { EASE_OUT_EXPO } from '@/lib/animations';
import { useLang } from '@/contexts/LangContext';

// ─── Mobile peek carousel — infinite loop ────────────────────────────────────
function MobileCarousel({
  team,
  active,
  setActive,
}: {
  team: { name: string; title: string; experience: string; bio: string; photo: string }[];
  active: number;
  setActive: (i: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cardW, setCardW]       = useState(0);
  const [containerW, setContainerW] = useState(0);
  // Internal index includes clones: 0 = clone of last, 1..N = real, N+1 = clone of first
  const [internalIdx, setInternalIdx] = useState(active + 1);
  const [animate, setAnimate]   = useState(true);
  const GAP = 12;

  // Cloned array: [last, ...all, first]
  const cloned = [team[team.length - 1], ...team, team[0]];

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        const w = containerRef.current.offsetWidth;
        setContainerW(w);
        setCardW(w * 0.62);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  // Keep internalIdx in sync when parent active changes (e.g. auto-advance)
  useEffect(() => {
    setAnimate(true);
    setInternalIdx(active + 1);
  }, [active]);

  const touchStartX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) {
      const next = dx < 0 ? internalIdx + 1 : internalIdx - 1;
      setAnimate(true);
      setInternalIdx(next);

      // Update real active index (wrapping)
      const realNext = dx < 0
        ? (active + 1) % team.length
        : (active - 1 + team.length) % team.length;
      setActive(realNext);
    }
  };

  // After animating to a clone, silently jump to the real card
  const handleAnimationComplete = () => {
    if (internalIdx === 0) {
      // Was at clone-of-last → jump to real last
      setAnimate(false);
      setInternalIdx(team.length);
    } else if (internalIdx === cloned.length - 1) {
      // Was at clone-of-first → jump to real first
      setAnimate(false);
      setInternalIdx(1);
    }
  };

  const centerOffset = containerW / 2 - cardW / 2;
  const offsetX = centerOffset - internalIdx * (cardW + GAP);

  return (
    <div
      ref={containerRef}
      className="overflow-hidden w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="flex"
        animate={{ x: offsetX }}
        transition={animate ? { duration: 0.42, ease: EASE_OUT_EXPO } : { duration: 0 }}
        onAnimationComplete={handleAnimationComplete}
        style={{ gap: GAP }}
      >
        {cloned.map((member, i) => {
          const isActive = i === internalIdx;
          return (
            <div
              key={`${member.name}-${i}`}
              onClick={() => {
                if (!isActive) {
                  const direction = i > internalIdx ? 1 : -1;
                  const next = internalIdx + direction;
                  setAnimate(true);
                  setInternalIdx(next);
                  setActive((active + direction + team.length) % team.length);
                }
              }}
              className="relative overflow-hidden shrink-0 cursor-pointer"
              style={{
                width:  cardW || '62vw',
                height: cardW ? cardW * 1.25 : '78vw',
                border: isActive ? '1px solid rgba(201,168,76,0.35)' : '1px solid rgba(128,128,128,0.15)',
                filter: isActive ? 'none' : 'grayscale(70%) brightness(0.65)',
                transition: 'filter 0.4s ease',
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="absolute inset-0 w-full h-full"
                style={{ objectFit: 'contain', objectPosition: 'center top' }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: isActive
                    ? 'linear-gradient(to top, rgba(6,10,20,0.90) 0%, rgba(6,10,20,0.45) 28%, transparent 52%)'
                    : 'rgba(6,10,20,0.22)',
                }}
                aria-hidden="true"
              />
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div
                    className="inline-flex items-center font-sans text-[9px] font-bold tracking-[0.2em] uppercase px-2 py-1 mb-2"
                    style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', color: '#FFF', backdropFilter: 'blur(6px)' }}
                  >
                    {member.experience}
                  </div>
                  <div className="font-sans text-[9px] font-bold tracking-[0.24em] uppercase mb-0.5" style={{ color: 'var(--gold)' }}>
                    {member.title}
                  </div>
                  <h3 className="font-bold leading-tight mb-1" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(16px, 4.5vw, 22px)', color: '#FFF' }}>
                    {member.name}
                  </h3>
                  <p className="font-sans text-[11px] font-light leading-[1.6]" style={{ color: 'rgba(255,255,255,0.80)' }}>
                    {member.bio}
                  </p>
                </div>
              )}
              {!isActive && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <span className="font-sans text-[9px] font-bold tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {member.name}
                  </span>
                </div>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'var(--gold)' }} aria-hidden="true" />
              )}
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

const TEAM_KEYS = [
  { name: 'Ian Madrid',  titleKey: 'team_ian_title',     expKey: 'team_ian_exp',     bioKey: 'team_ian_bio',     photo: '/images/team/sir_ian.png' },
  { name: 'Anita',       titleKey: 'team_anita_title',   expKey: 'team_anita_exp',   bioKey: 'team_anita_bio',   photo: '/images/team/anita.png' },
  { name: 'Mubarak',     titleKey: 'team_mubarak_title', expKey: 'team_mubarak_exp', bioKey: 'team_mubarak_bio', photo: '/images/team/mubarak.png' },
  { name: 'Ivy',         titleKey: 'team_ivy_title',     expKey: 'team_ivy_exp',     bioKey: 'team_ivy_bio',     photo: '/images/team/ivy.png' },
];

const INTERVAL = 3000;

export function MeetTheTeam() {
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Build translated team array
  const TEAM = TEAM_KEYS.map((m) => ({
    name:       m.name,
    title:      t[m.titleKey as keyof typeof t] as string,
    experience: t[m.expKey as keyof typeof t] as string,
    bio:        t[m.bioKey as keyof typeof t] as string,
    photo:      m.photo,
  }));

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TEAM.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, [paused]);

  return (
    <section
      id="team"
      className="py-16 md:py-28 relative overflow-hidden"
      style={{ background: 'var(--bg-surface)' }}
      aria-label="Meet the Team"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* Arabic khatam pattern — gold, subtle, peeks through active card */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ opacity: 0.16 }}
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="khatam-team" x="0" y="0" width="96" height="96" patternUnits="userSpaceOnUse">
            <polygon points="28,0 68,0 96,28 96,68 68,96 28,96 0,68 0,28"
              fill="none" stroke="#C9A84C" strokeWidth="1.1" />
            <rect x="18" y="18" width="60" height="60"
              fill="none" stroke="#C9A84C" strokeWidth="1.0" transform="rotate(0 48 48)" />
            <rect x="18" y="18" width="60" height="60"
              fill="none" stroke="#C9A84C" strokeWidth="1.0" transform="rotate(45 48 48)" />
            <polygon points="38,24 58,24 72,38 72,58 58,72 38,72 24,58 24,38"
              fill="none" stroke="#C9A84C" strokeWidth="0.8" />
            <circle cx="48" cy="48" r="11" fill="none" stroke="#C9A84C" strokeWidth="0.8" />
            <circle cx="48" cy="48" r="2.5" fill="#C9A84C" />
            <line x1="48" y1="18" x2="48" y2="37" stroke="#C9A84C" strokeWidth="0.7" />
            <line x1="48" y1="59" x2="48" y2="78" stroke="#C9A84C" strokeWidth="0.7" />
            <line x1="18" y1="48" x2="37" y2="48" stroke="#C9A84C" strokeWidth="0.7" />
            <line x1="59" y1="48" x2="78" y2="48" stroke="#C9A84C" strokeWidth="0.7" />
            <line x1="27" y1="27" x2="40" y2="40" stroke="#C9A84C" strokeWidth="0.65" />
            <line x1="56" y1="56" x2="69" y2="69" stroke="#C9A84C" strokeWidth="0.65" />
            <line x1="69" y1="27" x2="56" y2="40" stroke="#C9A84C" strokeWidth="0.65" />
            <line x1="27" y1="69" x2="40" y2="56" stroke="#C9A84C" strokeWidth="0.65" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#khatam-team)" />
      </svg>

      {/* Soft vignette — keeps pattern subtle at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 50%, var(--bg-surface) 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Centered header */}
        <SectionHeader
          eyebrow={t.team_eyebrow}
          title={t.team_title}
          sub={t.team_sub}
          align="center"
        />

        {/* ── Mobile: peek carousel ── */}
        <div className="md:hidden">
          <MobileCarousel team={TEAM} active={active} setActive={setActive} />
        </div>

        {/* ── Desktop: flex row of cards ── */}
        <div
          className="hidden md:flex items-end gap-3 w-full"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ height: 480 }}
        >
          {TEAM.map((member, i) => {
            const isActive = i === active;
            return (
              <motion.div
                key={member.name}
                onClick={() => setActive(i)}
                className="relative overflow-hidden cursor-pointer"
                animate={{
                  flex:   isActive ? 2 : 1,
                  height: isActive ? 480 : 480,
                  filter: isActive
                    ? 'grayscale(0%) brightness(1)'
                    : 'grayscale(100%) brightness(0.7)',
                }}
                transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
                style={{
                  background:   isActive ? 'rgba(238,235,228,0.15)' : 'var(--bg-surface)',
                  borderRadius: 0,
                  border:       isActive
                    ? '1px solid rgba(201,168,76,0.22)'
                    : '1px solid rgba(128,128,128,0.15)',
                  minWidth: 0,
                }}
                aria-label={`View ${member.name}`}
              >
                {/* Photo */}
                <img
                  src={member.photo}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    objectFit:      'cover',
                    objectPosition: 'center 8%',
                  }}
                />

                {/* Gradient overlay — active only */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    background:
                      'linear-gradient(to top, rgba(6,10,20,0.92) 0%, rgba(6,10,20,0.60) 22%, rgba(6,10,20,0.10) 42%, transparent 55%)',
                  }}
                  aria-hidden="true"
                />

                {/* Active card info */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 p-6"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.45, ease: EASE_OUT_EXPO, delay: 0.18 }}
                    >
                      <div
                        className="inline-flex items-center font-sans text-[9px] font-bold tracking-[0.2em] uppercase px-2.5 py-1 mb-3"
                        style={{
                          background: 'rgba(255,255,255,0.1)',
                          border: '1px solid rgba(255,255,255,0.18)',
                          color: '#FFFFFF',
                          backdropFilter: 'blur(6px)',
                        }}
                      >
                        {member.experience}
                      </div>
                      <div
                        className="font-sans text-[9px] font-bold tracking-[0.26em] uppercase mb-1"
                        style={{ color: 'var(--gold)' }}
                      >
                        {member.title}
                      </div>
                      <h3
                        className="font-bold leading-tight mb-2"
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(20px, 2.2vw, 28px)',
                          color: '#FFFFFF',
                        }}
                      >
                        {member.name}
                      </h3>
                      <p
                        className="font-sans text-[12px] font-light leading-[1.7]"
                        style={{ color: 'rgba(255,255,255,0.88)' }}
                      >
                        {member.bio}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Inactive — vertical name */}
                {!isActive && (
                  <div className="absolute inset-0 flex items-end justify-center pb-5">
                    <span
                      className="font-sans font-bold tracking-[0.2em] uppercase"
                      style={{
                        writingMode: 'vertical-rl',
                        textOrientation: 'mixed',
                        fontSize: '10px',
                        color: 'rgba(255,255,255,0.75)',
                        letterSpacing: '0.18em',
                      }}
                    >
                      {member.name}
                    </span>
                  </div>
                )}

                {/* Gold bottom line on active */}
                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: 'var(--gold)' }}
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Dot indicators — shared between mobile and desktop */}
        <div className="flex justify-center gap-2 mt-6">
          {TEAM.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="transition-all duration-300 p-1"
              style={{
                width:      i === active ? 32 : 16,
                height:     16,
                background: 'transparent',
                border:     'none',
                cursor:     'pointer',
                display:    'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={`Go to ${TEAM[i].name}`}
              aria-current={i === active ? 'true' : undefined}
            >
              <span
                style={{
                  display:      'block',
                  width:        i === active ? 24 : 8,
                  height:       8,
                  background:   i === active ? 'var(--gold)' : 'var(--bg-border-heavy)',
                  borderRadius: 0,
                  transition:   'width 0.3s, background 0.3s',
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
