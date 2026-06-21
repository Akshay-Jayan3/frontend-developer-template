"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [hovered, setHovered] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="text-xs tracking-widest uppercase text-brand-muted mb-12 flex items-center gap-4">
        Selected Work <span className="text-brand-muted text-[10px]">04</span>
      </div>

      <div className="flex flex-col">
        {portfolio.projects.map((project, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : i * 0.1, ease: "easeOut" }}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            className={`group relative grid grid-cols-1 md:grid-cols-[80px_minmax(0,1fr)_auto] items-start md:items-center gap-5 md:gap-8 transition-all duration-300 ${hovered === i && !shouldReduceMotion ? 'py-8 md:pl-4' : 'py-8'}`}
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
                  <span key={j} className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full bg-brand-bg2 text-brand-muted tracking-wide uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex md:justify-end">
              {project.action ? (
                <a
                  href={project.action.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs md:text-sm px-4 py-2 bg-brand-text text-brand-bg rounded-sm tracking-wide no-underline transition-opacity duration-200 hover:opacity-85"
                >
                  {project.action.label}
                </a>
              ) : project.url !== "#" ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex text-xs uppercase tracking-widest text-brand-muted no-underline transition-colors duration-200 hover:text-brand-accent"
                >
                  View
                </a>
              ) : null}
            </div>

            {project.overlayImage ? (
              <>
                <motion.div
                  initial={false}
                  animate={hovered === i && !shouldReduceMotion ? { opacity: 1, x: 0, scale: 1, rotate: -1 } : { opacity: 0, x: 18, scale: 0.96, rotate: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="glass pointer-events-none absolute right-0 top-1/2 z-20 hidden w-[min(34vw,420px)] -translate-y-1/2 overflow-hidden rounded-xl lg:block"
                >
                  <Image src={project.overlayImage} alt="" width={920} height={560} className="block h-auto w-full" />
                </motion.div>
                <div className="glass md:col-start-2 lg:hidden overflow-hidden rounded-xl">
                  <Image src={project.overlayImage} alt={project.overlayAlt ?? ""} width={920} height={560} className="block h-auto w-full" />
                </div>
              </>
            ) : null}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
