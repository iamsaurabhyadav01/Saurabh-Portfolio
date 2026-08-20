import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  label: string;
  value: string;
  icon?: LucideIcon;
  accent?: 'brand' | 'emerald' | 'amber' | 'red';
}

const ACCENTS: Record<NonNullable<KpiCardProps['accent']>, string> = {
  brand: 'bg-brand-50 text-brand-600',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
};

export default function KpiCard({ label, value, icon: Icon, accent = 'brand' }: KpiCardProps) {
  return (
    <div className="card p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        {Icon && (
          <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${ACCENTS[accent]}`}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-800">{value}</p>
    </div>
  );
}
