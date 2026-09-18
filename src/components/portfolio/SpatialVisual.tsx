import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import { motion, useInView, useReducedMotion, useSpring } from "motion/react";
import portrait from "@/assets/portrait.png";

// Adapted from React Bits Tilted Card (David Haz). See THIRD_PARTY_NOTICES.md.
export function TiltSurface({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const rotateX = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const rotateY = useSpring(0, { damping: 30, stiffness: 100, mass: 2 });
  const reset = () => { rotateX.set(0); rotateY.set(0); };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    rotateX.set(((event.clientY - rect.top) / rect.height - 0.5) * -12);
    rotateY.set(((event.clientX - rect.left) / rect.width - 0.5) * 12);
  };
  return (
    <div className={`tilt-surface ${className}`} onPointerMove={move} onPointerLeave={reset} onPointerCancel={reset}>
      <motion.div className="tilt-inner" style={{ rotateX: reduced ? 0 : rotateX, rotateY: reduced ? 0 : rotateY }}>
        {children}
      </motion.div>
    </div>
  );
}

export function SpatialVisual({ variant = 0, portraitMode = false }: { variant?: number; portraitMode?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduced = useReducedMotion();
  return (
    <div ref={ref} className={`spatial-visual spatial-variant-${variant} ${portraitMode ? "spatial-portrait" : "spatial-art"}`} data-running={inView && !reduced}>
      <div className="spatial-grid" aria-hidden="true" />
      <div className="spatial-halo" aria-hidden="true" />
      <div className="orbital-system" aria-hidden="true">
        <div className="orbital-axis">
          {[0, 1, 2, 3, 4, 5].map((ring) => (
            <span key={ring} className="orbital-ring" style={{ "--ring": ring } as CSSProperties}><i /></span>
          ))}
        </div>
      </div>
      {portraitMode ? (
        <TiltSurface className="portrait-tilt">
          <div className="portrait-frame">
            <img src={portrait} alt="Om Vishnu Vardhan Reddy P — futuristic developer portrait" width={832} height={1024} fetchPriority="high" />
            <div className="portrait-reflection" aria-hidden="true" />
          </div>
          <div className="portrait-backplate" aria-hidden="true" />
        </TiltSurface>
      ) : (
        <div className="spatial-core" aria-hidden="true">
          {Array.from({ length: variant === 1 ? 3 : 1 }, (_, index) => (
            <div className="spatial-cube" key={index} style={{ "--cube": index } as CSSProperties}>
              {[0, 1, 2, 3, 4, 5].map((face) => <span key={face} className={`cube-face cube-face-${face}`} />)}
            </div>
          ))}
        </div>
      )}
      <span className="spatial-star spatial-star-one" aria-hidden="true" />
      <span className="spatial-star spatial-star-two" aria-hidden="true" />
    </div>
  );
}
