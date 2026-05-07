import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { LegacyTimeline } from '@/components/sections/LegacyTimeline';
import { DubaiProofPoint } from '@/components/sections/DubaiProofPoint';
import { PhilippineAdvantage } from '@/components/sections/PhilippineAdvantage';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ClientCalculator } from '@/components/sections/ClientCalculator';
import { ClientAspinTower } from '@/components/sections/ClientAspinTower';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustMarquee />
        <LegacyTimeline />
        <DubaiProofPoint />
        <ClientAspinTower />
        <PhilippineAdvantage />
        <ClientCalculator />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
