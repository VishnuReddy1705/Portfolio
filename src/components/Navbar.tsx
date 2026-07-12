import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Command } from "lucide-react";

const LINKS = [
  { id: "about", label: "Story" },
  { id: "stack", label: "Stack" },
  { id: "projects", label: "Projects" },
  { id: "journey", label: "Journey" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" },
];

export function Navbar({ onOpenPalette }: { onOpenPalette: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-4 left-1/2 z-[70] w-[min(94vw,52rem)] -translate-x-1/2"
    >
      <nav
        className={`flex items-center justify-between rounded-full px-5 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong" : "border border-transparent"
        }`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-sm font-bold tracking-widest text-neon text-glow"
        >
          OVVR<span className="text-violet">.</span>
        </button>
        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => jump(l.id)}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </div>
        <button
          onClick={onOpenPalette}
          className="glass flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-neon"
          aria-label="Open command palette"
        >
          <Command className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">⌘K</span>
        </button>
      </nav>
    </motion.header>
  );
}
