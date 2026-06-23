"use client";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { CircleScribble } from "@/components/Doodle";
import Marquee from "@/components/Marquee";

// Client-only: its per-letter motion values render with different float
// precision on server vs client, causing a hydration mismatch. The aria-label
// already covers SEO/a11y, so skipping SSR here is safe.
const AnimatedName = dynamic(() => import("@/components/AnimatedName"), {
  ssr: false,
  loading: () => (
    <h1 className="font-display text-[clamp(2.5rem,9vw,7.5rem)] font-black leading-[0.88] tracking-tight text-brand-text">
      {portfolio.name}
    </h1>
  ),
});

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
  const shouldReduceMotion = useReducedMotion();
  
  // Scroll-triggered exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ["0%", "0%"] : ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], shouldReduceMotion ? [1, 1] : [1, 0]);

  // Magnetic effect for accent text
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 15, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 15, stiffness: 150 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
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
      {/* Framer-style blurred gradient blobs — kept clear of the bottom-anchored content */}
      <div className="gradient-blob w-[420px] h-[420px] top-10 -right-32 md:w-[560px] md:h-[560px]" style={{ opacity: 0.35 }} />
      <div
        className="gradient-blob w-[280px] h-[280px] top-1/3 -left-24 md:w-[360px] md:h-[360px]"
        style={{ opacity: 0.15 }}
      />

      <motion.div style={{ y, opacity }} className="z-10 w-full">
        <motion.div
          variants={containerAnimation} initial="hidden" animate="show"
          className="text-xs md:text-sm tracking-widest uppercase text-brand-muted mb-6 flex items-center gap-3"
        >
          <motion.span variants={wordAnimation} className="block w-8 h-px bg-brand-accent2" />
          <motion.span variants={wordAnimation}>{portfolio.role}</motion.span>
        </motion.div>

        <div className="mb-8 md:mb-4">
          <AnimatedName name={portfolio.name} />
        </div>

        <motion.div
          variants={containerAnimation} initial="hidden" animate="show"
          className="relative inline-block mb-10"
        >
          <span
            className="relative inline-block font-display italic text-[clamp(1.5rem,3vw,2.5rem)] text-brand-text cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <motion.span style={{ x: smoothX, y: smoothY }} className="relative inline-block">
              {portfolio.tagline.join(" ")}
              <CircleScribble
                delay={1.3}
                className="pointer-events-none absolute -left-[6%] -top-[35%] w-[112%] h-[175%]"
              />
            </motion.span>
          </span>
        </motion.div>

        <motion.div
          variants={containerAnimation} initial="hidden" animate="show"
          className="flex flex-wrap items-center gap-3 mt-16 md:mt-20"
        >
          <a href="#work" className="text-sm px-5 py-2 bg-brand-text text-brand-bg rounded-sm tracking-wide no-underline transition-opacity duration-200 hover:opacity-85">
            View work
          </a>
          <a href="https://pixeldosa.gumroad.com/l/isjsu" target="_blank" rel="noreferrer" className="text-sm px-5 py-2 bg-brand-text/5 border border-brand-text/15 text-brand-text rounded-sm tracking-wide no-underline transition-colors duration-200 hover:bg-brand-text/10">
            Download Hoot
          </a>
        </motion.div>

        <div className="mt-12 md:mt-16">
          <Marquee
            items={[portfolio.role, "DESIGN + CODE", "AVAILABLE FOR WORK"]}
            speed={26}
          />
        </div>
      </motion.div>
    </section>
  );
}
