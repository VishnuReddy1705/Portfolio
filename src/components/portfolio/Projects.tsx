import { motion } from "motion/react";
import { SpatialVisual } from "./SpatialVisual";
import { HeartPulse, Zap, Lock, MessageSquare, CheckCircle2 } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const PROJECTS = [
  {
    icon: HeartPulse,
    num: "01",
    title: "Mindful Haven Pulse",
    tagline: "AI-powered mental wellness platform",
    tech: ["React", "AI", "Modern UI", "TypeScript"],
    features: ["AI-guided wellness journeys", "Mood intelligence & insights", "Calm, modern interface design"],
    challenge: "Making an AI feel supportive and human — not clinical.",
    outcome: "A wellness experience people actually want to return to.",
    glow: "from-neon/20 via-transparent to-transparent",
    accent: "text-neon",
  },
  {
    icon: Zap,
    num: "02",
    title: "Utility Management & Billing Platform",
    tagline: "Built during Infosys Springboard Internship 7.0",
    tech: ["Spring Boot", "React", "PostgreSQL", "JWT"],
    features: [
      "Community & resident dashboards",
      "CSV bulk upload pipeline",
      "Billing engine + analytics",
      "Role-based login with JWT",
    ],
    challenge: "Designing role-based access and billing logic that scales across communities.",
    outcome: "A production-grade platform delivered under real internship constraints.",
    glow: "from-electric/20 via-transparent to-transparent",
    accent: "text-electric",
  },
  {
    icon: Lock,
    num: "03",
    title: "Image Encryption using AES",
    tagline: "Cryptography, visualized — built in Java",
    tech: ["Java", "AES-256", "Cryptography"],
    features: ["AES image encryption & decryption", "Animated encryption process", "Secure key handling"],
    challenge: "Turning byte-level cryptography into something you can watch happen.",
    outcome: "Encryption made visible — and verifiably secure.",
    glow: "from-violet/25 via-transparent to-transparent",
    accent: "text-violet",
  },
  {
    icon: MessageSquare,
    num: "04",
    title: "AI Chat Application",
    tagline: "Conversations that feel alive",
    tech: ["React", "AI", "Realtime UI"],
    features: ["Modern messaging interface", "Animated conversation flow", "Streaming AI responses"],
    challenge: "Keeping the UI fluid while streaming model output token by token.",
    outcome: "A chat experience with the polish of a production messenger.",
    glow: "from-neon/15 via-violet/10 to-transparent",
    accent: "text-neon",
  },
];

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const Icon = project.icon;

  return (
    <div className="project-shell">
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.65, delay: (index % 2) * 0.1 }}
        className="project-card glass-strong relative overflow-hidden rounded-3xl"
      >
        <SpatialVisual variant={index} />
        <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.glow}`} />
        <div className="project-copy relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`font-mono text-sm ${project.accent}`}>PROJECT {project.num}</p>
              <h3 className="mt-2 font-display text-2xl leading-tight font-bold md:text-3xl">
                {project.title}
              </h3>
              <p className="mt-3 text-muted-foreground md:text-lg">{project.tagline}</p>
            </div>
            <span className="hidden shrink-0 rounded-2xl glass p-4 md:block">
              <Icon className={`h-8 w-8 ${project.accent}`} />
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="rounded-full glass px-3.5 py-1.5 font-mono text-xs text-foreground/90">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 grid gap-7">
            <div>
              <p className="mb-3 font-mono text-xs tracking-widest text-muted-foreground uppercase">Features</p>
              <ul className="space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/90">
                    <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${project.accent}`} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <div>
                <p className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">Challenge</p>
                <p className="text-sm leading-relaxed text-foreground/85">{project.challenge}</p>
              </div>
              <div>
                <p className="mb-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">Outcome</p>
                <p className={`text-sm leading-relaxed font-medium ${project.accent}`}>{project.outcome}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHeading kicker="scene 05" title="Selected Work" />
      </div>
      <div className="projects-grid relative mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
