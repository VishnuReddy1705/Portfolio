import { motion } from "motion/react";
import { Briefcase, Network, GraduationCap } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const ENTRIES = [
  {
    icon: Briefcase,
    type: "INTERNSHIP",
    title: "Infosys Springboard Internship 7.0",
    detail:
      "Built the Web-Based Utility Management and Billing Administration Platform — community & resident dashboards, CSV upload, billing, analytics, and JWT role-based login on Spring Boot + React + PostgreSQL.",
    accent: "text-electric",
    bar: "bg-electric",
  },
  {
    icon: Network,
    type: "INTERNSHIP",
    title: "Cisco Virtual Internship",
    detail: "Completed successfully — networking fundamentals and industry-grade problem solving.",
    accent: "text-neon",
    bar: "bg-neon",
  },
  {
    icon: GraduationCap,
    type: "EDUCATION",
    title: "Karunya Institute of Technology and Sciences",
    detail:
      "Bachelor of Technology, Computer Science Engineering · Third Year · Graduating 2028.",
    accent: "text-violet",
    bar: "bg-violet",
  },
];

export function Journey() {
  return (
    <section id="journey" className="relative py-32">
      <div className="mx-auto max-w-5xl px-6">
        <SectionHeading kicker="scene 06" title="Experience & Education" />

        <div className="space-y-8">
          {ENTRIES.map((e, i) => {
            const Icon = e.icon;
            return (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 50, rotateX: 8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="group glass relative overflow-hidden rounded-2xl p-7 transition-all duration-500 hover:glow-border hover:-translate-y-1"
              >
                <span className={`absolute top-0 bottom-0 left-0 w-1 ${e.bar} opacity-70`} />
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-6">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl glass">
                    <Icon className={`h-5 w-5 ${e.accent}`} />
                  </span>
                  <div>
                    <p className={`font-mono text-[11px] tracking-[0.3em] ${e.accent}`}>{e.type}</p>
                    <h3 className="mt-1 font-display text-xl font-semibold group-hover:text-neon md:text-2xl">
                      {e.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
