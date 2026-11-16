import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PrumoMark } from './PrumoMark';
import { MagneticButton } from './motion/MotionPrimitives';

const NAV_ITEMS = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Atuação', href: '#atuacao' },
  { label: 'Selected Works', href: '#portfolio' },
  { label: 'Processo', href: '#processo' },
];

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      const sections = ['manifesto', 'atuacao', 'portfolio', 'visao', 'processo', 'contato'];
      let current = '';
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.35 && rect.bottom >= 120) {
            current = `#${id}`;
          }
        }
      }
      setActiveSection(current);
    };

    updateScroll();
    window.addEventListener('scroll', updateScroll, { passive: true });
    return () => window.removeEventListener('scroll', updateScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#F2F0EB]/95 border-b border-[#111111]/10 text-[#111111]">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#111111] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A58A58]"
          >
            PRUMO CREATORS
          </a>

          {/* Zone 2: Minimalist Single-Line Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.14em] uppercase text-[#5C5A55]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A58A58] ${
                    isActive ? 'text-[#111111]' : 'hover:text-[#111111]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#A58A58] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Menu Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <MagneticButton strength={4}>
                <a
                  href="#contato"
                  className="inline-flex items-center px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#F2F0EB] bg-[#111111] hover:bg-[#A58A58] hover:text-[#111111] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
                >
                  Contato
                </a>
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#111111] border border-[#111111]/15 hover:border-[#111111]/45 transition-colors focus-visible:outline-2 focus-visible:outline-[#A58A58]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Hairline Scroll Progress Line */}
        <div className="h-[1.5px] w-full bg-[#111111]/[0.05] overflow-hidden">
          <div
            aria-hidden="true"
            className="h-full bg-[#A58A58] origin-left will-change-transform"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 bg-[#F2F0EB] text-[#111111] border-t border-[#111111]/10 md:hidden flex flex-col justify-between p-6"
          >
            <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-[#111111]/10">
              {[...NAV_ITEMS, { label: 'Contato', href: '#contato' }].map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="py-5 flex items-center justify-between font-serif text-3xl font-normal text-[#111111] hover:text-[#A58A58] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-xs tracking-[0.16em] text-[#A7A49E] tabular-nums">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-[#111111]/10 flex items-center justify-between">
              <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
                Creative Architecture
              </span>
              <PrumoMark className="w-5 h-8 text-[#111111]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
