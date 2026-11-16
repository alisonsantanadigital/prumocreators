import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { STUDIO_MEDIA } from '../data/studio';
import {
  ProgressBar,
  StaggeredText,
  useInViewObserver,
} from './motion/MotionPrimitives';

export function ManifestoSection() {
  const [imgError, setImgError] = useState(false);
  const prefersReduced = useReducedMotion();
  const [plateRef, plateInView] = useInViewObserver<HTMLDivElement>({
    threshold: 0.18,
    once: true,
  });

  return (
    <section
      id="manifesto"
      className="relative py-28 sm:py-36 lg:py-44 bg-[#F2F0EB] text-[#111111] border-t border-[#111111]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Magazine-Spread Left Header & Copy */}
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-6">
              02 — Manifesto
            </p>

            <h2 className="font-serif text-[clamp(2.4rem,4.5vw,4.25rem)] font-normal leading-[1.03] tracking-[-0.025em] text-[#111111] [text-wrap:balance]">
              <StaggeredText
                stagger={0.05}
                segments={[
                  { text: 'Talento merece uma ' },
                  { text: 'apresentação à altura.', italic: true },
                ]}
              />
            </h2>

            <div className="mt-12 sm:mt-16 lg:pl-20 max-w-2xl space-y-6">
              <div className="w-12">
                <ProgressBar
                  progress={100}
                  trackClassName="bg-[#111111]/10"
                  fillClassName="bg-[#A58A58]"
                  delay={0.15}
                />
              </div>
              <p className="text-base sm:text-xl leading-[1.75] text-[#2A2927]">
                A PRUMO CREATORS desenvolve experiências digitais e apresentações comerciais para
                criadores de conteúdo. Transformamos identidade, influência e posicionamento em
                ferramentas profissionais de conexão com marcas.
              </p>
            </div>
          </div>

          {/* Right Offset Vertical Atelier Photography */}
          <div ref={plateRef} className="lg:col-span-5 lg:pt-12">
            <div className="aspect-[3/4] overflow-hidden bg-[#E5E2DC]">
              {!imgError ? (
                <motion.img
                  src={STUDIO_MEDIA.manifestoAtelier}
                  alt={STUDIO_MEDIA.manifestoAtelierAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  initial={prefersReduced ? false : { scale: 1.05, opacity: 0.85 }}
                  animate={
                    plateInView || prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1.05, opacity: 0.85 }
                  }
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover will-change-transform"
                />
              ) : (
                <div className="w-full h-full bg-[#E5E2DC]" />
              )}
            </div>
            <p className="mt-3 text-[11px] tracking-[0.14em] uppercase text-[#A7A49E]">
              Identidade · Influência · Posicionamento
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
