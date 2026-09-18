import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowDown } from "lucide-react";
import { SpatialVisual } from "./SpatialVisual";

const ROLES = [
  "Full Stack Developer",
  "AI Engineer",
  "Machine Learning Enthusiast",
  "Data Science Learner",
  "Java Developer",
  "Backend Engineer",
  "Prompt Engineer",
  "Software Developer",
];

function useTypewriter(words: string[]) {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduced) {
      setText(words[0]);
      return;
    }
    const word = words[index % words.length];
    const speed = !deleting && text === word ? 1400 : deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
      } else {
        const next = word.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, index, words, reduced]);

  return text;
}

export function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="home" className="hero-section relative flex min-h-screen items-center overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,black,transparent)]" />
      <div className="hero-layout relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-28 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 font-mono text-xs text-neon"
          >
            <span className="h-1.5 w-1.5 animate-pulse-ring rounded-full bg-neon" />
            SYSTEM ONLINE — PORTFOLIO v2.0
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="hero-name font-display text-5xl leading-[1.02] font-bold tracking-tight md:text-7xl"
          >
            OM VISHNU
            <br />
            VARDHAN
            <br />
            <span className="gradient-text">REDDY P</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 h-8 font-mono text-lg text-neon md:text-xl"
          >
            {role}
            <span className="ml-0.5 inline-block h-5 w-2.5 animate-caret bg-neon align-middle" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            3rd Year B.Tech CSE · Karunya Institute of Technology and Sciences · Graduating 2028
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="magnetic-btn rounded-full bg-gradient-to-r from-neon to-electric px-7 py-3 font-display text-sm font-semibold text-primary-foreground"
            >
              Explore Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="magnetic-btn glass rounded-full px-7 py-3 font-display text-sm font-semibold text-foreground"
            >
              Contact Me
            </button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="hero-artwork"
        >
          <SpatialVisual portraitMode />
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { repeat: Infinity, duration: 1.8 } }}
        onClick={() => document.getElementById("mission")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground transition-colors hover:text-neon"
        aria-label="Scroll to mission"
      >
        <ArrowDown className="h-5 w-5" />
      </motion.button>
    </section>
  );
}
