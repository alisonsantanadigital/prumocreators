import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SOLUTIONS } from '../data/studio';

export function SolutionsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const activeSolution = SOLUTIONS[activeIndex];

  return (
    <section
      id="solucoes"
      className="relative py-24 sm:py-32 lg:py-36 bg-[#EAE7DF] text-[#0A0A0A] border-t border-[#0A0A0A]/10"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-[#0A0A0A]/15">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#8C261A] mb-4">
              02 · Soluções
            </p>
            <h2 className="font-serif text-[clamp(2.1rem,3.8vw,3.5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-[#0A0A0A] [text-wrap:balance]">
              Quatro formatos autorais para estruturar{' '}
              <span className="italic font-normal">posicionamento</span> e diálogo com marcas.
            </h2>
          </div>

          <p className="max-w-md text-sm sm:text-base leading-relaxed text-[#57534E]">
            Selecione uma frente para explorar a composição visual e os elementos que integram cada
            entrega da Prumo Creators.
          </p>
        </div>

        {/* Interactive Editorial Lookbook Split */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: Numbered Editorial Index */}
          <div className="lg:col-span-7 divide-y divide-[#0A0A0A]/15 border-b border-[#0A0A0A]/15">
            {SOLUTIONS.map((item, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div key={item.id} className="py-7 sm:py-8">
                  <button
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    className="w-full text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0A0A0A]"
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <div className="flex items-baseline gap-5 sm:gap-7">
                        <span
                          className={`text-xs font-medium tracking-[0.14em] tabular-nums transition-colors ${
                            isActive ? 'text-[#8C261A]' : 'text-[#6B6860]'
                          }`}
                        >
                          {item.index}
                        </span>
                        <h3
                          className={`font-serif text-3xl sm:text-4xl font-medium tracking-tight transition-colors ${
                            isActive
                              ? 'text-[#0A0A0A]'
                              : 'text-[#0A0A0A]/55 group-hover:text-[#0A0A0A]'
                          }`}
                        >
                          {item.title}
                        </h3>
                      </div>

                      <ArrowUpRight
                        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                          isActive
                            ? 'text-[#8C261A] translate-x-0.5 -translate-y-0.5'
                            : 'text-[#6B6860] group-hover:text-[#0A0A0A]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-2 pl-9 sm:pl-11 text-xs sm:text-sm font-medium tracking-wide text-[#57534E]">
                      {item.subtitle}
                    </p>
                  </button>

                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-5 pl-9 sm:pl-11 space-y-4"
                    >
                      <p className="text-sm sm:text-base leading-relaxed text-[#2D2B27] max-w-xl">
                        {item.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-[#57534E]">
                        {item.deliverables.map((deliv, dIdx) => (
                          <span key={deliv} className="inline-flex items-center gap-3">
                            <span className="font-medium text-[#0A0A0A]">{deliv}</span>
                            {dIdx < item.deliverables.length - 1 && (
                              <span aria-hidden="true" className="text-[#8C261A]">
                                ·
                              </span>
                            )}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right: Editorial Lookbook Plate */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="bg-[#F6F4EE] p-3 border border-[#0A0A0A]/12">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#141414]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSolution.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    {!imgErrors[activeSolution.id] ? (
                      <img
                        src={activeSolution.image}
                        alt={activeSolution.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [activeSolution.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-8 text-center bg-[#181818] text-[#F6F4EE]">
                        <span className="font-serif text-2xl">{activeSolution.title}</span>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="pt-3 px-1 flex items-center justify-between text-xs tracking-[0.1em] uppercase text-[#57534E]">
                <span className="font-medium text-[#0A0A0A]">{activeSolution.title}</span>
                <span className="tabular-nums">{activeSolution.index} / 04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
