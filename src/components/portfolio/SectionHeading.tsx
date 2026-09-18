import { motion } from "motion/react";

export function SectionHeading({
  kicker,
  title,
  className = "",
}: {
  kicker: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`section-heading mb-14 ${className}`}>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-3 font-mono text-xs tracking-[0.35em] text-neon uppercase"
      >
        {"// "}
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="font-display text-4xl font-bold tracking-tight md:text-6xl"
      >
        {title}
      </motion.h2>
    </div>
  );
}
