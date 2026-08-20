import { useMemo, useState } from 'react';
import { X, Search, ArrowUp, ArrowDown, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { ReportDef } from '../data/reports';
import { getReportData, ReportRow } from '../data/reportData';
import { exportToExcel, todayFileDate } from '../utils/excelExport';
import { useToast } from './Toast';
import KpiCard from './KpiCard';

interface ReportViewModalProps {
  report: ReportDef;
  onClose: () => void;
}

const PAGE_SIZE = 10;

export default function ReportViewModal({ report, onClose }: ReportViewModalProps) {
  const { rows, columns, kpis, filenamePrefix } = useMemo(() => getReportData(report), [report]);
  const [query, setQuery] = useState('');
  const [sortCol, setSortCol] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    if (!query.trim()) return rows;
    const q = query.trim().toLowerCase();
    return rows.filter((row) =>
      Object.values(row as ReportRow).some((val) => String(val).toLowerCase().includes(q))
    );
  }, [rows, query]);

  const sorted = useMemo(() => {
    if (!sortCol) return filtered;
    const copy = [...filtered];
    copy.sort((a: any, b: any) => {
      const av = a[sortCol];
      const bv = b[sortCol];
      if (typeof av === 'number' && typeof bv === 'number') {
        return sortDir === 'asc' ? av - bv : bv - av;
      }
      return sortDir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [filtered, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginated = sorted.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSort = (col: string) => {
    if (sortCol === col) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortCol(col);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handleDownload = () => {
    const filename = `${filenamePrefix}_${todayFileDate()}.xlsx`;
    exportToExcel(filename, report.name, rows);
    showToast('success', 'Download complete', `${filename} has been saved to your device.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-3 sm:p-6" onClick={onClose}>
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{report.name}</h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {report.type} &middot; {report.period}
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-4 sm:px-6">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {kpis.map((k) => (
              <KpiCard key={k.label} label={k.label} value={k.value} />
            ))}
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setPage(1);
                }}
                placeholder="Search records…"
                className="input-field pl-9"
              />
            </div>
            <button onClick={handleDownload} className="btn-primary text-xs">
              <Download className="h-3.5 w-3.5" />
              Download Excel
            </button>
          </div>

          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full min-w-[720px] border-collapse text-left text-xs">
              <thead className="bg-slate-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col}
                      onClick={() => handleSort(col)}
                      className="cursor-pointer select-none whitespace-nowrap px-3.5 py-2.5 font-semibold text-slate-600 hover:bg-slate-100"
                    >
                      <span className="inline-flex items-center gap-1">
                        {col}
                        {sortCol === col &&
                          (sortDir === 'asc' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />)}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginated.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-100 hover:bg-slate-50">
                    {columns.map((col) => {
                      const value = (row as any)[col];
                      const isStatus = col.toLowerCase().includes('status');
                      return (
                        <td key={col} className="whitespace-nowrap px-3.5 py-2.5 text-slate-700">
                          {isStatus ? <StatusPill value={String(value)} /> : String(value)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr>
                    <td colSpan={columns.length} className="px-3.5 py-8 text-center text-slate-400">
                      No records match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing {paginated.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1}
              {' - '}
              {Math.min(currentPage * PAGE_SIZE, sorted.length)} of {sorted.length} records
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="btn-secondary !px-2.5 !py-1.5 disabled:opacity-40"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-medium text-slate-600">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="btn-secondary !px-2.5 !py-1.5 disabled:opacity-40"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ value }: { value: string }) {
  const map: Record<string, string> = {
    Completed: 'bg-emerald-50 text-emerald-700',
    Delivered: 'bg-emerald-50 text-emerald-700',
    'In Stock': 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Processing: 'bg-amber-50 text-amber-700',
    'In Transit': 'bg-amber-50 text-amber-700',
    'Out for Delivery': 'bg-amber-50 text-amber-700',
    'Low Stock': 'bg-amber-50 text-amber-700',
    Cancelled: 'bg-red-50 text-red-700',
    Returned: 'bg-red-50 text-red-700',
    'Not Dispatched': 'bg-slate-100 text-slate-600',
    'Out of Stock': 'bg-red-50 text-red-700',
  };
  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${map[value] ?? 'bg-slate-100 text-slate-600'}`}>
      {value}
    </span>
  );
}
