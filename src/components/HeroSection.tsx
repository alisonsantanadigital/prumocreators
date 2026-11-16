import { useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { STUDIO_MEDIA } from '../data/studio';
import { PrumoMark } from './PrumoMark';
import { MagneticButton, StaggeredText } from './motion/MotionPrimitives';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], prefersReduced ? ['0%', '0%'] : ['0%', '10%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, prefersReduced ? 1 : 0.15]);
  const hasVideo = Boolean(STUDIO_MEDIA.heroVideo && STUDIO_MEDIA.heroVideo.trim().length > 0);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex flex-col justify-end bg-[#11100E] text-[#F2F0EB] overflow-hidden"
    >
      {/* 1. Full-Bleed Protagonist Editorial Media with Cinematic Entrance & Parallax */}
      <motion.div
        style={{ y: mediaY }}
        className="absolute -top-[6%] -bottom-[10%] inset-x-0 pointer-events-none select-none will-change-transform"
      >
        {hasVideo ? (
          <video
            src={STUDIO_MEDIA.heroVideo}
            poster={STUDIO_MEDIA.heroCampaign}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover object-[75%_22%] md:object-center"
          />
        ) : !imgError ? (
          <motion.img
            src={STUDIO_MEDIA.heroCampaign}
            alt={STUDIO_MEDIA.heroCampaignAlt}
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            initial={prefersReduced ? false : { scale: 1.06, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full object-cover object-[76%_center] md:object-[80%_center] will-change-transform"
          />
        ) : (
          <div className="w-full h-full bg-[#161513]" />
        )}
      </motion.div>

      {/* 2. Atmospheric Depth Layers: Left Editorial Scrim + Ambient Tonal Drift + Seamless Bottom Dissolve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(14,13,12,0.88) 0%, rgba(14,13,12,0.62) 38%, rgba(14,13,12,0.18) 68%, rgba(14,13,12,0.22) 100%)',
        }}
      />

      {/* Mobile-specific bottom legibility veil so text never clashes with lower highlights */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 md:hidden"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,13,12,0.32) 0%, rgba(14,13,12,0.12) 32%, rgba(14,13,12,0.72) 58%, rgba(17,16,14,0.94) 80%, #11100E 100%)',
        }}
      />

      {/* Subtle Moving Ambient Light Layer */}
      <div
        aria-hidden="true"
        className="prumo-ambient-gradient pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 58% 52% at 68% 36%, rgba(165, 138, 88, 0.16) 0%, rgba(165, 138, 88, 0.05) 45%, transparent 75%)',
        }}
      />

      {/* Progressive Bottom Edge Fade into Continuous Site Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%]"
        style={{
          background:
            'linear-gradient(180deg, rgba(17,16,14,0) 0%, rgba(17,16,14,0.48) 48%, rgba(17,16,14,0.88) 82%, #11100E 100%)',
        }}
      />

      {/* Top Atmospheric Vignette under Fixed Navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,13,12,0.72) 0%, rgba(14,13,12,0) 100%)',
        }}
      />

      {/* 3. Editorial Overlay Composition (Uncluttered Typography + Generous Negative Space) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16 pt-28 sm:pt-32 pb-8 sm:pb-12 lg:pb-14"
      >
        <div className="max-w-2xl">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3.5 mb-6 sm:mb-8"
          >
            <motion.div
              animate={prefersReduced ? undefined : { y: [0, -4, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
              className="shrink-0 will-change-transform"
            >
              <PrumoMark className="w-5 h-8 text-[#F2F0EB]" />
            </motion.div>
            <div className="h-px w-8 bg-[#A58A58]" aria-hidden="true" />
            <span className="text-[11px] font-medium tracking-[0.24em] uppercase text-[#F2F0EB]/90">
              PRUMO CREATORS
            </span>
          </motion.div>

          <h1 className="font-serif text-[clamp(2.4rem,5.2vw,5.1rem)] font-normal leading-[1.01] tracking-[-0.025em] text-[#F2F0EB] [text-wrap:balance]">
            <StaggeredText
              immediate
              delay={0.04}
              stagger={0.035}
              segments={[
                { text: 'Conectamos ' },
                { text: 'criadores,', italic: true },
                { text: ' marcas e oportunidades.' },
              ]}
            />
          </h1>

          <motion.p
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-6 text-sm sm:text-base leading-relaxed text-[#D8D4CC] max-w-md"
          >
            Experiências digitais e apresentações comerciais sob medida.
          </motion.p>

          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6"
          >
            <MagneticButton>
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#111111] bg-[#F2F0EB] hover:bg-[#A58A58] transition-colors duration-200 whitespace-nowrap"
              >
                <span>Explorar projetos</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </MagneticButton>

            <a
              href="#contato"
              className="text-[11px] font-medium tracking-[0.16em] uppercase text-[#F2F0EB] border-b border-[#A58A58] pb-1 hover:text-[#A58A58] transition-colors duration-200 whitespace-nowrap"
            >
              Iniciar parceria
            </a>
          </motion.div>
        </div>

        {/* Minimalist Bottom Scroll Indicator */}
        <div className="mt-12 sm:mt-16 pt-5 border-t border-white/12 flex items-center justify-between gap-4">
          <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
            Direção de Arte · Estratégia · Experiências Digitais
          </span>

          <a
            href="#manifesto"
            className="inline-flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase text-[#F2F0EB]/85 hover:text-[#A58A58] transition-colors whitespace-nowrap"
          >
            <span>Role para explorar</span>
            <motion.span
              aria-hidden="true"
              animate={prefersReduced ? undefined : { y: [0, 4, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
              className="block w-px h-5 bg-[#A58A58]"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
