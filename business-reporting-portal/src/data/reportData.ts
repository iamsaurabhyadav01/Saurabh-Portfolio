import { ReportDef } from './reports';
import { generateSalesData, generateOrdersData, generateInventoryData, SalesRow, OrderRow, InventoryRow } from './generators';

export type ReportRow = SalesRow | OrderRow | InventoryRow;

export interface KPI {
  label: string;
  value: string;
}

export interface ReportDataResult {
  rows: ReportRow[];
  columns: string[];
  kpis: KPI[];
  filenamePrefix: string;
}

const currency = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export function getReportData(report: ReportDef): ReportDataResult {
  if (report.module === 'sales') {
    const rows = generateSalesData(report.id);
    const totalSales = rows.reduce((s, r) => s + r['Net Sales'], 0);
    const totalOrders = rows.length;
    const totalUnits = rows.reduce((s, r) => s + r.Quantity, 0);
    const avgOrderValue = totalOrders ? totalSales / totalOrders : 0;
    return {
      rows,
      columns: Object.keys(rows[0] ?? {}),
      kpis: [
        { label: 'Total Sales', value: currency(Math.round(totalSales)) },
        { label: 'Total Orders', value: totalOrders.toLocaleString('en-IN') },
        { label: 'Total Units', value: totalUnits.toLocaleString('en-IN') },
        { label: 'Average Order Value', value: currency(Math.round(avgOrderValue)) },
      ],
      filenamePrefix: 'Sales_Report',
    };
  }

  if (report.module === 'orders') {
    const rows = generateOrdersData(report.id);
    const completed = rows.filter((r) => r['Order Status'] === 'Completed').length;
    const pending = rows.filter((r) => r['Order Status'] === 'Pending' || r['Order Status'] === 'Processing').length;
    const cancelled = rows.filter((r) => r['Order Status'] === 'Cancelled').length;
    return {
      rows,
      columns: Object.keys(rows[0] ?? {}),
      kpis: [
        { label: 'Total Orders', value: rows.length.toLocaleString('en-IN') },
        { label: 'Completed', value: completed.toLocaleString('en-IN') },
        { label: 'Pending', value: pending.toLocaleString('en-IN') },
        { label: 'Cancelled', value: cancelled.toLocaleString('en-IN') },
      ],
      filenamePrefix: 'Order_Report',
    };
  }

  const rows = generateInventoryData(report.id, report.id === 'inventory-storewise' || report.id === 'inventory-movement');
  const filtered = report.id === 'inventory-lowstock' ? rows.filter((r) => r['Stock Status'] !== 'In Stock') : rows;
  const totalSKUs = new Set(filtered.map((r) => r.SKU)).size;
  const totalStock = filtered.reduce((s, r) => s + r['Current Stock'], 0);
  const lowStock = filtered.filter((r) => r['Stock Status'] === 'Low Stock').length;
  const outOfStock = filtered.filter((r) => r['Stock Status'] === 'Out of Stock').length;
  return {
    rows: filtered,
    columns: Object.keys(filtered[0] ?? {}),
    kpis: [
      { label: 'Total SKUs', value: totalSKUs.toLocaleString('en-IN') },
      { label: 'Total Stock', value: totalStock.toLocaleString('en-IN') },
      { label: 'Low Stock Items', value: lowStock.toLocaleString('en-IN') },
      { label: 'Out of Stock Items', value: outOfStock.toLocaleString('en-IN') },
    ],
    filenamePrefix: 'Inventory_Report',
  };
}
