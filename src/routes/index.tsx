import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, MotionConfig, useReducedMotion } from "motion/react";

import { Preloader } from "@/components/portfolio/Preloader";
import { ParticleField } from "@/components/portfolio/ParticleField";
import { CursorGlow } from "@/components/portfolio/CursorGlow";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { Navbar } from "@/components/portfolio/Navbar";
import { CommandPalette } from "@/components/portfolio/CommandPalette";
import { Hero } from "@/components/portfolio/Hero";
import { Mission } from "@/components/portfolio/Mission";
import { About } from "@/components/portfolio/About";
import { TechStack } from "@/components/portfolio/TechStack";
import { Projects } from "@/components/portfolio/Projects";
import { Journey } from "@/components/portfolio/Journey";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { Achievements } from "@/components/portfolio/Achievements";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

const KONAMI = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a",
];

function Index() {
  const reduced = useReducedMotion();
  const [booted, setBooted] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [overdrive, setOverdrive] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    if (reduced) return;
    let disposed = false;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let raf = 0;
    import("lenis").then(({ default: Lenis }) => {
      if (disposed) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, [reduced]);

  // keyboard: ⌘K palette + Konami code
  useEffect(() => {
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
        return;
      }
      if (e.key === KONAMI[progress]) {
        progress++;
        if (progress === KONAMI.length) {
          progress = 0;
          setOverdrive(true);
          setTimeout(() => setOverdrive(false), 3200);
        }
      } else {
        progress = 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // lock scroll during boot
  useEffect(() => {
    document.body.style.overflow = booted ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [booted]);

  return (
    <MotionConfig reducedMotion="user">
    <div className="relative min-h-screen bg-background text-foreground">
      {!booted && <Preloader onDone={() => setBooted(true)} />}

      <ParticleField />
      <CursorGlow />
      <ScrollProgress />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      {/* Konami overdrive easter egg */}
      <AnimatePresence>
        {overdrive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-[99] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.4, 1] }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="absolute h-[120vmax] w-[120vmax] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--neon) 18%, transparent), transparent 55%)",
              }}
            />
            <motion.p
              initial={{ scale: 0.6, opacity: 0, filter: "blur(12px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="relative font-display text-4xl font-bold gradient-text text-glow md:text-7xl"
            >
              NEURAL OVERDRIVE UNLOCKED
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <Hero />
        <Mission />
        <About />
        <TechStack />
        <Projects />
        <Journey />
        <GitHubSection />
        <Achievements />
        <Contact />
      </main>
    </div>
    </MotionConfig>
  );
}
