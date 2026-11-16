import {
  useEffect,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';

/**
 * Hook nativo baseado em IntersectionObserver para acionar animações na entrada da seção.
 */
export function useInViewObserver<T extends HTMLElement = HTMLDivElement>(
  options: {
    threshold?: number;
    rootMargin?: string;
    once?: boolean;
  } = {},
): [React.RefObject<T | null>, boolean] {
  const { threshold = 0.18, rootMargin = '0px 0px -40px 0px', once = true } = options;
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.unobserve(node);
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * Detecta se o dispositivo possui ponteiro fino (mouse) para interações como Tilt 3D e Cursor Magnético.
 */
function useFinePointer(): boolean {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setIsFine(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  return isFine;
}

export interface TextSegment {
  text: string;
  italic?: boolean;
  className?: string;
}

/**
 * Revelação tipográfica palavra por palavra, de baixo para cima.
 * Suporta acionamento imediato (Hero) ou via IntersectionObserver (seções internas).
 */
export function StaggeredText({
  segments,
  className = '',
  delay = 0,
  stagger = 0.04,
  immediate = false,
}: {
  segments: TextSegment[];
  className?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [ref, inView] = useInViewObserver<HTMLSpanElement>({
    threshold: 0.2,
    rootMargin: '0px 0px -30px 0px',
    once: true,
  });

  const shouldAnimate = immediate || inView;

  let wordCounter = 0;

  return (
    <span ref={ref} className={`inline ${className}`}>
      {segments.map((seg, segIdx) => {
        const tokens = seg.text.split(/(\s+)/);
        return (
          <span
            key={segIdx}
            className={`${seg.italic ? 'italic' : ''} ${seg.className ?? ''}`.trim()}
          >
            {tokens.map((token, tokenIdx) => {
              if (/^\s+$/.test(token)) {
                return <span key={tokenIdx}>{token}</span>;
              }
              if (!token) return null;

              const currentWordIndex = wordCounter++;
              if (prefersReduced) {
                return <span key={tokenIdx}>{token}</span>;
              }

              return (
                <span
                  key={tokenIdx}
                  className="inline-block overflow-hidden align-bottom pb-[0.06em] -mb-[0.06em]"
                >
                  <motion.span
                    className="inline-block will-change-transform"
                    initial={{ y: '108%', opacity: 0 }}
                    animate={
                      shouldAnimate
                        ? { y: '0%', opacity: 1 }
                        : { y: '108%', opacity: 0 }
                    }
                    transition={{
                      duration: 0.65,
                      delay: delay + currentWordIndex * stagger,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    {token}
                  </motion.span>
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

/**
 * Contador numérico animado do zero até o valor real ao entrar na tela via IntersectionObserver.
 */
export function AnimatedCounter({
  value,
  padLength = 2,
  prefix = '',
  suffix = '',
  duration = 850,
  className = '',
}: {
  value: number;
  padLength?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const [ref, inView] = useInViewObserver<HTMLSpanElement>({
    threshold: 0.2,
    once: true,
  });
  const [displayValue, setDisplayValue] = useState(prefersReduced ? value : 0);
  const previousTargetRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(value);
      previousTargetRef.current = value;
      return;
    }
    if (!inView) return;

    const startValue = previousTargetRef.current;
    const endValue = value;
    if (startValue === endValue) {
      setDisplayValue(endValue);
      return;
    }

    let rafId = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      // easeOutExpo para desaceleração editorial refinada
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      const current = Math.round(startValue + (endValue - startValue) * eased);
      setDisplayValue(current);

      if (t < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        previousTargetRef.current = endValue;
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [value, inView, duration, prefersReduced]);

  const formatted =
    padLength > 0 ? String(displayValue).padStart(padLength, '0') : String(displayValue);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

/**
 * Barra de progresso animada progressivamente via IntersectionObserver ao aparecer na tela.
 */
export function ProgressBar({
  progress,
  className = '',
  trackClassName = 'bg-[#111111]/10',
  fillClassName = 'bg-[#A58A58]',
  delay = 0,
}: {
  progress: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const [ref, inView] = useInViewObserver<HTMLDivElement>({
    threshold: 0.2,
    once: true,
  });

  const clamped = Math.max(0, Math.min(progress, 100));
  const targetScale = clamped / 100;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`relative w-full h-[1.5px] overflow-hidden ${trackClassName} ${className}`}
    >
      <motion.div
        className={`h-full w-full origin-left ${fillClassName}`}
        initial={{ scaleX: prefersReduced ? targetScale : 0 }}
        animate={{ scaleX: inView || prefersReduced ? targetScale : 0 }}
        transition={{
          duration: prefersReduced ? 0 : 0.75,
          delay: prefersReduced ? 0 : delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}

/**
 * Inclinação 3D sutil conforme movimento do mouse (dispositivos com ponteiro fino).
 * Em telas sensíveis ao toque, fornece apenas retorno tátil leve sem prejudicar o scroll.
 */
export function Tilt3D({
  children,
  className = '',
  maxTilt = 3.2,
  disabled = false,
}: {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  disabled?: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const isFinePointer = useFinePointer();
  const canTilt = isFinePointer && !prefersReduced && !disabled;

  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 220, damping: 24, mass: 0.5 });
  const rotateY = useSpring(rawRotateY, { stiffness: 220, damping: 24, mass: 0.5 });

  const [sheenPos, setSheenPos] = useState({ x: 50, y: 50, active: false });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!canTilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const tiltY = (px - 0.5) * (maxTilt * 2);
    const tiltX = (0.5 - py) * (maxTilt * 2);

    rawRotateX.set(tiltX);
    rawRotateY.set(tiltY);
    setSheenPos({ x: px * 100, y: py * 100, active: true });
  };

  const handleMouseLeave = () => {
    rawRotateX.set(0);
    rawRotateY.set(0);
    setSheenPos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div style={{ perspective: 1200 }} className={className}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={!canTilt && !prefersReduced && !disabled ? { scale: 0.992 } : undefined}
        style={
          canTilt
            ? {
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }
            : undefined
        }
        className="relative h-full w-full will-change-transform"
      >
        {children}

        {canTilt && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: sheenPos.active ? 1 : 0,
              background: `radial-gradient(520px circle at ${sheenPos.x}% ${sheenPos.y}%, rgba(165, 138, 88, 0.09), transparent 55%)`,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}

/**
 * Movimento magnético sutil em direção ao ponteiro — ativo somente em dispositivos com mouse.
 */
export function MagneticButton({
  children,
  className = '',
  strength = 6,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const prefersReduced = useReducedMotion();
  const isFinePointer = useFinePointer();
  const enabled = isFinePointer && !prefersReduced;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 20, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const offsetX = ((e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)) * strength;
    const offsetY = ((e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)) * strength;

    rawX.set(Math.max(-strength, Math.min(strength, offsetX)));
    rawY.set(Math.max(-strength, Math.min(strength, offsetY)));
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={enabled ? { x, y } : undefined}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
