import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SolutionsSection } from './components/SolutionsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { DifferentialSection } from './components/DifferentialSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function MarqueeDivider() {
  const items = [
    'CREATOR PRO',
    'CREATOR PRO EXPERIENCE',
    'DIGITAL IDENTITY',
    'CUSTOM EXPERIENCES',
    'PRUMO CREATORS',
  ];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-t border-b border-white/[0.08] bg-[#0B0B0F] py-3.5 select-none"
    >
      <div className="flex w-max animate-prumo-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-8 pr-8">
            {items.map((text, i) => (
              <span
                key={`${dup}-${i}`}
                className="inline-flex items-center gap-8 text-xs font-medium tracking-[0.18em] text-[#A1A1AA] whitespace-nowrap"
              >
                <span>{text}</span>
                <span className="text-[#D4A853]">·</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>('section h2');
      headings.forEach((heading) => {
        gsap.from(heading, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: heading,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#070709] text-[#F5F4F0]">
      <Navbar />
      <main ref={mainRef}>
        <HeroSection />
        <MarqueeDivider />
        <AboutSection />
        <SolutionsSection />
        <PortfolioSection />
        <DifferentialSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
