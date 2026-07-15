import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import portrait from "@/assets/portrait.png";

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
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    const speed = deleting ? 35 : 70;
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDeleting(true), 1400);
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
  }, [text, deleting, index, words]);

  return text;
}

export function Hero() {
  const role = useTypewriter(ROLES);

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="grid-bg absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_45%,black,transparent)]" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 px-6 pt-28 pb-20 lg:grid-cols-[1.15fr_0.85fr] lg:pt-20">
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
            className="font-display text-5xl leading-[1.02] font-bold tracking-tight md:text-7xl"
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

        {/* Portrait with glowing rings */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-72 md:w-96"
        >
          <div
            className="animate-spin-slow absolute -inset-6 rounded-full opacity-70"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, var(--neon), transparent 30%, transparent 60%, var(--violet), transparent 90%)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 3px), black calc(100% - 2px))",
            }}
          />
          <div
            className="animate-spin-slow-rev absolute -inset-12 rounded-full opacity-40"
            style={{
              background:
                "conic-gradient(from 180deg, transparent, var(--electric), transparent 40%)",
              WebkitMask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
              mask: "radial-gradient(farthest-side, transparent calc(100% - 2px), black calc(100% - 1px))",
            }}
          />
          <div className="animate-float relative overflow-hidden rounded-full border border-border shadow-[0_0_80px_-12px_var(--electric)]">
            <img
              src={portrait}
              alt="Om Vishnu Vardhan Reddy P — futuristic developer portrait"
              width={832}
              height={1024}
              className="aspect-square w-full object-cover object-[50%_20%]"
            />
          </div>
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
