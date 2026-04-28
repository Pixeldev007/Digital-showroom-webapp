import { useEffect } from "react";
import { Link } from "react-router-dom";

type MarketingBlock = {
  title: string;
  body: string;
  pills: string[];
  linkLabel?: string;
  linkTone?: string;
  reverse?: boolean;
  icon: JSX.Element;
  iconClassName: string;
};

const marketingBlocks: MarketingBlock[] = [
  {
    title: "Sell where India already chats — WhatsApp",
    body: "Share your store link on WhatsApp in one tap. Send broadcast messages to all your past customers about new products, offers, and restocks. No separate tool needed.",
    pills: ["Broadcast Campaigns", "Order Notifications", "WhatsApp Order Button", "Auto-Reply Setup"],
    linkLabel: "Set up WhatsApp",
    linkTone: "text-green-600",
    icon: <WhatsAppIcon />,
    iconClassName: "bg-green-100 text-green-600",
  },
  {
    title: "Drive repeat purchases with smart coupons",
    body: "Create percentage discounts, flat ₹ off codes, first-order deals, and BOGO offers in seconds. Set expiry dates, usage limits, and minimum order values.",
    pills: ["% Discount", "₹ Flat Off", "First Order Deal", "Usage Limits", "Expiry Dates"],
    linkLabel: "Create your first coupon",
    linkTone: "text-[#F97316]",
    reverse: true,
    icon: <CouponIcon />,
    iconClassName: "bg-orange-100 text-[#F97316]",
  },
  {
    title: "Connect Google Ads & Facebook Pixel instantly",
    body: "Add your Google Ads conversion tag and Facebook Pixel to your store in one click. Track purchases, build retargeting audiences, and run Shopping ads — all without touching code.",
    pills: ["Facebook Pixel", "Google Tag", "Conversion Tracking", "Retargeting Ready"],
    icon: <AdsIcon />,
    iconClassName: "bg-blue-100 text-[#2563EB]",
  },
  {
    title: "Get found on Google — without an SEO agency",
    body: "Edit meta titles, descriptions, and URLs for every page and product. Built-in sitemap generation and Google Search Console integration. Your store gets indexed fast.",
    pills: ["Meta Tags", "Custom URLs", "Auto Sitemap", "Search Console Ready"],
    reverse: true,
    icon: <SeoIcon />,
    iconClassName: "bg-sky-100 text-sky-600",
  },
];

