import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { PrumoUniverseCanvas } from './PrumoUniverseCanvas';

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full flex flex-col justify-end overflow-hidden bg-[#070709] pt-24 pb-12 sm:pb-16 lg:pb-20"
    >
      {/* Interactive Three.js 3D Scene */}
      <PrumoUniverseCanvas />

      {/* Measured contrast scrim for crisp legibility over 3D geometry */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#070709] via-[#070709]/80 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-44 pointer-events-none bg-gradient-to-t from-[#070709] to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs sm:text-sm font-medium tracking-[0.16em] text-[#D4A853] mb-5"
          >
            PRUMO CREATORS · CREATIVE DIGITAL UNIVERSE
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#F5F4F0] [text-wrap:balance]"
          >
            CRIAMOS EXPERIÊNCIAS DIGITAIS QUE POSICIONAM CREATORS.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#D4D4D8]"
          >
            Apresentação comercial, identidade digital e experiências personalizadas para conectar
            influenciadores e marcas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold tracking-wide text-[#070709] bg-[#D4A853] hover:bg-[#E5BE67] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F5F4F0]"
            >
              EXPLORAR PROJETOS
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </a>

            <a
              href="#sobre"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium tracking-wide text-[#F5F4F0] border border-white/20 hover:border-[#D4A853] hover:text-[#D4A853] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
            >
              CONHECER A PRUMO
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        {/* Bottom Architectural Index Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-14 pt-6 border-t border-white/[0.1] flex flex-wrap items-center justify-between gap-4 text-xs text-[#A1A1AA]"
        >
          <span>Estúdio de Direção Digital · Branding · Experiências Interativas</span>
          <a
            href="#portfolio"
            className="inline-flex items-center gap-2 text-[#F5F4F0] hover:text-[#D4A853] transition-colors whitespace-nowrap"
          >
            <span>Coleções Creator Pro &amp; Experience</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono tabular-nums text-[#D4A853]">08 Projetos</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
