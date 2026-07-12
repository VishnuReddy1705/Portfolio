import { useEffect, useRef } from "react";

/** Mouse spotlight + custom cursor dot. Disabled on touch devices. */
export function CursorGlow() {
  const spotRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const spot = spotRef.current;
    const dot = dotRef.current;
    if (!spot || !dot) return;

    let tx = -500;
    let ty = -500;
    let x = -500;
    let y = -500;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      dot.style.transform = `translate(${tx - 4}px, ${ty - 4}px)`;
    };

    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      spot.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={spotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[5] h-[600px] w-[600px] rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--electric) 14%, transparent), transparent 65%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] hidden h-2 w-2 rounded-full bg-neon shadow-[0_0_12px_var(--neon)] md:block"
      />
    </>
  );
}
