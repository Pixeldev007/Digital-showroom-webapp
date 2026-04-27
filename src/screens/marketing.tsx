import { useState } from "react";
import { coupons, popupOffer } from "../data/mockData";
import {
  Badge,
  Button,
  Card,
  Field,
  Input,
  ScreenFrame,
  SectionHeader,
  Select,
  Table,
  TextArea,
} from "../components/ui";
import { AdminShell, PageCanvas, StatusBadge } from "./shared";

export function MarketingSection() {
  const [mode, setMode] = useState<"coupons" | "popup">("coupons");
  const [couponCode, setCouponCode] = useState<string>("WELCOME10");
  const [discount, setDiscount] = useState<string>("10% off first order");
  const [minimumCart, setMinimumCart] = useState<string>("Rs 999");
  const [expiry, setExpiry] = useState<string>("30 Apr 2026");
  const [headline, setHeadline] = useState<string>(popupOffer.title);
  const [description, setDescription] = useState<string>(popupOffer.description);
  const [trigger, setTrigger] = useState<string>(popupOffer.trigger);
  const [cta, setCta] = useState<string>(popupOffer.cta);

  return (
    <PageCanvas>
      <section className="content-section">
        <SectionHeader
          eyebrow="Marketing"
          title="Minimal retention tools: coupons and one clean storefront offer."
          body="There is no campaign builder here. Merchants get a straightforward coupon form and a lightweight popup workflow that stays easy to maintain."
        />
        <ScreenFrame title={mode === "coupons" ? "Coupons" : "Offer Popup"} route="/marketing">
          <AdminShell
            activeId="marketing"
            title="Marketing"
            actions={
              <div className="stack-inline">
                <Button variant={mode === "coupons" ? "secondary" : "outline"} onClick={() => setMode("coupons")}>
                  Coupons
                </Button>
                <Button variant={mode === "popup" ? "secondary" : "outline"} onClick={() => setMode("popup")}>
                  Popup Offer
                </Button>
              </div>
            }
          >
            {mode === "coupons" ? (
              <div className="editor-layout">
                <Card className="showroom-card">
                  <div className="card-topline">
                    <div>
                      <strong>Create Coupon</strong>
                      <span>Fast setup for basic offers</span>
                    </div>
                  </div>
                  <div className="form-stack">
                    <Field label="Coupon code">
                      <Input value={couponCode} onChange={setCouponCode} />
                    </Field>
                    <Field label="Discount type">
                      <Select
                        value={discount}
                        options={["10% off first order", "Rs 250 off", "Free shipping"]}
                        onChange={setDiscount}
                      />
                    </Field>
                    <Field label="Minimum cart value">
                      <Input value={minimumCart} onChange={setMinimumCart} />
                    </Field>
                    <Field label="Expiry date">
                      <Select
                        value={expiry}
                        options={["30 Apr 2026", "10 May 2026", "31 May 2026"]}
                        onChange={setExpiry}
                      />
                    </Field>
                  </div>
                  <div className="sticky-action-bar sticky-action-bar--column">
                    <Button fullWidth>Create Coupon</Button>
                  </div>
                </Card>
                <Card className="showroom-card">
                  <div className="card-topline">
                    <div>
                      <strong>Active Coupons</strong>
                      <span>Operational list for live offers</span>
                    </div>
                  </div>
                  <Table
                    headers={["Code", "Discount", "Expiry", "Status"]}
                    rows={coupons.map((coupon) => [
                      coupon.code,
                      coupon.discount,
                      coupon.expiry,
                      <StatusBadge status={coupon.status} />,
                    ])}
                  />
                  <div className="toast toast--success">
                    Ready to create {couponCode} with {discount.toLowerCase()}.
                  </div>
                </Card>
              </div>
            ) : (
              <div className="editor-layout">
                <Card className="showroom-card">
                  <div className="card-topline">
                    <div>
                      <strong>Popup Settings</strong>
                      <span>One lightweight storefront offer</span>
                    </div>
                  </div>
                  <div className="form-stack">
                    <Field label="Headline">
                      <Input value={headline} onChange={setHeadline} />
                    </Field>
                    <Field label="Description">
                      <TextArea value={description} onChange={setDescription} />
                    </Field>
                    <Field label="Trigger">
                      <Select
                        value={trigger}
                        options={["Homepage delay", "Exit intent", "After first scroll"]}
                        onChange={setTrigger}
                      />
                    </Field>
                    <Field label="CTA label">
                      <Input value={cta} onChange={setCta} />
                    </Field>
                  </div>
                </Card>
                <div className="screen-stack">
                  <div className="promo-popup">
                    <Badge tone="primary">Storefront popup</Badge>
                    <h3>{headline}</h3>
                    <p>{description}</p>
                    <Button fullWidth>{cta}</Button>
                  </div>
                  <Card className="showroom-card">
                    <div className="card-topline">
                      <div>
                        <strong>Offer Rules</strong>
                        <span>{trigger}</span>
                      </div>
                    </div>
                    <div className="info-list">
                      <div>
                        <span>Trigger page</span>
                        <strong>Homepage only</strong>
                      </div>
                      <div>
                        <span>Audience</span>
                        <strong>First-time visitors</strong>
                      </div>
                      <div>
                        <span>Dismiss behavior</span>
                        <strong>Hide for 24 hours</strong>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </AdminShell>
        </ScreenFrame>
      </section>
    </PageCanvas>
  );
}
