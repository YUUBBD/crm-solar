export function StatCard({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <div className="card p-5">
      <div className="text-sm muted">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      {detail && <div className="mt-2 text-xs muted">{detail}</div>}
    </div>
  );
}
