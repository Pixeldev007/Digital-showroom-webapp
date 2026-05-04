import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type DemoTab = "Add a Product" | "Manage Orders" | "Accept Payment" | "Track Analytics";

const ecommerceFeatures = [
  {
    title: "Unlimited Products",
    body: "List as many products as you want, with multiple images, videos, and descriptions.",
    icon: <BagIcon />,
    tint: "bg-blue-50 text-[#2563EB]",
  },
  {
    title: "Multi-Variant Support",
    body: "Sell products with size, color, material, or any custom variant — each with its own price and stock.",
    icon: <VariantIcon />,
    tint: "bg-violet-50 text-violet-600",
  },
  {
    title: "UPI & All Payments",
    body: "Accept UPI, cards, net banking, wallets, and Cash on Delivery out of the box.",
    icon: <PaymentIcon />,
    tint: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Order Management",
    body: "Track every order from placement to delivery. Update status, notify customers, manage returns.",
    icon: <OrdersIcon />,
    tint: "bg-orange-50 text-[#F97316]",
  },
  {
    title: "Repeat Orders",
    body: "Customers can reorder in one tap. Perfect for grocery, pharmacy, and daily essentials stores.",
    icon: <RepeatIcon />,
    tint: "bg-cyan-50 text-cyan-600",
  },
  {
    title: "Bulk Product Upload",
    body: "Upload thousands of products at once via CSV. Manage seasonal catalogs effortlessly.",
    icon: <UploadIcon />,
    tint: "bg-amber-50 text-amber-600",
  },
  {
    title: "Sales Analytics",
    body: "Real-time dashboard showing revenue, top products, abandoned carts, and customer lifetime value.",
    icon: <AnalyticsIcon />,
    tint: "bg-sky-50 text-sky-600",
  },
  {
    title: "Shiprocket Integration",
    body: "Connect your store to Shiprocket for automated shipping, tracking, and delivery updates.",
    icon: <ShippingIcon />,
    tint: "bg-lime-50 text-lime-600",
  },
];

const comparisonRows = [
  { feature: "UPI & RuPay Payments", oneos: true, global: "Extra setup needed" },
  { feature: "WhatsApp Order Button", oneos: true, global: "Paid plugin" },
  { feature: "Indian Rupee Native", oneos: true, global: "Currency config needed" },
  { feature: "Free Hosting Included", oneos: true, global: "Additional cost" },
  { feature: "Setup in 15 Seconds", oneos: true, global: "Days to weeks" },
  { feature: "Hindi & Regional Support", oneos: true, global: "Limited by vendor" },
  { feature: "Zero Transaction Fees", oneos: true, global: "2-3% per order" },
  { feature: "Dedicated India Support", oneos: true, global: "Global queue" },
];

const pricingPlans = [
  {
    name: "FREE",
    price: "₹0/month",
    features: ["10 products", "Basic cart", "WhatsApp orders"],
    cta: "Get Started Free",
    ctaClassName: "border border-white/25 text-white hover:bg-white/10",
  },
  {
    name: "GROWTH",
    price: "₹499/month",
    features: ["Unlimited products", "UPI + Card + COD", "Variants", "Bulk upload", "Order management", "Shiprocket"],
    cta: "Start Growth Plan",
    ctaClassName: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
    highlighted: true,
  },
  {
    name: "PRO",
    price: "₹999/month",
    features: [
      "Everything in Growth",
      "Abandoned cart recovery",
      "Advanced analytics",
      "Multi-staff",
      "Facebook Pixel",
      "Google Shopping feed",
      "WhatsApp broadcast",
      "Dedicated account manager",
    ],
    cta: "Start Pro Plan",
    ctaClassName: "bg-[#F97316] text-white hover:bg-[#EA580C]",
  },
];

const successStories = [
  {
    initials: "AG",
    name: "Amit Gupta, Delhi — Electronics Store",
    before: "Selling only in my local shop, 20 orders/week",
    after: "Online store live in 1 day, now 150+ orders/week",
    stat: "7x revenue in 6 months",
  },
  {
    initials: "MI",
    name: "Meera Iyer, Chennai — Clothing Boutique",
    before: "Taking orders on WhatsApp manually, very messy",
    after: "Customers order from my website, auto-notifications work",
    stat: "Zero order confusion since launch",
  },
  {
    initials: "SK",
    name: "Salim Khan, Hyderabad — Grocery Delivery",
    before: "No online presence, lost customers to BigBasket",
    after: "My regulars order from my own store, I pay zero commission",
    stat: "₹0 commission on every order",
  },
];

