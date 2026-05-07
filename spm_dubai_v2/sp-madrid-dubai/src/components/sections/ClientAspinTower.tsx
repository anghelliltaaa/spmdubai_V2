'use client';

import dynamic from 'next/dynamic';

const AspinTowerSection = dynamic(
  () => import('./AspinTowerSection').then((m) => ({ default: m.AspinTowerSection })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center"
        style={{
          height: 'clamp(480px, 60vw, 720px)',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--bg-border)',
          borderBottom: '1px solid var(--bg-border)',
        }}
        aria-busy="true"
        aria-label="Loading 3D tower visualization"
      >
        <div
          className="font-sans text-[10px] tracking-[0.3em] uppercase text-[var(--text-faint)]"
          aria-hidden="true"
        >
          Loading Tower…
        </div>
      </div>
    ),
  }
);

export function ClientAspinTower() {
  return <AspinTowerSection />;
}
