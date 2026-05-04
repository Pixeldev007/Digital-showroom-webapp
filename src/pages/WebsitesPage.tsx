import { useEffect } from "react";
import { Link } from "react-router-dom";

type FeatureCard = {
  title: string;
  body: string;
  icon: JSX.Element;
  tint: string;
};

type PricingPlan = {
  name: string;
  price: string;
  note: string;
  features: string[];
  cta: string;
  ctaClassName: string;
  highlighted?: boolean;
};

type IndustryKey =
  | "Clothing"
  | "Grocery"
  | "Restaurant"
  | "Pharmacy"
  | "Mobile Shop"
  | "Furniture"
  | "Beauty"
  | "Kirana Store";

type IndustryShowcase = {
  name: IndustryKey;
  templateName: string;
  keyFeature: string;
  description: string;
  previewClassName: string;
};

const howItWorksSteps = [
  {
    number: "01",
    title: "Pick Your Template",
    description:
      "Choose from 100+ industry-specific designs built for clothing, grocery, restaurants, pharmacies, and more.",
    icon: <GridIcon />,
  },
  {
    number: "02",
    title: "Customize Your Store",
    description:
      "Add your logo, products, brand colors, and WhatsApp number. No coding, no designers — just you and your vision.",
    icon: <BrushIcon />,
  },
  {
    number: "03",
    title: "Go Live & Start Selling",
    description:
      "Publish your store, share the link on WhatsApp and Instagram, and start receiving orders the same day.",
    icon: <RocketIcon />,
  },
];

const websiteFeatures: FeatureCard[] = [
  {
    title: "Shiprocket Management",
    body: "Manage shipping, tracking, and delivery workflows from one place with Shiprocket-ready operations.",
    tint: "bg-blue-50 text-[#2563EB]",
    icon: <GlobeIcon />,
  },
  {
    title: "UPI Payments",
    body: "Accept UPI, cards, and COD out of the box for Indian checkout expectations.",
    tint: "bg-orange-50 text-[#F97316]",
    icon: <PhoneIcon />,
  },
  {
    title: "Catalog Management",
    body: "Add unlimited products, banners, collections, and offers without technical help.",
    tint: "bg-emerald-50 text-emerald-600",
    icon: <ShieldIcon />,
  },
  {
    title: "Marketing",
    body: "Run campaigns, promote offers, and bring customers back with built-in marketing tools.",
    tint: "bg-sky-50 text-sky-600",
    icon: <BoltIcon />,
  },
  {
    title: "OrderFlow Management",
    body: "Track incoming orders, update statuses, and keep fulfillment moving without manual chaos.",
    tint: "bg-violet-50 text-violet-600",
    icon: <LayoutIcon />,
  },
  {
    title: "Analytics",
    body: "Track visits, orders, revenue, and top-performing products in real time.",
    tint: "bg-green-50 text-green-600",
    icon: <ChatIcon />,
  },
];

const pricingPlans: PricingPlan[] = [
  {
    name: "FREE",
    price: "₹0/month",
    note: "per month billed annually",
    features: [
      "10 products",
      "Oneos subdomain (yourstore.oneos.in)",
      "WhatsApp ordering",
      "Basic templates",
      "UPI payments",
    ],
    cta: "Get Started Free",
    ctaClassName: "border border-[#2563EB] text-[#2563EB] hover:bg-blue-50",
  },
  {
    name: "GROWTH",
    price: "₹499/month",
    note: "per month billed annually",
    features: [
      "Unlimited products",
      "Custom .in domain included",
      "All 100+ premium templates",
      "UPI + Card + COD payments",
      "Coupon & offer tools",
      "Basic analytics",
    ],
    cta: "Start Growth Plan",
    ctaClassName: "bg-[#2563EB] text-white hover:bg-[#1D4ED8]",
    highlighted: true,
  },
  {
    name: "PRO",
    price: "₹999/month",
    note: "per month billed annually",
    features: [
      "Everything in Growth",
      "Advanced analytics dashboard",
      "Facebook Pixel + Google Ads integration",
      "WhatsApp broadcast campaigns",
      "Priority support (dedicated manager)",
      "Multi-staff accounts (up to 5)",
    ],
    cta: "Start Pro Plan",
    ctaClassName: "bg-[#0F1B35] text-white hover:bg-[#162649]",
  },
];

