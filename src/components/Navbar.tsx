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
      <header className="fixed top-0 inset-x-0 z-50 bg-[#070709]/92 border-b border-white/[0.08]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            className="font-display text-base sm:text-lg font-bold tracking-tight text-[#F5F4F0] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853]"
          >
            PRUMO CREATORS
          </a>

          {/* Zone 2: Primary Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className="hidden md:flex items-center gap-7 text-sm font-medium text-[#A1A1AA]"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D4A853] ${
                    isActive ? 'text-[#F5F4F0]' : 'hover:text-[#F5F4F0]'
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#D4A853] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Primary Action + Mobile Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contato"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F4F0]"
            >
              Falar com a Prumo
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              className="md:hidden inline-flex items-center justify-center w-11 h-11 text-[#F5F4F0] border border-white/[0.12] hover:border-white/30 transition-colors focus-visible:outline-2 focus-visible:outline-[#D4A853]"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Scroll Progress Indicator */}
        <div className="h-[2px] w-full bg-white/[0.04] overflow-hidden">
          <div
            aria-hidden="true"
            className="h-full bg-[#D4A853] origin-left will-change-transform"
            style={{ transform: `scaleX(${scrollProgress})` }}
          />
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 top-16 z-40 bg-[#070709] border-t border-white/[0.08] md:hidden flex flex-col justify-between p-6"
          >
            <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-white/[0.08]">
              {[...NAV_ITEMS, { label: 'Contato', href: '#contato' }].map((item, idx) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="py-5 flex items-center justify-between text-2xl font-display font-semibold text-[#F5F4F0] hover:text-[#D4A853] transition-colors"
                >
                  <span>{item.label}</span>
                  <span className="font-mono text-xs text-[#A1A1AA] tabular-nums">
                    0{idx + 1}
                  </span>
                </a>
              ))}
            </nav>

            <div className="pt-6 border-t border-white/[0.08]">
              <a
                href="#contato"
                onClick={handleLinkClick}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67] transition-colors"
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
