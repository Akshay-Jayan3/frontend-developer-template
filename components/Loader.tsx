"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "こんにちは",
  "안녕하세요",
  "Namaste",
  "Привет",
  "Olá",
  "你好",
  "Hallo",
  "Merhaba",
];

const SESSION_KEY = "site-loaded";

export default function Loader() {
  const shouldReduceMotion = useReducedMotion();
  const [skip, setSkip] = useState(true);
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const alreadyLoaded = sessionStorage.getItem(SESSION_KEY);
    if (alreadyLoaded || shouldReduceMotion) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setSkip(true);
      setDone(true);
      return;
    }
    setSkip(false);
  }, [shouldReduceMotion]);

  useEffect(() => {
    if (skip) return;

    window.__lenis?.stop();
    document.body.style.overflow = "hidden";

    const duration = 1800;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem(SESSION_KEY, "1");
          document.body.style.overflow = "";
          window.__lenis?.start();
        }, 350);
      }
    };
    raf = requestAnimationFrame(tick);

    const greetingInterval = setInterval(() => {
      setGreetingIndex((i) => (i + 1) % GREETINGS.length);
    }, 160);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(greetingInterval);
    };
  }, [skip]);

  if (skip && done) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-8"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <div className="h-16 md:h-20 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={greetingIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="font-display italic text-5xl md:text-7xl text-brand-text"
              >
                {GREETINGS[greetingIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-end gap-1 font-mono tabular-nums">
            <span className="text-xl md:text-2xl font-bold text-brand-muted leading-none">
              {progress}
            </span>
            <span className="text-sm md:text-base text-brand-muted mb-0.5">%</span>
          </div>

          <div className="w-48 md:w-64 h-px bg-brand-border overflow-hidden">
            <motion.div
              className="h-full"
              style={{ backgroundColor: "var(--accent)", width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
