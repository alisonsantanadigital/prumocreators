import { useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { STUDIO_MEDIA } from '../data/studio';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [heroError, setHeroError] = useState(false);
  const [insetError, setInsetError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.07]);
  const insetY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [0, -48]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#0A0A0A] pt-24 pb-10 sm:pb-14 lg:pb-16"
    >
      {/* Full-Bleed Large-Scale Campaign Photograph */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 origin-center will-change-transform"
      >
        {!heroError ? (
          <img
            src={STUDIO_MEDIA.heroCampaign}
            alt={STUDIO_MEDIA.heroCampaignAlt}
            referrerPolicy="no-referrer"
            onError={() => setHeroError(true)}
            className="w-full h-full object-cover object-center opacity-75"
          />
        ) : (
          <div className="w-full h-full bg-[#121212]" />
        )}
      </motion.div>

      {/* Editorial Contrast Scrims */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/45 to-[#0A0A0A]/50"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#0A0A0A]/85 via-[#0A0A0A]/35 to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Monumental Editorial Typography Column */}
          <div className="lg:col-span-8">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-xs font-medium tracking-[0.2em] uppercase text-[#D6D2C9] mb-5"
            >
              PRUMO CREATORS · DIREÇÃO DIGITAL &amp; POSICIONAMENTO
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-[clamp(2.5rem,5.4vw,5.25rem)] font-medium leading-[0.98] tracking-[-0.02em] text-[#F6F4EE] [text-wrap:balance]"
            >
              CRIAMOS EXPERIÊNCIAS DIGITAIS QUE{' '}
              <span className="italic font-normal">POSICIONAM</span> CREATORS.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#E5E2DA]"
            >
              Apresentação comercial, identidade digital e experiências personalizadas para conectar
              influenciadores e marcas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#F6F4EE] hover:bg-[#8C261A] hover:text-[#F6F4EE] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F4EE]"
              >
                EXPLORAR PROJETOS
                <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#sobre"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-medium tracking-[0.14em] uppercase text-[#F6F4EE] border border-white/30 hover:border-[#F6F4EE] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F4EE]"
              >
                CONHECER A PRUMO
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          </div>

          {/* Overlapping Vertical Editorial Cutout */}
          <motion.div
            style={{ y: insetY }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block lg:col-span-4 justify-self-end w-full max-w-[300px]"
          >
            <div className="bg-[#141414] p-2.5 border border-white/15">
              <div className="aspect-[3/4] overflow-hidden bg-[#1B1B1B]">
                {!insetError ? (
                  <img
                    src={STUDIO_MEDIA.heroInset}
                    alt={STUDIO_MEDIA.heroInsetAlt}
                    referrerPolicy="no-referrer"
                    onError={() => setInsetError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1C1C1C]" />
                )}
              </div>
              <div className="pt-2.5 px-0.5 flex items-center justify-between text-[11px] tracking-[0.12em] uppercase text-[#9A968E]">
                <span>Campanha Editorial</span>
                <span className="tabular-nums">01 / 08</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Minimalist Bottom Rule */}
        <div className="mt-12 pt-5 border-t border-white/15 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.1em] uppercase text-[#B5B0A6]">
          <span>Apresentação Comercial · Identidade Digital · Direção de Arte</span>
          <a
            href="#portfolio"
            className="text-[#F6F4EE] hover:text-[#B5B0A6] transition-colors whitespace-nowrap"
          >
            Coleções Creator Pro &amp; Experience
          </a>
        </div>
      </div>
    </section>
  );
}
