"use client";
import { portfolio } from "@/data/portfolio";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 border-b backdrop-blur-md transition-all duration-300"
      style={
        scrolled
          ? { backgroundColor: "var(--glass-bg)", borderColor: "var(--glass-border)" }
          : {
              background: "linear-gradient(to bottom, var(--bg) 0%, transparent 100%)",
              borderColor: "transparent",
            }
      }
    >
      <div className="flex justify-between items-center">
        <a href="#" className="font-syne font-extrabold text-lg tracking-tight text-brand-text no-underline">
          {portfolio.name}.
        </a>

        <a href="/contact" className="text-sm px-5 py-2 bg-brand-text text-brand-bg rounded-sm tracking-wide no-underline transition-opacity duration-200 hover:opacity-85">
          Let&apos;s talk
        </a>
      </div>
    </nav>
  );
}
