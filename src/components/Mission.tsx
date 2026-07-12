import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const LINES = [
  { text: "Build innovative software that bridges traditional applications and intelligent systems.", accent: false },
  { text: "Create scalable, intelligent, user-centric software powered by AI and data.", accent: false },
  { text: "Building the future —", accent: true },
  { text: "one line of code,", accent: true },
  { text: "one model,", accent: true },
  { text: "one idea at a time.", accent: true },
];

export function Mission() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="mission" ref={ref} className="relative overflow-hidden py-32 md:py-44">
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden
      >
        <span className="font-display text-[22vw] font-bold whitespace-nowrap text-foreground/[0.025] select-none">
          MISSION
        </span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-10 font-mono text-xs tracking-[0.35em] text-neon uppercase"
        >
          {"// my mission"}
        </motion.p>

        <div className="space-y-6">
          {LINES.map((line, i) => (
            <motion.p
              key={line.text}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={
                line.accent
                  ? "font-display text-4xl font-bold md:text-6xl gradient-text w-fit"
                  : "font-display text-2xl font-medium text-foreground/90 md:text-4xl"
              }
            >
              {line.text}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}
