import { useState } from "react";
import { settingsSummary } from "../data/mockData";
import { Button, Card, Field, Input, ScreenFrame, SectionHeader, Select } from "../components/ui";
import { AdminShell, PageCanvas, StatusBadge } from "./shared";

export function SettingsSection() {
  const [storeName, setStoreName] = useState<string>(settingsSummary.storeName);
  const [logo, setLogo] = useState<string>(settingsSummary.logo);
  const [email, setEmail] = useState<string>("support@oneos.in");
  const [dispatchSla, setDispatchSla] = useState<string>("Within 24 hours");
  const [deliveryPromise, setDeliveryPromise] = useState<string>("2 to 5 business days");
  const [codEnabled, setCodEnabled] = useState(true);

  return (
    <PageCanvas>
      <section className="content-section">
        <SectionHeader
          eyebrow="Settings"
          title="Store setup screens with only the operational forms merchants need."
          body="Store information, Razorpay status, and shipping rules stay in one compact workspace with a clear save action."
        />
        <ScreenFrame title="Store Settings" route="/settings">
          <AdminShell
            activeId="settings"
            title="Settings"
            actions={
              <div className="stack-inline">
                <Button variant="outline">Preview Checkout</Button>
                <Button>Save Changes</Button>
              </div>
            }
          >
            <div className="dashboard-grid">
              <Card className="showroom-card">
                <div className="card-topline">
                  <div>
                    <strong>Store Info</strong>
                    <span>Name and branding basics</span>
                  </div>
                </div>
                <div className="form-stack">
                  <Field label="Store name">
                    <Input value={storeName} onChange={setStoreName} />
                  </Field>
                  <Field label="Logo">
                    <Input value={logo} onChange={setLogo} />
                  </Field>
                  <Field label="Support email">
                    <Input value={email} onChange={setEmail} />
                  </Field>
                </div>
              </Card>
              <Card className="showroom-card">
                <div className="card-topline">
                  <div>
                    <strong>Razorpay Setup</strong>
                    <span>Payments configuration</span>
                  </div>
                  <StatusBadge status={settingsSummary.razorpayStatus} />
                </div>
                <div className="info-list">
                  <div>
                    <span>Gateway</span>
                    <strong>Razorpay Standard</strong>
                  </div>
                  <div>
                    <span>Settlement cycle</span>
                    <strong>{settingsSummary.settlement}</strong>
                  </div>
                  <div>
                    <span>Cash on delivery</span>
                    <button
                      type="button"
                      className={`toggle${codEnabled ? " toggle--on" : ""}`}
                      onClick={() => setCodEnabled((current) => !current)}
                    />
                  </div>
                </div>
              </Card>
            </div>
            <Card className="showroom-card">
              <div className="card-topline">
                <div>
                  <strong>Shipping Settings</strong>
                  <span>Basic rates and delivery promises</span>
                </div>
              </div>
              <div className="dashboard-grid">
                <div className="info-list">
                  {settingsSummary.shipping.map((rule) => (
                    <div key={rule.label}>
                      <span>{rule.label}</span>
                      <strong>{rule.value}</strong>
                    </div>
                  ))}
                </div>
                <div className="form-stack">
                  <Field label="Dispatch SLA">
                    <Select
                      value={dispatchSla}
                      options={["Within 24 hours", "Within 48 hours", "Same day dispatch"]}
                      onChange={setDispatchSla}
                    />
                  </Field>
                  <Field label="Delivery promise">
                    <Select
                      value={deliveryPromise}
                      options={["2 to 5 business days", "3 to 7 business days", "Next day in metros"]}
                      onChange={setDeliveryPromise}
                    />
                  </Field>
                </div>
              </div>
            </Card>
            <div className="sticky-action-bar">
              <Button variant="outline" fullWidth>
                Cancel
              </Button>
              <Button fullWidth>Save Settings</Button>
            </div>
          </AdminShell>
        </ScreenFrame>
      </section>
    </PageCanvas>
  );
}

