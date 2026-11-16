import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PRACTICE_AREAS } from '../data/studio';
import {
  AnimatedCounter,
  ProgressBar,
  StaggeredText,
  Tilt3D,
} from './motion/MotionPrimitives';

export function PracticeSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});
  const prefersReduced = useReducedMotion();
  const activeArea = PRACTICE_AREAS[activeIndex];
  const progressPercent = ((activeIndex + 1) / PRACTICE_AREAS.length) * 100;

  return (
    <section
      id="atuacao"
      className="relative py-28 sm:py-36 lg:py-44 bg-[#F2F0EB] text-[#111111] border-t border-[#111111]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pb-14 border-b border-[#111111]/12">
          <div className="lg:col-span-7">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-5">
              03 — O Que Fazemos
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.02em] text-[#111111] [text-wrap:balance]">
              <StaggeredText
                stagger={0.045}
                segments={[
                  { text: 'Quatro frentes de atuação em ' },
                  { text: 'arquitetura digital', italic: true },
                  { text: '.' },
                ]}
              />
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
              Prática Editorial &amp; Comercial
            </span>
          </div>
        </div>

        {/* Non-card Editorial Line Composition + Dynamic Photography Plate */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Editorial Numbered Index */}
          <div className="lg:col-span-7 divide-y divide-[#111111]/12 border-b border-[#111111]/12">
            {PRACTICE_AREAS.map((area, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="w-full py-8 sm:py-10 text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A58A58]"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-6 items-baseline">
                    <span
                      className={`sm:col-span-2 text-xs font-medium tracking-[0.18em] tabular-nums transition-colors ${
                        isActive ? 'text-[#A58A58]' : 'text-[#A7A49E]'
                      }`}
                    >
                      <AnimatedCounter
                        value={idx + 1}
                        padLength={2}
                        duration={650 + idx * 120}
                      />
                    </span>

                    <div className="sm:col-span-10">
                      <h3
                        className={`font-serif text-2xl sm:text-4xl font-normal tracking-tight transition-colors ${
                          isActive
                            ? 'text-[#111111]'
                            : 'text-[#111111]/55 group-hover:text-[#111111]'
                        }`}
                      >
                        {area.title}
                      </h3>
                      <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#5C5A55] max-w-xl">
                        {area.description}
                      </p>
                      <div className="mt-5 max-w-xs">
                        <ProgressBar
                          progress={isActive ? 100 : 18}
                          trackClassName="bg-[#111111]/8"
                          fillClassName={isActive ? 'bg-[#A58A58]' : 'bg-[#111111]/20'}
                        />
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Interactive 3D Tilt Editorial Preview Frame */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 pt-2">
            <Tilt3D maxTilt={3.2}>
              <div className="relative aspect-[3/4] overflow-hidden bg-[#E5E2DC]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeArea.id}
                    initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    {!imgErrors[activeArea.id] ? (
                      <img
                        src={activeArea.image}
                        alt={activeArea.imageAlt}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setImgErrors((prev) => ({ ...prev, [activeArea.id]: true }))
                        }
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#E5E2DC]" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </Tilt3D>

            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-[11px] tracking-[0.14em] uppercase text-[#A7A49E]">
                <span className="text-[#111111]">{activeArea.title}</span>
                <span className="tabular-nums text-[#A58A58]">
                  <AnimatedCounter value={activeIndex + 1} padLength={2} duration={450} /> /{' '}
                  <AnimatedCounter value={PRACTICE_AREAS.length} padLength={2} duration={700} />
                </span>
              </div>
              <ProgressBar
                progress={progressPercent}
                trackClassName="bg-[#111111]/10"
                fillClassName="bg-[#A58A58]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
