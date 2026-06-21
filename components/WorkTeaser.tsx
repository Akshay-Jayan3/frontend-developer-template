"use client";
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

type Project = (typeof portfolio.projects)[number];

function WorkCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.a
      href="/work"
      initial={{ opacity: 0, y: 32, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      animate={inView ? { opacity: 1, y: 0, rotate: 0 } : {}}
      transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, delay: shouldReduceMotion ? 0 : index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: hovered && !shouldReduceMotion ? rotateX : 0,
        rotateY: hovered && !shouldReduceMotion ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className="glass group relative block p-6 rounded-xl no-underline overflow-hidden"
    >
      {/* ghost index number */}
      <span
        className="absolute -top-2 -right-1 font-display font-black select-none pointer-events-none transition-all duration-500 group-hover:opacity-20 group-hover:scale-110"
        style={{ fontSize: "4.5rem", color: "var(--accent)", opacity: 0.08, transform: "translateZ(0)" }}
      >
        0{index + 1}
      </span>

      <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center gap-2 mb-4">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
          <span className="text-[10px] uppercase tracking-widest text-brand-muted">{project.tags[0]}</span>
        </div>

        <div className="font-syne text-lg md:text-xl font-bold tracking-tight mb-2 text-brand-text">
          {project.title}
        </div>
        <p className="text-sm text-brand-muted font-light leading-relaxed mb-6">{project.desc}</p>

        <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-brand-accent">
          View project
          <motion.span animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
            →
          </motion.span>
        </span>
      </div>
    </motion.a>
  );
}

export default function WorkTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const featured = portfolio.projects.slice(0, 3);

  return (
    <section id="work" ref={ref} className="py-20 md:py-28 px-6 md:px-12" style={{ perspective: "1000px" }}>
      <div className="flex items-center justify-between mb-12">
        <div className="text-xs tracking-widest uppercase text-brand-muted flex items-center gap-4">
          Selected Work <span className="text-brand-muted text-[10px]">04</span>
        </div>
        <a
          href="/work"
          className="text-xs uppercase tracking-widest text-brand-accent no-underline hover:text-brand-text transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {featured.map((project, i) => (
          <WorkCard key={project.title} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
