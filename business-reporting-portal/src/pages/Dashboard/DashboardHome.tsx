import { Link } from 'react-router-dom';
import { TrendingUp, ShoppingCart, Boxes, ArrowRight, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '../../utils/auth';
import { SALES_REPORTS, ORDER_REPORTS, INVENTORY_REPORTS } from '../../data/reports';
import { getReportData } from '../../data/reportData';

const MODULES = [
  {
    key: 'sales',
    to: '/dashboard/sales',
    title: 'Sales',
    icon: TrendingUp,
    accent: 'brand' as const,
    reportId: 'sales-daily',
    reports: SALES_REPORTS,
    description: 'Daily, store, product and customer sales reports.',
  },
  {
    key: 'orders',
    to: '/dashboard/orders',
    title: 'Orders',
    icon: ShoppingCart,
    accent: 'emerald' as const,
    reportId: 'orders-daily',
    reports: ORDER_REPORTS,
    description: 'Order volumes, status and delivery performance.',
  },
  {
    key: 'inventory',
    to: '/dashboard/inventory',
    title: 'Inventory',
    icon: Boxes,
    accent: 'amber' as const,
    reportId: 'inventory-current',
    reports: INVENTORY_REPORTS,
    description: 'Stock levels, low-stock alerts and movement.',
  },
];

export default function DashboardHome() {
  const { user } = useAuth();

  return (
    <div>
      <div className="card mb-6 flex flex-col gap-1 p-5 sm:p-6">
        <h2 className="text-lg font-bold text-slate-800">Welcome back, {user?.name?.split(' ')[0]} 👋</h2>
        <p className="text-sm text-slate-500">
          Here&rsquo;s a quick snapshot of business performance across Sales, Orders and Inventory as of today.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {MODULES.map((mod) => {
          const report = mod.reports.find((r) => r.id === mod.reportId)!;
          const { kpis } = getReportData(report);
          return (
            <div key={mod.key} className="card flex flex-col p-5">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    mod.accent === 'brand'
                      ? 'bg-brand-50 text-brand-600'
                      : mod.accent === 'emerald'
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'bg-amber-50 text-amber-600'
                  }`}
                >
                  <mod.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">{mod.title}</h3>
                  <p className="text-xs text-slate-400">{mod.description}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {kpis.slice(0, 2).map((k) => (
                  <div key={k.label} className="rounded-lg bg-slate-50 p-2.5">
                    <p className="text-[11px] text-slate-400">{k.label}</p>
                    <p className="mt-0.5 text-sm font-bold text-slate-800">{k.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
                <FileSpreadsheet className="h-3.5 w-3.5" />
                {mod.reports.length} reports available
              </div>

              <Link
                to={mod.to}
                className="btn-secondary mt-4 justify-between text-xs hover:!bg-brand-50 hover:!text-brand-700"
              >
                View {mod.title} Reports
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          );
        })}
      </div>

      <div className="card mt-6 p-5">
        <h3 className="mb-3 text-sm font-bold text-slate-700">How to use this portal</h3>
        <ol className="list-decimal space-y-1.5 pl-5 text-sm text-slate-500">
          <li>Select a module — Sales, Orders or Inventory — from the sidebar.</li>
          <li>Browse the available report cards for that module.</li>
          <li>Click <strong>View</strong> to preview KPIs and the full data table with search, sort and pagination.</li>
          <li>Click <strong>Download Excel</strong> to generate and save a real .xlsx report file to your device.</li>
        </ol>
      </div>
    </div>
  );
}
