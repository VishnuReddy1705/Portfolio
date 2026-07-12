import { useEffect, useMemo, useState } from "react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { SectionHeading } from "./SectionHeading";

const TERMINAL_LINES = [
  { cmd: true, text: "$ git status" },
  { cmd: false, text: "On branch main — everything shipping." },
  { cmd: true, text: "$ git log --oneline -4" },
  { cmd: false, text: "a3f9c1e feat: mindful-haven-pulse AI engine" },
  { cmd: false, text: "7b2d840 feat: utility billing analytics dashboard" },
  { cmd: false, text: "e91c5aa feat: AES image encryption visualizer" },
  { cmd: false, text: "c04d112 feat: ai chat streaming interface" },
  { cmd: true, text: '$ git commit -m "never stop building"' },
  { cmd: false, text: "[main] 1 file changed, ∞ ideas committed" },
];

function seededLevels(count: number) {
  // deterministic pseudo-random so SSR and client render match
  const out: number[] = [];
  let s = 42;
  for (let i = 0; i < count; i++) {
    s = (s * 16807) % 2147483647;
    const r = s / 2147483647;
    out.push(r < 0.3 ? 0 : r < 0.55 ? 1 : r < 0.78 ? 2 : r < 0.93 ? 3 : 4);
  }
  return out;
}

const LEVEL_CLASSES = [
  "bg-muted",
  "bg-electric/30",
  "bg-electric/55",
  "bg-neon/70",
  "bg-neon",
];

export function GitHubSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [visible, setVisible] = useState(0);
  const levels = useMemo(() => seededLevels(7 * 26), []);

  useEffect(() => {
    if (!inView || visible >= TERMINAL_LINES.length) return;
    const t = setTimeout(() => setVisible((v) => v + 1), 380);
    return () => clearTimeout(t);
  }, [inView, visible]);

  return (
    <section id="github" ref={ref} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="scene 07" title="Commit History" />

        <div className="grid gap-8 lg:grid-cols-2">
          {/* terminal */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8 }}
            className="glass rounded-2xl p-6 font-mono text-sm"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-destructive/70" />
              <span className="h-3 w-3 rounded-full bg-neon/50" />
              <span className="h-3 w-3 rounded-full bg-violet/60" />
              <span className="ml-3 text-xs text-muted-foreground">~/ovvr — zsh</span>
            </div>
            <div className="min-h-[15rem] space-y-1.5">
              {TERMINAL_LINES.slice(0, visible).map((l) => (
                <motion.p
                  key={l.text}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={l.cmd ? "text-neon" : "text-muted-foreground"}
                >
                  {l.text}
                </motion.p>
              ))}
              <span className="inline-block h-4 w-2 animate-caret bg-neon align-middle" />
            </div>
          </motion.div>

          {/* contribution graph */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="glass rounded-2xl p-6"
          >
            <p className="mb-5 font-mono text-xs text-muted-foreground">
              contribution matrix — always compiling
            </p>
            <div className="grid grid-flow-col grid-rows-7 gap-1.5">
              {levels.map((lvl, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.004, duration: 0.3 }}
                  className={`aspect-square w-full rounded-[3px] ${LEVEL_CLASSES[lvl]}`}
                />
              ))}
            </div>
            <div className="mt-5 flex items-center justify-end gap-1.5 font-mono text-[10px] text-muted-foreground">
              less
              {LEVEL_CLASSES.map((c) => (
                <span key={c} className={`h-2.5 w-2.5 rounded-[2px] ${c}`} />
              ))}
              more
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
