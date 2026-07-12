import { motion } from "motion/react";
import { Rocket, Code2, BrainCircuit, GraduationCap, Sparkles } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const CHAPTERS = [
  {
    icon: GraduationCap,
    year: "2023",
    title: "The Beginning",
    text: "Joined Karunya Institute of Technology and Sciences to pursue B.Tech in Computer Science Engineering. First lines of Java. First bugs. First obsession.",
  },
  {
    icon: Code2,
    year: "2024",
    title: "Full Stack Awakening",
    text: "Went deep into the web — React, Spring Boot, REST APIs, databases. Learned to think in systems, not just syntax.",
  },
  {
    icon: BrainCircuit,
    year: "2025",
    title: "The AI Shift",
    text: "Machine learning, Python, data science. Discovered that the most interesting software is the kind that learns.",
  },
  {
    icon: Rocket,
    year: "2025",
    title: "Building For Real",
    text: "Infosys Springboard Internship 7.0 — shipped a production-grade utility management platform. Cisco Virtual Internship completed.",
  },
  {
    icon: Sparkles,
    year: "→ 2028",
    title: "The Trajectory",
    text: "Graduating 2028. Goal: engineer intelligent systems that merge full-stack craft with AI — and make them beautiful.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="scene 03" title="The Story So Far" />

        <div className="relative">
          {/* timeline line */}
          <div className="absolute top-0 bottom-0 left-4 w-px bg-gradient-to-b from-neon/60 via-violet/40 to-transparent md:left-1/2" />

          <div className="space-y-16">
            {CHAPTERS.map((c, i) => {
              const Icon = c.icon;
              const left = i % 2 === 0;
              return (
                <motion.div
                  key={c.title}
                  initial={{ opacity: 0, x: left ? -60 : 60, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative flex md:w-1/2 ${left ? "md:mr-auto md:pr-14" : "md:ml-auto md:pl-14"} pl-14 md:pl-0 ${!left ? "md:pl-14" : ""}`}
                >
                  {/* node */}
                  <div
                    className={`absolute top-2 flex h-8 w-8 items-center justify-center rounded-full glass glow-border ${
                      left ? "left-0 md:-right-4 md:left-auto" : "left-0 md:-left-4"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-neon" />
                  </div>
                  <div className="glass group w-full rounded-2xl p-6 transition-all duration-500 hover:glow-border hover:-translate-y-1">
                    <p className="mb-1 font-mono text-xs text-violet">{c.year}</p>
                    <h3 className="font-display text-xl font-semibold group-hover:text-neon">
                      {c.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
