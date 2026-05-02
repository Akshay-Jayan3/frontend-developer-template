import { portfolio } from "@/data/portfolio";

export default function Footer() {
  return (
    <footer className="py-8 px-6 md:px-12 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
      <div className="font-syne text-sm font-bold text-brand-muted">
        {portfolio.name}. — {portfolio.role}
      </div>
      <div className="text-xs text-brand-muted">
        Built with Next.js · Part of PixelDosa Frontend Job System
      </div>
    </footer>
  );
}
