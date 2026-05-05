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
    <nav className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-4 transition-all duration-300 ${scrolled ? 'bg-brand-bg/85 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="font-syne font-extrabold text-lg tracking-tight text-brand-accent">
        {portfolio.name}.
      </div>

      <ul className="hidden md:flex gap-8 list-none m-0 p-0">
        {["about", "skills", "work", "contact"].map((item) => (
          <li key={item}>
            <a href={`#${item}`} className="text-sm tracking-widest uppercase text-brand-muted no-underline transition-colors duration-200 hover:text-brand-text">
              {item}
            </a>
          </li>
        ))}
      </ul>

      <a href="#contact" className="text-sm px-5 py-2 border border-brand-accent2 text-brand-accent bg-transparent rounded-sm cursor-pointer tracking-wide no-underline transition-all duration-200 hover:bg-brand-accent2 hover:text-brand-bg">
        Hire me
      </a>
    </nav>
  );
}
