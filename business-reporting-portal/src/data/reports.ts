export type ModuleKey = 'sales' | 'orders' | 'inventory';

export interface ReportDef {
  id: string;
  module: ModuleKey;
  name: string;
  type: string;
  period: string;
  lastUpdated: string;
  fileSizeKB: number;
}

export const SALES_REPORTS: ReportDef[] = [
  {
    id: 'sales-daily',
    module: 'sales',
    name: 'Daily Sales Report',
    type: 'Transaction Detail',
    period: 'Today, 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 09:15 AM',
    fileSizeKB: 48,
  },
  {
    id: 'sales-storewise',
    module: 'sales',
    name: 'Store-wise Sales Report',
    type: 'Store Summary',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 08:40 AM',
    fileSizeKB: 62,
  },
  {
    id: 'sales-productwise',
    module: 'sales',
    name: 'Product-wise Sales Report',
    type: 'Product Summary',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '19 Aug 2026, 06:05 PM',
    fileSizeKB: 55,
  },
  {
    id: 'sales-customerwise',
    module: 'sales',
    name: 'Customer-wise Sales Report',
    type: 'Customer Summary',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '19 Aug 2026, 05:30 PM',
    fileSizeKB: 51,
  },
  {
    id: 'sales-monthly',
    module: 'sales',
    name: 'Monthly Sales Summary',
    type: 'Monthly Summary',
    period: 'Jul 2026',
    lastUpdated: '01 Aug 2026, 07:00 AM',
    fileSizeKB: 74,
  },
];

export const ORDER_REPORTS: ReportDef[] = [
  {
    id: 'orders-daily',
    module: 'orders',
    name: 'Daily Order Report',
    type: 'Transaction Detail',
    period: 'Today, 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 09:20 AM',
    fileSizeKB: 45,
  },
  {
    id: 'orders-storewise',
    module: 'orders',
    name: 'Store-wise Order Report',
    type: 'Store Summary',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 08:50 AM',
    fileSizeKB: 58,
  },
  {
    id: 'orders-status',
    module: 'orders',
    name: 'Order Status Report',
    type: 'Status Summary',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '19 Aug 2026, 07:10 PM',
    fileSizeKB: 49,
  },
  {
    id: 'orders-productwise',
    module: 'orders',
    name: 'Product-wise Order Report',
    type: 'Product Summary',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '19 Aug 2026, 04:45 PM',
    fileSizeKB: 53,
  },
  {
    id: 'orders-monthly',
    module: 'orders',
    name: 'Monthly Order Summary',
    type: 'Monthly Summary',
    period: 'Jul 2026',
    lastUpdated: '01 Aug 2026, 07:10 AM',
    fileSizeKB: 69,
  },
];

export const INVENTORY_REPORTS: ReportDef[] = [
  {
    id: 'inventory-current',
    module: 'inventory',
    name: 'Current Stock Report',
    type: 'Stock Snapshot',
    period: 'As of 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 07:00 AM',
    fileSizeKB: 41,
  },
  {
    id: 'inventory-storewise',
    module: 'inventory',
    name: 'Store-wise Inventory',
    type: 'Store Summary',
    period: 'As of 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 07:00 AM',
    fileSizeKB: 88,
  },
  {
    id: 'inventory-productwise',
    module: 'inventory',
    name: 'Product Stock Report',
    type: 'Product Summary',
    period: 'As of 20 Aug 2026',
    lastUpdated: '19 Aug 2026, 09:00 PM',
    fileSizeKB: 47,
  },
  {
    id: 'inventory-lowstock',
    module: 'inventory',
    name: 'Low Stock Report',
    type: 'Exception Report',
    period: 'As of 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 07:05 AM',
    fileSizeKB: 22,
  },
  {
    id: 'inventory-movement',
    module: 'inventory',
    name: 'Stock Movement Report',
    type: 'Movement Detail',
    period: '01 Aug 2026 - 20 Aug 2026',
    lastUpdated: '20 Aug 2026, 07:10 AM',
    fileSizeKB: 91,
  },
];

export const REPORTS_BY_MODULE: Record<ModuleKey, ReportDef[]> = {
  sales: SALES_REPORTS,
  orders: ORDER_REPORTS,
  inventory: INVENTORY_REPORTS,
};

export function findReport(id: string): ReportDef | undefined {
  return [...SALES_REPORTS, ...ORDER_REPORTS, ...INVENTORY_REPORTS].find((r) => r.id === id);
}
