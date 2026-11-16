import { useState } from 'react';
import { STUDIO_MEDIA } from '../data/studio';

export function ManifestoSection() {
  const [imgError, setImgError] = useState(false);

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
              Talento merece uma{' '}
              <span className="italic">apresentação à altura.</span>
            </h2>

            <div className="mt-12 sm:mt-16 lg:pl-20 max-w-2xl space-y-6">
              <div className="w-12 h-px bg-[#A58A58]" aria-hidden="true" />
              <p className="text-base sm:text-xl leading-[1.75] text-[#2A2927]">
                A PRUMO CREATORS desenvolve experiências digitais e apresentações comerciais para
                criadores de conteúdo. Transformamos identidade, influência e posicionamento em
                ferramentas profissionais de conexão com marcas.
              </p>
            </div>
          </div>

          {/* Right Offset Vertical Atelier Photography */}
          <div className="lg:col-span-5 lg:pt-12">
            <div className="aspect-[3/4] overflow-hidden bg-[#E5E2DC]">
              {!imgError ? (
                <img
                  src={STUDIO_MEDIA.manifestoAtelier}
                  alt={STUDIO_MEDIA.manifestoAtelierAlt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover"
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
