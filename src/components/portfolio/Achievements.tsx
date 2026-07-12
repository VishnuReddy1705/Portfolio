import { motion } from "motion/react";
import { Award, Briefcase, Puzzle, Brain, TrendingUp } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const ACHIEVEMENTS = [
  { icon: Award, title: "Cisco Virtual Internship", note: "Completed successfully" },
  { icon: Briefcase, title: "Infosys Springboard 7.0", note: "Shipped a real platform" },
  { icon: Puzzle, title: "Problem Solver", note: "Systems over syntax" },
  { icon: Brain, title: "AI Enthusiast", note: "Models, data, intelligence" },
  { icon: TrendingUp, title: "Continuous Learner", note: "Always compiling" },
];

export function Achievements() {
  return (
    <section id="achievements" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading kicker="scene 08" title="Achievements" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
                className="glass group flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-shadow duration-500 hover:glow-border"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-neon/15">
                  <Icon className="h-5 w-5 text-neon" />
                </span>
                <p className="font-display text-sm font-semibold">{a.title}</p>
                <p className="font-mono text-[11px] text-muted-foreground">{a.note}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
