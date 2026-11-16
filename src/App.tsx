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

export default function App() {
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !mainRef.current) return;

    const ctx = gsap.context(() => {
      const headings = gsap.utils.toArray<HTMLElement>('section h2');
      headings.forEach((heading) => {
        gsap.from(heading, {
          y: 18,
          opacity: 0,
          duration: 0.7,
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
    <div className="min-h-screen bg-[#0A0A0A] text-[#F6F4EE]">
      <Navbar />
      <main ref={mainRef}>
        <HeroSection />
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
