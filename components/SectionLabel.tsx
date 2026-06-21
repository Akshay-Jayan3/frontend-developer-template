export default function SectionLabel({ index, total, label }: { index: number; total: number; label: string }) {
  return (
    <div className="text-xs tracking-widest uppercase text-brand-accent2 mb-12 flex items-center gap-4">
      <span className="text-brand-muted text-[10px] font-normal tracking-normal normal-case">
        [ {String(index).padStart(2, "0")} / {String(total).padStart(2, "0")} ]
      </span>
      {label}
    </div>
  );
}
