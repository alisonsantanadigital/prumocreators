import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { DIFFERENTIAL_COMPARISON } from '../data/studio';

export function DifferentialSection() {
  const [mode, setMode] = useState<'before' | 'after'>('after');
  const active = DIFFERENTIAL_COMPARISON[mode];

  return (
    <section
      id="diferencial"
      className="relative py-24 sm:py-32 lg:py-36 bg-[#F6F4EE] text-[#0A0A0A] border-t border-[#0A0A0A]/10"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="max-w-4xl">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#8C261A] mb-5">
            04 · O Diferencial
          </p>
          <h2 className="font-serif text-[clamp(2.2rem,4.2vw,4rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#0A0A0A] [text-wrap:balance]">
            UM CREATOR. UMA IDENTIDADE.{' '}
            <span className="italic font-normal">UMA EXPERIÊNCIA PRÓPRIA.</span>
          </h2>
        </div>

        {/* Interactive Magazine Tear-Sheet Comparison */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-stretch">
          {/* Left: Switcher + Editorial Breakdown */}
          <div className="lg:col-span-6 flex flex-col justify-between bg-[#EAE7DF] p-7 sm:p-10 border border-[#0A0A0A]/12">
            <div>
              <div
                role="tablist"
                aria-label="Comparativo de posicionamento digital"
                className="inline-flex p-1 bg-[#F6F4EE] border border-[#0A0A0A]/15 mb-8"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'before'}
                  onClick={() => setMode('before')}
                  className={`px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    mode === 'before'
                      ? 'bg-[#0A0A0A] text-[#F6F4EE]'
                      : 'text-[#57534E] hover:text-[#0A0A0A]'
                  }`}
                >
                  Presença Genérica
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={mode === 'after'}
                  onClick={() => setMode('after')}
                  className={`px-4 py-2 text-xs font-medium tracking-[0.08em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    mode === 'after'
                      ? 'bg-[#8C261A] text-[#F6F4EE]'
                      : 'text-[#57534E] hover:text-[#0A0A0A]'
                  }`}
                >
                  Experiência Prumo
                </button>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-serif text-2xl sm:text-3xl font-medium leading-tight text-[#0A0A0A]">
                    {active.headline}
                  </h3>
                  <p className="mt-4 text-sm sm:text-base leading-relaxed text-[#44403C]">
                    {active.summary}
                  </p>

                  <div className="mt-8 divide-y divide-[#0A0A0A]/12 border-t border-[#0A0A0A]/12">
                    {active.pillars.map((pillar, i) => (
                      <div key={pillar.title} className="py-4 flex items-start gap-4">
                        <span
                          className={`text-xs font-medium tracking-[0.12em] tabular-nums pt-0.5 ${
                            mode === 'after' ? 'text-[#8C261A]' : 'text-[#78716C]'
                          }`}
                        >
                          0{i + 1}
                        </span>
                        <div>
                          <h4 className="text-sm font-semibold text-[#0A0A0A]">{pillar.title}</h4>
                          <p className="mt-1 text-sm text-[#57534E]">{pillar.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Editorial Architecture Preview Sheet */}
          <div className="lg:col-span-6 bg-[#FFFFFF] p-7 sm:p-10 border border-[#0A0A0A]/12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-5 border-b border-[#0A0A0A]/12 text-xs tracking-[0.12em] uppercase text-[#57534E]">
              <span>Estrutura da Apresentação</span>
              <span className={mode === 'after' ? 'text-[#8C261A] font-semibold' : 'text-[#78716C]'}>
                {active.label}
              </span>
            </div>

            <div className="my-8 flex-1 flex items-center justify-center">
              <AnimatePresence mode="wait">
                {mode === 'before' ? (
                  <motion.div
                    key="sheet-before"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full max-w-md space-y-3"
                  >
                    <div className="p-4 border border-dashed border-[#0A0A0A]/25 text-xs text-[#6B6860]">
                      Agregador de links genérico sem identidade visual própria
                    </div>
                    <div className="p-4 border border-dashed border-[#0A0A0A]/25 text-xs text-[#6B6860]">
                      Mídia kit estático em arquivo PDF de leitura lenta
                    </div>
                    <div className="p-4 border border-dashed border-[#0A0A0A]/25 text-xs text-[#6B6860]">
                      Ausência de contexto editorial para avaliação de marcas
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="sheet-after"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className="w-full space-y-4"
                  >
                    <div className="p-5 bg-[#F6F4EE] border border-[#0A0A0A]/20">
                      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8C261A]">
                        Capítulo 01 · Direção Visual
                      </p>
                      <p className="mt-1.5 font-serif text-xl text-[#0A0A0A]">
                        Identidade editorial desenhada sob medida para o universo do creator.
                      </p>
                    </div>

                    <div className="p-5 bg-[#F6F4EE] border border-[#0A0A0A]/12">
                      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#57534E]">
                        Capítulo 02 · Organização Comercial
                      </p>
                      <p className="mt-1.5 font-serif text-xl text-[#0A0A0A]">
                        Territórios de conteúdo, editoriais e formatos de parceria em leitura clara.
                      </p>
                    </div>

                    <div className="p-5 bg-[#F6F4EE] border border-[#0A0A0A]/12">
                      <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#57534E]">
                        Capítulo 03 · Conexão com Marcas
                      </p>
                      <p className="mt-1.5 font-serif text-xl text-[#0A0A0A]">
                        Navegação fluida que facilita a decisão e o contato direto.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="pt-5 border-t border-[#0A0A0A]/12 flex items-center justify-between text-xs tracking-[0.12em] uppercase text-[#57534E]">
              <span>Organização · Valorização · Contato</span>
              <span className="font-semibold text-[#0A0A0A]">Padrão Prumo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
