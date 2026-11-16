import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { OFFICIAL_CONTACT_CONFIG } from '../data/studio';

/**
 * Barra fixa inferior exclusiva para dispositivos móveis com acesso permanente ao contato.
 * Oculta-se automaticamente quando a seção de contato entra na área visível para não cobrir o formulário.
 */
export function StickyMobileContactBar() {
  const [contactVisible, setContactVisible] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const prefersReduced = useReducedMotion();

  const hasWhatsapp = Boolean(OFFICIAL_CONTACT_CONFIG.whatsappNumber.trim());
  const whatsappHref = hasWhatsapp
    ? `https://wa.me/${OFFICIAL_CONTACT_CONFIG.whatsappNumber.replace(/\D/g, '')}`
    : undefined;

  useEffect(() => {
    const contactEl = document.getElementById('contato');
    const heroEl = document.getElementById('hero');

    const observers: IntersectionObserver[] = [];

    if (contactEl && typeof IntersectionObserver !== 'undefined') {
      const contactObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) setContactVisible(entry.isIntersecting);
        },
        { threshold: 0.12 },
      );
      contactObserver.observe(contactEl);
      observers.push(contactObserver);
    }

    if (heroEl && typeof IntersectionObserver !== 'undefined') {
      const heroObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (entry) setPastHero(!entry.isIntersecting);
        },
        { threshold: 0.25 },
      );
      heroObserver.observe(heroEl);
      observers.push(heroObserver);
    }

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const showBar = pastHero && !contactVisible;

  return (
    <AnimatePresence>
      {showBar && (
        <motion.div
          initial={prefersReduced ? { opacity: 1 } : { y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={prefersReduced ? { opacity: 0 } : { y: 24, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-[#111111]/95 backdrop-blur-md border-t border-white/12 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#A58A58] truncate">
                PRUMO CREATORS
              </p>
              <p className="text-xs text-[#F2F0EB] truncate">
                Construa sua presença digital
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {whatsappHref && (
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2.5 text-[10px] font-medium tracking-[0.14em] uppercase text-[#F2F0EB] border border-white/25 hover:border-[#A58A58] transition-colors whitespace-nowrap"
                >
                  WhatsApp
                </a>
              )}

              <a
                href="#contato"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-[#111111] bg-[#F2F0EB] active:bg-[#A58A58] transition-colors whitespace-nowrap"
              >
                <span>Contato</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
