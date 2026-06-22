"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { portfolio } from "@/data/portfolio";

export default function ContactTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="py-20 md:py-28 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, x: -12 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-xs tracking-widest uppercase text-brand-muted mb-12 flex items-center gap-4"
      >
        Contact <span className="text-brand-muted text-[10px]">05</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
      >
        <div>
          <h2 className="font-syne text-[clamp(2rem,4vw,3.5rem)] font-extrabold leading-[0.95] tracking-tight">
            Let&apos;s build<br />
            <em className="italic text-brand-text font-normal">something</em> great.
          </h2>
          <p className="mt-6 text-brand-muted font-light max-w-[36ch] leading-[1.8] text-base md:text-lg">
            Open to full-time roles and select freelance projects.
          </p>
        </div>

        <a
          href="/contact"
          className="inline-flex shrink-0 text-sm px-6 py-3 bg-brand-text text-brand-bg rounded-sm tracking-wide no-underline transition-opacity duration-200 hover:opacity-85"
        >
          Get in touch →
        </a>
      </motion.div>
    </section>
  );
}
