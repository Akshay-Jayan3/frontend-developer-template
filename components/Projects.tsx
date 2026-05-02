"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="work" ref={ref} className="py-20 md:py-28 px-6 md:px-12 border-t border-brand-border">
      <div className="text-xs tracking-widest uppercase text-brand-accent2 mb-12 flex items-center gap-4">
        Selected Work <span className="text-brand-muted text-[10px]">03</span>
      </div>

      <div className="flex flex-col">
        {portfolio.projects.map((project, i) => (
          <motion.a
            key={i}
            href={project.url}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`group grid grid-cols-1 md:grid-cols-[80px_1fr_auto] items-start md:items-center gap-4 md:gap-8 border-b border-brand-border transition-all duration-300 no-underline text-inherit ${i === 0 ? 'border-t' : ''} ${hovered === i ? 'py-8 md:pl-4' : 'py-8'}`}
          >
            <div className={`hidden md:block font-syne text-xs tracking-widest transition-colors duration-200 ${hovered === i ? 'text-brand-accent' : 'text-brand-muted'}`}>
              0{i + 1}
            </div>

            <div>
              <div className="font-syne text-xl md:text-2xl font-bold tracking-tight mb-2 group-hover:text-brand-accent transition-colors duration-300">
                {project.title}
              </div>
              <div className="text-sm md:text-base text-brand-muted font-light mb-4">
                {project.desc}
              </div>
              <div className="flex gap-2 flex-wrap">
                {project.tags.map((tag, j) => (
                  <span key={j} className="text-[10px] md:text-xs px-2 md:px-3 py-1 border border-brand-border text-brand-muted tracking-wide uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className={`hidden md:block text-2xl transition-all duration-300 ${hovered === i ? 'text-brand-accent -translate-y-1 translate-x-1' : 'text-brand-muted'}`}>
              ↗
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
