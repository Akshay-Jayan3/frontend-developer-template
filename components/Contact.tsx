"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolio } from "@/data/portfolio";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const items = [
    { type: "Email", value: portfolio.contact.email },
    { type: "LinkedIn", value: portfolio.contact.linkedin },
    { type: "GitHub", value: portfolio.contact.github },
    { type: "Location", value: portfolio.location },
  ];

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 px-6 md:px-12 border-t border-brand-border">
      <div className="text-xs tracking-widest uppercase text-brand-accent2 mb-12 flex items-center gap-4">
        Contact <span className="text-brand-muted text-[10px]">04</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-syne text-[clamp(2.5rem,5vw,4.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Let&apos;s build<br />
            <em className="italic text-brand-accent font-normal">something</em><br />
            great.
          </h2>
          <p className="mt-8 text-brand-muted font-light max-w-[30ch] leading-[1.8] text-base md:text-lg">
            Open to full-time roles and select freelance projects.
            Always happy to talk design, code, or both.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
          className="pt-4"
        >
          {items.map((item, i) => (
            <div key={i} className={`py-6 flex flex-col md:flex-row md:justify-between md:items-center gap-2 border-b border-brand-border ${i === 0 ? 'border-t border-brand-border' : ''}`}>
              <span className="text-xs uppercase tracking-widest text-brand-muted">
                {item.type}
              </span>
              <span className="text-sm md:text-base text-brand-accent">
                {item.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
