"use client";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { useRef } from "react";

const wordAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const containerAnimation = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll-triggered exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Magnetic effect for accent text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    mouseX.set(x * 0.15); // Adjust intensity
    mouseY.set(y * 0.15);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section ref={containerRef} className="min-h-screen flex flex-col justify-end px-6 md:px-12 py-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-screen"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 70% 40%, var(--accent) 0%, transparent 70%),
            radial-gradient(ellipse 40% 60% at 20% 80%, var(--accent2) 0%, transparent 60%)
          `
        }}
      />

      <motion.div style={{ y, opacity }} className="z-10 w-full">
        <motion.div
          variants={containerAnimation} initial="hidden" animate="show"
          className="text-xs md:text-sm tracking-widest uppercase text-brand-accent2 mb-6 flex items-center gap-3"
        >
          <motion.span variants={wordAnimation} className="block w-8 h-px bg-brand-accent2" />
          <motion.span variants={wordAnimation}>{portfolio.role}</motion.span>
        </motion.div>

        <motion.h1
          variants={containerAnimation} initial="hidden" animate="show"
          className="font-syne text-[clamp(3rem,8vw,8rem)] font-extrabold leading-[0.95] md:leading-[0.92] tracking-tighter text-brand-text mb-6"
        >
          <div className="overflow-hidden flex flex-wrap gap-x-4">
            {portfolio.tagline[0].split(' ').map((word, i) => (
              <motion.span key={i} variants={wordAnimation} className="inline-block">{word}</motion.span>
            ))}
          </div>
          <motion.div 
            className="text-brand-accent overflow-hidden inline-block cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: smoothX, y: smoothY }}
          >
            {portfolio.tagline[1].split(' ').map((word, i) => (
              <motion.span key={i} variants={wordAnimation} className="inline-block mr-4 md:mr-8">{word}</motion.span>
            ))}
          </motion.div><br />
          <div className="overflow-hidden flex flex-wrap gap-x-4">
            {portfolio.tagline[2].split(' ').map((word, i) => (
              <motion.span key={i} variants={wordAnimation} className="inline-block">{word}</motion.span>
            ))}
          </div>
        </motion.h1>

        <motion.div
          variants={containerAnimation} initial="hidden" animate="show"
          className="flex flex-col md:flex-row justify-between items-start md:items-end mt-10 pt-8 border-t border-brand-border gap-8"
        >
          <p className="max-w-[38ch] text-base md:text-lg text-brand-muted leading-relaxed font-light">
            I design and build high-quality web products — where code meets craft.
            CSS systems, design systems, and everything in between.
          </p>
          <div className="text-xs tracking-widest uppercase text-brand-muted flex md:flex-col items-center gap-2">
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: 48 }}
              transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
              className="hidden md:block w-px bg-gradient-to-b from-brand-muted to-transparent" 
            />
            <motion.span variants={wordAnimation}>Scroll</motion.span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
