export const STORES = [
  'Mumbai - Andheri',
  'Delhi - Connaught Place',
  'Bengaluru - Koramangala',
  'Pune - Viman Nagar',
  'Hyderabad - Gachibowli',
  'Chennai - T Nagar',
  'Kolkata - Salt Lake',
  'Ahmedabad - SG Highway',
];

export const PAYMENT_MODES = ['Cash', 'Credit Card', 'Debit Card', 'UPI', 'Net Banking', 'Wallet'];

export const CUSTOMERS = [
  'Rohan Mehta', 'Ananya Sharma', 'Vikram Singh', 'Priya Nair', 'Arjun Kapoor',
  'Sneha Reddy', 'Karan Malhotra', 'Ishita Gupta', 'Rahul Verma', 'Neha Joshi',
  'Aditya Rao', 'Pooja Iyer', 'Siddharth Bose', 'Kavya Menon', 'Manish Chawla',
  'Divya Pillai', 'Amit Trivedi', 'Ritu Bansal', 'Sanjay Kulkarni', 'Meera Pillai',
];

export interface ProductDef {
  sku: string;
  name: string;
  category: string;
  price: number;
}

export const PRODUCTS: ProductDef[] = [
  { sku: 'ELE-1001', name: 'Wireless Mouse', category: 'Electronics', price: 799 },
  { sku: 'ELE-1002', name: 'Bluetooth Headphones', category: 'Electronics', price: 2499 },
  { sku: 'ELE-1003', name: '65W Fast Charger', category: 'Electronics', price: 1199 },
  { sku: 'ELE-1004', name: '27" LED Monitor', category: 'Electronics', price: 12999 },
  { sku: 'APP-2001', name: "Men's Cotton T-Shirt", category: 'Apparel', price: 599 },
  { sku: 'APP-2002', name: "Women's Denim Jacket", category: 'Apparel', price: 2199 },
  { sku: 'APP-2003', name: 'Running Shoes', category: 'Apparel', price: 3499 },
  { sku: 'HOM-3001', name: 'Non-Stick Cookware Set', category: 'Home & Kitchen', price: 2799 },
  { sku: 'HOM-3002', name: 'LED Desk Lamp', category: 'Home & Kitchen', price: 899 },
  { sku: 'HOM-3003', name: 'Memory Foam Pillow', category: 'Home & Kitchen', price: 1299 },
  { sku: 'GRO-4001', name: 'Organic Basmati Rice 5kg', category: 'Grocery', price: 649 },
  { sku: 'GRO-4002', name: 'Cold Pressed Coconut Oil 1L', category: 'Grocery', price: 399 },
  { sku: 'BEA-5001', name: 'Herbal Face Wash', category: 'Beauty & Personal Care', price: 349 },
  { sku: 'BEA-5002', name: 'Anti-Dandruff Shampoo 650ml', category: 'Beauty & Personal Care', price: 499 },
  { sku: 'STA-6001', name: 'A4 Printer Paper (500 sheets)', category: 'Stationery', price: 349 },
];

export const ORDER_STATUSES = ['Completed', 'Pending', 'Processing', 'Cancelled'];
export const DELIVERY_STATUSES = ['Delivered', 'In Transit', 'Out for Delivery', 'Not Dispatched', 'Returned'];
