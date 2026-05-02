"use client";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

function SkillCard({ skill, index, inView }: any) {
  const [hovered, setHovered] = useState(false);
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hovered ? rotateX : 0,
        rotateY: hovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`relative flex flex-col p-6 md:p-8 transition-colors duration-300 ${hovered ? 'bg-brand-bg3 z-10 shadow-2xl' : 'bg-brand-bg2 z-0'}`}
    >
      <div 
        style={{ transform: hovered ? "translateZ(30px)" : "none", transition: "transform 0.3s ease" }}
        className={`text-2xl mb-4 transition-colors duration-300 ${hovered ? 'text-brand-accent' : 'text-brand-muted'}`}
      >
        {skill.icon}
      </div>
      <div 
        style={{ transform: hovered ? "translateZ(20px)" : "none", transition: "transform 0.3s ease" }}
        className="font-syne text-base md:text-lg font-bold mb-2"
      >
        {skill.title}
      </div>
      <p 
        style={{ transform: hovered ? "translateZ(10px)" : "none", transition: "transform 0.3s ease" }}
        className="text-sm md:text-base text-brand-muted font-light leading-relaxed mb-4"
      >
        {skill.desc}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto" style={{ transform: hovered ? "translateZ(20px)" : "none", transition: "transform 0.3s ease" }}>
        {skill.tags.map((tag: string, j: number) => (
          <span key={j} className="text-[10px] md:text-xs px-2 md:px-3 py-1 border border-brand-border text-brand-muted tracking-wide uppercase">
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
    <section id="skills" ref={ref} className="py-20 md:py-28 px-6 md:px-12 border-t border-brand-border relative" style={{ perspective: "1000px" }}>
      <div className="text-xs tracking-widest uppercase text-brand-accent2 mb-12 flex items-center gap-4">
        Skills <span className="text-brand-muted text-[10px]">02</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border border border-brand-border">
        {portfolio.skills.map((skill, i) => (
          <SkillCard key={i} skill={skill} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
