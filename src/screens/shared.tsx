import type { ReactNode } from "react";
import { navigate } from "../app/router";
import { salesSeries, sectionNav } from "../data/mockData";
import { Badge, Button, Card, MiniPhone } from "../components/ui";

type Tone = "neutral" | "primary" | "success" | "warning";

function getStatusTone(status: string): Tone {
  if (status === "Delivered" || status === "Published" || status === "Connected" || status === "Active") {
    return "success";
  }

  if (status === "Pending" || status === "Low Stock" || status === "Scheduled") {
    return "warning";
  }

  if (status === "Shipped") {
    return "primary";
  }

  return "neutral";
}

export function StatusBadge({ status }: { status: string }) {
  return <Badge tone={getStatusTone(status)}>{status}</Badge>;
}

export function PageCanvas({ children }: { children: ReactNode }) {
  return <main className="showcase-main showroom-page">{children}</main>;
}

function AdminNav({ activeId }: { activeId: string }) {
  return (
    <nav className="admin-sidebar__nav">
      {sectionNav.map((item) => (
        <a
          key={item.id}
          href={item.path}
          className={`admin-nav-link${item.id === activeId ? " is-active" : ""}`}
          onClick={(event) => {
            event.preventDefault();
            navigate(item.path);
          }}
        >
          <span className="admin-nav-link__icon">{item.icon}</span>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

function MobileBottomNav({ activeId }: { activeId: string }) {
  return (
    <div className="mobile-bottom-nav">
      {sectionNav.map((item) => (
        <button
          key={item.id}
          type="button"
          className={item.id === activeId ? "is-active" : ""}
          onClick={() => navigate(item.path)}
        >
          <span className="mobile-bottom-nav__icon">{item.icon}</span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

export function AdminShell({
  activeId,
  title,
  actions,
  children,
}: {
  activeId: string;
  title: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="admin-shell showroom-admin-shell">
      <aside className="admin-sidebar">
        <div className="side-index__brand">
          <div className="brand-mark">DS</div>
          <div>
            <strong>Digital Showroom</strong>
            <span>digitalshowroom.in</span>
          </div>
        </div>
        <AdminNav activeId={activeId} />
        <Card className="upgrade-card">
          <strong>Live store status</strong>
          <p>Payments connected, shipping active, and mobile checkout ready.</p>
          <Button variant="secondary" fullWidth onClick={() => navigate("/storefront")}>
            View Storefront
          </Button>
        </Card>
      </aside>
      <div className="admin-main">
        <div className="admin-topbar">
          <div>
            <h4>{title}</h4>
            <span>Digital Showroom Store</span>
          </div>
          <div className="topbar-actions">
            <span className="icon-chip">2</span>
            <span className="icon-chip">INR</span>
            <div className="avatar-circle">AK</div>
          </div>
        </div>
        <div className="admin-content">
          {actions ? <div className="page-actions">{actions}</div> : null}
          {children}
        </div>
        <MobileBottomNav activeId={activeId} />
      </div>
    </div>
  );
}

export function SalesChart() {
  return (
    <Card className="showroom-card">
      <div className="card-topline">
        <div>
          <strong>Sales Trend</strong>
          <span>7-day revenue snapshot</span>
        </div>
        <Badge tone="primary">Simple chart</Badge>
      </div>
      <div className="sales-bars">
        {salesSeries.map((point) => (
          <div key={point.label} className="sales-bars__item">
            <div className="sales-bars__track">
              <div className="sales-bars__bar" style={{ height: `${point.value}%` }} />
            </div>
            <strong>{point.label}</strong>
          </div>
        ))}
      </div>
      <div className="showroom-inline-summary">
        <span>Peak day: Friday</span>
        <strong>Rs 58K collected</strong>
      </div>
    </Card>
  );
}

export function ProductCardPreview({
  name,
  price,
  tag,
}: {
  name: string;
  price: string;
  tag: string;
}) {
  return (
    <div className="product-tile showroom-product-card">
      <div className="product-tile__image" />
      <Badge tone="primary">{tag}</Badge>
      <strong>{name}</strong>
      <span>{price}</span>
    </div>
  );
}

export function StorefrontPreview({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="showroom-phone-panel">
      <span className="showroom-phone-panel__title">{title}</span>
      <MiniPhone>{children}</MiniPhone>
    </div>
  );
}
