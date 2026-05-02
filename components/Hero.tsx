"use client";
import { motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end px-6 md:px-12 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, var(--accent) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, var(--accent2) 0%, transparent 60%)
          `
        }}
      />

      <motion.div
        custom={0} variants={fadeUp} initial="hidden" animate="show"
        className="text-xs md:text-sm tracking-widest uppercase text-brand-accent2 mb-6 flex items-center gap-3"
      >
        <span className="block w-8 h-px bg-brand-accent2" />
        {portfolio.role}
      </motion.div>

      <motion.h1
        custom={1} variants={fadeUp} initial="hidden" animate="show"
        className="font-syne text-[clamp(3rem,8vw,8rem)] font-extrabold leading-[0.95] md:leading-[0.92] tracking-tighter text-brand-text mb-6"
      >
        {portfolio.tagline[0]}<br />
        <span className="text-brand-accent">{portfolio.tagline[1]}</span><br />
        {portfolio.tagline[2]}
      </motion.h1>

      <motion.div
        custom={2} variants={fadeUp} initial="hidden" animate="show"
        className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 pt-8 border-t border-brand-border gap-8"
      >
        <p className="max-w-[38ch] text-base md:text-lg text-brand-muted leading-relaxed font-light">
          I design and build high-quality web products — where code meets craft.
          CSS systems, design systems, and everything in between.
        </p>
        <div className="text-xs tracking-widest uppercase text-brand-muted flex md:flex-col items-center gap-2">
          <div className="hidden md:block w-px h-12 bg-gradient-to-b from-brand-muted to-transparent" />
          Scroll
        </div>
      </motion.div>
    </section>
  );
}
