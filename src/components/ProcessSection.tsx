import { PROCESS_STEPS } from '../data/studio';
import {
  AnimatedCounter,
  ProgressBar,
  StaggeredText,
} from './motion/MotionPrimitives';

export function ProcessSection() {
  return (
    <section
      id="processo"
      className="relative py-28 sm:py-36 lg:py-40 bg-[#F2F0EB] text-[#111111] border-t border-[#111111]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-14 border-b border-[#111111]/12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-5">
              06 — Processo
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111111] [text-wrap:balance]">
              <StaggeredText
                stagger={0.045}
                segments={[
                  { text: 'Três etapas da identidade à ' },
                  { text: 'apresentação final.', italic: true },
                ]}
              />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
              Método de Estúdio
            </span>
          </div>
        </div>

        {/* Architectural 3-Column Hairline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#111111]/12 border-b border-[#111111]/12">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.index}
              className={`py-10 sm:py-14 ${
                idx === 0
                  ? 'md:pr-10 lg:pr-14'
                  : idx === 1
                    ? 'md:px-10 lg:px-14'
                    : 'md:pl-10 lg:pl-14'
              }`}
            >
              <div className="flex items-center justify-between gap-4 mb-8">
                <span className="text-xs font-medium tracking-[0.18em] text-[#A58A58] tabular-nums shrink-0">
                  <AnimatedCounter
                    value={idx + 1}
                    padLength={2}
                    duration={600 + idx * 160}
                  />
                </span>
                <div className="w-16">
                  <ProgressBar
                    progress={((idx + 1) / PROCESS_STEPS.length) * 100}
                    trackClassName="bg-[#111111]/12"
                    fillClassName="bg-[#A58A58]"
                    delay={0.12 + idx * 0.14}
                  />
                </div>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-[#111111]">
                {step.title}
              </h3>

              <p className="mt-5 text-sm sm:text-base leading-[1.75] text-[#5C5A55]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
