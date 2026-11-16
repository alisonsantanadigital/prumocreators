import { useState } from 'react';
import { ArrowUpRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PORTFOLIO_COLLECTIONS,
  PORTFOLIO_PROJECTS,
  type CollectionId,
  type PortfolioProject,
} from '../data/portfolio';

type FilterState = 'all' | CollectionId;

function ProjectCard({ project, idx }: { project: PortfolioProject; idx: number }) {
  const [imgError, setImgError] = useState(false);
  const hasLiveUrl = Boolean(project.url && project.url.trim().length > 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (idx % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group flex flex-col justify-between bg-[#0E0E13] border border-white/[0.08] hover:border-[#D4A853]/55 transition-colors duration-200 overflow-hidden"
    >
      <div>
        {/* Project Preview Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#14141A] border-b border-white/[0.08]">
          {!imgError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#16161C] to-[#070709]">
              <span className="font-mono text-xs text-[#D4A853] tabular-nums">{project.index}</span>
              <span className="mt-2 font-display text-lg font-semibold text-[#F5F4F0]">
                {project.name}
              </span>
            </div>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-[#070709]/70 via-transparent to-transparent opacity-80 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"
          />
        </div>

        {/* Project Copy & Unboxed Metadata */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3 text-xs text-[#A1A1AA]">
            <span className="inline-flex items-center gap-2">
              <span className="font-mono text-[#D4A853] tabular-nums">{project.index}</span>
              <span aria-hidden="true">/</span>
              <span>{project.category}</span>
            </span>
            <span>{project.collectionLabel}</span>
          </div>

          <h4 className="mt-3 font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F4F0] group-hover:text-[#D4A853] transition-colors duration-150">
            {project.name}
          </h4>

          <p className="mt-3 text-sm leading-relaxed text-[#A1A1AA]">
            {project.shortDescription}
          </p>
        </div>
      </div>

      {/* Action Footer: Live External Link OR In-Development State */}
      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-4">
        {hasLiveUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-between gap-3 px-5 py-3 text-xs font-semibold tracking-wider text-[#070709] bg-[#F5F4F0] group-hover:bg-[#D4A853] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4A853]"
          >
            <span>EXPLORAR EXPERIÊNCIA</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        ) : (
          <div className="w-full inline-flex items-center justify-between gap-3 px-4 py-3 text-xs font-medium text-[#A1A1AA] bg-[#09090C] border border-white/[0.06]">
            <span>Demonstração em desenvolvimento</span>
            <Clock className="w-3.5 h-3.5 text-[#D4A853]/70 shrink-0" aria-hidden="true" />
          </div>
        )}
      </div>
    </motion.article>
  );
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterState>('all');

  const visibleCollections =
    activeFilter === 'all'
      ? PORTFOLIO_COLLECTIONS
      : PORTFOLIO_COLLECTIONS.filter((c) => c.id === activeFilter);

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#070709] border-t border-white/[0.08]">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Section Header + Interactive Collection Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.14em] text-[#D4A853] mb-4">
              03. Portfólio · Centro da Experiência
            </p>
            <h2 className="font-display text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1.08] tracking-[-0.025em] text-[#F5F4F0] [text-wrap:balance]">
              Oito projetos independentes divididos em duas coleções autorais.
            </h2>
          </div>

          {/* Interactive Filter Controls */}
          <div
            role="tablist"
            aria-label="Filtrar coleções do portfólio"
            className="inline-flex flex-wrap items-center gap-1.5 p-1.5 bg-[#0E0E13] border border-white/[0.08]"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                activeFilter === 'all'
                  ? 'bg-[#D4A853] text-[#070709]'
                  : 'text-[#A1A1AA] hover:text-[#F5F4F0]'
              }`}
            >
              Todas as Coleções
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'creator-pro'}
              onClick={() => setActiveFilter('creator-pro')}
              className={`px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                activeFilter === 'creator-pro'
                  ? 'bg-[#D4A853] text-[#070709]'
                  : 'text-[#A1A1AA] hover:text-[#F5F4F0]'
              }`}
            >
              01 · Creator Pro
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeFilter === 'creator-pro-experience'}
              onClick={() => setActiveFilter('creator-pro-experience')}
              className={`px-4 py-2 text-xs font-semibold transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#D4A853] ${
                activeFilter === 'creator-pro-experience'
                  ? 'bg-[#D4A853] text-[#070709]'
                  : 'text-[#A1A1AA] hover:text-[#F5F4F0]'
              }`}
            >
              02 · Creator Pro Experience
            </button>
          </div>
        </div>

        {/* Collections Loop */}
        <div className="mt-14 space-y-20">
          {visibleCollections.map((collection) => {
            const projects = PORTFOLIO_PROJECTS.filter((p) => p.collection === collection.id);

            return (
              <div key={collection.id}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline mb-8">
                  <div className="lg:col-span-6 flex items-baseline gap-4">
                    <span className="font-mono text-sm text-[#D4A853] tabular-nums">
                      COLEÇÃO {collection.number}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[#F5F4F0]">
                      {collection.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                    <span className="text-sm font-medium text-[#D4A853]">
                      {collection.subtitle}
                    </span>
                    <p className="text-sm text-[#A1A1AA] max-w-md">{collection.description}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {projects.map((project, idx) => (
                    <ProjectCard key={project.id} project={project} idx={idx} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
