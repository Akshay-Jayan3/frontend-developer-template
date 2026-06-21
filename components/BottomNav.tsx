"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import { WorkIcon, ContactIcon } from "@/components/NavIcons";

const navItems = [
  { href: "/work", label: "Work", Icon: WorkIcon },
  { href: "/contact", label: "Contact", Icon: ContactIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <div
        className="glass pointer-events-auto flex items-center gap-1 rounded-full px-2 py-2"
        style={{ backgroundColor: "var(--bg2)" }}
      >
        <Link
          href="/"
          aria-label="Home"
          title="Home"
          className={`relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full transition-colors duration-200 ${
            pathname === "/" ? "text-brand-bg" : "text-brand-muted hover:text-brand-text"
          }`}
          style={pathname === "/" ? { backgroundColor: "var(--accent)" } : undefined}
        >
          <span className="text-xs font-bold">●</span>
        </Link>
        <span className="w-px h-5 bg-brand-border mx-1" />
        {navItems.map(({ href, label, Icon }) => (
          <Link
            key={href}
            href={href}
            aria-label={label}
            title={label}
            className={`relative flex items-center justify-center h-9 w-9 md:h-10 md:w-10 rounded-full transition-colors duration-200 ${
              pathname === href ? "text-brand-bg" : "text-brand-muted hover:text-brand-text"
            }`}
            style={pathname === href ? { backgroundColor: "var(--accent)" } : undefined}
          >
            <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
          </Link>
        ))}
        <span className="w-px h-5 bg-brand-border mx-1" />
        <ThemeToggle className="h-8 w-8" />
      </div>
    </nav>
  );
}
