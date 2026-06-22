"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

// deterministic pseudo-random so SSR and client agree, and re-renders stay stable
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

export default function AnimatedName({ name }: { name: string }) {
  const shouldReduceMotion = useReducedMotion();

  const letters = useMemo(
    () =>
      name.split("").map((char, i) => ({
        char,
        delay: 0.15 + seededRandom(i + 1) * 0.55,
        rotate: (seededRandom(i + 7) - 0.5) * 14,
        rise: 24 + seededRandom(i + 13) * 28,
      })),
    [name]
  );

  return (
    <h1
      className="font-display text-[clamp(2.5rem,13vw,11rem)] font-black leading-[0.88] tracking-tight text-brand-text select-none"
      aria-label={name}
    >
      {letters.map((l, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="inline-block"
          initial={shouldReduceMotion ? false : { opacity: 0, y: l.rise, rotate: l.rotate, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, rotate: 0, filter: "blur(0px)" }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.9,
            delay: shouldReduceMotion ? 0 : l.delay,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {l.char === " " ? " " : l.char}
        </motion.span>
      ))}
    </h1>
  );
}
