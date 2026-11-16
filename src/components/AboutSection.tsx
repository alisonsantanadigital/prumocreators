import { useState } from 'react';
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
      'Combinamos direção de arte, movimento e engenharia web para transformar apresentações em experiências que permanecem.',
  },
];

export function AboutSection() {
  const [imgError, setImgError] = useState(false);

  return (
    <section id="sobre" className="relative py-24 sm:py-32 bg-[#070709] border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Editorial Copy & Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium tracking-[0.14em] text-[#D4A853] mb-4">
                01. Sobre a Prumo
              </p>
              <h2 className="font-display text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F5F4F0] [text-wrap:balance]">
                Transformamos potencial criativo em presença digital de alto padrão.
              </h2>

              <p className="mt-7 text-base sm:text-lg leading-[1.7] text-[#D4D4D8] max-w-xl">
                Acreditamos que cada creator possui uma identidade, uma audiência e um potencial
                comercial únicos. Nosso trabalho é transformar esse potencial em uma apresentação
                digital profissional, estratégica e memorável.
              </p>
            </div>

            <div className="mt-12 divide-y divide-white/[0.08] border-t border-b border-white/[0.08]">
              {MANIFESTO_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="py-5 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-baseline"
                >
                  <span className="sm:col-span-2 font-mono text-xs text-[#D4A853] tabular-nums">
                    {pillar.index}
                  </span>
                  <h3 className="sm:col-span-4 font-display text-base font-semibold text-[#F5F4F0]">
                    {pillar.title}
                  </h3>
                  <p className="sm:col-span-6 text-sm leading-relaxed text-[#A1A1AA]">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Editorial Studio Photography */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative flex-1 min-h-[360px] lg:min-h-[540px] overflow-hidden border border-white/[0.08] bg-[#111116]">
              {!imgError ? (
                <img
                  src={STUDIO_MEDIA.aboutImage}
                  alt={STUDIO_MEDIA.aboutImageAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#14141A] to-[#070709]">
                  <span className="font-display text-xl font-semibold text-[#F5F4F0]">
                    PRUMO CREATORS
                  </span>
                  <span className="mt-2 text-sm text-[#A1A1AA]">
                    Direção Criativa &amp; Experiências Digitais
                  </span>
                </div>
              )}

              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#070709]/80 via-transparent to-transparent pointer-events-none"
              />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-[0.12em] text-[#D4A853]">
                    Direção Criativa
                  </p>
                  <p className="mt-1 text-sm sm:text-base font-medium text-[#F5F4F0]">
                    Estética editorial, precisão estratégica e engenharia interativa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
