import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PrumoMark } from './PrumoMark';
import { MagneticButton } from './motion/MotionPrimitives';

const NAV_ITEMS = [
  { label: 'Propósito', href: '#manifesto' },
  { label: 'Projetos', href: '#portfolio' },
  { label: 'Visão', href: '#visao' },
  { label: 'Processo', href: '#processo' },
  { label: 'Fundador', href: '#fundador' },
];

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState<string>('');
  const [overHero, setOverHero] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
      setScrollProgress(progress);

      const heroEl = document.getElementById('hero');
      const heroThreshold = heroEl ? heroEl.offsetHeight * 0.72 : 540;
      setOverHero(scrollTop < heroThreshold);

      const sections = ['manifesto', 'portfolio', 'visao', 'processo', 'fundador', 'contato'];
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

  const useDarkHeader = overHero && !mobileOpen;

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 border-b ${
          useDarkHeader
            ? 'bg-[#0E0D0C]/68 border-white/10 text-[#F2F0EB]'
            : 'bg-[#F2F0EB]/96 border-[#111111]/10 text-[#111111]'
        }`}
      >
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Logo + Wordmark */}
          <a
            href="#hero"
            className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold tracking-[0.22em] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A58A58]"
          >
            <PrumoMark className="w-5 h-5 shrink-0" />
            <span>PRUMO CREATORS</span>
          </a>

          {/* Zone 2: Minimalist Single-Line Navigation Links */}
          <nav
            aria-label="Navegação principal"
            className={`hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-300 ${
              useDarkHeader ? 'text-[#D0CCC4]' : 'text-[#5C5A55]'
            }`}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A58A58] ${
                    isActive
                      ? useDarkHeader
                        ? 'text-[#F2F0EB]'
                        : 'text-[#111111]'
                      : useDarkHeader
                        ? 'hover:text-[#F2F0EB]'
                        : 'hover:text-[#111111]'
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
                  className={`inline-flex items-center px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase transition-colors duration-200 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A58A58] ${
                    useDarkHeader
                      ? 'text-[#111111] bg-[#F2F0EB] hover:bg-[#A58A58]'
                      : 'text-[#F2F0EB] bg-[#111111] hover:bg-[#A58A58] hover:text-[#111111]'
                  }`}
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
              className={`md:hidden inline-flex items-center justify-center w-11 h-11 border transition-colors focus-visible:outline-2 focus-visible:outline-[#A58A58] ${
                useDarkHeader
                  ? 'text-[#F2F0EB] border-white/20 hover:border-white/50'
                  : 'text-[#111111] border-[#111111]/15 hover:border-[#111111]/45'
              }`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Hairline Scroll Progress Line */}
        <div
          className={`h-[1.5px] w-full overflow-hidden ${
            useDarkHeader ? 'bg-white/[0.08]' : 'bg-[#111111]/[0.05]'
          }`}
        >
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
                Sites para Criadores · Brasil
              </span>
              <PrumoMark className="w-6 h-6 text-[#111111]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
