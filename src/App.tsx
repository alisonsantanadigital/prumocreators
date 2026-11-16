import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { PracticeSection } from './components/PracticeSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PartnerMarquee } from './components/PartnerMarquee';
import { VisionSection } from './components/VisionSection';
import { ProcessSection } from './components/ProcessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StickyMobileContactBar } from './components/StickyMobileContactBar';

export default function App() {
  return (
    <div className="min-h-screen bg-[#F2F0EB] text-[#111111]">
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <PracticeSection />
        <PortfolioSection />
        <PartnerMarquee />
        <VisionSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileContactBar />
    </div>
  );
}
