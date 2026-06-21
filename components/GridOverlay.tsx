function Corner({ position, label }: { position: string; label: string }) {
  return (
    <div className={`absolute ${position} flex items-center gap-1.5`}>
      <span className="relative block h-2.5 w-2.5">
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-brand-muted/30" />
        <span className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-brand-muted/30" />
      </span>
      <span className="font-syne text-[10px] tracking-widest text-brand-muted/40">{label}</span>
    </div>
  );
}

export default function GridOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30" aria-hidden="true">
      <Corner position="left-4 top-4 md:left-6 md:top-6" label="01" />
      <Corner position="right-4 top-4 md:right-6 md:top-6" label="02" />
      <Corner position="bottom-4 left-4 md:bottom-6 md:left-6" label="03" />
      <Corner position="bottom-4 right-4 md:bottom-6 md:right-6" label="04" />
    </div>
  );
}
