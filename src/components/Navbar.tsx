import { useEffect, useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const NAV_ITEMS = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Soluções', href: '#solucoes' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Diferencial', href: '#diferencial' },
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

      const sections = ['sobre', 'solucoes', 'portfolio', 'diferencial', 'contato'];
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
      <header className="fixed top-0 inset-x-0 z-50 bg-[#0A0A0A]/94 border-b border-white/10">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Minimalist Brand Wordmark */}
          <a
            href="#hero"
            className="text-sm sm:text-base font-semibold tracking-[0.18em] text-[#F6F4EE] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6F4EE]"
          >
            PRUMO CREATORS
          </a>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-8 text-xs font-medium tracking-[0.08em] uppercase text-[#9A968E]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6F4EE] ${
                    isActive ? 'text-[#F6F4EE]' : 'hover:text-[#F6F4EE]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1px] bg-[#F6F4EE] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Single Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contato"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F4EE]"
            >
              Contato
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F6F4EE] border border-white/15 hover:border-white/40 transition-colors focus-visible:outline-2 focus-visible:outline-[#F6F4EE]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Hairline Scroll Progress Indicator */}
        <div className="h-[1.5px] w-full bg-white/[0.06] overflow-hidden">
          <div
            aria-hidden="true"
            className="h-full bg-[#F6F4EE] origin-left will-change-transform"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 bg-[#0A0A0A] border-t border-white/10 md:hidden flex flex-col justify-between p-6"
          >
            <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-white/10">
              {[...NAV_ITEMS, { label: 'Contato', href: '#contato' }].map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="py-5 flex items-center justify-between font-serif text-3xl font-normal text-[#F6F4EE] hover:text-[#9A968E] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-sans text-xs tracking-widest text-[#9A968E] tabular-nums">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/10">
              <a
                href="#contato"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-medium tracking-[0.12em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE] transition-colors"
              >
                Quero minha experiência
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
