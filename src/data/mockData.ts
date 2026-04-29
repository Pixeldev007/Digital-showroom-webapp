export const sectionNav = [
  { id: "dashboard", label: "Dashboard", icon: "DB", path: "/dashboard" },
  { id: "products", label: "Products", icon: "PR", path: "/products" },
  { id: "orders", label: "Orders", icon: "OR", path: "/orders" },
  { id: "customers", label: "Customers", icon: "CU", path: "/customers" },
  { id: "marketing", label: "Marketing", icon: "MK", path: "/marketing" },
  { id: "storefront", label: "Storefront", icon: "SF", path: "/storefront" },
  { id: "settings", label: "Settings", icon: "ST", path: "/settings" },
] as const;

export const dashboardKpis = [
  { label: "Revenue", value: "Rs 3.42L", delta: "+12.4% vs last month" },
  { label: "Orders", value: "428", delta: "+8.1% this week" },
  { label: "Customers", value: "1,294", delta: "+16.7% repeat buyers" },
] as const;

export const salesSeries = [
  { label: "Mon", value: 48 },
  { label: "Tue", value: 62 },
  { label: "Wed", value: 58 },
  { label: "Thu", value: 76 },
  { label: "Fri", value: 84 },
  { label: "Sat", value: 71 },
  { label: "Sun", value: 67 },
] as const;

export const recentOrders = [
  { id: "ORD-10842", customer: "Priya Verma", items: "2 items", amount: "Rs 2,499", status: "Shipped" },
  { id: "ORD-10841", customer: "Karan Malhotra", items: "1 item", amount: "Rs 799", status: "Pending" },
  { id: "ORD-10840", customer: "Rhea Shah", items: "3 items", amount: "Rs 4,250", status: "Delivered" },
  { id: "ORD-10839", customer: "Imran Ali", items: "1 item", amount: "Rs 1,499", status: "Shipped" },
] as const;

export const products = [
  {
    name: "Linen Kurta Set",
    sku: "LK-101",
    price: "Rs 1,899",
    stock: "42 in stock",
    status: "Published",
    tag: "Top seller",
  },
  {
    name: "Handcrafted Tote",
    sku: "HT-204",
    price: "Rs 1,499",
    stock: "18 in stock",
    status: "Published",
    tag: "New arrival",
  },
  {
    name: "Classic Sneakers",
    sku: "CS-410",
    price: "Rs 2,799",
    stock: "9 in stock",
    status: "Low Stock",
    tag: "Best margin",
  },
  {
    name: "Vitamin C Face Wash",
    sku: "VC-118",
    price: "Rs 499",
    stock: "Draft",
    status: "Draft",
    tag: "Awaiting images",
  },
] as const;

export const productEditor = {
  name: "Linen Kurta Set",
  price: "Rs 1,899",
  description: "Breathable festive set with soft cotton lining and easy returns.",
  images: ["Front image", "Lifestyle image", "Fabric close-up"],
  sizes: ["S", "M", "L", "XL"],
  colors: ["Ivory", "Sage", "Navy"],
} as const;

export const orders = [
  { id: "ORD-10842", customer: "Priya Verma", date: "27 Apr 2026", amount: "Rs 2,499", status: "Shipped" },
  { id: "ORD-10841", customer: "Karan Malhotra", date: "27 Apr 2026", amount: "Rs 799", status: "Pending" },
  { id: "ORD-10840", customer: "Rhea Shah", date: "26 Apr 2026", amount: "Rs 4,250", status: "Delivered" },
  { id: "ORD-10839", customer: "Imran Ali", date: "26 Apr 2026", amount: "Rs 1,499", status: "Shipped" },
] as const;

export const orderDetail = {
  id: "ORD-10842",
  customer: "Priya Verma",
  phone: "+91 98765 43210",
  address: "B-208, Lakeview Residency, Pune 411045",
  payment: "Prepaid via Razorpay",
  items: [
    { name: "Linen Kurta Set", variant: "M / Ivory", qty: "Qty 1", amount: "Rs 1,899" },
    { name: "Handcrafted Tote", variant: "Tan", qty: "Qty 1", amount: "Rs 600" },
  ],
  timeline: [
    { label: "Order placed on 27 April 2026", state: "done" },
    { label: "Payment confirmed on 27 April 2026", state: "done" },
    { label: "Packed and ready for pickup", state: "active" },
    { label: "Out for delivery", state: "pending" },
  ],
} as const;

export const customers = [
  { name: "Aisha Kapoor", phone: "+91 99881 77321", city: "Mumbai", orders: 9, lastOrder: "Rs 2,999" },
  { name: "Dev Patel", phone: "+91 98221 66443", city: "Ahmedabad", orders: 3, lastOrder: "Rs 799" },
  { name: "Sonal Mehta", phone: "+91 98111 33329", city: "Pune", orders: 6, lastOrder: "Rs 1,899" },
  { name: "Rohan Nair", phone: "+91 99100 77110", city: "Bengaluru", orders: 2, lastOrder: "Rs 3,299" },
] as const;

export const customerDetail = {
  name: "Aisha Kapoor",
  phone: "+91 99881 77321",
  email: "aisha@example.com",
  city: "Mumbai",
  note: "Prefers prepaid orders and fast dispatch for repeat gifting.",
  orderHistory: [
    { id: "ORD-10802", date: "22 Apr 2026", amount: "Rs 2,999", status: "Delivered" },
    { id: "ORD-10776", date: "15 Apr 2026", amount: "Rs 1,499", status: "Delivered" },
    { id: "ORD-10720", date: "05 Apr 2026", amount: "Rs 899", status: "Delivered" },
  ],
} as const;

export const coupons = [
  { code: "WELCOME10", discount: "10% off", expiry: "30 Apr 2026", status: "Active" },
  { code: "SUMMER250", discount: "Rs 250 off", expiry: "10 May 2026", status: "Scheduled" },
] as const;

export const popupOffer = {
  title: "Get 10% off your first order",
  description: "Show after 12 seconds on the homepage and collect intent before the shopper exits.",
  trigger: "Homepage delay",
  cta: "Apply Coupon",
} as const;

export const storefrontCategories = ["Women", "Footwear", "Beauty", "Bestsellers"] as const;

export const storefrontProducts = [
  { name: "Handcrafted Tote", price: "Rs 1,499", tag: "Trending" },
  { name: "Classic Sneakers", price: "Rs 2,799", tag: "New" },
  { name: "Vitamin C Face Wash", price: "Rs 499", tag: "Bestseller" },
  { name: "Wireless Earbuds", price: "Rs 3,299", tag: "Hot deal" },
] as const;

export const cartItems = [
  { name: "Linen Kurta Set", meta: "M / Ivory", amount: "Rs 1,899" },
  { name: "Handcrafted Tote", meta: "Tan", amount: "Rs 600" },
] as const;

export const paymentMethods = ["UPI", "Cards", "Netbanking", "COD"] as const;

export const settingsSummary = {
  storeName: "Oneos",
  logo: "O mark",
  razorpayStatus: "Connected",
  settlement: "T+2 business days",
  shipping: [
    { label: "Metro shipping", value: "Rs 49" },
    { label: "Rest of India", value: "Rs 79" },
    { label: "Free shipping above", value: "Rs 999" },
  ],
} as const;

