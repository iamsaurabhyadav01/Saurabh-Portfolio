import { STORES, PAYMENT_MODES, CUSTOMERS, PRODUCTS, ORDER_STATUSES, DELIVERY_STATUSES } from './constants';

// Deterministic pseudo-random generator so a given report shows the same
// dummy data set every time it is viewed/downloaded within a session.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return h;
}

function pad(n: number, len = 2) {
  return String(n).padStart(len, '0');
}

function formatDate(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function pick<T>(rnd: () => number, arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}

export interface SalesRow {
  Date: string;
  Store: string;
  'Invoice Number': string;
  Customer: string;
  Product: string;
  Category: string;
  Quantity: number;
  'Gross Sales': number;
  Discount: number;
  Tax: number;
  'Net Sales': number;
  'Payment Mode': string;
}

export interface OrderRow {
  'Order Date': string;
  'Order ID': string;
  Store: string;
  Customer: string;
  Product: string;
  Quantity: number;
  'Order Value': number;
  'Payment Mode': string;
  'Order Status': string;
  'Delivery Status': string;
}

export interface InventoryRow {
  SKU: string;
  'Product Name': string;
  Category: string;
  Store: string;
  'Opening Stock': number;
  'Stock In': number;
  'Stock Out': number;
  'Current Stock': number;
  'Reorder Level': number;
  'Stock Status': 'In Stock' | 'Low Stock' | 'Out of Stock';
  'Last Updated': string;
}

const TODAY = new Date();

export function generateSalesData(seedKey: string, rows = 60): SalesRow[] {
  const rnd = mulberry32(seedFromString(seedKey));
  const data: SalesRow[] = [];
  for (let i = 0; i < rows; i++) {
    const daysAgo = Math.floor(rnd() * 30);
    const date = new Date(TODAY);
    date.setDate(date.getDate() - daysAgo);
    const product = pick(rnd, PRODUCTS);
    const qty = 1 + Math.floor(rnd() * 6);
    const gross = Math.round(product.price * qty);
    const discount = Math.round(gross * (rnd() * 0.15));
    const taxable = gross - discount;
    const tax = Math.round(taxable * 0.18);
    const net = taxable + tax;
    data.push({
      Date: formatDate(date),
      Store: pick(rnd, STORES),
      'Invoice Number': `INV-${2026}${pad(Math.floor(rnd() * 9000) + 1000, 4)}`,
      Customer: pick(rnd, CUSTOMERS),
      Product: product.name,
      Category: product.category,
      Quantity: qty,
      'Gross Sales': gross,
      Discount: discount,
      Tax: tax,
      'Net Sales': net,
      'Payment Mode': pick(rnd, PAYMENT_MODES),
    });
  }
  return data.sort((a, b) => (a.Date < b.Date ? 1 : -1));
}

export function generateOrdersData(seedKey: string, rows = 55): OrderRow[] {
  const rnd = mulberry32(seedFromString(seedKey));
  const data: OrderRow[] = [];
  for (let i = 0; i < rows; i++) {
    const daysAgo = Math.floor(rnd() * 30);
    const date = new Date(TODAY);
    date.setDate(date.getDate() - daysAgo);
    const product = pick(rnd, PRODUCTS);
    const qty = 1 + Math.floor(rnd() * 5);
    const status = pick(rnd, ORDER_STATUSES);
    const delivery =
      status === 'Cancelled' ? 'Returned' : status === 'Completed' ? 'Delivered' : pick(rnd, DELIVERY_STATUSES);
    data.push({
      'Order Date': formatDate(date),
      'Order ID': `ORD-${2026}${pad(Math.floor(rnd() * 9000) + 1000, 4)}`,
      Store: pick(rnd, STORES),
      Customer: pick(rnd, CUSTOMERS),
      Product: product.name,
      Quantity: qty,
      'Order Value': Math.round(product.price * qty),
      'Payment Mode': pick(rnd, PAYMENT_MODES),
      'Order Status': status,
      'Delivery Status': delivery,
    });
  }
  return data.sort((a, b) => (a['Order Date'] < b['Order Date'] ? 1 : -1));
}

export function generateInventoryData(seedKey: string, storeFiltered = false): InventoryRow[] {
  const rnd = mulberry32(seedFromString(seedKey));
  const data: InventoryRow[] = [];
  const stores = storeFiltered ? STORES : STORES.slice(0, 4);
  for (const store of stores) {
    for (const product of PRODUCTS) {
      const opening = 20 + Math.floor(rnd() * 180);
      const stockIn = Math.floor(rnd() * 60);
      const stockOut = Math.floor(rnd() * 90);
      const current = Math.max(0, opening + stockIn - stockOut);
      const reorder = 25;
      let status: InventoryRow['Stock Status'] = 'In Stock';
      if (current === 0) status = 'Out of Stock';
      else if (current <= reorder) status = 'Low Stock';
      const lastUpdated = new Date(TODAY);
      lastUpdated.setHours(lastUpdated.getHours() - Math.floor(rnd() * 72));
      data.push({
        SKU: product.sku,
        'Product Name': product.name,
        Category: product.category,
        Store: store,
        'Opening Stock': opening,
        'Stock In': stockIn,
        'Stock Out': stockOut,
        'Current Stock': current,
        'Reorder Level': reorder,
        'Stock Status': status,
        'Last Updated': `${formatDate(lastUpdated)} ${pad(lastUpdated.getHours())}:${pad(lastUpdated.getMinutes())}`,
      });
    }
  }
  return data;
}