const demoContent: Record<
  DemoTab,
  {
    steps: string[];
    visual: JSX.Element;
  }
> = {
  "Add a Product": {
    steps: [
      'Click "Add Product" in your dashboard',
      "Upload product photos (up to 8 images)",
      "Set name, price, stock, and category",
      "Add variants (sizes, colors) if needed",
      'Toggle "WhatsApp order" on',
      "Hit Publish — live in seconds",
    ],
    visual: <ProductPhonePreview />,
  },
  "Manage Orders": {
    steps: [
      "Open the Orders dashboard in real time",
      "Review customer details and payment mode",
      "Confirm packing and delivery timeline",
      "Update status to Shipped or Delivered",
      "Send automatic customer notifications",
      "Track returns or repeat requests from one place",
    ],
    visual: <OrdersPhonePreview />,
  },
  "Accept Payment": {
    steps: [
      "Connect your UPI ID or payment gateway",
      "Enable Card, COD, and wallet methods",
      "Customers choose their preferred checkout flow",
      "Show payment confirmation instantly",
      "Receive order notifications in dashboard and WhatsApp",
      "Track every paid order in one ledger",
    ],
    visual: <PaymentPhonePreview />,
  },
  "Track Analytics": {
    steps: [
      "Open your analytics overview",
      "Check revenue, orders, and conversion trends",
      "Spot top-selling categories instantly",
      "Review abandoned carts and repeat buyers",
      "Compare campaign performance week over week",
      "Take action from one dashboard instead of multiple tools",
    ],
    visual: <AnalyticsPhonePreview />,
  },
};

