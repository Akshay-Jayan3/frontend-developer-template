"use client";
import { motion, useReducedMotion } from "framer-motion";

export function CircleScribble({ className, delay = 0 }: { className?: string; delay?: number }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      className={className}
      viewBox="0 0 200 80"
      preserveAspectRatio="none"
      fill="none"
      aria-hidden="true"
    >
      <motion.path
        d="M10,40 C9,16 49,2 101,3 C156,4 193,17 190,43 C187,66 144,78 97,77 C47,76 11,65 10,40"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={shouldReduceMotion ? { duration: 0.01 } : { duration: 1.1, delay, ease: [0.65, 0, 0.35, 1] }}
      />
    </svg>
  );
}
