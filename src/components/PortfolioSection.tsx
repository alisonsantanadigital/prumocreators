import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PORTFOLIO_COLLECTIONS,
  PORTFOLIO_PROJECTS,
  type CollectionId,
  type PortfolioCollection,
  type PortfolioProject,
} from '../data/portfolio';

type FilterState = 'all' | CollectionId;
type LayoutMode = 'horizontal' | 'editorial';

function ProjectEntry({
  project,
  idx,
  layoutMode,
}: {
  project: PortfolioProject;
  idx: number;
  layoutMode: LayoutMode;
}) {
  const [imgError, setImgError] = useState(false);
  const hasLiveUrl = Boolean(project.url && project.url.trim().length > 0);
  const isAlternatingTall = layoutMode === 'horizontal' && idx % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: (idx % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col justify-between ${
        layoutMode === 'horizontal'
          ? 'snap-start shrink-0 w-[82vw] sm:w-[46vw] lg:w-[34vw] xl:w-[29vw]'
          : 'w-full'
      }`}
    >
      <div>
        {/* Presentation Image */}
        <div
          className={`relative w-full overflow-hidden bg-[#1A1A1A] ${
            isAlternatingTall ? 'aspect-[4/4.5]' : 'aspect-[4/3]'
          }`}
        >
          {!imgError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#1A1A1A]">
              <span className="text-[11px] tracking-[0.18em] text-[#A58A58] tabular-nums">
                {project.index}
              </span>
              <span className="mt-2 font-serif text-2xl text-[#F2F0EB]">{project.name}</span>
            </div>
          )}
        </div>

        {/* Editorial Portfolio Metadata & Description */}
        <div className="pt-5 pb-4 border-b border-white/12">
          <div className="flex items-center justify-between gap-3 text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
            <span>
              <span className="text-[#A58A58] tabular-nums">{project.index}</span> ·{' '}
              {project.category}
            </span>
            <span>{project.collectionLabel}</span>
          </div>

          <h4 className="mt-3 font-serif text-2xl sm:text-[1.75rem] font-normal leading-tight text-[#F2F0EB] group-hover:italic transition-all">
            {project.name}
          </h4>

          <p className="mt-2.5 text-sm leading-relaxed text-[#A7A49E]">
            {project.shortDescription}
          </p>
        </div>
      </div>

      {/* Action Link OR In-Development State */}
      <div className="pt-4">
        {hasLiveUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-between w-full py-2.5 text-[11px] font-medium tracking-[0.16em] uppercase text-[#F2F0EB] hover:text-[#A58A58] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A58A58]"
          >
            <span>EXPLORE PROJECT</span>
            <ArrowUpRight
              className="w-4 h-4 text-[#A58A58] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        ) : (
          <div className="py-2.5 text-[11px] tracking-[0.16em] uppercase text-[#A7A49E]">
            EM DESENVOLVIMENTO
          </div>
        )}
      </div>
    </motion.article>
  );
}

function CollectionGallery({
  collection,
  projects,
  layoutMode,
}: {
  collection: PortfolioCollection;
  projects: PortfolioProject[];
  layoutMode: LayoutMode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollTrack = (direction: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    const distance = Math.max(track.clientWidth * 0.65, 320);
    track.scrollBy({
      left: direction === 'next' ? distance : -distance,
      behavior: 'smooth',
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-5 border-b border-white/12">
        <div>
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-2 tabular-nums">
            COLEÇÃO {collection.number} — {collection.subtitle}
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#F2F0EB]">
            {collection.title}
          </h3>
        </div>

        {layoutMode === 'horizontal' && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => scrollTrack('prev')}
              aria-label={`Anterior em ${collection.title}`}
              className="w-10 h-10 inline-flex items-center justify-center border border-white/15 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollTrack('next')}
              aria-label={`Próximo em ${collection.title}`}
              className="w-10 h-10 inline-flex items-center justify-center border border-white/15 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {layoutMode === 'horizontal' ? (
        <div
          ref={trackRef}
          className="editorial-scroll-track flex items-start gap-8 overflow-x-auto pb-6 snap-x snap-mandatory"
        >
          {projects.map((project, idx) => (
            <ProjectEntry key={project.id} project={project} idx={idx} layoutMode="horizontal" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-14">
          {projects.map((project, idx) => (
            <ProjectEntry key={project.id} project={project} idx={idx} layoutMode="editorial" />
          ))}
        </div>
      )}
    </div>
  );
}

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<FilterState>('all');
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('horizontal');

  const visibleCollections =
    activeFilter === 'all'
      ? PORTFOLIO_COLLECTIONS
      : PORTFOLIO_COLLECTIONS.filter((c) => c.id === activeFilter);

  return (
    <section
      id="portfolio"
      className="relative py-28 sm:py-36 lg:py-44 bg-[#111111] text-[#F2F0EB]"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Section Header + Minimalist Filters */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-14 border-b border-white/12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A58A58] mb-5">
              04 — Selected Works
            </p>
            <h2 className="font-serif text-[clamp(2.3rem,4.2vw,4rem)] font-normal leading-[1.03] tracking-[-0.025em] text-[#F2F0EB] [text-wrap:balance]">
              Experiências criadas para{' '}
              <span className="italic">diferentes universos.</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div
              role="tablist"
              aria-label="Filtrar coleções"
              className="inline-flex flex-wrap items-center gap-1 p-1 border border-white/15"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-[#F2F0EB] text-[#111111]'
                    : 'text-[#A7A49E] hover:text-[#F2F0EB]'
                }`}
              >
                Todas
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'creator-pro'}
                onClick={() => setActiveFilter('creator-pro')}
                className={`px-3.5 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === 'creator-pro'
                    ? 'bg-[#F2F0EB] text-[#111111]'
                    : 'text-[#A7A49E] hover:text-[#F2F0EB]'
                }`}
              >
                01 · Creator Pro
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'creator-pro-experience'}
                onClick={() => setActiveFilter('creator-pro-experience')}
                className={`px-3.5 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === 'creator-pro-experience'
                    ? 'bg-[#F2F0EB] text-[#111111]'
                    : 'text-[#A7A49E] hover:text-[#F2F0EB]'
                }`}
              >
                02 · Experience
              </button>
            </div>

            <div
              role="group"
              aria-label="Modo de exibição"
              className="inline-flex items-center gap-1 p-1 border border-white/15"
            >
              <button
                type="button"
                onClick={() => setLayoutMode('horizontal')}
                className={`px-3 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  layoutMode === 'horizontal'
                    ? 'bg-[#A58A58] text-[#111111]'
                    : 'text-[#A7A49E] hover:text-[#F2F0EB]'
                }`}
              >
                Galeria
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('editorial')}
                className={`px-3 py-2 text-[11px] font-medium tracking-[0.12em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  layoutMode === 'editorial'
                    ? 'bg-[#A58A58] text-[#111111]'
                    : 'text-[#A7A49E] hover:text-[#F2F0EB]'
                }`}
              >
                Grade
              </button>
            </div>
          </div>
        </div>

        {/* Collections */}
        <div className="mt-16 space-y-24">
          {visibleCollections.map((collection) => {
            const projects = PORTFOLIO_PROJECTS.filter((p) => p.collection === collection.id);
            return (
              <CollectionGallery
                key={collection.id}
                collection={collection}
                projects={projects}
                layoutMode={layoutMode}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
