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
type LayoutMode = 'horizontal' | 'grid';

function ProjectCard({
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
  const isTallCrop = layoutMode === 'horizontal' && idx % 2 === 1;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: (idx % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col justify-between bg-[#0A0A0A] border border-white/10 hover:border-white/35 transition-colors duration-200 ${
        layoutMode === 'horizontal'
          ? 'snap-start shrink-0 w-[82vw] sm:w-[46vw] lg:w-[34vw] xl:w-[29vw]'
          : 'w-full'
      }`}
    >
      <div>
        {/* Editorial Photography Crop */}
        <div
          className={`relative w-full overflow-hidden bg-[#141414] border-b border-white/10 ${
            isTallCrop ? 'aspect-[4/4.4]' : 'aspect-[4/3]'
          }`}
        >
          {!imgError ? (
            <img
              src={project.image}
              alt={project.imageAlt}
              referrerPolicy="no-referrer"
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#141414]">
              <span className="text-xs tracking-[0.15em] text-[#9A968E] tabular-nums">
                {project.index}
              </span>
              <span className="mt-2 font-serif text-2xl text-[#F6F4EE]">{project.name}</span>
            </div>
          )}
        </div>

        {/* Unboxed Editorial Caption */}
        <div className="p-6 sm:p-7">
          <div className="flex items-center justify-between gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[#9A968E]">
            <span className="inline-flex items-center gap-2">
              <span className="text-[#F6F4EE] tabular-nums">{project.index}</span>
              <span aria-hidden="true">/</span>
              <span>{project.category}</span>
            </span>
            <span>{project.collectionLabel}</span>
          </div>

          <h4 className="mt-3 font-serif text-2xl sm:text-[1.7rem] font-medium leading-tight tracking-tight text-[#F6F4EE] group-hover:italic transition-all">
            {project.name}
          </h4>

          <p className="mt-3 text-sm leading-relaxed text-[#B5B0A6]">
            {project.shortDescription}
          </p>
        </div>
      </div>

      {/* External Action OR In-Development Label */}
      <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-4 border-t border-white/10">
        {hasLiveUrl ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-between gap-3 px-5 py-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#0A0A0A] bg-[#F6F4EE] group-hover:bg-[#8C261A] group-hover:text-[#F6F4EE] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6F4EE]"
          >
            <span>EXPLORAR EXPERIÊNCIA</span>
            <ArrowUpRight
              className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        ) : (
          <div className="w-full py-3 px-4 border border-white/10 text-xs tracking-[0.1em] uppercase text-[#9A968E] text-center">
            Demonstração em desenvolvimento
          </div>
        )}
      </div>
    </motion.article>
  );
}

function CollectionBlock({
  collection,
  projects,
  layoutMode,
}: {
  collection: PortfolioCollection;
  projects: PortfolioProject[];
  layoutMode: LayoutMode;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  const scrollByCard = (direction: 'prev' | 'next') => {
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
      {/* Collection Editorial Header + Horizontal Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-end mb-8">
        <div className="lg:col-span-6">
          <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#9A968E] mb-2 tabular-nums">
            COLEÇÃO {collection.number} · {collection.subtitle}
          </p>
          <h3 className="font-serif text-3xl sm:text-4xl font-medium text-[#F6F4EE]">
            {collection.title}
          </h3>
        </div>

        <div className="lg:col-span-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <p className="text-sm leading-relaxed text-[#B5B0A6] max-w-md">
            {collection.description}
          </p>

          {layoutMode === 'horizontal' && (
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => scrollByCard('prev')}
                aria-label={`Rolar ${collection.title} para a esquerda`}
                className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-[#F6F4EE] hover:border-[#F6F4EE] hover:bg-[#F6F4EE] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard('next')}
                aria-label={`Rolar ${collection.title} para a direita`}
                className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-[#F6F4EE] hover:border-[#F6F4EE] hover:bg-[#F6F4EE] hover:text-[#0A0A0A] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Horizontal Runway OR Editorial Grid */}
      {layoutMode === 'horizontal' ? (
        <div
          ref={trackRef}
          className="editorial-scroll-track flex items-start gap-6 overflow-x-auto pb-6 snap-x snap-mandatory"
        >
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} layoutMode="horizontal" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} layoutMode="grid" />
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
      className="relative py-24 sm:py-32 lg:py-36 bg-[#0A0A0A] text-[#F6F4EE] border-t border-white/10"
    >
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        {/* Section Header + Collection & Layout Controls */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-8 pb-12 border-b border-white/15">
          <div className="max-w-2xl">
            <p className="text-xs font-medium tracking-[0.18em] uppercase text-[#9A968E] mb-4">
              03 · Portfólio — Centro da Experiência
            </p>
            <h2 className="font-serif text-[clamp(2.2rem,4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-[#F6F4EE] [text-wrap:balance]">
              Oito projetos independentes em duas{' '}
              <span className="italic font-normal">coleções editoriais</span>.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* Collection Filter */}
            <div
              role="tablist"
              aria-label="Filtrar coleções do portfólio"
              className="inline-flex flex-wrap items-center gap-1 p-1 border border-white/15 bg-[#121212]"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.06em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === 'all'
                    ? 'bg-[#F6F4EE] text-[#0A0A0A]'
                    : 'text-[#B5B0A6] hover:text-[#F6F4EE]'
                }`}
              >
                Todas
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'creator-pro'}
                onClick={() => setActiveFilter('creator-pro')}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.06em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === 'creator-pro'
                    ? 'bg-[#F6F4EE] text-[#0A0A0A]'
                    : 'text-[#B5B0A6] hover:text-[#F6F4EE]'
                }`}
              >
                01 · Creator Pro
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'creator-pro-experience'}
                onClick={() => setActiveFilter('creator-pro-experience')}
                className={`px-3.5 py-2 text-xs font-medium tracking-[0.06em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === 'creator-pro-experience'
                    ? 'bg-[#F6F4EE] text-[#0A0A0A]'
                    : 'text-[#B5B0A6] hover:text-[#F6F4EE]'
                }`}
              >
                02 · Experience
              </button>
            </div>

            {/* Layout Mode Switcher */}
            <div
              role="group"
              aria-label="Modo de exibição da galeria"
              className="inline-flex items-center gap-1 p-1 border border-white/15 bg-[#121212]"
            >
              <button
                type="button"
                onClick={() => setLayoutMode('horizontal')}
                className={`px-3 py-2 text-xs font-medium tracking-[0.06em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  layoutMode === 'horizontal'
                    ? 'bg-[#8C261A] text-[#F6F4EE]'
                    : 'text-[#B5B0A6] hover:text-[#F6F4EE]'
                }`}
              >
                Galeria Horizontal
              </button>
              <button
                type="button"
                onClick={() => setLayoutMode('grid')}
                className={`px-3 py-2 text-xs font-medium tracking-[0.06em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  layoutMode === 'grid'
                    ? 'bg-[#8C261A] text-[#F6F4EE]'
                    : 'text-[#B5B0A6] hover:text-[#F6F4EE]'
                }`}
              >
                Grade
              </button>
            </div>
          </div>
        </div>

        {/* Collections Loop */}
        <div className="mt-14 space-y-24">
          {visibleCollections.map((collection) => {
            const projects = PORTFOLIO_PROJECTS.filter((p) => p.collection === collection.id);
            return (
              <CollectionBlock
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
