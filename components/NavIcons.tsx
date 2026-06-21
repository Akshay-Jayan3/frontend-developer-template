type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function AboutIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2" />
    </svg>
  );
}

export function ExperienceIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="7.5" width="17" height="12" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5" />
      <path d="M3.5 12.5h17" />
    </svg>
  );
}

export function SkillsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5l1.8 4.4 4.7.4-3.6 3 1.1 4.6L12 13.6l-4 2.3 1.1-4.6-3.6-3 4.7-.4z" />
    </svg>
  );
}

export function WorkIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3.5 6.5h5.2l1.5 2H20a1 1 0 0 1 1 1V18a1 1 0 0 1-1 1H3.5a1 1 0 0 1-1-1V7.5a1 1 0 0 1 1-1z" />
    </svg>
  );
}

export function ContactIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20.5 3.5L3 10.8l6.4 2.5M20.5 3.5L13.5 21l-4.1-7.7M20.5 3.5L9.4 13.3" />
    </svg>
  );
}

export function ChatIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12.5c0-4.4 3.8-8 8.5-8s8.5 3.6 8.5 8-3.8 8-8.5 8c-1 0-1.9-.1-2.8-.4L5 21l1.2-3.6C4.5 16 4 14.3 4 12.5z" />
      <circle cx="9" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12.5" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="12.5" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}
