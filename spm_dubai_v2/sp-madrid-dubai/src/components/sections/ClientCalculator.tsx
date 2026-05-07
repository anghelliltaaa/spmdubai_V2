'use client';

import dynamic from 'next/dynamic';

const RecoveryCalculator = dynamic(
  () => import('./RecoveryCalculator').then((m) => ({ default: m.RecoveryCalculator })),
  { ssr: false, loading: () => <div className="h-96" /> }
);

export function ClientCalculator() {
  return <RecoveryCalculator />;
}