const industryShowcases: Record<IndustryKey, IndustryShowcase> = {
  Clothing: {
    name: "Clothing",
    templateName: "Urban Edit Boutique",
    keyFeature: "Variant swatches + lookbook sections",
    description: "Made for boutiques that want elegant storytelling, fast size selection, and WhatsApp checkout.",
    previewClassName: "bg-[linear-gradient(135deg,#E0EAFF,#9CC0FF)]",
  },
  Grocery: {
    name: "Grocery",
    templateName: "Fresh Basket Daily",
    keyFeature: "Repeat-order shortcuts + delivery slots",
    description: "Designed for fast-moving daily essentials with category-first browsing and reorder speed.",
    previewClassName: "bg-[linear-gradient(135deg,#D6F5DC,#86EFAC)]",
  },
  Restaurant: {
    name: "Restaurant",
    templateName: "Spice Route Express",
    keyFeature: "Menu sections + WhatsApp ordering CTA",
    description: "A storefront that highlights combos, chef specials, and same-day delivery without app commissions.",
    previewClassName: "bg-[linear-gradient(135deg,#FFE3CC,#FDBA74)]",
  },
  Pharmacy: {
    name: "Pharmacy",
    templateName: "MedQuick Care",
    keyFeature: "Prescription upload + refill reminders",
    description: "Built for quick medicine discovery, trust-building badges, and repeat refill orders.",
    previewClassName: "bg-[linear-gradient(135deg,#DFFCF3,#6EE7B7)]",
  },
  "Mobile Shop": {
    name: "Mobile Shop",
    templateName: "Device Hub Pro",
    keyFeature: "Spec comparison + launch banners",
    description: "Perfect for showcasing phones, accessories, exchange offers, and EMI-ready deals.",
    previewClassName: "bg-[linear-gradient(135deg,#E0E7FF,#A5B4FC)]",
  },
  Furniture: {
    name: "Furniture",
    templateName: "Urban Nest Living",
    keyFeature: "Room-based collections + design storytelling",
    description: "Showcase catalogs beautifully with premium layouts that feel editorial and conversion-focused.",
    previewClassName: "bg-[linear-gradient(135deg,#FDE7D3,#FBBF24)]",
  },
  Beauty: {
    name: "Beauty",
    templateName: "Glow Ritual Studio",
    keyFeature: "Before-after sections + curated bundles",
    description: "A polished storefront for salons and beauty brands that rely on trust, visuals, and repeat buyers.",
    previewClassName: "bg-[linear-gradient(135deg,#FDE1EF,#F9A8D4)]",
  },
  "Kirana Store": {
    name: "Kirana Store",
    templateName: "Mohalla Kirana Go",
    keyFeature: "Quick reorder cards + local delivery highlights",
    description: "Purpose-built for neighborhood stores that want simple ordering and repeat customer retention.",
    previewClassName: "bg-[linear-gradient(135deg,#E7F7D7,#A3E635)]",
  },
};

const testimonials = [
  {
    initials: "PS",
    name: "Priya Sharma",
    meta: "Mumbai — Clothing Store",
    quote: "I launched my saree boutique in one afternoon. My WhatsApp orders doubled in the first week.",
  },
  {
    initials: "RK",
    name: "Ravi Kumar",
    meta: "Bengaluru — Electronics Shop",
    quote: "No IT team, no agency. I built my gadgets store myself and it looks completely professional.",
  },
  {
    initials: "SD",
    name: "Sunita Devi",
    meta: "Jaipur — Home Kitchen / Cloud Kitchen",
    quote: "My customers now order directly from my website. I don't need Swiggy to pay 30% commission anymore.",
  },
];

