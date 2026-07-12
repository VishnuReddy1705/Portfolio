import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Layers, Server, Database, Brain, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const CATEGORIES = [
  {
    id: "frontend",
    icon: Layers,
    name: "Frontend",
    blurb: "Interfaces that feel alive — component-driven, typed, responsive.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    id: "backend",
    icon: Server,
    name: "Backend",
    blurb: "Robust APIs and secure services — Java-first, production-minded.",
    skills: ["Spring Boot", "Java", "Node.js", "Express", "REST APIs", "JWT Security"],
  },
  {
    id: "databases",
    icon: Database,
    name: "Databases",
    blurb: "Relational and document stores, modeled for scale.",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Firebase"],
  },
  {
    id: "ai",
    icon: Brain,
    name: "AI / ML",
    blurb: "Teaching software to learn — from data pipelines to models.",
    skills: ["Machine Learning", "Python", "Pandas", "NumPy", "Scikit-Learn", "TensorFlow (basics)", "Data Science"],
  },
  {
    id: "tools",
    icon: Wrench,
    name: "Tools",
    blurb: "The workflow layer — versioned, containerized, collaborative.",
    skills: ["Git", "GitHub", "Docker (basics)"],
  },
];

export function TechStack() {
  const [activeId, setActiveId] = useState(CATEGORIES[0].id);
  const active = CATEGORIES.find((c) => c.id === activeId)!;

  return (
    <section id="stack" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="scene 04" title="Skill Universe" />

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* category orbit */}
          <div className="flex flex-col gap-3">
            {CATEGORIES.map((c, i) => {
              const Icon = c.icon;
              const isActive = c.id === activeId;
              return (
                <motion.button
                  key={c.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => setActiveId(c.id)}
                  className={`group flex items-center gap-4 rounded-2xl p-4 text-left transition-all duration-300 ${
                    isActive ? "glass-strong glow-border" : "glass hover:-translate-y-0.5"
                  }`}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                      isActive ? "bg-neon/15 text-neon" : "bg-muted text-muted-foreground group-hover:text-neon"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span>
                    <span className={`block font-display font-semibold ${isActive ? "text-neon" : ""}`}>
                      {c.name}
                    </span>
                    <span className="block text-xs text-muted-foreground">{c.skills.length} technologies</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* floating skill cloud */}
          <div className="glass relative min-h-[22rem] overflow-hidden rounded-3xl p-8 noise">
            <div className="grid-bg absolute inset-0 opacity-40" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="relative z-10"
              >
                <p className="mb-6 font-mono text-sm text-muted-foreground">{active.blurb}</p>
                <div className="flex flex-wrap gap-3">
                  {active.skills.map((s, i) => (
                    <motion.span
                      key={s}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
                      whileHover={{ scale: 1.12, y: -4 }}
                      className="animate-float cursor-default rounded-full glass px-5 py-2.5 font-mono text-sm text-foreground transition-shadow hover:glow-border hover:text-neon"
                      style={{ animationDelay: `${i * 0.35}s`, animationDuration: `${5 + (i % 3)}s` }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
