import { motion } from 'motion/react';
import { SOLUTIONS, type SolutionItem } from '../data/studio';

function SolutionDiagram({ index }: { index: string }) {
  if (index === '01') {
    return (
      <svg
        viewBox="0 0 180 90"
        className="w-full h-24 text-[#D4A853]"
        fill="none"
        aria-hidden="true"
      >
        <rect x="8" y="12" width="164" height="66" stroke="currentColor" strokeOpacity="0.28" />
        <line x1="8" y1="28" x2="172" y2="28" stroke="currentColor" strokeOpacity="0.2" />
        <rect x="18" y="38" width="54" height="28" stroke="currentColor" strokeOpacity="0.65" />
        <line x1="84" y1="42" x2="156" y2="42" stroke="currentColor" strokeOpacity="0.45" />
        <line x1="84" y1="52" x2="140" y2="52" stroke="currentColor" strokeOpacity="0.25" />
        <line x1="84" y1="62" x2="120" y2="62" stroke="currentColor" strokeOpacity="0.25" />
      </svg>
    );
  }
  if (index === '02') {
    return (
      <svg
        viewBox="0 0 180 90"
        className="w-full h-24 text-[#D4A853]"
        fill="none"
        aria-hidden="true"
      >
        <ellipse cx="90" cy="45" rx="64" ry="26" stroke="currentColor" strokeOpacity="0.35" />
        <ellipse
          cx="90"
          cy="45"
          rx="42"
          ry="16"
          transform="rotate(-18 90 45)"
          stroke="currentColor"
          strokeOpacity="0.7"
        />
        <circle cx="90" cy="45" r="7" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }
  if (index === '03') {
    return (
      <svg
        viewBox="0 0 180 90"
        className="w-full h-24 text-[#D4A853]"
        fill="none"
        aria-hidden="true"
      >
        <rect x="24" y="16" width="38" height="58" stroke="currentColor" strokeOpacity="0.6" />
        <rect x="71" y="16" width="38" height="58" stroke="currentColor" strokeOpacity="0.35" />
        <rect x="118" y="16" width="38" height="58" stroke="currentColor" strokeOpacity="0.2" />
        <line x1="16" y1="45" x2="164" y2="45" stroke="currentColor" strokeOpacity="0.45" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 180 90"
      className="w-full h-24 text-[#D4A853]"
      fill="none"
      aria-hidden="true"
    >
      <polygon points="90,10 144,45 90,80 36,45" stroke="currentColor" strokeOpacity="0.55" />
      <polygon points="90,22 124,45 90,68 56,45" stroke="currentColor" strokeOpacity="0.3" />
      <line x1="20" y1="45" x2="160" y2="45" stroke="currentColor" strokeOpacity="0.2" />
    </svg>
  );
}

function SolutionCard({ item, idx }: { item: SolutionItem; idx: number }) {
  const isWide = item.featured;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative flex flex-col justify-between p-7 sm:p-9 bg-[#0E0E13] border border-white/[0.08] hover:border-[#D4A853]/50 transition-colors duration-200 ${
        isWide ? 'lg:col-span-7' : 'lg:col-span-5'
      }`}
    >
      <div>
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
          <span className="font-mono text-xs text-[#D4A853] tabular-nums">{item.index}</span>
          <span className="text-xs text-[#A1A1AA] truncate">{item.subtitle}</span>
        </div>

        <div className="my-7 p-4 bg-[#070709] border border-white/[0.06]">
          <SolutionDiagram index={item.index} />
        </div>

        <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F4F0] group-hover:text-[#D4A853] transition-colors duration-200">
          {item.title}
        </h3>

        <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
          {item.description}
        </p>
      </div>

      <div className="mt-8 pt-5 border-t border-white/[0.08] flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-[#D4D4D8]">
        {item.deliverables.map((deliv, i) => (
          <span key={deliv} className="inline-flex items-center gap-3">
            <span>{deliv}</span>
            {i < item.deliverables.length - 1 && (
              <span aria-hidden="true" className="text-[#D4A853]">
                ·
              </span>
            )}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

export function SolutionsSection() {
  return (
    <section
      id="solucoes"
      className="relative py-24 sm:py-32 bg-[#070709] border-t border-white/[0.08] prumo-grid-surface"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] text-[#D4A853] mb-4">
              02. Soluções
            </p>
            <h2 className="font-display text-[clamp(1.85rem,3.4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[#F5F4F0] [text-wrap:balance]">
              Arquitetura digital desenhada para cada estágio de posicionamento.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
            Quatro frentes complementares para estruturar a presença comercial e a expressão visual
            de creators com padrão de estúdio internacional.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Row 1: Creator Pro (7) + Digital Identity (5) */}
          <SolutionCard item={SOLUTIONS[0]} idx={0} />
          <SolutionCard item={SOLUTIONS[2]} idx={1} />
          {/* Row 2: Custom Experiences (5) + Creator Pro Experience (7) */}
          <SolutionCard item={SOLUTIONS[3]} idx={2} />
          <SolutionCard item={SOLUTIONS[1]} idx={3} />
        </div>
      </div>
    </section>
  );
}
