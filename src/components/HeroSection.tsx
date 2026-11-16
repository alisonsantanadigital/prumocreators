import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { STUDIO_MEDIA } from '../data/studio';
import { PrumoMark } from './PrumoMark';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const photoY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, 36]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-between bg-[#F2F0EB] text-[#111111] pt-28 sm:pt-32 pb-10 sm:pb-12 overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 flex-1 flex flex-col justify-between">
        {/* Top Architectural Title & Identity Mark */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 pt-2 sm:pt-6">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-4 mb-8 sm:mb-12"
            >
              <PrumoMark className="w-6 h-10 text-[#111111] shrink-0" />
              <div className="h-px w-10 bg-[#A58A58]" aria-hidden="true" />
              <span className="text-xs font-medium tracking-[0.22em] uppercase text-[#111111]">
                PRUMO CREATORS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.5rem,5.2vw,5rem)] font-normal leading-[1.02] tracking-[-0.025em] text-[#111111] [text-wrap:balance]"
            >
              &ldquo;Construímos presenças digitais que{' '}
              <span className="italic">aproximam talentos</span> de grandes oportunidades.&rdquo;
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 sm:mt-14 flex flex-wrap items-center gap-6"
            >
              <a
                href="#portfolio"
                className="inline-flex items-center px-6 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#F2F0EB] bg-[#111111] hover:bg-[#A58A58] hover:text-[#111111] transition-colors duration-200 whitespace-nowrap"
              >
                Selected Works
              </a>

              <a
                href="#manifesto"
                className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#111111] border-b border-[#A58A58] pb-1 hover:text-[#A58A58] transition-colors duration-200 whitespace-nowrap"
              >
                Ler Manifesto
              </a>
            </motion.div>
          </div>

          {/* Right Column: Large-Scale Impact Editorial Photograph */}
          <motion.div
            style={{ y: photoY }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pt-4"
          >
            <div className="relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[4/5] overflow-hidden bg-[#E5E2DC]">
              {!imgError ? (
                <img
                  src={STUDIO_MEDIA.heroCampaign}
                  alt={STUDIO_MEDIA.heroCampaignAlt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#E5E2DC]" />
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#A7A49E]">
              <span>Creative Architecture</span>
              <span className="tabular-nums text-[#A58A58]">01</span>
            </div>
          </motion.div>
        </div>

        {/* Discrete Scroll Indicator */}
        <div className="mt-12 pt-5 border-t border-[#111111]/10 flex items-center justify-between gap-4">
          <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
            Direção de Arte · Estratégia · Experiências Digitais
          </span>

          <a
            href="#manifesto"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase text-[#111111] hover:text-[#A58A58] transition-colors whitespace-nowrap"
          >
            <span>Role para explorar</span>
            <span className="block w-px h-5 bg-[#A58A58]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
