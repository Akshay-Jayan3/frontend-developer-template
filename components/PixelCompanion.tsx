"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// 12 cols x 10 rows. . transparent, B body, S shade (ears/legs), W eye white, E eye pupil, N snout patch
const OPEN_EYES = [
  "..S......S..",
  "..SS....SS..",
  ".BBBBBBBBBB.",
  "BBBBBBBBBBBB",
  "BBBWEBBWEBBB",
  "BBBBBBBBBBBB",
  "BBNNNNNNNNBB",
  "BBBBBBBBBBBB",
  ".S.S..S.S...",
  ".S.S..S.S...",
];

const CLOSED_EYES = [
  "..S......S..",
  "..SS....SS..",
  ".BBBBBBBBBB.",
  "BBBBBBBBBBBB",
  "BBBBBBBBBBBB",
  "BBBBBBBBBBBB",
  "BBNNNNNNNNBB",
  "BBBBBBBBBBBB",
  ".S.S..S.S...",
  ".S.S..S.S...",
];

const COLORS: Record<string, string> = {
  B: "var(--accent)",
  S: "var(--accent2)",
  W: "#ffffff",
  E: "#14181a",
  N: "#bdf5dd",
};

export default function PixelCompanion({ active }: { active?: boolean }) {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleBlink = () => {
      timeout = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, 2200 + Math.random() * 2000);
    };
    scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  const grid = blink ? CLOSED_EYES : OPEN_EYES;

  return (
    <motion.div
      animate={{ y: [0, -3, 0], rotate: active ? [0, -2, 2, 0] : 0 }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(12, 1fr)",
        width: 44,
        height: "auto",
        aspectRatio: "12 / 10",
      }}
    >
      {grid.flatMap((row, r) =>
        row.split("").map((cell, c) => (
          <div
            key={`${r}-${c}`}
            style={{
              backgroundColor: COLORS[cell] ?? "transparent",
            }}
          />
        ))
      )}
    </motion.div>
  );
}
