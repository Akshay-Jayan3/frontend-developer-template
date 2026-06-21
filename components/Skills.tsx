"use client";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

type Skill = (typeof portfolio.skills)[number];

function SkillCard({ skill, index, inView }: { skill: Skill; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hovered && !shouldReduceMotion ? rotateX : 0,
        rotateY: hovered && !shouldReduceMotion ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`glass relative flex flex-col p-6 md:p-8 rounded-xl transition-all duration-300 ${hovered ? 'z-10 shadow-xl scale-[1.02]' : 'z-0'}`}
    >
      <div 
        style={{ transform: hovered && !shouldReduceMotion ? "translateZ(30px)" : "none", transition: "transform 0.3s ease" }}
        className={`text-2xl mb-4 transition-colors duration-300 ${hovered ? 'text-brand-accent' : 'text-brand-muted'}`}
      >
        {skill.icon}
      </div>
      <div 
        style={{ transform: hovered && !shouldReduceMotion ? "translateZ(20px)" : "none", transition: "transform 0.3s ease" }}
        className="font-syne text-base md:text-lg font-bold mb-2"
      >
        {skill.title}
      </div>
      <p 
        style={{ transform: hovered && !shouldReduceMotion ? "translateZ(10px)" : "none", transition: "transform 0.3s ease" }}
        className="text-sm md:text-base text-brand-muted font-light leading-relaxed mb-4"
      >
        {skill.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: hovered && !shouldReduceMotion ? "translateZ(20px)" : "none", transition: "transform 0.3s ease" }}>
        {skill.tags.map((tag: string, j: number) => (
          <span key={j} className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full bg-brand-bg2 text-brand-muted tracking-wide uppercase">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" ref={ref} className="py-20 md:py-28 px-6 md:px-12 relative" style={{ perspective: "1000px" }}>
      <div className="text-xs tracking-widest uppercase text-brand-muted mb-12 flex items-center gap-4">
        Skills <span className="text-brand-muted text-[10px]">03</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {portfolio.skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
