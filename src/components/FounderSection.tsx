import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FOUNDER_PROFILE } from '../data/studio';
import {
  ProgressBar,
  StaggeredText,
  useInViewObserver,
} from './motion/MotionPrimitives';

export function FounderSection() {
  const [imgError, setImgError] = useState(false);
  const prefersReduced = useReducedMotion();
  const [frameRef, frameInView] = useInViewObserver<HTMLDivElement>({
    threshold: 0.16,
    once: true,
  });

  return (
    <section
      id="fundador"
      className="relative py-24 sm:py-32 bg-[#F2F0EB] text-[#111111] border-t border-[#111111]/10"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Founder Portrait */}
          <div ref={frameRef} className="lg:col-span-5">
            <div className="aspect-[4/5] max-w-md overflow-hidden bg-[#E5E2DC]">
              {!imgError ? (
                <motion.img
                  src={FOUNDER_PROFILE.photo}
                  alt={FOUNDER_PROFILE.photoAlt}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  initial={prefersReduced ? false : { scale: 1.04, opacity: 0.85 }}
                  animate={
                    frameInView || prefersReduced
                      ? { scale: 1, opacity: 1 }
                      : { scale: 1.04, opacity: 0.85 }
                  }
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full object-cover object-top will-change-transform"
                />
              ) : (
                <div className="w-full h-full bg-[#E5E2DC]" />
              )}
            </div>
            <p className="mt-3 text-[11px] tracking-[0.14em] uppercase text-[#A7A49E]">
              {FOUNDER_PROFILE.role}
            </p>
          </div>

          {/* Simple, Direct Biography */}
          <div className="lg:col-span-7 max-w-2xl">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-5">
              {FOUNDER_PROFILE.eyebrow}
            </p>

            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.75rem)] font-normal leading-[1.04] tracking-[-0.02em] text-[#111111] [text-wrap:balance]">
              <StaggeredText
                stagger={0.04}
                segments={[{ text: FOUNDER_PROFILE.name }]}
              />
            </h2>

            <p className="mt-3 font-serif italic text-xl sm:text-2xl text-[#5C5A55]">
              {FOUNDER_PROFILE.subtitle}
            </p>

            <div className="mt-7 space-y-6">
              <div className="w-12">
                <ProgressBar
                  progress={100}
                  trackClassName="bg-[#111111]/10"
                  fillClassName="bg-[#A58A58]"
                  delay={0.1}
                />
              </div>

              <p className="text-base sm:text-lg leading-[1.75] text-[#2A2927]">
                {FOUNDER_PROFILE.bio}
              </p>

              <div className="pt-2">
                <a
                  href="#contato"
                  className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] uppercase text-[#111111] border-b border-[#A58A58] pb-1 hover:text-[#A58A58] transition-colors"
                >
                  <span>Conversar sobre seu projeto</span>
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