export default function WebsitesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const showcaseCards: IndustryKey[] = ["Clothing", "Grocery"];

  return (
    <div className="animate-page-enter bg-white text-slate-900">
      <section className="overflow-hidden bg-[linear-gradient(135deg,#0F1B35_0%,#1E3A5F_100%)] text-white">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:py-24">
          <div className="space-y-8">
            <span className="inline-flex rounded-full bg-[#F97316] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-orange-500/20">
              Website Builder
            </span>
            <div className="space-y-5">
              <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-[52px]">
                Build a Professional Website in Under 5 Minutes
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-300">
                Build your business online with a stunning website and seamless payment solutions — no code required.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                to="/signup"
                className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[#2563EB] transition-transform hover:-translate-y-0.5"
              >
                Start Building
              </Link>
              <button
                type="button"
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth", block: "start" })}
                className="inline-flex h-14 items-center justify-center rounded-full border border-white/70 px-7 text-base font-semibold text-white transition-colors hover:bg-white/10"
              >
                See How It Works
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-[#2563EB]/20 blur-3xl" />
            <div className="absolute -right-6 bottom-6 h-36 w-36 rounded-full bg-[#F97316]/25 blur-3xl" />
            <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#081120] p-4 shadow-[0_30px_80px_rgba(2,6,23,0.55)]">
              <div className="flex items-center gap-2 rounded-t-[22px] border border-white/5 bg-slate-900/90 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-rose-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <div className="ml-4 h-8 flex-1 rounded-full bg-white/5" />
              </div>
              <div className="rounded-b-[22px] bg-[linear-gradient(180deg,#0F172A_0%,#0B1324_100%)] p-5">
                <div className="rounded-[22px] bg-[linear-gradient(135deg,#2563EB,#60A5FA)] p-6">
                  <div className="h-3 w-24 rounded-full bg-white/35" />
                  <div className="mt-4 h-8 w-3/4 rounded-full bg-white/90" />
                  <div className="mt-3 h-4 w-2/3 rounded-full bg-white/50" />
                  <div className="mt-6 flex gap-3">
                    <div className="h-10 w-28 rounded-full bg-white" />
                    <div className="h-10 w-24 rounded-full bg-white/25" />
                  </div>
                </div>
                <div className="mt-5 grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-4 rounded-[20px] bg-white/5 p-4">
                    <div className="h-4 w-28 rounded-full bg-white/15" />
                    <div className="grid grid-cols-2 gap-3">
                      {[0, 1, 2, 3].map((item) => (
                        <div key={item} className="rounded-[18px] bg-white p-3">
                          <div className="h-20 rounded-[14px] bg-slate-100" />
                          <div className="mt-3 h-3 w-3/4 rounded-full bg-slate-200" />
                          <div className="mt-2 h-3 w-1/2 rounded-full bg-slate-100" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-4 rounded-[20px] bg-white/5 p-4">
                    <div className="h-4 w-24 rounded-full bg-white/15" />
                    <div className="rounded-[18px] bg-white p-4">
                      <div className="h-24 rounded-[14px] bg-[linear-gradient(135deg,#FDBA74,#FB7185)]" />
                      <div className="mt-4 h-3 w-5/6 rounded-full bg-slate-200" />
                      <div className="mt-2 h-3 w-2/3 rounded-full bg-slate-100" />
                    </div>
                    <div className="rounded-[18px] bg-white p-4">
                      <div className="h-10 rounded-2xl bg-slate-100" />
                      <div className="mt-3 h-10 rounded-2xl bg-[#DCFCE7]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
            <p className="mt-4 text-lg text-slate-600">From zero to live store in 3 simple steps</p>
          </div>
          <div className="relative mt-14">
            <div className="absolute left-[16.66%] right-[16.66%] top-16 hidden border-t-2 border-dashed border-slate-300 lg:block" />
            <div className="grid gap-6 lg:grid-cols-3">
              {howItWorksSteps.map((step) => (
                <div key={step.number} className="relative rounded-[14px] bg-white p-7 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
                  <span className="absolute left-6 top-5 inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-[#2563EB] px-3 text-sm font-bold text-white">
                    {step.number}
                  </span>
                  <div className="mt-10 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#2563EB]">
                    {step.icon}
                  </div>
                  <h3 className="mt-6 font-heading text-2xl font-bold text-slate-900">{step.title}</h3>
                  <p className="mt-4 text-base leading-7 text-slate-600">{step.description}</p>
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
              Everything your website needs, built in
            </h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {websiteFeatures.map((feature) => (
              <div
                key={feature.title}
                className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_48px_rgba(15,23,42,0.08)]"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-full ${feature.tint}`}>{feature.icon}</div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{feature.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#EFF6FF] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">Simple, honest pricing</h2>
            <p className="mt-4 text-lg text-slate-600">Start free. Upgrade when you're ready to grow.</p>
          </div>
          <div className="mt-14 grid gap-6 xl:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-[14px] bg-white p-7 shadow-sm ${
                  plan.highlighted ? "border-2 border-[#2563EB] shadow-[0_28px_60px_rgba(37,99,235,0.16)]" : "border border-slate-200"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-bold tracking-[0.22em] text-slate-500">{plan.name}</div>
                    <div className="mt-4 font-heading text-4xl font-bold text-slate-900">{plan.price}</div>
                    <p className="mt-2 text-sm text-slate-500">{plan.note}</p>
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
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Built for every type of Indian business
            </h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {showcaseCards.map((industryKey) => {
              const showcase = industryShowcases[industryKey];

              return (
                <div key={showcase.name} className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="font-heading text-2xl font-bold text-slate-900">{showcase.templateName}</h3>
                  <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Key Feature</p>
                  <p className="mt-2 text-base font-semibold text-slate-900">{showcase.keyFeature}</p>
                  <p className="mt-4 text-base leading-7 text-slate-600">{showcase.description}</p>
                  <div className={`mt-6 overflow-hidden rounded-[18px] p-4 ${showcase.previewClassName}`}>
                    <div className="rounded-[16px] bg-white/85 p-4 shadow-sm backdrop-blur">
                      <div className="h-28 rounded-[14px] bg-white/90" />
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {[0, 1, 2].map((item) => (
                          <div key={item} className="h-14 rounded-xl bg-white/95" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <Link to="/templates" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                    Use This Template
                    <ArrowRightIcon />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Trusted by Indian merchants across 500+ cities
            </h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <div key={item.name} className="rounded-[20px] bg-white p-7 shadow-sm">
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white ${
                      index === 0
                        ? "bg-[linear-gradient(135deg,#2563EB,#60A5FA)]"
                        : index === 1
                          ? "bg-[linear-gradient(135deg,#F97316,#FB923C)]"
                          : "bg-[linear-gradient(135deg,#0F766E,#14B8A6)]"
                    }`}
                  >
                    {item.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">{item.name}</div>
                    <div className="text-sm text-slate-500">{item.meta}</div>
                  </div>
                </div>
                <div className="mt-5 flex gap-1 text-amber-400">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <StarIcon key={star} />
                  ))}
                </div>
                <p className="mt-5 text-lg italic leading-8 text-slate-600">"{item.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F1B35] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold text-white sm:text-[40px]">
            Your business deserves a website. Start today — it's free.
          </h2>
          <p className="mt-5 text-lg text-blue-200">Join 10 lakh+ Indian merchants already selling online.</p>
          <Link
            to="/signup"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-[#F97316] px-8 text-base font-semibold text-white shadow-[0_18px_36px_rgba(249,115,22,0.28)] transition-transform hover:-translate-y-0.5"
          >
            Create My Free Store
          </Link>
        </div>
      </section>
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

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 10h12" strokeLinecap="round" />
      <path d="m10 4 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function BrushIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m14 4 6 6" strokeLinecap="round" />
      <path d="m4 20 5-1 10-10-4-4L5 15l-1 5Z" strokeLinejoin="round" />
      <path d="M4 20c1.5-.3 3-1.1 4.1-2.2" strokeLinecap="round" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 19c1.5-3.5 4.5-6.5 8-8l6-6c-4 0-7.6 1.6-10.4 4.4C5.8 12.2 4.2 15.8 4.2 20Z" strokeLinejoin="round" />
      <path d="M12 12 9 15" strokeLinecap="round" />
      <path d="M15 5c.8 1.8 1.2 3.8 1.1 5.8" strokeLinecap="round" />
      <path d="M5 19h4" strokeLinecap="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17" strokeLinecap="round" />
      <path d="M12 3.5c2.5 2.2 4 5.3 4 8.5s-1.5 6.3-4 8.5c-2.5-2.2-4-5.3-4-8.5s1.5-6.3 4-8.5Z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10 5.5h4" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3 5.5 5.5v5.2c0 4.1 2.6 7.8 6.5 9.3 3.9-1.5 6.5-5.2 6.5-9.3V5.5L12 3Z" />
      <path d="m9.5 11.5 2 2 3.5-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M13 2 5 13h5l-1 9 8-11h-5l1-9Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LayoutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <path d="M3 9.5h18" strokeLinecap="round" />
      <path d="M8.5 9.5V20" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 18.5 3.5 21V6.5A2.5 2.5 0 0 1 6 4h12a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 18 17H8.5L6 18.5Z" strokeLinejoin="round" />
      <path d="M8 9h8M8 13h5" strokeLinecap="round" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" fill="currentColor">
      <path d="m10 1.8 2.5 5.1 5.7.8-4.1 4 1 5.6L10 14.7 4.9 17.3l1-5.6-4.1-4 5.7-.8L10 1.8Z" />
    </svg>
  );
}

