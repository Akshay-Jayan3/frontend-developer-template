"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="skills" ref={ref} className="py-20 md:py-28 px-6 md:px-12 border-t border-brand-border">
      <div className="text-xs tracking-widest uppercase text-brand-accent2 mb-12 flex items-center gap-4">
        Skills <span className="text-brand-muted text-[10px]">02</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-border border border-brand-border">
        {portfolio.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`flex flex-col p-6 md:p-8 transition-colors duration-300 cursor-default ${hovered === i ? 'bg-brand-bg3' : 'bg-brand-bg2'}`}
          >
            <div className={`text-2xl mb-4 transition-colors duration-300 ${hovered === i ? 'text-brand-accent' : 'text-brand-muted'}`}>
              {skill.icon}
            </div>
            <div className="font-syne text-base md:text-lg font-bold mb-2">{skill.title}</div>
            <p className="text-sm md:text-base text-brand-muted font-light leading-relaxed mb-4">
              {skill.desc}
            </p>
            <div className="flex flex-wrap gap-2 mt-auto">
              {skill.tags.map((tag, j) => (
                <span key={j} className="text-[10px] md:text-xs px-2 md:px-3 py-1 border border-brand-border text-brand-muted tracking-wide uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