export default function ECommercePage() {
  const [activeTab, setActiveTab] = useState<DemoTab>("Add a Product");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-page-enter bg-white text-slate-900">
      <section className="bg-[linear-gradient(135deg,#064E3B_0%,#065F46_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl space-y-8">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-emerald-700">
              E-Commerce Platform
            </span>
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-[52px]">
                India's Smartest E-Commerce Platform for Small Businesses
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-emerald-50">
                Sell products online with UPI payments, WhatsApp ordering, unlimited catalog, multi-variant products,
                and real-time order management — purpose-built for Indian merchants, not global audiences.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-emerald-700 transition-transform hover:-translate-y-0.5"
              >
                Launch My Store Free
              </Link>
              <Link
                to="/templates"
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/70 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                View All Templates
              </Link>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {["1 Cr+ Orders Processed", "UPI + COD + Card", "Zero Commission"].map((item) => (
                <div key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Why Indian merchants choose Oneos
            </h2>
            <p className="mt-4 text-lg text-slate-600">Built in India. Built for India.</p>
          </div>
          <div className="mt-12 overflow-hidden rounded-[24px] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-slate-50 px-6 py-5 text-left text-sm font-semibold text-slate-600">Feature</th>
                    <th className="bg-[#2563EB] px-6 py-5 text-left text-sm font-semibold text-white">Oneos 🇮🇳</th>
                    <th className="bg-slate-100 px-6 py-5 text-left text-sm font-semibold text-slate-600">Global Platforms</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.feature}</td>
                      <td className="bg-blue-50/70 px-6 py-4">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                            <CheckIcon />
                          </span>
                          <span>Included</span>
                        </div>
                      </td>
                      <td className="bg-slate-50/70 px-6 py-4">
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-rose-500">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-100">
                            <CloseIcon />
                          </span>
                          <span>{row.global}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">A complete e-commerce engine</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {ecommerceFeatures.map((feature) => (
              <div key={feature.title} className="rounded-[20px] bg-white p-6 shadow-sm">
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${feature.tint}`}>{feature.icon}</div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">See your store come to life</h2>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {(Object.keys(demoContent) as DemoTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`rounded-full px-5 py-3 text-sm font-semibold transition-colors ${
                  activeTab === tab ? "bg-[#2563EB] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="mt-12 grid gap-8 rounded-[28px] border border-slate-200 p-8 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <ol className="space-y-4">
                {demoContent[activeTab].steps.map((step, index) => (
                  <li key={step} className="flex gap-4 rounded-[18px] bg-[#F8FAFC] p-4">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <span className="pt-1 text-base text-slate-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="flex justify-center">{demoContent[activeTab].visual}</div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F1B35] py-20 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold sm:text-4xl">Pick the plan that fits your store</h2>
          </div>
          <div className="mt-14 grid gap-6 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[20px] bg-white p-7 text-slate-900 ${
                  plan.highlighted ? "border-2 border-[#2563EB] shadow-[0_28px_60px_rgba(37,99,235,0.16)]" : "border border-white/10"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold tracking-[0.22em] text-slate-500">{plan.name}</div>
                    <div className="mt-4 font-heading text-4xl font-bold text-slate-900">{plan.price}</div>
                  </div>
                  {plan.highlighted ? (
                    <span className="rounded-full bg-[#F97316] px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
                  ) : null}
                </div>
                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckIcon />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`mt-8 inline-flex h-12 w-full items-center justify-center rounded-full text-sm font-semibold transition-colors ${plan.ctaClassName}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">Real merchants. Real results.</h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {successStories.map((story) => (
              <div key={story.name} className="rounded-[22px] border-l-4 border-emerald-500 bg-white p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#2563EB,#60A5FA)] text-sm font-bold text-white">
                    {story.initials}
                  </div>
                  <div className="font-semibold text-slate-900">{story.name}</div>
                </div>
                <div className="mt-6 space-y-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Before</div>
                    <p className="mt-2 text-base leading-7 text-slate-600">{story.before}</p>
                  </div>
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">After</div>
                    <p className="mt-2 text-base leading-7 text-slate-600">{story.after}</p>
                  </div>
                </div>
                <div className="mt-6 font-heading text-3xl font-bold text-[#2563EB]">{story.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#064E3B_0%,#065F46_100%)] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold">Stop paying commission to marketplaces. Own your store.</h2>
          <p className="mt-4 text-lg text-emerald-50">Launch your e-commerce store free. No credit card. No setup fee.</p>
          <Link
            to="/signup"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#F97316] px-8 text-base font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Create My Free Store
          </Link>
          <p className="mt-5 text-sm text-emerald-100">Trusted by 10 lakh+ Indian merchants</p>
        </div>
      </section>
    </div>
  );
}

function ProductPhonePreview() {
  return (
    <PhoneFrame>
      <div className="space-y-4">
        <div className="rounded-[20px] bg-[#2563EB] p-4 text-white">
          <div className="text-xs uppercase tracking-[0.2em] text-blue-100">New Product</div>
          <div className="mt-3 h-7 w-32 rounded-full bg-white/80" />
        </div>
        <div className="rounded-[18px] bg-slate-100 p-4">
          <div className="grid grid-cols-2 gap-2">
            {[0, 1, 2, 3].map((item) => (
              <div key={item} className="h-16 rounded-2xl bg-white" />
            ))}
          </div>
        </div>
        <div className="space-y-3 rounded-[18px] bg-white p-4 shadow-sm">
          <div className="h-10 rounded-2xl bg-slate-100" />
          <div className="h-10 rounded-2xl bg-slate-100" />
          <div className="h-10 rounded-2xl bg-slate-100" />
          <div className="flex gap-2">
            <div className="h-10 flex-1 rounded-2xl bg-[#DBEAFE]" />
            <div className="h-10 flex-1 rounded-2xl bg-[#DCFCE7]" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function OrdersPhonePreview() {
  return (
    <PhoneFrame>
      <div className="space-y-3">
        {[
          { label: "New", tone: "bg-blue-100 text-blue-600" },
          { label: "Packed", tone: "bg-amber-100 text-amber-600" },
          { label: "Delivered", tone: "bg-emerald-100 text-emerald-600" },
        ].map((item, index) => (
          <div key={item.label} className="rounded-[18px] bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-24 rounded-full bg-slate-200" />
                <div className="mt-3 h-3 w-16 rounded-full bg-slate-100" />
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${item.tone}`}>{item.label}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="h-10 rounded-2xl bg-slate-100" />
              <div className={`h-10 rounded-2xl ${index === 0 ? "bg-[#DBEAFE]" : index === 1 ? "bg-[#FEF3C7]" : "bg-[#DCFCE7]"}`} />
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function PaymentPhonePreview() {
  return (
    <PhoneFrame>
      <div className="space-y-4">
        <div className="rounded-[20px] bg-[#ECFDF5] p-5">
          <div className="text-sm font-semibold text-emerald-700">UPI Payment</div>
          <div className="mt-4 flex justify-center">
            <div className="grid grid-cols-5 gap-1 rounded-[18px] bg-white p-3 shadow-sm">
              {Array.from({ length: 25 }).map((_, index) => (
                <div key={index} className={`h-4 w-4 rounded-sm ${index % 3 === 0 ? "bg-slate-900" : "bg-slate-200"}`} />
              ))}
            </div>
          </div>
        </div>
        <div className="rounded-[18px] bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 rounded-full bg-slate-200" />
            <div className="h-8 w-16 rounded-full bg-[#2563EB]" />
          </div>
          <div className="mt-4 space-y-3">
            <div className="h-10 rounded-2xl bg-slate-100" />
            <div className="h-10 rounded-2xl bg-slate-100" />
            <div className="h-10 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function AnalyticsPhonePreview() {
  return (
    <PhoneFrame>
      <div className="space-y-4">
        <div className="rounded-[20px] bg-[#EFF6FF] p-4">
          <div className="h-4 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 grid grid-cols-4 items-end gap-2">
            {[48, 68, 36, 82].map((height, index) => (
              <div key={index} className="rounded-t-2xl bg-[#2563EB]/80" style={{ height }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[18px] bg-white p-4 shadow-sm">
            <div className="h-3 w-16 rounded-full bg-slate-200" />
            <div className="mt-3 h-7 w-14 rounded-full bg-[#DBEAFE]" />
          </div>
          <div className="rounded-[18px] bg-white p-4 shadow-sm">
            <div className="h-3 w-16 rounded-full bg-slate-200" />
            <div className="mt-3 h-7 w-14 rounded-full bg-[#DCFCE7]" />
          </div>
        </div>
        <div className="rounded-[18px] bg-white p-4 shadow-sm">
          <div className="h-4 w-24 rounded-full bg-slate-200" />
          <div className="mt-4 space-y-3">
            <div className="h-8 rounded-2xl bg-slate-100" />
            <div className="h-8 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[360px] rounded-[34px] border-[10px] border-slate-950 bg-slate-950 p-3 shadow-[0_30px_70px_rgba(15,23,42,0.2)]">
      <div className="mx-auto h-6 w-28 rounded-b-2xl bg-slate-950" />
      <div className="rounded-[24px] bg-[#F8FAFC] p-4">{children}</div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="m4 10 4 4 8-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4">
      <path d="M6 6 14 14M14 6 6 14" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 8h12l-1 11a2 2 0 0 1-2 1.8H9A2 2 0 0 1 7 19L6 8Z" strokeLinejoin="round" />
      <path d="M9 9V7a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function VariantIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="7" cy="7" r="3.5" />
      <circle cx="17" cy="7" r="3.5" />
      <circle cx="7" cy="17" r="3.5" />
      <path d="M13.5 17h7" strokeLinecap="round" />
      <path d="M17 13.5v7" strokeLinecap="round" />
    </svg>
  );
}

function PaymentIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" strokeLinecap="round" />
      <path d="M7 15h3" strokeLinecap="round" />
    </svg>
  );
}

function OrdersIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4h12v16H6z" />
      <path d="M9 8h6M9 12h6M9 16h4" strokeLinecap="round" />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M17 8h-9a4 4 0 0 0 0 8h1" strokeLinecap="round" />
      <path d="m14 5 3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 16h9a4 4 0 1 0 0-8h-1" strokeLinecap="round" />
      <path d="m10 19-3-3 3-3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 16V5" strokeLinecap="round" />
      <path d="m8 9 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 19h14" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 19h16" strokeLinecap="round" />
      <path d="M7 16V9" strokeLinecap="round" />
      <path d="M12 16V5" strokeLinecap="round" />
      <path d="M17 16v-6" strokeLinecap="round" />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 7h11v9H3z" />
      <path d="M14 10h4l3 3v3h-7" strokeLinejoin="round" />
      <circle cx="7.5" cy="18" r="1.5" />
      <circle cx="18.5" cy="18" r="1.5" />
    </svg>
  );
}

