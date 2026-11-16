import { PARTNER_BRANDS } from '../data/studio';

/**
 * Faixa contínua de marcas parceiras (Infinite Marquee) com transição de escala de cinza para cor no hover.
 * Renderiza somente quando há marcas reais e autorizadas configuradas em PARTNER_BRANDS.
 */
export function PartnerMarquee() {
  if (PARTNER_BRANDS.length === 0) {
    return null;
  }

  const repeatedBrands = [...PARTNER_BRANDS, ...PARTNER_BRANDS];

  return (
    <section
      aria-label="Marcas parceiras"
      className="bg-[#F2F0EB] text-[#111111] border-t border-b border-[#111111]/10 py-10 overflow-hidden"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16 mb-6 flex items-center justify-between">
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58]">
          Marcas &amp; Conexões
        </span>
        <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
          Colaborações Oficiais
        </span>
      </div>

      <div className="prumo-marquee-wrapper relative w-full overflow-hidden">
        <div className="prumo-marquee-track items-center gap-12 sm:gap-16 px-6">
          {repeatedBrands.map((brand, idx) => {
            const content = (
              <img
                src={brand.logoSrc}
                alt={brand.name}
                loading="lazy"
                className="h-7 sm:h-8 w-auto object-contain grayscale opacity-65 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.06]"
              />
            );

            return brand.url ? (
              <a
                key={`${brand.id}-${idx}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A58A58]"
              >
                {content}
              </a>
            ) : (
              <div
                key={`${brand.id}-${idx}`}
                className="group inline-flex items-center justify-center shrink-0"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
