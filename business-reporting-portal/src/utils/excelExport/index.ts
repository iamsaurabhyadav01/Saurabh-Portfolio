import * as XLSX from 'xlsx';

/**
 * Generates a real .xlsx file in-browser using SheetJS and triggers a download.
 */
export function exportToExcel<T extends object>(filename: string, sheetName: string, rows: T[]) {
  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Auto-size columns based on content length for a more professional look.
  const colWidths = Object.keys(rows[0] ?? {}).map((key) => {
    const maxContentLen = rows.reduce((max, row) => {
      const val = (row as Record<string, unknown>)[key];
      const len = val == null ? 0 : String(val).length;
      return Math.max(max, len);
    }, key.length);
    return { wch: Math.min(Math.max(maxContentLen + 2, 10), 40) };
  });
  worksheet['!cols'] = colWidths;

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName.slice(0, 31));
  XLSX.writeFile(workbook, filename, { compression: true });
}

export function todayFileDate(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
