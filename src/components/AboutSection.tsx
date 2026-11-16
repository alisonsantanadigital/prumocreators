import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { STUDIO_MEDIA } from '../data/studio';

const MANIFESTO_PILLARS = [
  {
    index: '01',
    title: 'Identidade Autoral',
    description:
      'Traduzimos a personalidade, o território estético e a linguagem única de cada creator em um ambiente digital proprietário.',
  },
  {
    index: '02',
    title: 'Posicionamento Estratégico',
    description:
      'Estruturamos narrativa, entregas e proposta comercial para que marcas percebam valor imediato no primeiro acesso.',
  },
  {
    index: '03',
    title: 'Presença Memorável',
    description:
      'Unimos direção de arte editorial e rigor de estúdio para transformar apresentações em experiências que permanecem.',
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [atelierError, setAtelierError] = useState(false);
  const [detailError, setDetailError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const overlapY = useTransform(scrollYProgress, [0, 1], prefersReduced ? [0, 0] : [24, -28]);

  return (
    <section
      id="sobre"
      ref={sectionRef}
      className="relative py-24 sm:py-32 lg:py-40 bg-[#F6F4EE] text-[#0A0A0A]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-16 items-start">
          {/* Left Column: Asymmetric Overlapping Fashion Photography */}
          <div className="lg:col-span-6 relative pb-10 sm:pb-16">
            <div className="w-full sm:w-[86%] aspect-[3/4] overflow-hidden bg-[#E7E4DC]">
              {!atelierError ? (
                <img
                  src={STUDIO_MEDIA.aboutAtelier}
                  alt={STUDIO_MEDIA.aboutAtelierAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setAtelierError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-8 text-center bg-[#E7E4DC]">
                  <span className="font-serif text-2xl text-[#0A0A0A]">PRUMO CREATORS</span>
                </div>
              )}
            </div>

            {/* Overlapping Cropped Studio Frame */}
            <motion.div
              style={{ y: overlapY }}
              className="hidden sm:block absolute right-0 bottom-0 w-[44%] aspect-[4/3] p-2 bg-[#F6F4EE] border border-[#0A0A0A]/15"
            >
              <div className="w-full h-full overflow-hidden bg-[#141414]">
                {!detailError ? (
                  <img
                    src={STUDIO_MEDIA.aboutDetail}
                    alt={STUDIO_MEDIA.aboutDetailAlt}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    onError={() => setDetailError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#1C1C1C]" />
                )}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Editorial Manifesto & Pillars */}
          <div className="lg:col-span-6 lg:pt-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#8C261A] mb-5">
                01 · Sobre a Prumo
              </p>

              <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-[#0A0A0A] [text-wrap:balance]">
                Direção editorial aplicada à{' '}
                <span className="italic font-normal">presença comercial</span> de creators.
              </h2>

              <p className="mt-8 text-base sm:text-lg leading-[1.75] text-[#2D2B27] max-w-xl">
                Acreditamos que cada creator possui uma identidade, uma audiência e um potencial
                comercial únicos. Nosso trabalho é transformar esse potencial em uma apresentação
                digital profissional, estratégica e memorável.
              </p>
            </div>

            <div className="mt-14 divide-y divide-[#0A0A0A]/15 border-t border-b border-[#0A0A0A]/15">
              {MANIFESTO_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                >
                  <span className="sm:col-span-2 text-xs font-medium tracking-[0.14em] text-[#8C261A] tabular-nums">
                    {pillar.index}
                  </span>
                  <h3 className="sm:col-span-4 font-serif text-xl font-semibold text-[#0A0A0A]">
                    {pillar.title}
                  </h3>
                  <p className="sm:col-span-6 text-sm leading-relaxed text-[#57534E]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