const campaignCards = [
  {
    title: "Flash Sale Campaign",
    description: "Create a 24-hour countdown sale with a banner, coupon code, and WhatsApp broadcast.",
    accent: "border-[#2563EB]",
    iconClassName: "bg-blue-50 text-[#2563EB]",
  },
  {
    title: "New Arrival Announcement",
    description: "Add new products, toggle 'Featured', and send a broadcast to your customer list.",
    accent: "border-[#F97316]",
    iconClassName: "bg-orange-50 text-[#F97316]",
  },
  {
    title: "Festive Season Offer",
    description: "Set a site-wide discount banner for Diwali, Eid, or Pongal with a BOGO or flat ₹ off code.",
    accent: "border-emerald-500",
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
];

const comparisonRows = [
  { feature: "WhatsApp Order Button", free: true, growth: true, pro: true },
  { feature: "Coupon Codes", free: false, growth: true, pro: true },
  { feature: "WhatsApp Broadcast", free: false, growth: true, pro: true },
  { feature: "Facebook Pixel", free: false, growth: false, pro: true },
  { feature: "Google Ads Tag", free: false, growth: false, pro: true },
  { feature: "SEO Meta Tools", free: false, growth: true, pro: true },
  { feature: "Pop-up Lead Capture", free: false, growth: false, pro: true },
  { feature: "Exit-Intent Offers", free: false, growth: false, pro: true },
  { feature: "Advanced Analytics", free: false, growth: false, pro: true },
  { feature: "Dedicated Growth Manager", free: false, growth: false, pro: true },
];

export default function MarketingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-page-enter bg-white text-slate-900">
      <section className="bg-[linear-gradient(135deg,#F97316_0%,#EA580C_100%)] text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="max-w-4xl space-y-8">
            <span className="inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#EA580C] shadow-sm">
              Marketing Tools
            </span>
            <div className="space-y-5">
              <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-[52px]">
                Grow Your Sales With Built-In Marketing Tools
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-orange-50">
                WhatsApp campaigns, coupons, Google Ads, Facebook Pixel, SEO tools — everything you need to reach more
                customers, right inside your dashboard. No third-party tools needed.
              </p>
            </div>
            <button
              type="button"
              onClick={() => document.getElementById("marketing-features")?.scrollIntoView({ behavior: "smooth", block: "start" })}
              className="inline-flex h-14 items-center justify-center rounded-full bg-white px-7 text-base font-semibold text-[#EA580C] transition-transform hover:-translate-y-0.5"
            >
              Explore Marketing Features
            </button>
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {["₹0 Extra Cost", "WhatsApp Ready", "Works in 15 Minutes"].map((item) => (
                <div key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white backdrop-blur">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="marketing-features" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">Your complete marketing toolkit</h2>
          </div>
          <div className="mt-16 space-y-10">
            {marketingBlocks.map((block) => (
              <div
                key={block.title}
                className={`grid gap-8 rounded-[28px] border border-slate-200 p-8 shadow-sm lg:grid-cols-2 lg:items-center ${
                  block.reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
                }`}
              >
                <div className="space-y-6">
                  <div className={`flex h-20 w-20 items-center justify-center rounded-full ${block.iconClassName}`}>{block.icon}</div>
                  <div className="space-y-4">
                    <h3 className="font-heading text-3xl font-bold text-slate-900">{block.title}</h3>
                    <p className="text-lg leading-8 text-slate-600">{block.body}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {block.pills.map((pill) => (
                      <span key={pill} className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
                        {pill}
                      </span>
                    ))}
                  </div>
                  {block.linkLabel ? (
                    <Link to="/signup" className={`inline-flex items-center gap-2 text-sm font-semibold ${block.linkTone ?? "text-[#2563EB]"}`}>
                      {block.linkLabel}
                      <ArrowRightIcon />
                    </Link>
                  ) : null}
                </div>
                <div className="rounded-[24px] bg-[#F8FAFC] p-6">
                  <div className="rounded-[22px] bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-12 w-12 items-center justify-center rounded-full ${block.iconClassName}`}>{block.icon}</div>
                      <div className="h-4 w-32 rounded-full bg-slate-200" />
                    </div>
                    <div className="mt-6 space-y-4">
                      <div className="h-20 rounded-[18px] bg-slate-100" />
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="h-16 rounded-[18px] bg-slate-50" />
                        <div className="h-16 rounded-[18px] bg-slate-50" />
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {block.pills.slice(0, 3).map((pill) => (
                          <div key={pill} className="h-10 rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-500">
                            {pill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0F1B35] py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            { value: "3x", label: "More orders via WhatsApp marketing" },
            { value: "40%", label: "Higher AOV with coupon strategies" },
            { value: "2x", label: "Return visits with retargeting ads" },
            { value: "500+", label: "Cities reached by our merchant network" },
          ].map((item) => (
            <div key={item.label}>
              <div className="font-heading text-5xl font-bold text-[#60A5FA]">{item.value}</div>
              <p className="mt-3 text-base text-slate-300">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">
              Launch any campaign in under 2 minutes
            </h2>
          </div>
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {campaignCards.map((campaign) => (
              <div key={campaign.title} className={`rounded-[22px] border-l-4 ${campaign.accent} bg-white p-6 shadow-sm`}>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${campaign.iconClassName}`}>
                  <CampaignIcon />
                </div>
                <h3 className="mt-5 font-heading text-2xl font-bold text-slate-900">{campaign.title}</h3>
                <p className="mt-3 text-base leading-7 text-slate-600">{campaign.description}</p>
                <div className="mt-5 inline-flex rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                  Difficulty: Easy
                </div>
                <Link to="/signup" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB]">
                  Try This
                  <ArrowRightIcon />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <h2 className="font-heading text-3xl font-bold text-slate-900 sm:text-4xl">Marketing features by plan</h2>
            </div>
            <Link
              to="/signup"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[#2563EB] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1D4ED8]"
            >
              Upgrade your plan
            </Link>
          </div>
          <div className="mt-10 overflow-hidden rounded-[24px] border border-slate-200">
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse bg-white text-left">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Feature</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Free</th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">
                      <div className="flex items-center gap-3">
                        <span>Growth</span>
                        <span className="rounded-full bg-[#F97316] px-3 py-1 text-xs font-semibold text-white">Most Popular</span>
                      </div>
                    </th>
                    <th className="px-6 py-4 text-sm font-semibold text-slate-600">Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, index) => (
                    <tr key={row.feature} className={index % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-900">{row.feature}</td>
                      <td className="px-6 py-4">
                        <PlanMark active={row.free} />
                      </td>
                      <td className="px-6 py-4">
                        <PlanMark active={row.growth} />
                      </td>
                      <td className="px-6 py-4">
                        <PlanMark active={row.pro} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#FB923C_0%,#EA580C_100%)] py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold">Ready to grow your customer base?</h2>
          <p className="mt-4 text-lg text-orange-50">
            Start with free tools. Unlock the full suite when you're ready.
          </p>
          <Link
            to="/signup"
            className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-white px-8 text-base font-semibold text-[#EA580C] transition-transform hover:-translate-y-0.5"
          >
            Start Free — No Credit Card Needed
          </Link>
        </div>
      </section>
    </div>
  );
}

function PlanMark({ active }: { active: boolean }) {
  return active ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
      <CheckIcon />
    </span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-slate-400">—</span>
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

function CampaignIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 10h3l9-4v12l-9-4H5a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
      <path d="m9 14 1.5 5" strokeLinecap="round" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3.5a8.5 8.5 0 0 0-7.3 12.8L3.5 21l4.8-1.2A8.5 8.5 0 1 0 12 3.5Z" strokeLinejoin="round" />
      <path d="M9 8.5c.3 2.1 2.3 4.2 4.4 4.5l1.1-1.1c.3-.3.8-.4 1.2-.2l1.6.7c.5.2.8.7.7 1.2-.2 1.4-1.4 2.4-2.8 2.3-4.6-.3-8.3-4-8.6-8.6-.1-1.4.9-2.6 2.3-2.8.5-.1 1 .2 1.2.7l.7 1.6c.2.4.1.9-.2 1.2L9 8.5Z" strokeLinejoin="round" />
    </svg>
  );
}

function CouponIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8.5V6a2 2 0 0 1 2-2h12l2 2v3a2.5 2.5 0 0 0 0 5v3.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V15a2.5 2.5 0 0 0 0-5Z" strokeLinejoin="round" />
      <path d="m9 9 6 6M15 9h0M9 15h0" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AdsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M8 5.5A3.5 3.5 0 1 0 8 12.5A3.5 3.5 0 1 0 8 5.5Z" />
      <path d="M16 11.5A3.5 3.5 0 1 0 16 18.5A3.5 3.5 0 1 0 16 11.5Z" />
      <path d="M10.4 8.2 14 14" strokeLinecap="round" />
      <path d="M17.5 5.5h3v3" strokeLinecap="round" />
      <path d="M20.5 5.5 14 12" strokeLinecap="round" />
    </svg>
  );
}

function SeoIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="10.5" cy="10.5" r="5.5" />
      <path d="m15 15 5 5" strokeLinecap="round" />
      <path d="M8.5 10.5h4M10.5 8.5v4" strokeLinecap="round" />
    </svg>
  );
}
