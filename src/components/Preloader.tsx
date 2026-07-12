import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const BOOT_LINES = [
  "> boot sequence initiated",
  "> loading AI modules ............. OK",
  "> initializing neural engine ..... OK",
  "> loading projects ................ OK",
  "> compiling portfolio ............. OK",
  "> authentication successful",
  "> launching portfolio...",
];

export function Preloader({ onDone }: { onDone: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (visibleLines < BOOT_LINES.length) {
      const t = setTimeout(() => setVisibleLines((v) => v + 1), 320);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setExiting(true);
      setTimeout(onDone, 700);
    }, 500);
    return () => clearTimeout(t);
  }, [visibleLines, onDone]);

  const progress = Math.round((visibleLines / BOOT_LINES.length) * 100);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0, scale: 1.06, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="w-full max-w-lg px-6">
            <div className="glass rounded-xl p-6 font-mono text-sm">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-destructive/70" />
                <span className="h-3 w-3 rounded-full bg-neon/50" />
                <span className="h-3 w-3 rounded-full bg-violet/60" />
                <span className="ml-3 text-xs text-muted-foreground">ovvr — boot.sh</span>
              </div>
              <div className="min-h-[190px] space-y-1.5">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.p
                    key={line}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25 }}
                    className={i >= BOOT_LINES.length - 2 ? "text-neon" : "text-muted-foreground"}
                  >
                    {line}
                  </motion.p>
                ))}
                <span className="inline-block h-4 w-2 animate-caret bg-neon align-middle" />
              </div>
              <div className="mt-4">
                <div className="h-1 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-neon via-electric to-violet"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-muted-foreground">{progress}%</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
