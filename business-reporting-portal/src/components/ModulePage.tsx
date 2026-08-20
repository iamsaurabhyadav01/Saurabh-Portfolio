import { useMemo, useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { ModuleKey, ReportDef, REPORTS_BY_MODULE } from '../data/reports';
import { getReportData } from '../data/reportData';
import ReportCard from './ReportCard';
import ReportViewModal from './ReportViewModal';
import KpiCard from './KpiCard';

interface ModulePageProps {
  module: ModuleKey;
  icon: LucideIcon;
  description: string;
  kpiIcons: LucideIcon[];
  kpiAccents: ('brand' | 'emerald' | 'amber' | 'red')[];
  summaryReportId: string;
}

export default function ModulePage({ module, icon: Icon, description, kpiIcons, kpiAccents, summaryReportId }: ModulePageProps) {
  const reports = REPORTS_BY_MODULE[module];
  const [activeReport, setActiveReport] = useState<ReportDef | null>(null);

  const summaryReport = reports.find((r) => r.id === summaryReportId) ?? reports[0];
  const summary = useMemo(() => getReportData(summaryReport), [summaryReport]);

  return (
    <div>
      <div className="card mb-6 flex items-center gap-4 p-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-base font-bold text-slate-800 capitalize">{module} Module</h2>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {summary.kpis.map((k, i) => (
          <KpiCard key={k.label} label={k.label} value={k.value} icon={kpiIcons[i]} accent={kpiAccents[i]} />
        ))}
      </div>

      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Available Reports</h3>
        <span className="text-xs text-slate-400">{reports.length} reports</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {reports.map((report) => (
          <ReportCard key={report.id} report={report} onView={setActiveReport} />
        ))}
      </div>

      {activeReport && <ReportViewModal report={activeReport} onClose={() => setActiveReport(null)} />}
    </div>
  );
}
