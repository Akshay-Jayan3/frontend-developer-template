"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolio } from "@/data/portfolio";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-20 md:py-28 px-6 md:px-12 border-t border-brand-border">
      <div className="text-xs tracking-widest uppercase text-brand-accent2 mb-12 flex items-center gap-4">
        About <span className="text-brand-muted text-[10px]">01</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-tight tracking-tight">
            Designer who<br />
            <em className="italic text-brand-accent font-normal">actually codes.</em>
          </h2>

          <div className="grid grid-cols-2 gap-4 md:gap-6 mt-10 md:mt-12">
            {portfolio.stats.map((s, i) => (
              <div key={i} className="p-4 md:p-6 border border-brand-border bg-brand-bg2">
                <div className="font-syne text-3xl md:text-4xl font-extrabold text-brand-accent leading-none mb-2">{s.value}</div>
                <div className="text-xs md:text-sm text-brand-muted tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="text-brand-muted font-light leading-[1.85] text-base md:text-lg"
        >
          {portfolio.bio.map((p, i) => (
            <p key={i} className={i > 0 ? "mt-5" : ""}>{p}</p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
