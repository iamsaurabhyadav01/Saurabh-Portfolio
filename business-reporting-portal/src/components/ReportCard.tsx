import { useState } from 'react';
import { Eye, Download, FileSpreadsheet, Calendar, Clock, HardDrive } from 'lucide-react';
import { ReportDef } from '../data/reports';
import { getReportData } from '../data/reportData';
import { exportToExcel, todayFileDate } from '../utils/excelExport';
import { useToast } from './Toast';

interface ReportCardProps {
  report: ReportDef;
  onView: (report: ReportDef) => void;
}

export default function ReportCard({ report, onView }: ReportCardProps) {
  const [downloading, setDownloading] = useState(false);
  const { showToast } = useToast();

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      try {
        const { rows, filenamePrefix } = getReportData(report);
        const filename = `${filenamePrefix}_${todayFileDate()}.xlsx`;
        exportToExcel(filename, report.name, rows);
        showToast('success', 'Download complete', `${filename} has been saved to your device.`);
      } catch (err) {
        showToast('error', 'Download failed', 'Something went wrong while generating the Excel file.');
      } finally {
        setDownloading(false);
      }
    }, 500);
  };

  return (
    <div className="card group p-5 transition-shadow hover:shadow-cardHover">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
          <FileSpreadsheet className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-sm font-semibold text-slate-800">{report.name}</h3>
          <p className="mt-0.5 text-xs font-medium text-brand-600">{report.type}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1.5 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{report.period}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>Updated {report.lastUpdated}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HardDrive className="h-3.5 w-3.5 shrink-0" />
          <span>{report.fileSizeKB} KB &middot; XLSX</span>
        </div>
      </div>

      <div className="mt-5 flex gap-2">
        <button onClick={() => onView(report)} className="btn-secondary flex-1 !py-2 text-xs">
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
        <button onClick={handleDownload} disabled={downloading} className="btn-primary flex-1 !py-2 text-xs">
          {downloading ? (
            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
          ) : (
            <Download className="h-3.5 w-3.5" />
          )}
          {downloading ? 'Preparing…' : 'Download Excel'}
        </button>
      </div>
    </div>
  );
}
