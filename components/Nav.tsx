"use client";
import { portfolio } from "@/data/portfolio";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const navItems = ["about", "experience", "skills", "work", "contact"];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-all duration-300 ${scrolled || open ? 'bg-brand-bg/90 backdrop-blur-md' : 'bg-transparent'}`}>
      <div className="flex justify-between items-center">
        <a href="#" className="font-syne font-extrabold text-lg tracking-tight text-brand-accent no-underline" onClick={() => setOpen(false)}>
          {portfolio.name}.
        </a>

        <ul className="hidden md:flex gap-8 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item}>
              <a href={`#${item}`} className="text-sm tracking-widest uppercase text-brand-muted no-underline transition-colors duration-200 hover:text-brand-text">
                {item}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href="#contact" className="hidden sm:inline-flex text-sm px-5 py-2 border border-brand-accent2 text-brand-accent bg-transparent rounded-sm tracking-wide no-underline transition-all duration-200 hover:bg-brand-accent2 hover:text-brand-bg">
            Hire me
          </a>
          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
            className="md:hidden h-10 w-10 border border-brand-border text-brand-accent bg-transparent rounded-sm"
          >
            {open ? "X" : "+"}
          </button>
        </div>
      </div>

      {open ? (
        <div className="md:hidden pt-5 pb-2">
          <ul className="grid gap-1 list-none m-0 p-0">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href={`#${item}`}
                  onClick={() => setOpen(false)}
                  className="block py-3 border-b border-brand-border text-sm tracking-widest uppercase text-brand-muted no-underline transition-colors duration-200 hover:text-brand-text"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-5 inline-flex text-sm px-5 py-2 border border-brand-accent2 text-brand-accent bg-transparent rounded-sm tracking-wide no-underline transition-all duration-200 hover:bg-brand-accent2 hover:text-brand-bg"
          >
            Hire me
          </a>
        </div>
      ) : null}
    </nav>
  );
}
