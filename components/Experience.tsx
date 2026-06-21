"use client";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { portfolio } from "@/data/portfolio";

type ExperienceItem = (typeof portfolio.experience)[number];

function ExperienceRow({ item, index, inView }: { item: ExperienceItem; index: number; inView: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, delay: shouldReduceMotion ? 0 : index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6 lg:gap-12 py-10 md:py-12"
    >
      <div>
        <div className="font-syne text-xs tracking-widest uppercase text-brand-muted mb-3">
          {item.period}
        </div>
        <div className="text-sm text-brand-muted leading-relaxed">
          {item.company}
          <br />
          {item.location}
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-5">
          <div>
            <h3 className="font-syne text-2xl md:text-3xl font-bold tracking-tight text-brand-text">
              {item.role}
            </h3>
            <p className="mt-3 text-base md:text-lg text-brand-muted font-light leading-relaxed max-w-[56ch]">
              {item.summary}
            </p>
          </div>
          <span className="font-syne text-4xl md:text-5xl font-extrabold text-brand-bg3 leading-none">
            0{index + 1}
          </span>
        </div>

        <ul className="space-y-3 mb-7">
          {item.highlights.map((highlight) => (
            <li key={highlight} className="grid grid-cols-[12px_1fr] gap-4 text-sm md:text-base text-brand-muted font-light leading-relaxed">
              <span className="mt-2 h-px w-3 bg-brand-accent2" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] md:text-xs px-2 md:px-3 py-1 rounded-full bg-brand-bg2 text-brand-muted tracking-wide uppercase">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <div className="text-xs tracking-widest uppercase text-brand-muted mb-12 flex items-center gap-4">
        Experience <span className="text-brand-muted text-[10px]">02</span>
      </div>

      <div>
        {portfolio.experience.map((item, index) => (
          <ExperienceRow key={`${item.role}-${item.period}`} item={item} index={index} inView={inView} />
        ))}
      </div>
    </section>
  );
}
