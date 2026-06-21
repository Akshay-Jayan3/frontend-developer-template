"use client";

export default function Marquee({ items, speed = 28 }: { items: string[]; speed?: number }) {
  const track = [...items, ...items];

  return (
    <div className="relative w-full overflow-hidden py-4 border-y border-brand-border/60">
      <div
        className="marquee-track flex w-max items-center gap-10 whitespace-nowrap"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {track.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-sm md:text-base tracking-widest uppercase text-brand-muted"
          >
            {item}
            <span className="text-brand-accent">●</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .marquee-track {
          animation-name: marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
