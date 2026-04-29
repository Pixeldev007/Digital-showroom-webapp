import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  BrowserRouter,
  Link,
  Navigate,
  Outlet,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import ECommercePage from "../pages/ECommercePage";
import WebsitesPage from "../pages/WebsitesPage";

type Template = {
  id: number;
  name: string;
  category: string;
  description: string;
  price: number;
  originalPrice: number | null;
  tags: string[];
  highlight: string;
  customizableFields: string[];
  rating: number;
  reviews: number;
  featured: boolean;
};

type MerchantProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  comparePrice: number | null;
  stock: number;
  status: boolean;
  imageLabel: string;
};

type MerchantOrder = {
  id: string;
  customer: string;
  phone: string;
  items: string;
  total: number;
  payment: "UPI" | "COD" | "Card";
  status: "New" | "Confirmed" | "Shipped" | "Delivered" | "Cancelled";
  time: string;
  note: string;
};

type StoreConfig = {
  storeName: string;
  businessCategory: string;
  whatsappNumber: string;
  city: string;
  logoText: string;
  brandColor: string;
  tagline: string;
  heroHeading: string;
  heroCta: string;
  selectedTemplateId: number | null;
  sectionVisibility: {
    categories: boolean;
    featuredProducts: boolean;
    testimonials: boolean;
    whatsappButton: boolean;
  };
  footerTagline: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    youtube: string;
  };
  upiId: string;
  codEnabled: boolean;
  domain: string;
  notifications: {
    whatsapp: boolean;
    email: boolean;
    lowStock: boolean;
  };
};

type AuthContextValue = {
  isLoggedIn: boolean;
  selectedTemplate: Template | null;
  storeConfig: StoreConfig;
  merchantProducts: MerchantProduct[];
  merchantOrders: MerchantOrder[];
  login: () => void;
  logout: () => void;
  chooseTemplate: (template: Template) => void;
  updateStoreConfig: (patch: Partial<StoreConfig>) => void;
  updateSectionVisibility: (key: keyof StoreConfig["sectionVisibility"], value: boolean) => void;
  updateNotifications: (key: keyof StoreConfig["notifications"], value: boolean) => void;
  updateSocialLink: (key: keyof StoreConfig["socialLinks"], value: string) => void;
  updateMerchantProduct: (id: number, patch: Partial<MerchantProduct>) => void;
  addMerchantProduct: (product: MerchantProduct) => void;
  removeMerchantProducts: (ids: number[]) => void;
  updateOrderStatus: (id: string, status: MerchantOrder["status"]) => void;
};

const templates: Template[] = [
  {
    id: 1,
    name: "Urban Style Studio",
    category: "Clothing",
    description: "A polished fashion storefront for boutiques that want editorial hero sections, collection-led navigation, and fast mobile buying.",
    price: 2499,
    originalPrice: 3499,
    tags: ["fashion", "d2c", "lookbook"],
    highlight: "Size and color variants",
    customizableFields: ["Logo", "Hero banners", "Brand colors", "Collections"],
    rating: 4.8,
    reviews: 184,
    featured: true,
  },
  {
    id: 2,
    name: "FreshBasket Daily",
    category: "Grocery",
    description: "A quick-order grocery website with delivery-friendly categories, repeat purchase flows, and local trust messaging built in.",
    price: 2199,
    originalPrice: 3199,
    tags: ["grocery", "delivery", "repeat order"],
    highlight: "Quick reorder sections",
    customizableFields: ["Delivery slots", "Category tiles", "Offer strips", "Store timings"],
    rating: 4.8,
    reviews: 211,
    featured: true,
  },
  {
    id: 3,
    name: "SpiceRoute Kitchen",
    category: "Restaurant",
    description: "A menu-first restaurant template designed to push combos, direct orders, and WhatsApp checkout without app commissions.",
    price: 2599,
    originalPrice: 3699,
    tags: ["restaurant", "food", "combos"],
    highlight: "Menu sections with combo callouts",
    customizableFields: ["Cuisine categories", "Promo banners", "Delivery times", "Menu cards"],
    rating: 4.9,
    reviews: 263,
    featured: true,
  },
  {
    id: 4,
    name: "MobileMax Showcase",
    category: "Mobile Shop",
    description: "A high-conversion mobile retail design for launch offers, device comparisons, and store visit lead capture on phones.",
    price: 2699,
    originalPrice: 3799,
    tags: ["mobile shop", "offers", "comparison"],
    highlight: "Model comparison and launch deals",
    customizableFields: ["Launch offers", "EMI blocks", "Device categories", "Store branches"],
    rating: 4.8,
    reviews: 173,
    featured: false,
  },
  {
    id: 5,
    name: "MedQuick Pharmacy",
    category: "Pharmacy",
    description: "A trust-first pharmacy website for prescription uploads, health essentials, and repeat refill orders from neighborhood customers.",
    price: 2399,
    originalPrice: 3399,
    tags: ["pharmacy", "medicine", "prescription"],
    highlight: "Prescription upload and refill prompts",
    customizableFields: ["Prescription instructions", "Health categories", "Delivery hours", "Offer sections"],
    rating: 4.8,
    reviews: 194,
    featured: true,
  },
];

const businessCategories = [
  "Clothing",
  "Electronics",
  "Grocery",
  "Restaurant",
  "Beauty",
  "Pharmacy",
  "Furniture",
  "Mobile Shop",
  "Marketplace",
  "Personal Brand",
  "Other",
] as const;

const dashboardOrdersSeed: MerchantOrder[] = [
  { id: "ORD-2013", customer: "Priya Mehta", phone: "+91 98765 11021", items: "2 kurtas, 1 dupatta", total: 3849, payment: "UPI", status: "New", time: "5 min ago", note: "Requested express shipping in Ahmedabad." },
  { id: "ORD-2012", customer: "Sameer Khan", phone: "+91 99880 22441", items: "Bluetooth speaker", total: 2799, payment: "Card", status: "Confirmed", time: "32 min ago", note: "Gift order. Add invoice copy over WhatsApp." },
  { id: "ORD-2011", customer: "Aanya Das", phone: "+91 98110 77662", items: "Salon facial package", total: 2299, payment: "UPI", status: "Shipped", time: "2 hrs ago", note: "Customer asked for weekend slot confirmation." },
  { id: "ORD-2010", customer: "Rahul Jain", phone: "+91 98900 44312", items: "Organic grocery combo", total: 1799, payment: "COD", status: "Delivered", time: "Yesterday", note: "Repeat customer from Indore." },
  { id: "ORD-2009", customer: "Neha Sethi", phone: "+91 98220 33915", items: "Pharmacy refill pack", total: 2149, payment: "UPI", status: "Cancelled", time: "Yesterday", note: "Cancelled due to product unavailability." },
];

const testimonials = [
  { name: "Ritika Sharma", city: "Jaipur", business: "Saree Boutique", quote: "I launched my store before lunch and got my first WhatsApp order the same evening.", initials: "RS" },
  { name: "Ameen Farooq", city: "Lucknow", business: "Cloud Kitchen", quote: "Oneos gave us a cleaner ordering flow than juggling Instagram DMs and PDFs.", initials: "AF" },
  { name: "Jinal Patel", city: "Surat", business: "Kidswear Brand", quote: "The onboarding is so quick that even our non-technical staff can update products and banners.", initials: "JP" },
];

const defaultProducts: MerchantProduct[] = [
  { id: 1, name: "Festive Kurta Set", category: "Clothing", price: 1899, comparePrice: 2299, stock: 28, status: true, imageLabel: "Front look" },
  { id: 2, name: "Everyday Tote Bag", category: "Clothing", price: 899, comparePrice: null, stock: 46, status: true, imageLabel: "Lifestyle shot" },
  { id: 3, name: "Summer Sale Combo", category: "Clothing", price: 1499, comparePrice: 1799, stock: 18, status: false, imageLabel: "Combo card" },
];

const defaultStoreConfig: StoreConfig = {
  storeName: "Oneos Demo",
  businessCategory: "Clothing",
  whatsappNumber: "+91 98765 43210",
  city: "Bengaluru",
  logoText: "O",
  brandColor: "#2563EB",
  tagline: "Premium finds for modern Indian shoppers",
  heroHeading: "Build a storefront that sells on WhatsApp",
  heroCta: "Chat to Order",
  selectedTemplateId: 1,
  sectionVisibility: {
    categories: true,
    featuredProducts: true,
    testimonials: true,
    whatsappButton: true,
  },
  footerTagline: "Made for fast-moving Indian businesses that want to sell beautifully online.",
  socialLinks: {
    instagram: "@oneos",
    facebook: "facebook.com/oneos",
    youtube: "youtube.com/@oneos",
  },
  upiId: "oneos@okaxis",
  codEnabled: true,
  domain: "oneos.in/yourstore",
  notifications: {
    whatsapp: true,
    email: true,
    lowStock: true,
  },
};

const authContext = createContext<AuthContextValue | null>(null);

function formatINR(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function classNames(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function usePlatform() {
  const context = useContext(authContext);

  if (!context) {
    throw new Error("Platform context unavailable");
  }

  return context;
}

function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(1);
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(defaultStoreConfig);
  const [merchantProducts, setMerchantProducts] = useState<MerchantProduct[]>(defaultProducts);
  const [merchantOrders, setMerchantOrders] = useState<MerchantOrder[]>(dashboardOrdersSeed);

  const selectedTemplate = templates.find((template) => template.id === selectedTemplateId) ?? null;

  const chooseTemplate = (template: Template) => {
    setSelectedTemplateId(template.id);
    setStoreConfig((current) => ({
      ...current,
      selectedTemplateId: template.id,
      businessCategory: current.businessCategory === "Other" ? template.category : current.businessCategory,
    }));
  };

  const value: AuthContextValue = {
    isLoggedIn,
    selectedTemplate,
    storeConfig,
    merchantProducts,
    merchantOrders,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
    chooseTemplate,
    updateStoreConfig: (patch) => setStoreConfig((current) => ({ ...current, ...patch })),
    updateSectionVisibility: (key, value) =>
      setStoreConfig((current) => ({
        ...current,
        sectionVisibility: { ...current.sectionVisibility, [key]: value },
      })),
    updateNotifications: (key, value) =>
      setStoreConfig((current) => ({
        ...current,
        notifications: { ...current.notifications, [key]: value },
      })),
    updateSocialLink: (key, value) =>
      setStoreConfig((current) => ({
        ...current,
        socialLinks: { ...current.socialLinks, [key]: value },
      })),
    updateMerchantProduct: (id, patch) =>
      setMerchantProducts((current) => current.map((product) => (product.id === id ? { ...product, ...patch } : product))),
    addMerchantProduct: (product) => setMerchantProducts((current) => [product, ...current]),
    removeMerchantProducts: (ids) => setMerchantProducts((current) => current.filter((product) => !ids.includes(product.id))),
    updateOrderStatus: (id, status) =>
      setMerchantOrders((current) => current.map((order) => (order.id === id ? { ...order, status } : order))),
  };

  return <authContext.Provider value={value}>{children}</authContext.Provider>;
}

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return null;
}

function PageShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <main className={classNames("animate-page-enter", className)}>{children}</main>;
}

function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={classNames("space-y-3", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? <span className="inline-flex rounded-full bg-[color:rgba(37,99,235,0.1)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--primary)]">{eyebrow}</span> : null}
      <div className="space-y-2">
        <h2 className="font-heading text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">{title}</h2>
        {body ? <p className="text-base leading-7 text-[var(--muted)] sm:text-lg">{body}</p> : null}
      </div>
    </div>
  );
}

function LogoMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--primary),var(--primary-dark))] text-white shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
        <StoreGlyph />
      </div>
      {!compact ? (
        <div>
          <div className="font-heading text-lg font-bold text-[var(--text)]">Oneos</div>
          <div className="text-xs text-[var(--muted)]">Launch your store in seconds</div>
        </div>
      ) : null}
    </div>
  );
}

function StoreGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 9.5h18" strokeLinecap="round" />
      <path d="M5 9.5V19a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9.5" strokeLinecap="round" />
      <path d="M4.5 5.5 6 3h12l1.5 2.5a2 2 0 0 1 .25 1v1a2 2 0 0 1-2 2 2.2 2.2 0 0 1-1.75-.85A2.2 2.2 0 0 1 14.25 9 2.2 2.2 0 0 1 12.5 8.15 2.2 2.2 0 0 1 10.75 9 2.2 2.2 0 0 1 9 8.15 2.2 2.2 0 0 1 7.25 9a2 2 0 0 1-2-2v-1a2 2 0 0 1 .25-1Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PublicNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn } = usePlatform();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const menuLinks = [
    { label: "Websites", to: "/websites" },
    { label: "E-Commerce", to: "/ecommerce" },
  ];

  const isActiveLink = (path: string) => location.pathname === path;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/60 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="shrink-0">
            <LogoMark />
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {menuLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={classNames(
                  "border-b-2 pb-1 text-sm transition-colors",
                  isActiveLink(link.to)
                    ? "border-[#2563EB] font-semibold text-[#2563EB]"
                    : "border-transparent font-medium text-[var(--muted)] hover:text-[var(--text)]",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-4 md:flex">
            <Link to={isLoggedIn ? "/dashboard" : "/login"} className="text-sm font-semibold text-[var(--text)] transition-colors hover:text-[var(--primary)]">
              Login
            </Link>
            <button
              type="button"
              onClick={() => navigate(isLoggedIn ? "/dashboard" : "/signup")}
              className="inline-flex h-11 items-center justify-center rounded-full bg-[var(--primary)] px-5 text-sm font-semibold text-white shadow-[0_12px_25px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--primary-dark)]"
            >
              Start Free
            </button>
          </div>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text)] md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className="space-y-1">
              <span className="block h-0.5 w-5 rounded bg-current" />
              <span className="block h-0.5 w-5 rounded bg-current" />
              <span className="block h-0.5 w-5 rounded bg-current" />
            </span>
          </button>
        </div>
      </header>
      {createPortal(
        <div className={classNames("fixed inset-0 z-50 transition-opacity md:hidden", menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setMenuOpen(false)} />
          <aside className={classNames("absolute right-0 top-0 h-full w-[84%] max-w-sm bg-white p-6 shadow-2xl transition-transform duration-300", menuOpen ? "translate-x-0" : "translate-x-full")}>
            <div className="flex items-center justify-between">
              <LogoMark compact />
              <button type="button" onClick={() => setMenuOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                <CloseGlyph />
              </button>
            </div>
            <div className="mt-10 space-y-5">
              {menuLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={classNames(
                    "block border-b-2 pb-2 text-lg transition-colors",
                    isActiveLink(link.to)
                      ? "border-[#2563EB] font-semibold text-[#2563EB]"
                      : "border-transparent font-medium text-[var(--text)]",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="mt-10 space-y-3">
              <Link to={isLoggedIn ? "/dashboard" : "/login"} className="block rounded-full border border-[var(--border)] px-5 py-3 text-center font-semibold text-[var(--text)]">
                Login
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  navigate(isLoggedIn ? "/dashboard" : "/signup");
                }}
                className="block w-full rounded-full bg-[var(--primary)] px-5 py-3 text-center font-semibold text-white"
              >
                Start Free
              </button>
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="space-y-4">
          <LogoMark />
          <p className="max-w-xs text-sm leading-6 text-[var(--muted)]">
            Create a beautiful WhatsApp-first storefront, collect orders, and launch your business online without code.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text)]">Product</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <li><Link to="/templates">Templates</Link></li>
            <li><Link to="/pricing">Pricing</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-[var(--text)]">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <li><a href="#features">Features</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="font-semibold text-[var(--text)]">Contact</h3>
          <p className="text-sm text-[var(--muted)]">support@oneos.in</p>
          <button type="button" className="inline-flex rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(37,211,102,0.22)]">
            WhatsApp Support
          </button>
        </div>
      </div>
      <div className="border-t border-[var(--border)] px-4 py-5 text-center text-sm text-[var(--muted)]">
        © 2025 Oneos. Made in India.
      </div>
    </footer>
  );
}

function MarketingLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <PublicNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const showcaseTemplates = templates.slice(0, 6);
  const pricingPlans = [
    {
      name: "Free",
      price: "₹0/month",
      features: ["10 products", "WhatsApp ordering", "Basic templates"],
      highlight: false,
    },
    {
      name: "Growth",
      price: "₹499/month",
      features: ["Unlimited products", "Custom domain", "UPI payments"],
      highlight: true,
    },
    {
      name: "Pro",
      price: "₹999/month",
      features: ["Priority support", "Advanced analytics", "Everything in Growth"],
      highlight: false,
    },
  ];

  const featureCards = [
    "WhatsApp Selling",
    "UPI Payments",
    "Catalog Management",
    "Coupons & Offers",
    "Custom Domain",
    "Analytics",
  ];

  return (
    <PageShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(37,99,235,0.18),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.14),transparent_26%)]" />
        <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          <div className="relative z-10 space-y-8">
            <div className="inline-flex rounded-full border border-[var(--border)] bg-white/90 px-4 py-2 text-sm font-semibold text-[var(--muted)] shadow-sm">
              Trusted by 10 lakh+ Indian merchants
            </div>
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-bold leading-tight text-[var(--text)] sm:text-5xl lg:text-6xl">
                Build Your Online Store in 15 Seconds
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] sm:text-xl">
                Pick a template, add your products, and start selling on WhatsApp — no coding needed. Trusted by 10 lakh+ Indian merchants.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="inline-flex h-14 items-center justify-center rounded-full bg-[var(--primary)] px-7 text-base font-semibold text-white shadow-[0_16px_32px_rgba(37,99,235,0.22)] transition-transform hover:-translate-y-0.5 hover:bg-[var(--primary-dark)]"
              >
                Get Started Free
              </button>
              <button
                type="button"
                onClick={() => navigate("/templates")}
                className="inline-flex h-14 items-center justify-center rounded-full border border-[var(--border)] bg-white px-7 text-base font-semibold text-[var(--text)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Browse Templates
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {["Free Forever Plan", "No Coding Needed", "WhatsApp Ready"].map((badge) => (
                <span key={badge} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[var(--text)] shadow-sm ring-1 ring-[var(--border)]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
          <div className="relative z-10">
            <div className="absolute -left-6 top-10 h-4 w-4 rounded-full bg-[var(--accent)] animate-float" />
            <div className="absolute right-4 top-0 h-5 w-5 rounded-full bg-[var(--primary)] animate-float [animation-delay:120ms]" />
            <div className="rounded-[32px] border border-white/80 bg-white/90 p-5 shadow-[0_30px_90px_rgba(15,23,42,0.14)] backdrop-blur">
              <div className="rounded-[26px] border border-[var(--border)] bg-slate-950 px-4 pb-6 pt-4">
                <div className="mx-auto mb-4 h-5 w-28 rounded-b-2xl bg-slate-900" />
                <div className="rounded-[24px] bg-[var(--bg)] p-4">
                  <div className="grid gap-4 lg:grid-cols-[1.35fr_0.75fr]">
                    <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
                      <div className="h-36 rounded-2xl bg-[linear-gradient(135deg,var(--primary),#60A5FA)] p-5 text-white">
                        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">New launch</div>
                        <div className="mt-4 max-w-[14rem] text-2xl font-bold">Summer drop for your store</div>
                        <div className="mt-4 inline-flex rounded-full bg-white/15 px-3 py-2 text-sm font-semibold">Chat to buy</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {[1, 2, 3, 4].map((item) => (
                          <div key={item} className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-3">
                            <div className="h-20 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200" />
                            <div className="mt-3 h-3 w-2/3 rounded-full bg-slate-200" />
                            <div className="mt-2 h-3 w-1/3 rounded-full bg-slate-100" />
                            <div className="mt-3 h-9 rounded-full bg-[var(--primary)]/10" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-4 rounded-2xl bg-white p-4 shadow-sm">
                      <div className="rounded-2xl border border-[var(--border)] p-4">
                        <div className="h-3 w-16 rounded-full bg-slate-200" />
                        <div className="mt-3 h-9 rounded-xl bg-[var(--accent)]/10" />
                        <div className="mt-3 h-9 rounded-xl bg-[var(--primary)]/10" />
                      </div>
                      <div className="rounded-2xl border border-[var(--border)] p-4">
                        <div className="h-3 w-20 rounded-full bg-slate-200" />
                        <div className="mt-3 h-24 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50" />
                      </div>
                      <div className="rounded-2xl bg-[#25D366] px-4 py-4 text-white">
                        <div className="text-sm font-semibold">WhatsApp CTA</div>
                        <div className="mt-2 text-xl font-bold">Share store instantly</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="How it works" title="Launch faster than your next Instagram story" body="Set up a polished storefront in minutes and start accepting orders where your customers already are." align="center" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {[
            { icon: "01", title: "Pick a Template", desc: "Browse 100+ designs for your business type and choose the layout that fits your catalog." },
            { icon: "02", title: "Customize Your Store", desc: "Add logo, colors, products, and WhatsApp number without touching a line of code." },
            { icon: "03", title: "Go Live & Sell", desc: "Publish your store, share the link, and start taking orders instantly." },
          ].map((step, index) => (
            <div key={step.title} className="animate-card-rise rounded-[22px] border border-[var(--border)] bg-white p-6 shadow-sm" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="text-5xl font-bold text-[var(--primary)]">{step.icon}</div>
              <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                <StoreGlyph />
              </div>
              <h3 className="mt-6 font-heading text-xl font-bold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <SectionHeading title="Templates for every business" body="From saree boutiques to pharmacies, pick a layout built for your exact category." />
          <Link to="/templates" className="hidden text-sm font-semibold text-[var(--primary)] md:inline-flex">
            See all templates →
          </Link>
        </div>
        <div className="mt-10 flex gap-4 overflow-x-auto pb-3">
          {showcaseTemplates.map((template, index) => (
            <div key={template.id} className="animate-card-rise min-w-[280px] rounded-[22px] border border-[var(--border)] bg-white p-4 shadow-sm" style={{ animationDelay: `${index * 50}ms` }}>
              <div className={classNames("h-44 rounded-[18px] p-4 text-white", previewGradient(template.category))}>
                <div className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{template.category}</div>
                <div className="mt-6 max-w-[12rem] text-2xl font-bold">{template.name}</div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[var(--muted)]">{template.category}</div>
                  <div className="mt-1 rounded-full bg-[var(--bg)] px-3 py-1 text-sm font-semibold text-[var(--primary)]">{formatINR(template.price)}</div>
                </div>
                <button type="button" onClick={() => navigate(`/templates/${template.id}`)} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold">
                  Preview
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Features" title="Made for the full merchant journey" body="Everything an Indian SMB needs to launch, collect payments, and grow repeat orders." align="center" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature, index) => (
              <div key={feature} className="animate-card-rise rounded-[22px] border border-[var(--border)] bg-[var(--bg)] p-6" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--primary)]/10 text-[var(--primary)]">
                  <StoreGlyph />
                </div>
                <h3 className="mt-5 font-heading text-xl font-bold">{feature}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                  {feature === "WhatsApp Selling" && "Share your store link and collect orders where your customers already reply fastest."}
                  {feature === "UPI Payments" && "Accept UPI, cards, and COD out of the box for Indian checkout expectations."}
                  {feature === "Catalog Management" && "Add unlimited products, banners, collections, and offers without technical help."}
                  {feature === "Coupons & Offers" && "Launch discount codes and festive promotions in one click."}
                  {feature === "Custom Domain" && "Upgrade from a free link to your own .in domain for just ₹499/year."}
                  {feature === "Analytics" && "Track visits, orders, revenue, and top-performing products in real time."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Pricing" title="Simple plans that grow with your business" body="Start free, then upgrade when you need custom domain, payments, and richer analytics." align="center" />
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <div key={plan.name} className={classNames("animate-card-rise rounded-[24px] border bg-white p-6 shadow-sm", plan.highlight ? "border-[var(--primary)] shadow-[0_22px_50px_rgba(37,99,235,0.14)]" : "border-[var(--border)]")} style={{ animationDelay: `${index * 50}ms` }}>
              {plan.highlight ? <span className="inline-flex rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">Most Popular</span> : null}
              <h3 className="mt-5 font-heading text-2xl font-bold">{plan.name}</h3>
              <p className="mt-3 text-4xl font-bold text-[var(--text)]">{plan.price}</p>
              <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--success)]/10 text-[var(--success)]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button type="button" onClick={() => navigate("/signup")} className={classNames("mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors", plan.highlight ? "bg-[var(--primary)] text-white" : "border border-[var(--border)] text-[var(--text)]")}>
                Start {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Testimonials" title="Loved by Indian merchants" body="From solo founders to growing retail teams, merchants use Oneos to launch faster." align="center" />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={item.name} className="animate-card-rise rounded-[22px] border border-[var(--border)] bg-[var(--bg)] p-6" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">{item.initials}</div>
                  <div>
                    <div className="font-semibold text-[var(--text)]">{item.name}</div>
                    <div className="text-sm text-[var(--muted)]">{item.city} · {item.business}</div>
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-[var(--muted)]">“{item.quote}”</p>
                <div className="mt-4 text-sm font-semibold text-[var(--warning)]">★★★★★</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function TemplatesPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const [priceFilter, setPriceFilter] = useState("All");

  const categories = ["All", "Clothing", "Electronics", "Grocery", "Restaurant", "Beauty", "Mobile Shop", "Furniture", "Pharmacy", "Marketplace", "Personal Brand"];

  const filtered = useMemo(() => {
    let next = templates.filter((template) => {
      const matchesQuery =
        query.trim().length === 0 ||
        [template.name, template.category, ...template.tags, template.highlight].some((value) =>
          value.toLowerCase().includes(query.trim().toLowerCase()),
        );
      const matchesCategory = category === "All" || template.category === category;
      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Free" && template.price === 0) ||
        (priceFilter === "Under ₹2,500" && template.price < 2500) ||
        (priceFilter === "Premium" && template.price >= 3000);
      return matchesQuery && matchesCategory && matchesPrice;
    });

    if (sort === "Featured") {
      next = [...next].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    if (sort === "Newest") {
      next = [...next].sort((a, b) => b.id - a.id);
    }
    if (sort === "Price: Low to High") {
      next = [...next].sort((a, b) => a.price - b.price);
    }
    if (sort === "Top Rated") {
      next = [...next].sort((a, b) => b.rating - a.rating);
    }
    return next;
  }, [category, priceFilter, query, sort]);

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Marketplace" title="Find Your Perfect Template" body="100+ templates for every type of Indian business." />
      <div className="mt-8 rounded-full border border-[var(--border)] bg-white p-2 shadow-sm">
        <div className="flex items-center gap-3 px-3">
          <SearchGlyph />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by business type e.g. 'saree', 'restaurant', 'pharmacy'..."
            className="h-12 w-full rounded-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
          />
        </div>
      </div>
      <div className="sticky top-[80px] z-20 mt-6 flex flex-col gap-4 rounded-[20px] border border-[var(--border)] bg-white/90 p-4 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={classNames("shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors", category === item ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--text)]")}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 text-sm font-medium outline-none">
            {["Featured", "Newest", "Price: Low to High", "Top Rated"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <div className="flex rounded-full bg-[var(--bg)] p-1">
            {["All", "Free", "Under ₹2,500", "Premium"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setPriceFilter(option)}
                className={classNames("rounded-full px-4 py-2 text-sm font-semibold transition-colors", priceFilter === option ? "bg-[var(--primary)] text-white" : "text-[var(--muted)]")}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((template, index) => (
          <TemplateMarketplaceCard
            key={template.id}
            template={template}
            delay={index * 50}
            onPreview={() => navigate(`/templates/${template.id}`)}
            onUse={() => navigate(`/signup?template=${template.id}`)}
          />
        ))}
      </div>
    </PageShell>
  );
}

function TemplateMarketplaceCard({
  template,
  delay,
  onPreview,
  onUse,
}: {
  template: Template;
  delay: number;
  onPreview: () => void;
  onUse: () => void;
}) {
  return (
    <div className="animate-card-rise rounded-[22px] border border-[var(--border)] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-[0_18px_36px_rgba(37,99,235,0.12)]" style={{ animationDelay: `${delay}ms` }}>
      <div className={classNames("relative h-[180px] rounded-[18px] p-4 text-white", previewGradient(template.category))}>
        {template.featured ? <span className="absolute left-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold">Featured</span> : null}
        <div className="absolute bottom-4 right-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">{template.category}</div>
      </div>
      <div className="mt-4">
        <div className="text-xs text-[var(--muted)]">{template.category}</div>
        <h3 className="mt-1 text-[15px] font-bold text-[var(--text)]">{template.name}</h3>
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="text-[var(--accent)]">★★★★★</span>
          <span>{template.rating.toFixed(1)} · {template.reviews} reviews</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[var(--primary)]">{formatINR(template.price)}</span>
          {template.originalPrice ? <span className="text-sm text-[var(--muted)] line-through">{formatINR(template.originalPrice)}</span> : null}
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="text-[var(--accent)]">✦</span>
          <span>{template.highlight}</span>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onPreview} className="flex-1 rounded-full border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text)]">
            Preview
          </button>
          <button type="button" onClick={onUse} className="flex-1 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white">
            Use This Template
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplatesShowcasePage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Featured");
  const categories = ["All", ...Array.from(new Set(templates.map((template) => template.category)))];

  const filtered = useMemo(() => {
    let next = templates.filter((template) => {
      const matchesQuery =
        query.trim().length === 0 ||
        [template.name, template.category, template.description, ...template.tags, template.highlight, ...template.customizableFields].some((value) =>
          value.toLowerCase().includes(query.trim().toLowerCase()),
        );

      return matchesQuery && (category === "All" || template.category === category);
    });

    if (sort === "Featured") {
      next = [...next].sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
    }
    if (sort === "Most Affordable") {
      next = [...next].sort((a, b) => a.price - b.price);
    }
    if (sort === "Best Rated") {
      next = [...next].sort((a, b) => b.rating - a.rating);
    }

    return next;
  }, [category, query, sort]);

  return (
    <PageShell className="bg-[var(--bg)]">
      <section className="bg-[linear-gradient(135deg,#0F172A_0%,#1D4ED8_62%,#60A5FA_100%)] text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
          <div className="space-y-6">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur">
              Template Gallery
            </span>
            <div className="space-y-4">
              <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl">
                Choose 1 of 5 website templates and customize it for your business
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-blue-100">
                Each template already looks like a real website. You only need to change your logo, colors, banners,
                products, and business details.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-sm font-medium text-white/90">
              {["5 ready-made designs", "Mobile-first layouts", "Customize in minutes"].map((item) => (
                <div key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-3 backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[30px] border border-white/15 bg-white/10 p-5 shadow-[0_24px_70px_rgba(15,23,42,0.28)] backdrop-blur">
            <div className="rounded-[24px] bg-white p-4 text-slate-900 shadow-lg">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">How it works</div>
                  <div className="mt-2 font-heading text-2xl font-bold">Pick, customize, launch</div>
                </div>
                <div className="rounded-full bg-blue-50 px-3 py-2 text-sm font-semibold text-[var(--primary)]">No code</div>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  "Select the template closest to your business style",
                  "Edit colors, hero banners, sections, and product content",
                  "Preview the website and use it for onboarding",
                ].map((item, index) => (
                  <div key={item} className="flex items-start gap-3 rounded-[18px] bg-slate-50 p-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-6 text-slate-600">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Marketplace"
          title="Five curated templates"
          body="A smaller set makes it easier to pick a starting point and customize the design you actually want."
        />

        <div className="mt-8 rounded-full border border-[var(--border)] bg-white p-2 shadow-sm">
          <div className="flex items-center gap-3 px-3">
            <SearchGlyph />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by business type, feature, or customization option..."
              className="h-12 w-full rounded-full bg-transparent text-sm outline-none placeholder:text-[var(--muted)]"
            />
          </div>
        </div>

        <div className="sticky top-[80px] z-20 mt-6 flex flex-col gap-4 rounded-[24px] border border-[var(--border)] bg-white/90 p-4 backdrop-blur lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={classNames(
                  "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                  category === item ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--muted)] hover:text-[var(--text)]",
                )}
              >
                {item}
              </button>
            ))}
          </div>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value)}
            className="h-11 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 text-sm font-medium outline-none"
          >
            {["Featured", "Most Affordable", "Best Rated"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((template, index) => (
            <TemplateShowcaseCard
              key={template.id}
              template={template}
              delay={index * 50}
              onPreview={() => navigate(`/templates/${template.id}`)}
              onUse={() => navigate(`/signup?template=${template.id}`)}
            />
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="mt-8 rounded-[24px] border border-dashed border-[var(--border)] bg-white p-8 text-center shadow-sm">
            <h3 className="font-heading text-2xl font-bold text-[var(--text)]">No template matched that search</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
              Try another business keyword or switch back to All to see the five available website designs.
            </p>
          </div>
        ) : null}

        <div className="mt-12 rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm">
          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Website-style layouts",
                body: "Each option already includes hero sections, product blocks, and call-to-action areas so you start from a real storefront design.",
              },
              {
                title: "Easy customization",
                body: "You can tailor brand colors, banners, text, categories, and contact details instead of building a site from scratch.",
              },
              {
                title: "Built for conversion",
                body: "The templates are optimized for mobile shoppers, quick browsing, and direct action like WhatsApp orders or product discovery.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[22px] bg-[var(--bg)] p-5">
                <h3 className="font-heading text-xl font-bold text-[var(--text)]">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function TemplateShowcaseCard({
  template,
  delay,
  onPreview,
  onUse,
}: {
  template: Template;
  delay: number;
  onPreview: () => void;
  onUse: () => void;
}) {
  return (
    <div
      className="animate-card-rise rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--primary)]/30 hover:shadow-[0_18px_36px_rgba(37,99,235,0.12)]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={classNames("relative overflow-hidden rounded-[20px] p-4 text-white", previewGradient(template.category))}>
        {template.featured ? <span className="absolute left-4 top-4 rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold">Featured</span> : null}
        <div className="rounded-[18px] border border-white/20 bg-slate-950/25 p-3 backdrop-blur">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/50" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <div className="ml-2 h-7 flex-1 rounded-full bg-white/15" />
          </div>
          <div className="mt-4 rounded-[18px] bg-white/95 p-4 text-slate-900">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">{template.category}</div>
                <div className="mt-2 h-4 w-28 rounded-full bg-slate-200" />
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">Live preview</div>
            </div>
            <div className="mt-4 h-20 rounded-[16px] bg-slate-100" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[0, 1, 2].map((item) => (
                <div key={item} className="h-12 rounded-xl bg-slate-100" />
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="h-3 w-24 rounded-full bg-slate-200" />
              <div className="rounded-full bg-[var(--primary)] px-3 py-1 text-xs font-semibold text-white">Customize</div>
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between text-xs font-semibold">
          <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">{template.category}</span>
          <span className="text-white/80">Website design</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between gap-3">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">{template.category}</div>
          <div className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[var(--primary)]">Customizable</div>
        </div>
        <h3 className="mt-2 font-heading text-2xl font-bold text-[var(--text)]">{template.name}</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{template.description}</p>
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="text-[var(--accent)]">Top rated</span>
          <span>{template.rating.toFixed(1)} / 5 from {template.reviews} reviews</span>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[var(--primary)]">{formatINR(template.price)}</span>
          {template.originalPrice ? <span className="text-sm text-[var(--muted)] line-through">{formatINR(template.originalPrice)}</span> : null}
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-[var(--muted)]">
          <span className="text-[var(--accent)]">Key feature</span>
          <span>{template.highlight}</span>
        </div>
        <div className="mt-4">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">You can customize</div>
          <div className="mt-3 flex flex-wrap gap-2">
            {template.customizableFields.map((field) => (
              <span key={field} className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                {field}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-5 flex gap-3">
          <button type="button" onClick={onPreview} className="flex-1 rounded-full border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text)]">
            Preview Design
          </button>
          <button type="button" onClick={onUse} className="flex-1 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white">
            Customize This Template
          </button>
        </div>
      </div>
    </div>
  );
}

function TemplateDetailPage() {
  const navigate = useNavigate();
  const { chooseTemplate } = usePlatform();
  const { id } = useParams();
  const [device, setDevice] = useState<"Desktop" | "Mobile">("Desktop");
  const [fullscreen, setFullscreen] = useState(false);
  const template = templates.find((item) => item.id === Number(id));

  if (!template) {
    return <Navigate to="/templates" replace />;
  }

  const highlights = [
    template.highlight,
    "Homepage with hero banner",
    "Product catalog with filters",
    "WhatsApp order button",
    "UPI payment integration",
  ];

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-[1.25fr_0.85fr]">
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            {["Desktop", "Mobile"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setDevice(option as "Desktop" | "Mobile")}
                className={classNames("rounded-full px-4 py-2 text-sm font-semibold", device === option ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--muted)] ring-1 ring-[var(--border)]")}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="rounded-[24px] border border-[var(--border)] bg-[var(--bg)] p-4">
              <StorePreviewFrame template={template} mobile={device === "Mobile"} />
            </div>
            <button type="button" onClick={() => setFullscreen(true)} className="mt-5 rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)]">
              View Full Preview
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-semibold text-[var(--muted)]">{template.category}</span>
              {template.featured ? <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-semibold text-white">Featured</span> : null}
            </div>
            <h1 className="mt-4 font-heading text-3xl font-bold">{template.name}</h1>
            <div className="mt-3 flex items-center gap-3 text-sm text-[var(--muted)]">
              <span className="text-[var(--accent)]">★★★★★</span>
              <span>{template.rating.toFixed(1)} · {template.reviews} reviews</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <span className="text-3xl font-bold text-[var(--primary)]">{formatINR(template.price)}</span>
              {template.originalPrice ? <span className="text-lg text-[var(--muted)] line-through">{formatINR(template.originalPrice)}</span> : null}
            </div>
            <ul className="mt-6 space-y-3 text-sm text-[var(--muted)]">
              {highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 text-[var(--accent)]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-2">
              {template.tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => {
                  chooseTemplate(template);
                  navigate("/signup");
                }}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white"
              >
                Use This Template
              </button>
              <button type="button" className="inline-flex h-12 w-full items-center justify-center rounded-full border border-[var(--border)] text-sm font-semibold">
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold">What's included</h2>
            <div className="mt-5 space-y-3">
              {[
                "Homepage with hero banner",
                "Product catalog with filters",
                "Cart & checkout flow",
                "WhatsApp order button",
                "UPI payment integration",
                "Mobile responsive",
              ].map((item) => (
                <details key={item} className="rounded-2xl border border-[var(--border)] p-4">
                  <summary className="cursor-pointer list-none font-semibold text-[var(--text)]">{item}</summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    This section is pre-built and optimized for Indian merchants who want polished UX without custom development.
                  </p>
                </details>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold">Merchant Reviews</h2>
            <div className="mt-5 space-y-4">
              {testimonials.map((review) => (
                <div key={review.name} className="rounded-2xl bg-[var(--bg)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold">{review.name}</div>
                      <div className="text-sm text-[var(--muted)]">{review.city}</div>
                    </div>
                    <div className="text-sm text-[var(--accent)]">★★★★★</div>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{review.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {fullscreen ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4" onClick={() => setFullscreen(false)}>
          <div className="w-full max-w-6xl rounded-[32px] bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold">Full Preview</h2>
              <button type="button" onClick={() => setFullscreen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                <CloseGlyph />
              </button>
            </div>
            <div className="mt-6 rounded-[24px] border border-[var(--border)] bg-[var(--bg)] p-4">
              <StorePreviewFrame template={template} mobile={false} />
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </PageShell>
  );
}

function AuthPage({ mode }: { mode: "signup" | "login" }) {
  const navigate = useNavigate();
  const { login, chooseTemplate } = usePlatform();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    businessType: "Clothing",
  });
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const templateId = Number(searchParams.get("template"));
    const match = templates.find((item) => item.id === templateId);
    if (match) {
      chooseTemplate(match);
    }
  }, [chooseTemplate, location.search]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    login();
    navigate(mode === "signup" ? "/onboarding" : "/dashboard");
  };

  return (
    <PageShell className="min-h-[calc(100vh-80px)] bg-[var(--bg)]">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
        <div className="order-2 rounded-[28px] border border-[var(--border)] bg-white p-8 shadow-sm lg:order-1">
          <LogoMark compact />
          <div className="mt-8 space-y-3">
            <h1 className="font-heading text-3xl font-bold">{mode === "signup" ? "Create your free store" : "Welcome back"}</h1>
            <p className="text-sm text-[var(--muted)]">
              {mode === "signup" ? "Start with a template, add products, and launch your Oneos store." : "Log in to manage your storefront, orders, and WhatsApp selling."}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            {mode === "signup" ? (
              <InputField label="Full Name" value={form.name} onChange={(value) => setForm((current) => ({ ...current, name: value }))} />
            ) : null}
            {mode === "signup" ? (
              <InputField label="Mobile Number" value={form.mobile} onChange={(value) => setForm((current) => ({ ...current, mobile: value }))} placeholder="+91 98765 43210" />
            ) : null}
            <InputField label="Email Address" value={form.email} onChange={(value) => setForm((current) => ({ ...current, email: value }))} />
            <label className="block space-y-2">
              <span className="text-sm font-semibold text-[var(--text)]">Password</span>
              <div className="flex items-center rounded-[10px] border border-[var(--border)] bg-white px-4">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                  className="h-12 w-full rounded-[10px] bg-transparent text-sm outline-none"
                />
                <button type="button" onClick={() => setShowPassword((current) => !current)} className="text-sm font-semibold text-[var(--muted)]">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </label>
            {mode === "signup" ? (
              <label className="block space-y-2">
                <span className="text-sm font-semibold text-[var(--text)]">Business Type</span>
                <select value={form.businessType} onChange={(event) => setForm((current) => ({ ...current, businessType: event.target.value }))} className="h-12 w-full rounded-[10px] border border-[var(--border)] bg-white px-4 text-sm outline-none">
                  {businessCategories.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            ) : null}
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white">
              {mode === "signup" ? "Create Account" : "Login"}
            </button>
          </form>
          {mode === "login" ? (
            <>
              <div className="my-6 flex items-center gap-3 text-sm text-[var(--muted)]">
                <span className="h-px flex-1 bg-[var(--border)]" />
                or continue with
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>
              <button type="button" className="inline-flex h-12 w-full items-center justify-center gap-3 rounded-full border border-[var(--border)] bg-white text-sm font-semibold text-[var(--text)]">
                <GoogleGlyph />
                Continue with Google
              </button>
            </>
          ) : null}
          <p className="mt-6 text-center text-sm text-[var(--muted)]">
            {mode === "signup" ? "Already have an account?" : "New to Oneos?"}{" "}
            <Link to={mode === "signup" ? "/login" : "/signup"} className="font-semibold text-[var(--primary)]">
              {mode === "signup" ? "Login →" : "Create account →"}
            </Link>
          </p>
          <p className="mt-4 text-center text-xs leading-6 text-[var(--muted)]">
            By signing up you agree to our Terms & Privacy Policy
          </p>
        </div>
        <div className="order-1 hidden rounded-[32px] bg-[linear-gradient(135deg,var(--primary),var(--primary-dark))] p-10 text-white shadow-[0_30px_90px_rgba(37,99,235,0.24)] lg:order-2 lg:block">
          <div className="max-w-lg space-y-6">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">Merchant Spotlight</span>
            <h2 className="font-heading text-4xl font-bold leading-tight">“We launched our store and took paid orders on day one.”</h2>
            <p className="text-lg leading-8 text-white/85">
              Oneos helps Indian merchants skip agency delays and start selling with a WhatsApp-first storefront in minutes.
            </p>
            <div className="rounded-[24px] bg-white/10 p-6 backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-lg font-bold text-[var(--primary)]">RM</div>
                <div>
                  <div className="font-semibold">Rhea Malhotra</div>
                  <div className="text-sm text-white/80">Surat · Ethnic Wear</div>
                </div>
              </div>
              <div className="mt-4 text-sm text-yellow-200">★★★★★</div>
              <p className="mt-4 text-sm leading-7 text-white/88">
                “The onboarding is clean, the template quality feels premium, and our WhatsApp enquiries now convert from a real storefront instead of screenshots.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function OnboardingPage() {
  const navigate = useNavigate();
  const { storeConfig, updateStoreConfig, selectedTemplate, chooseTemplate, merchantProducts, updateMerchantProduct, login } = usePlatform();
  const [currentStep, setCurrentStep] = useState(1);
  const [hexColor, setHexColor] = useState(storeConfig.brandColor);

  useEffect(() => {
    login();
  }, [login]);

  const categoryTemplates = templates.filter((template) =>
    storeConfig.businessCategory === "Other" ? true : template.category === storeConfig.businessCategory,
  );

  const progress = (currentStep / 4) * 100;

  return (
    <PageShell className="min-h-screen bg-[var(--bg)]">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-[var(--muted)]">Step {currentStep} of 4</div>
              <h1 className="mt-2 font-heading text-3xl font-bold">Set up your store</h1>
            </div>
            <div className="w-full max-w-sm rounded-full bg-[var(--bg)]">
              <div className="h-3 rounded-full bg-[var(--primary)] transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {currentStep === 1 ? (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <InputField label="Store Name" value={storeConfig.storeName} onChange={(value) => updateStoreConfig({ storeName: value, logoText: value.slice(0, 2).toUpperCase() || "O" })} />
              <InputField label="WhatsApp Number" value={storeConfig.whatsappNumber} onChange={(value) => updateStoreConfig({ whatsappNumber: value })} />
              <InputField label="City" value={storeConfig.city} onChange={(value) => updateStoreConfig({ city: value })} />
              <div className="lg:col-span-2">
                <div className="text-sm font-semibold text-[var(--text)]">Business Category</div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {businessCategories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => updateStoreConfig({ businessCategory: category })}
                      className={classNames("rounded-[20px] border p-4 text-left transition-all", storeConfig.businessCategory === category ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)] bg-[var(--bg)]")}
                    >
                      <div className="font-semibold">{category}</div>
                      <div className="mt-2 text-sm text-[var(--muted)]">Start with templates and defaults tailored for {category.toLowerCase()} businesses.</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="mt-10 space-y-6">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-2xl font-bold">Choose a starting design</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">Templates are pre-filtered for {storeConfig.businessCategory} stores.</p>
                </div>
                <button type="button" onClick={() => updateStoreConfig({ businessCategory: "Other" })} className="text-sm font-semibold text-[var(--primary)]">
                  Browse all templates
                </button>
              </div>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {categoryTemplates.map((template) => {
                  const selected = selectedTemplate?.id === template.id;
                  return (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() => chooseTemplate(template)}
                      className={classNames("relative rounded-[22px] border p-4 text-left transition-all", selected ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-[0_16px_30px_rgba(37,99,235,0.12)]" : "border-[var(--border)] bg-white")}
                    >
                      <div className={classNames("h-32 rounded-[18px]", previewGradient(template.category))} />
                      {selected ? <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">✓</div> : null}
                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-semibold">{template.name}</div>
                          <div className="mt-1 text-sm text-[var(--muted)]">{template.highlight}</div>
                        </div>
                        <div className="text-sm font-semibold text-[var(--primary)]">{formatINR(template.price)}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="mt-10 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <div className="rounded-[22px] border border-dashed border-[var(--border)] bg-[var(--bg)] p-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white text-xl font-bold shadow-sm">{storeConfig.logoText || "O"}</div>
                  <div className="mt-4 text-sm font-semibold text-[var(--text)]">Upload Logo</div>
                  <div className="mt-2 text-sm text-[var(--muted)]">Drag & drop logo here or keep your initials placeholder.</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text)]">Choose Brand Color</div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {["#2563EB", "#F97316", "#16A34A", "#0F172A", "#E11D48", "#8B5CF6"].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => {
                          setHexColor(color);
                          updateStoreConfig({ brandColor: color });
                        }}
                        className={classNames("h-10 w-10 rounded-full ring-2 ring-offset-2", storeConfig.brandColor === color ? "ring-slate-900" : "ring-transparent")}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input
                      value={hexColor}
                      onChange={(event) => {
                        setHexColor(event.target.value);
                        updateStoreConfig({ brandColor: event.target.value });
                      }}
                      className="h-10 w-32 rounded-full border border-[var(--border)] px-4 text-sm outline-none"
                    />
                  </div>
                </div>
                <InputField label="Store Tagline" value={storeConfig.tagline} onChange={(value) => updateStoreConfig({ tagline: value })} />
                <div className="space-y-4">
                  <div className="text-sm font-semibold text-[var(--text)]">Add first 3 products</div>
                  {merchantProducts.slice(0, 3).map((product) => (
                    <div key={product.id} className="grid gap-3 rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-4 sm:grid-cols-2">
                      <InputField label="Product Name" value={product.name} onChange={(value) => updateMerchantProduct(product.id, { name: value })} />
                      <InputField label="Price (₹)" value={String(product.price)} onChange={(value) => updateMerchantProduct(product.id, { price: Number(value) || 0 })} />
                      <InputField label="Stock" value={String(product.stock)} onChange={(value) => updateMerchantProduct(product.id, { stock: Number(value) || 0 })} />
                      <InputField label="Upload Image" value={product.imageLabel} onChange={(value) => updateMerchantProduct(product.id, { imageLabel: value })} />
                    </div>
                  ))}
                  <button type="button" className="text-sm font-semibold text-[var(--primary)]">+ Add another product</button>
                </div>
              </div>
              <div className="space-y-6">
                <div className="rounded-[24px] bg-[#DCFCE7] p-5">
                  <div className="text-sm font-semibold text-[#166534]">WhatsApp message preview</div>
                  <div className="mt-4 rounded-[18px] bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">
                    Hi! You have a new order for {storeConfig.storeName}. Customer details and items will appear here instantly on WhatsApp.
                  </div>
                </div>
                <div className="rounded-[28px] border border-[var(--border)] bg-white p-4 shadow-sm">
                  <StorePreviewFrame
                    template={selectedTemplate ?? templates[0]}
                    mobile
                    accentColor={storeConfig.brandColor}
                    storeName={storeConfig.storeName}
                    tagline={storeConfig.tagline}
                    products={merchantProducts}
                  />
                </div>
              </div>
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="relative mt-10 overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg)] p-8 text-center">
              <div className="pointer-events-none absolute inset-0">
                {Array.from({ length: 18 }).map((_, index) => (
                  <span
                    key={index}
                    className="absolute left-1/2 top-1/2 h-3 w-3 rounded-full animate-confetti-burst"
                    style={{
                      backgroundColor: ["#2563EB", "#F97316", "#16A34A", "#8B5CF6"][index % 4],
                      transform: `translate(-50%, -50%) rotate(${index * 20}deg) translateY(-10px)`,
                      animationDelay: `${index * 35}ms`,
                    }}
                  />
                ))}
              </div>
              <div className="relative z-10 mx-auto max-w-2xl space-y-6">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[var(--success)]/10 text-3xl text-[var(--success)]">✓</div>
                <div>
                  <h2 className="font-heading text-3xl font-bold">Your store is ready!</h2>
                  <p className="mt-3 text-base text-[var(--muted)]">Publish it, share it, and start taking orders today.</p>
                </div>
                <div className="flex flex-col items-center justify-between gap-3 rounded-full border border-[var(--border)] bg-white px-5 py-4 sm:flex-row">
                  <span className="font-mono text-sm text-[var(--text)]">{storeConfig.domain}</span>
                  <button type="button" className="rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-semibold text-[var(--text)]">Copy</button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  <button type="button" className="rounded-[20px] bg-[#25D366] px-5 py-4 text-sm font-semibold text-white">Share on WhatsApp</button>
                  <button type="button" className="rounded-[20px] bg-[var(--primary)] px-5 py-4 text-sm font-semibold text-white">View Your Store</button>
                  <button type="button" onClick={() => navigate("/dashboard")} className="rounded-[20px] border border-[var(--border)] bg-white px-5 py-4 text-sm font-semibold text-[var(--text)]">Go to Dashboard</button>
                </div>
                <div className="rounded-[24px] bg-white p-6 text-left shadow-sm">
                  <div className="font-semibold text-[var(--text)]">What to do next</div>
                  <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
                    {["Add more products", "Set up UPI payment", "Share with your first customer", "Set up a coupon"].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[var(--success)]/10 text-[var(--success)]">✓</span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          <div className="mt-10 flex items-center justify-between gap-4">
            <button type="button" disabled={currentStep === 1} onClick={() => setCurrentStep((step) => Math.max(1, step - 1))} className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)] disabled:opacity-40">
              Back
            </button>
            <button
              type="button"
              onClick={() => {
                if (currentStep < 4) {
                  setCurrentStep((step) => step + 1);
                } else {
                  navigate("/dashboard");
                }
              }}
              className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white"
            >
              {currentStep === 4 ? "Go to Dashboard" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </PageShell>
  );
}

function ProtectedRoute() {
  const { isLoggedIn } = usePlatform();
  return isLoggedIn ? <Outlet /> : <Navigate to="/signup" replace />;
}

function DashboardLayout() {
  const { storeConfig, logout } = usePlatform();
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = [
    { to: "/dashboard", label: "Overview", emoji: "🏠" },
    { to: "/dashboard/customize", label: "Customize Store", emoji: "🎨" },
    { to: "/dashboard/products", label: "My Products", emoji: "📦" },
    { to: "/dashboard/marketing", label: "Marketing", emoji: "📣" },
    { to: "/dashboard/settings", label: "Settings", emoji: "⚙️" },
  ];

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      <aside className={classNames("border-r border-[var(--border)] bg-white px-4 py-5 transition-all duration-300", collapsed ? "w-20" : "w-64")}>
        <div className="flex items-center justify-between">
          <LogoMark compact={collapsed} />
          <button type="button" onClick={() => setCollapsed((current) => !current)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
            {collapsed ? "→" : "←"}
          </button>
        </div>
        <div className="mt-8 rounded-[22px] bg-[var(--bg)] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
              {storeConfig.logoText || "O"}
            </div>
            {!collapsed ? (
              <div>
                <div className="font-semibold">{storeConfig.storeName}</div>
                <div className="mt-1 inline-flex rounded-full bg-[var(--primary)]/10 px-2 py-1 text-[11px] font-semibold text-[var(--primary)]">Pro</div>
              </div>
            ) : null}
          </div>
        </div>
        <nav className="mt-8 space-y-2">
          {navItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={classNames("flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-all", active ? "bg-[var(--primary)] text-white shadow-sm" : "text-[var(--muted)] hover:bg-[var(--bg)] hover:text-[var(--text)]")}
              >
                <span>{item.emoji}</span>
                {!collapsed ? item.label : null}
              </Link>
            );
          })}
        </nav>
        <div className="mt-8 space-y-3">
          <button type="button" onClick={() => navigate("/templates")} className="inline-flex w-full items-center justify-center rounded-full border border-[var(--primary)] px-4 py-3 text-sm font-semibold text-[var(--primary)]">
            {collapsed ? "🌐" : "View My Store"}
          </button>
          <button type="button" className="inline-flex w-full items-center justify-center rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white">
            {collapsed ? "🟢" : "Share on WhatsApp"}
          </button>
          {!collapsed ? (
            <button type="button" onClick={() => { logout(); navigate("/"); }} className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border)] px-4 py-3 text-sm font-semibold text-[var(--text)]">
              Logout
            </button>
          ) : null}
        </div>
      </aside>
      <div className="min-w-0 flex-1">
        <Outlet />
      </div>
    </div>
  );
}

function DashboardPageShell({ title, subtitle, children, actions }: { title: string; subtitle: string; children: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className="animate-page-enter px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-3xl font-bold text-[var(--text)]">{title}</h1>
            <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
          </div>
          {actions}
        </div>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}

function DashboardOverviewPage() {
  const { storeConfig, merchantProducts } = usePlatform();
  const stats = [
    { label: "Total Revenue", value: "₹2,48,500" },
    { label: "Orders Today", value: "26" },
    { label: "Store Visitors", value: "1,924" },
    { label: "Products Listed", value: String(merchantProducts.length) },
  ];

  return (
    <DashboardPageShell title={`Good morning, ${storeConfig.storeName}! Your store is live`} subtitle="Keep refining your storefront, share your link, and turn visitors into WhatsApp orders.">
      <div className="grid gap-5 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="animate-card-rise rounded-[22px] border border-[var(--border)] bg-white p-5 shadow-sm" style={{ animationDelay: `${index * 50}ms` }}>
            <div className="text-sm font-semibold text-[var(--muted)]">{stat.label}</div>
            <div className="mt-3 text-3xl font-bold text-[var(--text)]">{stat.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading text-xl font-bold">Complete your store setup</h2>
                <p className="mt-2 text-sm text-[var(--muted)]">You are 76% done. Finish these high-impact setup steps next.</p>
              </div>
              <span className="rounded-full bg-[var(--primary)]/10 px-3 py-1 text-sm font-semibold text-[var(--primary)]">76%</span>
            </div>
            <div className="mt-5 h-3 rounded-full bg-[var(--bg)]">
              <div className="h-3 rounded-full bg-[var(--primary)]" style={{ width: "76%" }} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["UPI payment connected", true],
                ["Add 10 products", false],
                ["Share your store once", true],
                ["Create first coupon", false],
              ].map(([task, done]) => (
                <div key={String(task)} className="flex items-center gap-3 rounded-2xl bg-[var(--bg)] px-4 py-3 text-sm">
                  <span className={classNames("inline-flex h-7 w-7 items-center justify-center rounded-full", done ? "bg-[var(--success)]/10 text-[var(--success)]" : "bg-white text-[var(--muted)] ring-1 ring-[var(--border)]")}>
                    {done ? "✓" : "•"}
                  </span>
                  <span className={classNames(done && "line-through text-[var(--muted)]")}>{task}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold">Quick Actions</h2>
            <div className="mt-5 grid gap-3">
              {["Add Product", "Create Coupon", "Share Store"].map((label) => (
                <button key={label} type="button" className="flex h-12 items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--bg)] px-4 text-sm font-semibold text-[var(--text)]">
                  {label}
                  <span>→</span>
                </button>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <h2 className="font-heading text-xl font-bold">Your store link</h2>
            <div className="mt-5 rounded-full border border-[var(--border)] bg-[var(--bg)] px-4 py-4 text-sm font-mono text-[var(--text)]">
              {storeConfig.domain}
            </div>
            <div className="mt-4 flex gap-3">
              <button type="button" className="flex-1 rounded-full bg-[var(--primary)] px-4 py-3 text-sm font-semibold text-white">Copy link</button>
              <button type="button" className="flex-1 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white">WhatsApp share</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardPageShell>
  );
}

function CustomizePage() {
  const { storeConfig, selectedTemplate, merchantProducts, updateStoreConfig, updateSectionVisibility, updateSocialLink } = usePlatform();
  const [openPanel, setOpenPanel] = useState<string | null>("theme");

  const swatches = ["#2563EB", "#1D4ED8", "#F97316", "#16A34A", "#0F172A", "#E11D48"];

  return (
    <DashboardPageShell
      title="Customize Store"
      subtitle="Edit your storefront and publish changes with a live preview beside you."
      actions={
        <div className="flex gap-3">
          <button type="button" className="rounded-full border border-[var(--border)] px-5 py-3 text-sm font-semibold text-[var(--text)]">Save Draft</button>
          <button type="button" className="rounded-full bg-[var(--primary)] px-5 py-3 text-sm font-semibold text-white">Publish Changes</button>
        </div>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4">
          <AccordionCard title="Theme & Colors" open={openPanel === "theme"} onToggle={() => setOpenPanel(openPanel === "theme" ? null : "theme")}>
            <div className="flex flex-wrap gap-3">
              {swatches.map((swatch) => (
                <button key={swatch} type="button" onClick={() => updateStoreConfig({ brandColor: swatch })} className={classNames("h-10 w-10 rounded-full ring-2 ring-offset-2", storeConfig.brandColor === swatch ? "ring-slate-900" : "ring-transparent")} style={{ backgroundColor: swatch }} />
              ))}
            </div>
            <div className="mt-4">
              <InputField label="Font Pair" value="Sora + DM Sans" onChange={() => undefined} readOnly />
            </div>
          </AccordionCard>
          <AccordionCard title="Banner" open={openPanel === "banner"} onToggle={() => setOpenPanel(openPanel === "banner" ? null : "banner")}>
            <InputField label="Hero Heading" value={storeConfig.heroHeading} onChange={(value) => updateStoreConfig({ heroHeading: value })} />
            <div className="mt-4">
              <InputField label="CTA Text" value={storeConfig.heroCta} onChange={(value) => updateStoreConfig({ heroCta: value })} />
            </div>
            <div className="mt-4 rounded-[20px] border border-dashed border-[var(--border)] bg-[var(--bg)] p-5 text-sm text-[var(--muted)]">
              Upload hero image/video
            </div>
          </AccordionCard>
          <AccordionCard title="Sections" open={openPanel === "sections"} onToggle={() => setOpenPanel(openPanel === "sections" ? null : "sections")}>
            {[
              ["categories", "Show Categories"],
              ["featuredProducts", "Show Featured Products"],
              ["testimonials", "Show Testimonials"],
              ["whatsappButton", "Show WhatsApp Button"],
            ].map(([key, label]) => (
              <ToggleRow
                key={key}
                label={label}
                active={storeConfig.sectionVisibility[key as keyof StoreConfig["sectionVisibility"]]}
                onToggle={(value) => updateSectionVisibility(key as keyof StoreConfig["sectionVisibility"], value)}
              />
            ))}
          </AccordionCard>
          <AccordionCard title="Footer" open={openPanel === "footer"} onToggle={() => setOpenPanel(openPanel === "footer" ? null : "footer")}>
            <InputField label="Footer Tagline" value={storeConfig.footerTagline} onChange={(value) => updateStoreConfig({ footerTagline: value })} />
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InputField label="Instagram" value={storeConfig.socialLinks.instagram} onChange={(value) => updateSocialLink("instagram", value)} />
              <InputField label="Facebook" value={storeConfig.socialLinks.facebook} onChange={(value) => updateSocialLink("facebook", value)} />
            </div>
          </AccordionCard>
        </div>
        <div className="rounded-[28px] border border-[var(--border)] bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <div className="font-heading text-xl font-bold">Live Preview</div>
            <div className="text-sm text-[var(--muted)]">Last published: 2 hours ago</div>
          </div>
          <StorePreviewFrame
            template={selectedTemplate ?? templates[0]}
            mobile
            accentColor={storeConfig.brandColor}
            storeName={storeConfig.storeName}
            tagline={storeConfig.tagline}
            products={merchantProducts}
            heroHeading={storeConfig.heroHeading}
            heroCta={storeConfig.heroCta}
            sectionVisibility={storeConfig.sectionVisibility}
            footerTagline={storeConfig.footerTagline}
          />
        </div>
      </div>
    </DashboardPageShell>
  );
}

function ProductsDashboardPage() {
  const { merchantProducts, addMerchantProduct, updateMerchantProduct, removeMerchantProducts } = usePlatform();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [draft, setDraft] = useState<MerchantProduct>({
    id: 999,
    name: "",
    category: "Clothing",
    price: 0,
    comparePrice: null,
    stock: 0,
    status: true,
    imageLabel: "Hero shot",
  });

  const allSelected = selectedIds.length === merchantProducts.length && merchantProducts.length > 0;

  return (
    <DashboardPageShell
      title="My Products"
      subtitle="Manage your own catalog, pricing, stock, and storefront visibility."
      actions={<button type="button" onClick={() => setDrawerOpen(true)} className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white">+ Add Product</button>}
    >
      <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSelectedIds(allSelected ? [] : merchantProducts.map((product) => product.id))}
              className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold"
            >
              {allSelected ? "Unselect all" : "Select all"}
            </button>
            <button type="button" onClick={() => removeMerchantProducts(selectedIds)} className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold">
              Delete selected
            </button>
          </div>
          <button type="button" className="rounded-full border border-[var(--border)] px-4 py-2 text-sm font-semibold">Export CSV</button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <tr>
                <th className="pb-4">Select</th>
                <th className="pb-4">Image</th>
                <th className="pb-4">Name</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {merchantProducts.map((product) => (
                <tr key={product.id}>
                  <td className="py-4">
                    <input type="checkbox" checked={selectedIds.includes(product.id)} onChange={() => setSelectedIds((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} />
                  </td>
                  <td className="py-4">
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200" />
                  </td>
                  <td className="py-4 font-semibold">{product.name}</td>
                  <td className="py-4 text-[var(--muted)]">{product.category}</td>
                  <td className="py-4 font-semibold text-[var(--primary)]">{formatINR(product.price)}</td>
                  <td className="py-4 text-[var(--muted)]">{product.stock}</td>
                  <td className="py-4">
                    <ToggleRowCompact active={product.status} onToggle={(value) => updateMerchantProduct(product.id, { status: value })} />
                  </td>
                  <td className="py-4 text-right">
                    <button type="button" onClick={() => setDrawerOpen(true)} className="text-sm font-semibold text-[var(--primary)]">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {createPortal(
        <div className={classNames("fixed inset-0 z-50 transition-opacity", drawerOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0")}>
          <div className="absolute inset-0 bg-slate-950/40" onClick={() => setDrawerOpen(false)} />
          <aside className={classNames("absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-2xl transition-transform duration-300", drawerOpen ? "translate-x-0" : "translate-x-full")}>
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-2xl font-bold">Add Product</h2>
              <button type="button" onClick={() => setDrawerOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                <CloseGlyph />
              </button>
            </div>
            <div className="mt-6 space-y-4">
              <InputField label="Product Name" value={draft.name} onChange={(value) => setDraft((current) => ({ ...current, name: value }))} />
              <InputField label="Description" value={draft.imageLabel} onChange={(value) => setDraft((current) => ({ ...current, imageLabel: value }))} />
              <div className="grid gap-4 sm:grid-cols-2">
                <InputField label="Price (₹)" value={String(draft.price)} onChange={(value) => setDraft((current) => ({ ...current, price: Number(value) || 0 }))} />
                <InputField label="Compare Price" value={draft.comparePrice ? String(draft.comparePrice) : ""} onChange={(value) => setDraft((current) => ({ ...current, comparePrice: value ? Number(value) : null }))} />
                <InputField label="Stock" value={String(draft.stock)} onChange={(value) => setDraft((current) => ({ ...current, stock: Number(value) || 0 }))} />
                <label className="block space-y-2">
                  <span className="text-sm font-semibold">Category</span>
                  <select value={draft.category} onChange={(event) => setDraft((current) => ({ ...current, category: event.target.value }))} className="h-12 w-full rounded-[10px] border border-[var(--border)] px-4 text-sm outline-none">
                    {businessCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="rounded-[20px] border border-dashed border-[var(--border)] bg-[var(--bg)] p-5 text-sm text-[var(--muted)]">
                Images upload (drag & drop, multiple)
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <ToggleRow label="Variants (Size/Color)" active={draft.status} onToggle={(value) => setDraft((current) => ({ ...current, status: value }))} />
                <ToggleRow label="WhatsApp order" active={draft.status} onToggle={(value) => setDraft((current) => ({ ...current, status: value }))} />
              </div>
              <button
                type="button"
                onClick={() => {
                  addMerchantProduct({ ...draft, id: Date.now() });
                  setDrawerOpen(false);
                  setDraft({ id: 999, name: "", category: "Clothing", price: 0, comparePrice: null, stock: 0, status: true, imageLabel: "Hero shot" });
                }}
                className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--primary)] text-sm font-semibold text-white"
              >
                Save Product
              </button>
            </div>
          </aside>
        </div>,
        document.body,
      )}
    </DashboardPageShell>
  );
}

function OrdersPage() {
  const { merchantOrders, updateOrderStatus } = usePlatform();
  const [activeTab, setActiveTab] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState<MerchantOrder | null>(null);

  const visibleOrders = merchantOrders.filter((order) => activeTab === "All" || order.status === activeTab);

  return (
    <DashboardPageShell title="Orders" subtitle="Track new orders, confirm fulfilment, and keep customers updated across WhatsApp.">
      <div className="flex gap-2 overflow-x-auto pb-3">
        {["All", "New", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((tab) => (
          <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={classNames("rounded-full px-4 py-2 text-sm font-semibold", activeTab === tab ? "bg-[var(--primary)] text-white" : "bg-white text-[var(--muted)] ring-1 ring-[var(--border)]")}>
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4">
        {visibleOrders.map((order) => (
          <button key={order.id} type="button" onClick={() => setSelectedOrder(order)} className="rounded-[24px] border border-[var(--border)] bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">{order.id}</div>
                <h3 className="mt-2 font-heading text-xl font-bold">{order.customer}</h3>
                <div className="mt-2 text-sm text-[var(--muted)]">{order.phone} · {order.items}</div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-[var(--bg)] px-3 py-1 text-sm font-semibold text-[var(--text)]">{formatINR(order.total)}</span>
                <span className="rounded-full bg-[var(--accent)]/10 px-3 py-1 text-sm font-semibold text-[var(--accent)]">{order.payment}</span>
                <StatusPill status={order.status} />
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <button type="button" onClick={(event) => { event.stopPropagation(); updateOrderStatus(order.id, order.status === "New" ? "Confirmed" : "Shipped"); }} className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">
                {order.status === "New" ? "Confirm" : "Mark Shipped"}
              </button>
              <button type="button" onClick={(event) => event.stopPropagation()} className="rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">
                WhatsApp customer
              </button>
              <span className="self-center text-sm text-[var(--muted)]">{order.time}</span>
            </div>
          </button>
        ))}
      </div>
      {selectedOrder ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4" onClick={() => setSelectedOrder(null)}>
          <div className="w-full max-w-2xl rounded-[28px] bg-white p-6" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-[var(--muted)]">{selectedOrder.id}</div>
                <h2 className="font-heading text-2xl font-bold">{selectedOrder.customer}</h2>
              </div>
              <button type="button" onClick={() => setSelectedOrder(null)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)]">
                <CloseGlyph />
              </button>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <InfoPanel title="Items" value={selectedOrder.items} />
              <InfoPanel title="Payment" value={selectedOrder.payment} />
              <InfoPanel title="Total" value={formatINR(selectedOrder.total)} />
              <InfoPanel title="Phone" value={selectedOrder.phone} />
            </div>
            <div className="mt-6 rounded-[20px] bg-[var(--bg)] p-5 text-sm text-[var(--muted)]">{selectedOrder.note}</div>
          </div>
        </div>,
        document.body,
      ) : null}
    </DashboardPageShell>
  );
}

function DashboardMarketingPage() {
  const [broadcast, setBroadcast] = useState("Hi! Our festive sale is live. Tap your store link to shop new arrivals today.");
  const [offerEnabled, setOfferEnabled] = useState(true);
  const coupons = [
    { code: "WELCOME10", discount: "10% off", usage: "84 uses", expiry: "30 Jun 2026" },
    { code: "FESTIVE250", discount: "₹250 off", usage: "31 uses", expiry: "15 Jul 2026" },
  ];

  return (
    <DashboardPageShell title="Marketing" subtitle="Run offers, broadcast updates, and turn store traffic into repeat orders.">
      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">Coupons</h2>
              <button type="button" className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Create Coupon</button>
            </div>
            <div className="mt-5 space-y-3">
              {coupons.map((coupon) => (
                <div key={coupon.code} className="rounded-[20px] bg-[var(--bg)] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-lg font-bold text-[var(--text)]">{coupon.code}</div>
                      <div className="mt-1 text-sm text-[var(--muted)]">{coupon.discount}</div>
                    </div>
                    <div className="text-right text-sm text-[var(--muted)]">
                      <div>{coupon.usage}</div>
                      <div>{coupon.expiry}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold">Offers Banner</h2>
              <ToggleRowCompact active={offerEnabled} onToggle={setOfferEnabled} />
            </div>
            <p className="mt-3 text-sm text-[var(--muted)]">Enable a site-wide festive or flash sale banner across your store.</p>
          </div>
        </div>
        <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
          <h2 className="font-heading text-xl font-bold">WhatsApp Broadcast</h2>
          <p className="mt-2 text-sm text-[var(--muted)]">Compose a message for all past customers and share your new collection or offer instantly.</p>
          <textarea value={broadcast} onChange={(event) => setBroadcast(event.target.value)} className="mt-5 h-48 w-full rounded-[18px] border border-[var(--border)] bg-[var(--bg)] p-4 text-sm outline-none" />
          <div className="mt-5 rounded-[20px] bg-[#DCFCE7] p-5">
            <div className="text-sm font-semibold text-[#166534]">WhatsApp Preview</div>
            <div className="mt-3 rounded-[18px] bg-white p-4 text-sm text-slate-700 shadow-sm">{broadcast}</div>
          </div>
          <button type="button" className="mt-5 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white">
            Send Broadcast
          </button>
        </div>
      </div>
    </DashboardPageShell>
  );
}

function SettingsPage() {
  const { storeConfig, updateStoreConfig, updateNotifications } = usePlatform();
  const [tab, setTab] = useState("Store Info");

  return (
    <DashboardPageShell title="Settings" subtitle="Configure your storefront identity, payments, domain, and merchant notifications.">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <div className="rounded-[24px] border border-[var(--border)] bg-white p-4 shadow-sm">
          {["Store Info", "Payments", "Domain", "Notifications", "Account"].map((item) => (
            <button key={item} type="button" onClick={() => setTab(item)} className={classNames("flex w-full items-center rounded-2xl px-4 py-3 text-left text-sm font-semibold", tab === item ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "text-[var(--muted)]")}>
              {item}
            </button>
          ))}
        </div>
        <div className="rounded-[24px] border border-[var(--border)] bg-white p-6 shadow-sm">
          {tab === "Store Info" ? (
            <div className="space-y-4">
              <InputField label="Store Name" value={storeConfig.storeName} onChange={(value) => updateStoreConfig({ storeName: value })} />
              <InputField label="Tagline" value={storeConfig.tagline} onChange={(value) => updateStoreConfig({ tagline: value })} />
              <InputField label="Category" value={storeConfig.businessCategory} onChange={(value) => updateStoreConfig({ businessCategory: value })} />
              <InputField label="Phone" value={storeConfig.whatsappNumber} onChange={(value) => updateStoreConfig({ whatsappNumber: value })} />
              <InputField label="Address" value={storeConfig.city} onChange={(value) => updateStoreConfig({ city: value })} />
            </div>
          ) : null}
          {tab === "Payments" ? (
            <div className="space-y-4">
              <InputField label="UPI ID" value={storeConfig.upiId} onChange={(value) => updateStoreConfig({ upiId: value })} />
              <ToggleRow label="Enable COD" active={storeConfig.codEnabled} onToggle={(value) => updateStoreConfig({ codEnabled: value })} />
              <InfoPanel title="Bank account" value="XXXXXX5127 · HDFC Bank" />
            </div>
          ) : null}
          {tab === "Domain" ? (
            <div className="space-y-4">
              <InfoPanel title="Current URL" value={storeConfig.domain} />
              <div className="rounded-[22px] border border-[var(--primary)]/20 bg-[var(--primary)]/5 p-5">
                <div className="font-semibold text-[var(--text)]">Upgrade to custom domain</div>
                <p className="mt-2 text-sm text-[var(--muted)]">Get your own .in domain for ₹499/year and make your store easier to remember.</p>
                <button type="button" className="mt-4 rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-white">Upgrade Domain</button>
              </div>
            </div>
          ) : null}
          {tab === "Notifications" ? (
            <div className="space-y-4">
              <ToggleRow label="WhatsApp order alerts" active={storeConfig.notifications.whatsapp} onToggle={(value) => updateNotifications("whatsapp", value)} />
              <ToggleRow label="Email alerts" active={storeConfig.notifications.email} onToggle={(value) => updateNotifications("email", value)} />
              <ToggleRow label="Low stock alerts" active={storeConfig.notifications.lowStock} onToggle={(value) => updateNotifications("lowStock", value)} />
            </div>
          ) : null}
          {tab === "Account" ? (
            <div className="space-y-4">
              <InfoPanel title="Plan" value="Growth · ₹499/month" />
              <InfoPanel title="Support" value="Priority WhatsApp support available" />
            </div>
          ) : null}
        </div>
      </div>
    </DashboardPageShell>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[var(--text)]">{label}</span>
      <input
        value={value}
        readOnly={readOnly}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-12 w-full rounded-[10px] border border-[var(--border)] bg-white px-4 text-sm outline-none transition-colors focus:border-[var(--primary)]"
      />
    </label>
  );
}

function ToggleRow({ label, active, onToggle }: { label: string; active: boolean; onToggle: (value: boolean) => void }) {
  return (
    <div className="flex items-center justify-between rounded-[18px] border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
      <span className="text-sm font-semibold text-[var(--text)]">{label}</span>
      <button type="button" onClick={() => onToggle(!active)} className={classNames("relative h-7 w-12 rounded-full transition-colors", active ? "bg-[var(--success)]" : "bg-slate-300")}>
        <span className={classNames("absolute top-1 h-5 w-5 rounded-full bg-white transition-transform", active ? "translate-x-6" : "translate-x-1")} />
      </button>
    </div>
  );
}

function ToggleRowCompact({ active, onToggle }: { active: boolean; onToggle: (value: boolean) => void }) {
  return (
    <button type="button" onClick={() => onToggle(!active)} className={classNames("relative h-7 w-12 rounded-full transition-colors", active ? "bg-[var(--success)]" : "bg-slate-300")}>
      <span className={classNames("absolute top-1 h-5 w-5 rounded-full bg-white transition-transform", active ? "translate-x-6" : "translate-x-1")} />
    </button>
  );
}

function AccordionCard({ title, open, onToggle, children }: { title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-[24px] border border-[var(--border)] bg-white shadow-sm">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between px-5 py-4 text-left">
        <span className="font-heading text-xl font-bold">{title}</span>
        <span className={classNames("text-xl transition-transform", open && "rotate-180")}>⌄</span>
      </button>
      {open ? <div className="border-t border-[var(--border)] px-5 py-5">{children}</div> : null}
    </div>
  );
}

function StatusPill({ status }: { status: MerchantOrder["status"] }) {
  const tone =
    status === "Delivered" ? "bg-[var(--success)]/10 text-[var(--success)]" :
    status === "Cancelled" ? "bg-rose-100 text-rose-600" :
    status === "Shipped" ? "bg-blue-100 text-blue-600" :
    status === "Confirmed" ? "bg-amber-100 text-amber-600" :
    "bg-violet-100 text-violet-600";

  return <span className={classNames("rounded-full px-3 py-1 text-sm font-semibold", tone)}>{status}</span>;
}

function InfoPanel({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-[20px] bg-[var(--bg)] p-4">
      <div className="text-sm font-semibold text-[var(--muted)]">{title}</div>
      <div className="mt-2 font-semibold text-[var(--text)]">{value}</div>
    </div>
  );
}

function StorePreviewFrame({
  template,
  mobile,
  accentColor,
  storeName,
  tagline,
  products,
  heroHeading,
  heroCta,
  sectionVisibility,
  footerTagline,
}: {
  template: Template;
  mobile: boolean;
  accentColor?: string;
  storeName?: string;
  tagline?: string;
  products?: MerchantProduct[];
  heroHeading?: string;
  heroCta?: string;
  sectionVisibility?: StoreConfig["sectionVisibility"];
  footerTagline?: string;
}) {
  const previewProducts = products ?? defaultProducts;
  const themeColor = accentColor ?? "#2563EB";
  const sectionState = sectionVisibility ?? defaultStoreConfig.sectionVisibility;

  return (
    <div className={classNames("mx-auto overflow-hidden rounded-[32px] border-[10px] border-slate-950 bg-white shadow-[0_22px_60px_rgba(15,23,42,0.24)]", mobile ? "max-w-[360px]" : "max-w-[900px]")}>
      <div className={classNames("mx-auto h-6 rounded-b-2xl bg-slate-950", mobile ? "w-28" : "w-40")} />
      <div className={classNames("overflow-y-auto bg-white", mobile ? "h-[640px]" : "h-[720px]")}>
        <div className="p-4">
          <div className="rounded-[24px] p-5 text-white" style={{ background: `linear-gradient(135deg, ${themeColor}, #60A5FA)` }}>
            <div className="text-xs uppercase tracking-[0.22em] text-white/70">{template.category}</div>
            <h3 className="mt-4 max-w-lg text-2xl font-bold">{heroHeading ?? `${template.name} storefront`}</h3>
            <p className="mt-2 text-sm text-white/80">{tagline ?? "Launch your store with WhatsApp-first selling."}</p>
            <button type="button" className="mt-5 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              {heroCta ?? "Shop Now"}
            </button>
          </div>
          {sectionState.categories ? (
            <div className="mt-5">
              <div className="font-semibold text-[var(--text)]">Shop by Category</div>
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
                {["New Arrivals", "Best Sellers", "Offers", "WhatsApp Exclusive"].map((item) => (
                  <div key={item} className="shrink-0 rounded-full bg-[var(--bg)] px-4 py-2 text-sm font-medium text-[var(--muted)]">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {sectionState.featuredProducts ? (
            <div className="mt-5">
              <div className="font-semibold text-[var(--text)]">Featured Products</div>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {previewProducts.slice(0, mobile ? 4 : 6).map((product) => (
                  <div key={product.id} className="rounded-[20px] border border-[var(--border)] bg-[var(--bg)] p-3">
                    <div className="h-24 rounded-[16px] bg-gradient-to-br from-slate-200 to-slate-100" />
                    <div className="mt-3 font-semibold text-[var(--text)]">{product.name}</div>
                    <div className="mt-1 text-sm text-[var(--primary)]">{formatINR(product.price)}</div>
                    <button type="button" className="mt-3 w-full rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: themeColor }}>
                      Add to cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {sectionState.testimonials ? (
            <div className="mt-5 rounded-[20px] bg-[var(--bg)] p-4">
              <div className="font-semibold text-[var(--text)]">Merchant love</div>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">“We cut our launch time from 3 weeks to 1 afternoon.”</p>
            </div>
          ) : null}
          <div className="mt-5 rounded-[20px] bg-slate-950 p-4 text-white">
            <div className="font-semibold">{storeName ?? "Oneos Demo"}</div>
            <div className="mt-2 text-sm text-white/70">{footerTagline ?? "A storefront built for Indian commerce and WhatsApp selling."}</div>
            {sectionState.whatsappButton ? (
              <button type="button" className="mt-4 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white">
                Chat on WhatsApp
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function previewGradient(category: string) {
  if (category === "Clothing") return "bg-[linear-gradient(135deg,#2563EB,#7DD3FC)]";
  if (category === "Electronics") return "bg-[linear-gradient(135deg,#0F172A,#334155)]";
  if (category === "Grocery") return "bg-[linear-gradient(135deg,#16A34A,#86EFAC)]";
  if (category === "Restaurant") return "bg-[linear-gradient(135deg,#F97316,#FBBF24)]";
  if (category === "Beauty") return "bg-[linear-gradient(135deg,#EC4899,#F9A8D4)]";
  if (category === "Mobile Shop") return "bg-[linear-gradient(135deg,#4F46E5,#818CF8)]";
  if (category === "Furniture") return "bg-[linear-gradient(135deg,#7C2D12,#D97706)]";
  if (category === "Pharmacy") return "bg-[linear-gradient(135deg,#059669,#34D399)]";
  if (category === "Marketplace") return "bg-[linear-gradient(135deg,#7C3AED,#C084FC)]";
  return "bg-[linear-gradient(135deg,#1D4ED8,#38BDF8)]";
}

function SearchGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 text-[var(--muted)]" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      <circle cx="11" cy="11" r="6" />
    </svg>
  );
}

function GoogleGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.2-1.5 3.6-5.5 3.6-3.3 0-6-2.8-6-6.2S8.7 5.3 12 5.3c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 2.8 14.5 2 12 2 6.9 2 2.8 6.2 2.8 11.4S6.9 20.8 12 20.8c6.9 0 9.1-4.8 9.1-7.3 0-.5 0-.9-.1-1.3H12Z" />
    </svg>
  );
}

function CloseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6 18 18M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <PlatformProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/websites" element={<WebsitesPage />} />
            <Route path="/marketing" element={<Navigate to="/" replace />} />
            <Route path="/ecommerce" element={<ECommercePage />} />
            <Route path="/templates" element={<TemplatesShowcasePage />} />
            <Route path="/templates/:id" element={<TemplateDetailPage />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} />
            <Route path="/login" element={<AuthPage mode="login" />} />
          </Route>
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardOverviewPage />} />
              <Route path="customize" element={<CustomizePage />} />
              <Route path="products" element={<ProductsDashboardPage />} />
              <Route path="orders" element={<Navigate to="/dashboard" replace />} />
              <Route path="marketing" element={<DashboardMarketingPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PlatformProvider>
    </BrowserRouter>
  );
}

