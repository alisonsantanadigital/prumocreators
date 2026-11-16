import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Compass, Send } from 'lucide-react';
import { DIFFERENTIAL_COMPARISON } from '../data/studio';

export function DifferentialSection() {
  const [mode, setMode] = useState<'before' | 'after'>('after');
  const active = DIFFERENTIAL_COMPARISON[mode];

  return (
    <section
      id="diferencial"
      className="relative py-24 sm:py-32 bg-[#0A0A0E] border-t border-white/[0.08]"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.14em] text-[#D4A853] mb-4">
            04. O Diferencial Prumo
          </p>
          <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold leading-[1.06] tracking-[-0.025em] text-[#F5F4F0] [text-wrap:balance]">
            UM CREATOR. UMA IDENTIDADE. UMA EXPERIÊNCIA PRÓPRIA.
          </h2>
        </div>

        {/* Interactive Transformation Showcase */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left: Mode Switcher + Structural Pillars */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#0E0E13] border border-white/[0.08] p-7 sm:p-10">
            <div>
              <div
                role="tablist"
                aria-label="Comparativo de posicionamento digital"
                className="inline-flex p-1 bg-[#070709] border border-white/[0.08] mb-8"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'before'}
                  onClick={() => setMode('before')}
                  className={`px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                    mode === 'before'
                      ? 'bg-[#27272A] text-[#F5F4F0]'
                      : 'text-[#A1A1AA] hover:text-[#F5F4F0]'
                  }`}
                >
                  Presença Genérica
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'after'}
                  onClick={() => setMode('after')}
                  className={`px-4 py-2 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                    mode === 'after'
                      ? 'bg-[#D4A853] text-[#070709]'
                      : 'text-[#A1A1AA] hover:text-[#F5F4F0]'
                  }`}
                >
                  Experiência Prumo
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-display text-2xl sm:text-3xl font-semibold leading-tight text-[#F5F4F0]">
                    {active.headline}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#A1A1AA]">
                    {active.summary}
                  </p>

                  <div className="mt-8 divide-y divide-white/[0.08] border-t border-white/[0.08]">
                    {active.pillars.map((pillar, i) => (
                      <div key={pillar.title} className="py-4 flex items-start gap-4">
                        <span
                          className={`font-mono text-xs tabular-nums pt-0.5 ${
                            mode === 'after' ? 'text-[#D4A853]' : 'text-[#71717A]'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-[#F5F4F0]">{pillar.title}</h4>
                          <p className="mt-1 text-sm text-[#A1A1AA]">{pillar.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Live Architectural Blueprint Visualization */}
          <div className="lg:col-span-6 bg-[#0E0E13] border border-white/[0.08] p-7 sm:p-10 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-5 border-b border-white/[0.08] text-xs text-[#A1A1AA]">
              <span>Arquitetura de Apresentação</span>
              <span className={mode === 'after' ? 'text-[#D4A853] font-medium' : 'text-[#71717A]'}>
                {active.label}
              </span>
            </div>

            <div className="my-8 flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {mode === 'before' ? (
                  <motion.div
                    key="viz-before"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full max-w-md space-y-3"
                  >
                    <div className="p-4 border border-dashed border-white/15 bg-[#070709] text-xs text-[#71717A]">
                      Lista de links genérica sem contexto visual
                    </div>
                    <div className="p-4 border border-dashed border-white/15 bg-[#070709] text-xs text-[#71717A]">
                      Arquivo PDF estático desatualizado
                    </div>
                    <div className="p-4 border border-dashed border-white/15 bg-[#070709] text-xs text-[#71717A]">
                      Ausência de narrativa comercial para marcas
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viz-after"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.25 }}
                    className="w-full space-y-4"
                  >
                    <div className="p-5 bg-[#070709] border border-[#D4A853]/40 flex items-start gap-4">
                      <Compass className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[#F5F4F0]">
                          Identidade &amp; Posicionamento Visual
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA]">
                          Estética própria que diferencia o creator imediatamente aos olhos de
                          diretores de marca e agências.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-[#070709] border border-white/[0.12] flex items-start gap-4">
                      <Layers className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[#F5F4F0]">
                          Organização Estratégica de Conteúdo
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA]">
                          Editoriais, territórios de conteúdo, audiência e formatos estruturados em
                          capítulos claros.
                        </p>
                      </div>
                    </div>

                    <div className="p-5 bg-[#070709] border border-white/[0.12] flex items-start gap-4">
                      <Send className="w-5 h-5 text-[#D4A853] shrink-0 mt-0.5" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[#F5F4F0]">
                          Conversão Direta para Parcerias
                        </p>
                        <p className="mt-1 text-xs leading-relaxed text-[#A1A1AA]">
                          Jornada de navegação pensada para facilitar o primeiro contato comercial
                          com decisões mais rápidas.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-5 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#A1A1AA]">
              <span>Organização · Valorização · Contato</span>
              <span className="font-mono text-[#D4A853]">PRUMO STANDARD</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
