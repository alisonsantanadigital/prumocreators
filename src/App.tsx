import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ManifestoSection } from './components/ManifestoSection';
import { PortfolioSection } from './components/PortfolioSection';
import { PartnerMarquee } from './components/PartnerMarquee';
import { VisionSection } from './components/VisionSection';
import { ProcessSection } from './components/ProcessSection';
import { FounderSection } from './components/FounderSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { StickyMobileContactBar } from './components/StickyMobileContactBar';

export default function App() {
  return (
    <div className="min-h-screen prumo-site-canvas text-[#111111]">
      <Navbar />
      <main>
        <HeroSection />
        <ManifestoSection />
        <PortfolioSection />
        <PartnerMarquee />
        <VisionSection />
        <ProcessSection />
        <FounderSection />
        <ContactSection />
      </main>
      <Footer />
      <StickyMobileContactBar />
    </div>
  );
}
