export default function Card({ title, subtitle, children, aside }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-soft p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        {aside}
      </div>
      {children && <div className="mt-4 text-sm text-slate-700">{children}</div>}
    </div>
  );
}
