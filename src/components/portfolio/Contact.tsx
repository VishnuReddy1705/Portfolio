import { motion } from "motion/react";
import { Github, Linkedin, Mail, FileDown, Send } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const CARDS = [
  {
    icon: Github,
    label: "GitHub",
    value: "Explore the code",
    href: "https://github.com/VishnuReddy1705",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Let's connect",
    href: "https://www.linkedin.com/in/vishnu-reddy-17-",
  },
  {
    icon: Mail,
    label: "Email",
    value: "Say hello",
    href: "mailto:omvishnu1705@gmail.com",
  },
  {
    icon: FileDown,
    label: "Resume",
    value: "Download PDF",
    href: "#",
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-32 pb-40">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <SectionHeading kicker="scene 09 — final" title="Initialize Contact" className="[&>*]:mx-auto" />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto -mt-6 mb-14 max-w-xl text-muted-foreground"
        >
          Open to internships, collaborations, and ambitious ideas. The terminal is always listening.
        </motion.p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {CARDS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass animate-float group flex flex-col items-center gap-3 rounded-2xl p-7 transition-shadow duration-500 hover:glow-border"
                style={{ animationDelay: `${i * 0.4}s` }}
              >
                <Icon className="h-6 w-6 text-neon transition-transform duration-300 group-hover:scale-125" />
                <span className="font-display text-sm font-semibold">{c.label}</span>
                <span className="font-mono text-[11px] text-muted-foreground">{c.value}</span>
              </motion.a>
            );
          })}
        </div>

        <motion.a
          href="mailto:omvishnu1705@gmail.com"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="magnetic-btn mt-14 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-neon via-electric to-violet px-9 py-4 font-display text-base font-semibold text-primary-foreground"
        >
          <Send className="h-4 w-4" />
          Transmit Message
        </motion.a>

        <p className="mt-24 font-mono text-xs text-muted-foreground">
          © 2026 Om Vishnu Vardhan Reddy P — engineered, not templated.
          <span className="ml-2 text-neon">// try the Konami code</span>
        </p>
      </div>
    </section>
  );
}
