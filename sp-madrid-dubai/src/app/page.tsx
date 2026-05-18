import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { TrustMarquee } from '@/components/sections/TrustMarquee';
import { LegacyTimeline } from '@/components/sections/LegacyTimeline';
import { DubaiProofPoint } from '@/components/sections/DubaiProofPoint';
import { PhilippineAdvantage } from '@/components/sections/PhilippineAdvantage';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { MeetTheTeam } from '@/components/sections/MeetTheTeam';
import { OfficeCarousel } from '@/components/sections/OfficeCarousel';
import { ProductsSection } from '@/components/sections/ProductsSection';
import { ComplianceSection } from '@/components/sections/ComplianceSection';
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
        <OfficeCarousel />
        <PhilippineAdvantage />
        <MeetTheTeam />
        <ClientCalculator />
        <ComplianceSection />
        <ProductsSection />
        <CaseStudies />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
