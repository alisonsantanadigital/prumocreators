import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ImageIcon,
  Maximize2,
  X,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  type PanInfo,
} from 'motion/react';
import {
  PORTFOLIO_COLLECTIONS,
  PORTFOLIO_PROJECTS,
  type CollectionId,
  type PortfolioProject,
} from '../data/portfolio';
import {
  AnimatedCounter,
  MagneticButton,
  ProgressBar,
  StaggeredText,
  Tilt3D,
} from './motion/MotionPrimitives';

const STACK_OFFSETS = [
  { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 },
  { x: 18, y: 10, scale: 0.965, rotate: 1.6, opacity: 0.82, zIndex: 20 },
  { x: 34, y: 20, scale: 0.93, rotate: 3.1, opacity: 0.56, zIndex: 10 },
  { x: -16, y: 14, scale: 0.91, rotate: -2.0, opacity: 0.36, zIndex: 5 },
];

function LiveSitePreview({
  url,
  title,
  fallbackImage,
  fallbackAlt,
  isFront,
}: {
  url: string;
  title: string;
  fallbackImage: string | null;
  fallbackAlt: string;
  isFront: boolean;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0.5);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setIframeLoaded(false);
  }, [url]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === 'undefined') return;
    const updateScale = () => {
      const w = el.clientWidth;
      if (w > 0) setScale(w / 1440);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-[#0D0D0D]">
      {fallbackImage && !imgError && (
        <img
          src={fallbackImage}
          alt={fallbackAlt}
          referrerPolicy="no-referrer"
          draggable={false}
          onError={() => setImgError(true)}
          className={`w-full h-full object-cover object-top select-none transition-transform duration-500 ${
            isFront ? 'group-hover/media:scale-[1.015]' : ''
          }`}
        />
      )}

      {isFront && (
        <iframe
          src={url}
          title={`Prévia automática ao vivo de ${title}`}
          loading="lazy"
          tabIndex={-1}
          onLoad={() => setIframeLoaded(true)}
          style={{
            width: 1440,
            height: 900,
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
          }}
          className={`pointer-events-none select-none absolute top-0 left-0 border-0 bg-white transition-opacity duration-500 ${
            iframeLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}

function DeckCardContent({
  project,
  isFront,
  onOpenZoom,
}: {
  project: PortfolioProject;
  isFront: boolean;
  onOpenZoom?: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const hasLiveUrl = Boolean(project.url && project.url.trim().length > 0);
  const hasScreenshot = Boolean(project.heroScreenshot) && !imgError;
  const hasPreviewVideo = Boolean(project.previewVideo && project.previewVideo.trim().length > 0);

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (isFront && hasPreviewVideo && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (hasPreviewVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`flex flex-col h-full bg-[#161616] overflow-hidden transition-colors duration-300 ${
        isFront
          ? 'border border-[#A58A58]/40 shadow-[0_28px_70px_rgba(0,0,0,0.72)]'
          : 'border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.55)]'
      }`}
    >
      {/* Main Area: Automatic Live Site Preview (when published) + Fallback Screenshot */}
      <div className="relative w-full aspect-[16/10] bg-[#0D0D0D] border-b border-white/10 overflow-hidden group/media">
        {hasLiveUrl ? (
          <LiveSitePreview
            url={project.url}
            title={project.name}
            fallbackImage={project.heroScreenshot}
            fallbackAlt={project.screenshotAlt}
            isFront={isFront}
          />
        ) : hasScreenshot ? (
          <img
            src={project.heroScreenshot!}
            alt={project.screenshotAlt}
            referrerPolicy="no-referrer"
            draggable={false}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top select-none transition-transform duration-500 ${
              isFront ? 'group-hover/media:scale-[1.015]' : ''
            }`}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-10 text-center bg-[#121212]">
            <div className="w-11 h-11 mb-4 flex items-center justify-center border border-[#A58A58]/40 text-[#A58A58]">
              <ImageIcon className="w-5 h-5" aria-hidden="true" />
            </div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#A58A58]">
              Captura da Hero Pendente
            </p>
            <p className="mt-2 font-serif text-xl sm:text-2xl text-[#F2F0EB]">
              {project.name}
            </p>
            <p className="mt-2 max-w-md text-xs leading-relaxed text-[#A7A49E]">
              Área reservada para inserir o print real da primeira dobra assim que o projeto for
              publicado.
            </p>
          </div>
        )}

        {/* Real video preview layer (renders only when a real previewVideo exists) */}
        {isFront && hasPreviewVideo && (
          <video
            ref={videoRef}
            src={project.previewVideo!}
            muted
            loop
            playsInline
            preload="metadata"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Click-to-zoom Lightbox button on the front card */}
        {isFront && onOpenZoom && (
          <button
            type="button"
            onClick={onOpenZoom}
            aria-label={`Ampliar visualização de ${project.name}`}
            className="absolute inset-0 w-full h-full cursor-zoom-in focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#A58A58]"
          >
            <span className="pointer-events-none absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 px-3 py-1.5 bg-[#111111]/85 border border-white/20 text-[10px] font-medium tracking-[0.15em] uppercase text-[#F2F0EB] opacity-0 group-hover/media:opacity-100 transition-opacity duration-200">
              <Maximize2 className="w-3 h-3 text-[#A58A58]" aria-hidden="true" />
              <span>Ampliar</span>
            </span>
          </button>
        )}
      </div>

      {/* Card Editorial Footer: Category, Project Name, Short Visual Concept & Discrete Action */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4 bg-[#151515]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-start">
          <div className="md:col-span-5">
            <p className="text-[10px] sm:text-[11px] font-medium tracking-[0.18em] uppercase text-[#A58A58]">
              {project.collectionLabel} · {project.category}
            </p>
            <h3 className="mt-1 font-serif text-xl sm:text-[1.65rem] font-normal leading-tight text-[#F2F0EB]">
              {project.name}
            </h3>
          </div>

          <div className="md:col-span-7">
            <p className="text-xs sm:text-sm leading-relaxed text-[#C4C0B8]">
              {project.visualConcept}
            </p>
          </div>
        </div>

        <div className="pt-3.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <span className="text-[11px] tracking-[0.16em] uppercase text-[#A7A49E] tabular-nums">
            Carta {project.indexInCollection} · Acervo {project.globalNumber} / 08
          </span>

          {hasLiveUrl ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isFront ? 0 : -1}
              onPointerDown={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#F2F0EB] border border-[#A58A58]/60 hover:bg-[#A58A58] hover:text-[#111111] transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A58A58]"
            >
              <span>Explorar projeto</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          ) : (
            <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#A7A49E]">
              Projeto em desenvolvimento
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectLightbox({
  project,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalInCollection,
}: {
  project: PortfolioProject;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalInCollection: number;
}) {
  const prefersReduced = useReducedMotion();
  const hasLiveUrl = Boolean(project.url && project.url.trim().length > 0);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização ampliada de ${project.name}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: prefersReduced ? 0 : 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-[#0A0A0A]/92 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
    >
      <motion.div
        initial={prefersReduced ? { opacity: 1 } : { scale: 0.96, y: 16, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={prefersReduced ? { opacity: 0 } : { scale: 0.97, y: 10, opacity: 0 }}
        transition={{ duration: prefersReduced ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[1120px] max-h-[92vh] bg-[#141414] border border-[#A58A58]/35 shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Top Lightbox Header */}
        <div className="px-5 sm:px-7 py-4 border-b border-white/10 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-[#A58A58] truncate">
              {project.collectionLabel} · {project.category} · 0{currentIndex + 1} / 0
              {totalInCollection}
            </p>
            <h3 className="font-serif text-xl sm:text-2xl font-normal text-[#F2F0EB] truncate">
              {project.name}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar visualização ampliada"
            className="w-10 h-10 inline-flex items-center justify-center border border-white/20 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Enlarged Live Interactive Stage */}
        <div className="relative flex-1 min-h-0 bg-[#0D0D0D] overflow-auto flex items-center justify-center p-3 sm:p-6">
          {hasLiveUrl ? (
            <div className="w-full h-[64vh] bg-white overflow-hidden">
              <iframe
                src={project.url}
                title={`Visualização ao vivo de ${project.name}`}
                className="w-full h-full border-0 bg-white"
              />
            </div>
          ) : project.heroScreenshot ? (
            <img
              src={project.heroScreenshot}
              alt={project.screenshotAlt}
              className="w-full max-h-[64vh] object-contain"
            />
          ) : (
            <div className="py-16 px-6 text-center max-w-md">
              <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center border border-[#A58A58]/40 text-[#A58A58]">
                <ImageIcon className="w-5 h-5" aria-hidden="true" />
              </div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-[#A58A58]">
                Captura da Hero Pendente
              </p>
              <p className="mt-2 font-serif text-2xl text-[#F2F0EB]">{project.name}</p>
              <p className="mt-2 text-xs leading-relaxed text-[#A7A49E]">
                Área reservada para inserir o print real da primeira dobra assim que o projeto for
                publicado.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Lightbox Footer & Controls */}
        <div className="px-5 sm:px-7 py-4 border-t border-white/10 bg-[#151515] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#C4C0B8] max-w-2xl">{project.visualConcept}</p>

          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onPrev}
                aria-label="Projeto anterior no zoom"
                className="w-9 h-9 inline-flex items-center justify-center border border-white/20 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                aria-label="Próximo projeto no zoom"
                className="w-9 h-9 inline-flex items-center justify-center border border-white/20 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {hasLiveUrl ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#111111] bg-[#F2F0EB] hover:bg-[#A58A58] transition-colors whitespace-nowrap"
              >
                <span>Explorar projeto</span>
                <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            ) : (
              <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-[#A7A49E]">
                Projeto em desenvolvimento
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PortfolioSection() {
  const [activeCollection, setActiveCollection] = useState<CollectionId>('creator-pro');
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prefersReduced = useReducedMotion();
  const dragMovedRef = useRef(false);

  // Horizontal Drag Slider state (mouse drag-to-scroll + touch swipe)
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const sliderDragRef = useRef({ isDown: false, startX: 0, scrollLeft: 0, moved: false });
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);

  const collectionProjects = PORTFOLIO_PROJECTS.filter(
    (project) => project.collection === activeCollection,
  );
  const totalInCollection = collectionProjects.length;
  const safeIndex = activeIndex % totalInCollection;
  const activeProject = collectionProjects[safeIndex];
  const currentCollectionInfo = PORTFOLIO_COLLECTIONS.find((c) => c.id === activeCollection)!;

  const handleCollectionChange = (collectionId: CollectionId) => {
    if (collectionId === activeCollection) return;
    setDirection(1);
    setActiveCollection(collectionId);
    setActiveIndex(0);
  };

  const goNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalInCollection);
  }, [totalInCollection]);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalInCollection) % totalInCollection);
  }, [totalInCollection]);

  const goToIndex = (targetIdx: number) => {
    if (targetIdx === safeIndex) return;
    setDirection(targetIdx > safeIndex ? 1 : -1);
    setActiveIndex(targetIdx);
  };

  const handleDragStart = () => {
    dragMovedRef.current = true;
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setTimeout(() => {
      dragMovedRef.current = false;
    }, 120);

    if (info.offset.x < -55 || info.velocity.x < -300) {
      goNext();
    } else if (info.offset.x > 55 || info.velocity.x > 300) {
      goPrev();
    }
  };

  const handleOpenLightbox = () => {
    if (dragMovedRef.current) return;
    setLightboxOpen(true);
  };

  // Horizontal drag slider pointer handlers for smooth desktop mouse dragging
  const handleSliderMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderRef.current) return;
    sliderDragRef.current = {
      isDown: true,
      startX: e.pageX - sliderRef.current.offsetLeft,
      scrollLeft: sliderRef.current.scrollLeft,
      moved: false,
    };
    setIsDraggingSlider(true);
  };

  const handleSliderMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sliderDragRef.current.isDown || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - sliderDragRef.current.startX;
    if (Math.abs(walk) > 6) {
      sliderDragRef.current.moved = true;
    }
    sliderRef.current.scrollLeft = sliderDragRef.current.scrollLeft - walk;
  };

  const stopSliderDrag = () => {
    sliderDragRef.current.isDown = false;
    setIsDraggingSlider(false);
    setTimeout(() => {
      sliderDragRef.current.moved = false;
    }, 80);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxOpen) return;
      const section = document.getElementById('portfolio');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.3;
      if (!inView) return;

      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev, lightboxOpen]);

  return (
    <section
      id="portfolio"
      className="relative py-20 sm:py-28 lg:py-32 bg-[#111111] text-[#F2F0EB] overflow-x-clip"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
        {/* Abertura Editorial — Destaque Principal dos Projetos Criados */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-10 border-b border-white/15">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.22em] uppercase text-[#C4A66E] mb-4">
              02 — Projetos Criados
            </p>
            <h2 className="font-serif text-[clamp(2.35rem,4.3vw,4.1rem)] font-normal leading-[1.03] tracking-[-0.02em] text-[#F7F5F0] [text-wrap:balance]">
              <StaggeredText
                stagger={0.045}
                segments={[
                  { text: 'Projetos desenvolvidos para ' },
                  { text: 'criadores reais.', italic: true },
                ]}
              />
            </h2>
          </div>

          <div className="lg:col-span-5">
            <div className="pt-4 border-t border-[#A58A58]/55 lg:max-w-lg lg:ml-auto">
              <p className="text-base sm:text-[1.0625rem] leading-[1.65] text-[#EAE6DD] font-normal">
                Este é o centro do nosso trabalho: sites e apresentações prontos para cada perfil.{' '}
                <span className="text-[#C4A66E]">
                  Navegue pelas cartas, amplie a tela ou abra os projetos publicados.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Seleção em Evidência das Duas Coleções — Creator Pro & Creator Pro Experience */}
        <div className="mt-10">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#D6D2C9]">
              Linhas de Apresentação · Selecione uma coleção
            </p>
            <div className="flex items-center gap-3 text-xs tracking-[0.16em] uppercase text-[#C4A66E] font-medium tabular-nums whitespace-nowrap shrink-0">
              <span>{currentCollectionInfo.title}</span>
              <span aria-hidden="true" className="text-white/30">
                /
              </span>
              <span>
                <AnimatedCounter
                  value={Number(activeProject.globalNumber)}
                  padLength={2}
                  duration={550}
                />{' '}
                / 08
              </span>
            </div>
          </div>

          <div
            role="tablist"
            aria-label="Selecionar coleção de projetos"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5"
          >
            {PORTFOLIO_COLLECTIONS.map((col) => {
              const isSelected = activeCollection === col.id;
              const countInCollection = PORTFOLIO_PROJECTS.filter(
                (p) => p.collection === col.id,
              ).length;

              return (
                <button
                  key={col.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => handleCollectionChange(col.id)}
                  className={`group relative text-left p-5 sm:p-6 border transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A58A58] ${
                    isSelected
                      ? 'bg-[#1B1916] border-[#C4A66E] shadow-[0_16px_40px_rgba(0,0,0,0.45)]'
                      : 'bg-[#151514] border-white/15 hover:border-[#A58A58]/60 hover:bg-[#191815]'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-0 left-0 right-0 h-[3px] transition-opacity duration-200 ${
                      isSelected ? 'bg-[#C4A66E] opacity-100' : 'bg-[#A58A58]/40 opacity-0 group-hover:opacity-100'
                    }`}
                  />

                  <div className="flex items-center justify-between gap-3 text-[10px] sm:text-[11px] tracking-[0.12em] sm:tracking-[0.18em] uppercase">
                    <span
                      className={`font-semibold tabular-nums whitespace-nowrap ${
                        isSelected ? 'text-[#C4A66E]' : 'text-[#A7A49E] group-hover:text-[#C4A66E]'
                      }`}
                    >
                      Coleção {col.number} · 0{countInCollection} projetos
                    </span>

                    <span
                      className={`font-medium whitespace-nowrap shrink-0 ${
                        isSelected ? 'text-[#F7F5F0]' : 'text-[#8C8880] group-hover:text-[#D6D2C9]'
                      }`}
                    >
                      {isSelected ? 'Selecionada' : 'Ver coleção'}
                    </span>
                  </div>

                  <h3
                    className={`mt-2.5 font-serif text-2xl sm:text-[2rem] font-normal leading-tight transition-colors ${
                      isSelected ? 'text-[#F7F5F0]' : 'text-[#D6D2C9] group-hover:text-[#F7F5F0]'
                    }`}
                  >
                    {col.title}
                  </h3>

                  <p
                    className={`mt-2 text-xs sm:text-sm leading-relaxed transition-colors ${
                      isSelected ? 'text-[#DEDAD0]' : 'text-[#A7A49E] group-hover:text-[#C8C4BA]'
                    }`}
                  >
                    {col.subtitle}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Baralho Interativo */}
        <div className="mt-10 sm:mt-12">
          <div className="relative mx-auto max-w-[960px]">
            {/* Deck Stack Stage (identical card width for front & stacked cards) */}
            <div className="relative mx-auto w-full max-w-[740px] pb-6">
              {/* Background stacked cards behind the protagonist */}
              {collectionProjects.map((project, idx) => {
                const relativeOffset = (idx - safeIndex + totalInCollection) % totalInCollection;
                if (relativeOffset === 0) return null;
                const slot = STACK_OFFSETS[Math.min(relativeOffset, STACK_OFFSETS.length - 1)];

                return (
                  <motion.div
                    key={project.id}
                    onClick={() => goToIndex(idx)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Selecionar ${project.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        goToIndex(idx);
                      }
                    }}
                    animate={
                      prefersReduced
                        ? { x: slot.x * 0.5, y: slot.y * 0.5, scale: slot.scale, opacity: slot.opacity }
                        : {
                            x: slot.x,
                            y: slot.y,
                            scale: slot.scale,
                            rotate: slot.rotate,
                            opacity: slot.opacity,
                          }
                    }
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    style={{ zIndex: slot.zIndex }}
                    className="absolute inset-x-0 top-0 cursor-pointer select-none"
                  >
                    <div className="pointer-events-none brightness-[0.62]">
                      <DeckCardContent project={project} isFront={false} />
                    </div>
                  </motion.div>
                );
              })}

              {/* Front Protagonist Card (draggable & 3D pointer tilt on mouse) */}
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                <motion.div
                  key={activeProject.id}
                  custom={direction}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.38}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  initial={
                    prefersReduced
                      ? { opacity: 0 }
                      : {
                          x: direction * 90,
                          y: 12,
                          scale: 0.96,
                          rotate: direction * 2.5,
                          opacity: 0,
                        }
                  }
                  animate={{
                    x: 0,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                  }}
                  exit={
                    prefersReduced
                      ? { opacity: 0 }
                      : {
                          x: direction * -160,
                          y: 18,
                          scale: 0.94,
                          rotate: direction * -5,
                          opacity: 0,
                        }
                  }
                  transition={{
                    duration: 0.42,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ zIndex: 30 }}
                  className="relative w-full cursor-grab active:cursor-grabbing touch-pan-y"
                >
                  <Tilt3D maxTilt={2.6}>
                    <DeckCardContent
                      project={activeProject}
                      isFront={true}
                      onOpenZoom={handleOpenLightbox}
                    />
                  </Tilt3D>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Deck Navigation Controls + Progress Bar */}
            <div className="mt-6 sm:mt-8 space-y-5">
              <div className="flex flex-col md:flex-row items-center justify-between gap-5">
                {/* Left/Right Navigation Arrows + Position Counter */}
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    type="button"
                    onClick={goPrev}
                    aria-label="Carta anterior"
                    className="w-11 h-11 inline-flex items-center justify-center border border-white/20 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#A58A58]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs font-medium tracking-[0.18em] text-[#F2F0EB] tabular-nums min-w-[60px] text-center whitespace-nowrap">
                    <AnimatedCounter value={safeIndex + 1} padLength={2} duration={400} /> / 0
                    {totalInCollection}
                  </span>

                  <button
                    type="button"
                    onClick={goNext}
                    aria-label="Próxima carta"
                    className="w-11 h-11 inline-flex items-center justify-center border border-white/20 text-[#F2F0EB] hover:border-[#A58A58] hover:text-[#A58A58] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#A58A58]"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Direct Card Selectors inside the Active Collection */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                  {collectionProjects.map((proj, idx) => {
                    const isCurrent = idx === safeIndex;
                    return (
                      <button
                        key={proj.id}
                        type="button"
                        onClick={() => goToIndex(idx)}
                        className={`px-3 py-1.5 text-[11px] font-medium tracking-[0.12em] uppercase border transition-colors cursor-pointer whitespace-nowrap ${
                          isCurrent
                            ? 'border-[#A58A58] text-[#111111] bg-[#A58A58]'
                            : 'border-white/12 text-[#A7A49E] hover:border-white/35 hover:text-[#F2F0EB]'
                        }`}
                      >
                        {proj.indexInCollection} · {proj.category}
                      </button>
                    );
                  })}
                </div>

                <span className="hidden lg:inline text-[11px] tracking-[0.14em] uppercase text-[#A7A49E] whitespace-nowrap shrink-0">
                  Arraste ou use as setas
                </span>
              </div>

              <ProgressBar
                progress={((safeIndex + 1) / totalInCollection) * 100}
                trackClassName="bg-white/10"
                fillClassName="bg-[#A58A58]"
              />
            </div>

            {/* Horizontal Drag Slider Gallery Strip (mouse & touch draggable thumbnail index) */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="mb-3 flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-[#A7A49E]">
                <span>Galeria Horizontal · {currentCollectionInfo.title}</span>
                <span>Arraste ou toque para selecionar</span>
              </div>

              <div
                ref={sliderRef}
                onMouseDown={handleSliderMouseDown}
                onMouseMove={handleSliderMouseMove}
                onMouseUp={stopSliderDrag}
                onMouseLeave={stopSliderDrag}
                className={`editorial-scroll-track flex gap-3.5 overflow-x-auto pb-2 select-none touch-pan-x ${
                  isDraggingSlider ? 'cursor-grabbing' : 'cursor-grab'
                }`}
              >
                {collectionProjects.map((proj, idx) => {
                  const isCurrent = idx === safeIndex;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        if (sliderDragRef.current.moved) return;
                        goToIndex(idx);
                      }}
                      className={`group/thumb shrink-0 w-[210px] sm:w-[225px] text-left border transition-all duration-300 cursor-pointer bg-[#151515] ${
                        isCurrent
                          ? 'border-[#A58A58]'
                          : 'border-white/12 hover:border-white/35'
                      }`}
                    >
                      <div className="aspect-[16/10] w-full overflow-hidden bg-[#0D0D0D]">
                        {proj.heroScreenshot ? (
                          <img
                            src={proj.heroScreenshot}
                            alt={proj.screenshotAlt}
                            draggable={false}
                            loading="lazy"
                            className={`w-full h-full object-cover object-top transition-all duration-300 ${
                              isCurrent
                                ? 'grayscale-0 opacity-100'
                                : 'grayscale opacity-70 group-hover/thumb:grayscale-0 group-hover/thumb:opacity-100 group-hover/thumb:scale-[1.03]'
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center px-3 text-center">
                            <span className="text-[10px] tracking-[0.16em] uppercase text-[#A58A58]/80">
                              Captura Pendente
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="px-3 py-2.5 flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium text-[#F2F0EB] truncate">
                          {proj.name}
                        </span>
                        <span className="text-[10px] tracking-[0.14em] text-[#A58A58] tabular-nums shrink-0">
                          {proj.indexInCollection}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Encerramento Comercial da Seção */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-white/12 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h3 className="font-serif text-2xl sm:text-4xl font-normal text-[#F2F0EB]">
            Quer um projeto nesse nível{' '}
            <span className="italic text-[#A58A58]">com a sua cara?</span>
          </h3>

          <MagneticButton>
            <a
              href="#contato"
              className="inline-flex items-center gap-3 px-6 py-3.5 text-[11px] font-semibold tracking-[0.14em] uppercase text-[#111111] bg-[#F2F0EB] hover:bg-[#A58A58] transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A58A58]"
            >
              <span>Quero meu projeto</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </MagneticButton>
        </div>
      </div>

      {/* Lightbox / Modal Zoom */}
      <AnimatePresence>
        {lightboxOpen && (
          <ProjectLightbox
            project={activeProject}
            onClose={() => setLightboxOpen(false)}
            onPrev={goPrev}
            onNext={goNext}
            currentIndex={safeIndex}
            totalInCollection={totalInCollection}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
