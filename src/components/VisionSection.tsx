import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { STUDIO_MEDIA } from '../data/studio';
import {
  AnimatedCounter,
  ProgressBar,
  StaggeredText,
  useInViewObserver,
} from './motion/MotionPrimitives';

export function VisionSection() {
  const [imgError, setImgError] = useState(false);
  const prefersReduced = useReducedMotion();
  const [spreadRef, spreadInView] = useInViewObserver<HTMLDivElement>({
    threshold: 0.16,
    once: true,
  });

  return (
    <section
      id="visao"
      className="relative py-28 sm:py-36 lg:py-44 bg-[#F2F0EB] text-[#111111]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-6">
              03 — Visão
            </p>

            <h2 className="font-serif text-[clamp(2.3rem,4.3vw,4rem)] font-normal leading-[1.03] tracking-[-0.025em] text-[#111111] [text-wrap:balance]">
              <StaggeredText
                stagger={0.045}
                segments={[
                  { text: 'Não basta estar nas redes. ' },
                  { text: 'É preciso saber se apresentar.', italic: true },
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-10 space-y-6">
            <div className="w-12">
              <ProgressBar
                progress={100}
                trackClassName="bg-[#111111]/10"
                fillClassName="bg-[#A58A58]"
                delay={0.12}
              />
            </div>
            <p className="text-base sm:text-xl leading-[1.75] text-[#2A2927]">
              Quando uma marca avalia um criador, a apresentação define o valor da parceria.
            </p>
            <p className="text-sm sm:text-base leading-[1.8] text-[#5C5A55]">
              Uma página clara e bem organizada mostra em segundos seu estilo, sua audiência e o
              profissionalismo do seu trabalho — facilitando negociações e abrindo novas
              oportunidades comerciais.
            </p>
          </div>
        </div>

        {/* Large-Scale Asymmetric Editorial Photograph */}
        <div ref={spreadRef} className="mt-16 sm:mt-20 grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-10 lg:col-start-3">
            <div className="aspect-[16/9] overflow-hidden bg-[#E5E2DC]">
              {!imgError ? (
                <motion.img
                  src={STUDIO_MEDIA.visionSpread}
                  alt={STUDIO_MEDIA.visionSpreadAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  initial={prefersReduced ? false : { scale: 1.04, opacity: 0.85 }}
                  animate={
                    spreadInView || prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1.04, opacity: 0.85 }
                  }
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover will-change-transform"
                />
              ) : (
                <div className="w-full h-full bg-[#E5E2DC]" />
              )}
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#A7A49E]">
              <span>Presença · Clareza · Negócios</span>
              <span className="tabular-nums text-[#A58A58]">
                <AnimatedCounter value={3} padLength={2} duration={650} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
