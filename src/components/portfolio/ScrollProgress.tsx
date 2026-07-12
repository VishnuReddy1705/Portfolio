import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      className="fixed top-0 right-0 left-0 z-[80] h-[2px] origin-left bg-gradient-to-r from-neon via-electric to-violet"
      style={{ scaleX }}
    />
  );
}
