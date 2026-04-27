import { useState } from "react";
import { orderDetail, orders } from "../data/mockData";
import { Button, Card, Input, ScreenFrame, SectionHeader, Table } from "../components/ui";
import { AdminShell, PageCanvas, StatusBadge } from "./shared";

export function OrdersSection() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [detailStatus, setDetailStatus] = useState("Shipped");

  const visibleOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.customer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "All" ? true : order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <PageCanvas>
      <section className="content-section">
        <SectionHeader
          eyebrow="Orders"
          title="Order handling built around status clarity and fast updates."
          body="The list stays minimal with status filters, and the detail screen combines customer context, purchased items, and tracking events in one place."
        />
        <ScreenFrame title="Orders" route="/orders">
          <AdminShell activeId="orders" title="Orders">
            <div className="dashboard-grid">
              <Card className="showroom-card">
                <div className="showroom-toolbar">
                  <Input placeholder="Search order ID or customer" value={search} onChange={setSearch} />
                  <div className="filter-row">
                    {["All", "Pending", "Shipped", "Delivered"].map((status) => (
                      <button
                        key={status}
                        type="button"
                        className={`chip${statusFilter === status ? " chip--active" : ""}`}
                        onClick={() => setStatusFilter(status)}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
                <Table
                  headers={["Order", "Customer", "Date", "Amount", "Status"]}
                  rows={visibleOrders.map((order) => [
                    <button type="button" className="caption-link" onClick={() => setDetailStatus(order.status)}>
                      {order.id}
                    </button>,
                    order.customer,
                    order.date,
                    order.amount,
                    <StatusBadge status={order.status} />,
                  ])}
                />
              </Card>
              <Card className="showroom-card">
                <div className="card-topline">
                  <div>
                    <strong>{orderDetail.id}</strong>
                    <span>{orderDetail.payment}</span>
                  </div>
                  <StatusBadge status={detailStatus} />
                </div>
                <div className="info-list">
                  <div>
                    <span>Customer</span>
                    <strong>{orderDetail.customer}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{orderDetail.phone}</strong>
                  </div>
                  <div>
                    <span>Address</span>
                    <strong>{orderDetail.address}</strong>
                  </div>
                </div>
                <div className="stack-inline showroom-status-actions">
                  {["Pending", "Shipped", "Delivered"].map((status) => (
                    <Button
                      key={status}
                      variant={detailStatus === status ? "secondary" : "outline"}
                      onClick={() => setDetailStatus(status)}
                    >
                      {status}
                    </Button>
                  ))}
                </div>
                <div className="timeline">
                  {orderDetail.timeline.map((step, index) => (
                    <div
                      key={step.label}
                      className={`timeline__item${
                        index < (detailStatus === "Pending" ? 1 : detailStatus === "Shipped" ? 3 : 4)
                          ? " timeline__item--done"
                          : index === (detailStatus === "Pending" ? 1 : detailStatus === "Shipped" ? 3 : 4)
                            ? " timeline__item--active"
                            : ""
                      }`}
                    >
                      {step.label}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <Card className="showroom-card">
              <div className="card-topline">
                <div>
                  <strong>Product Summary</strong>
                  <span>Purchased items and variant details</span>
                </div>
                <Button variant="outline">Print Invoice</Button>
              </div>
              <div className="showroom-order-items">
                {orderDetail.items.map((item) => (
                  <div key={item.name} className="order-item">
                    <div className="order-item__thumb" />
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.variant}</span>
                    </div>
                    <div className="showroom-order-amount">
                      <span>{item.qty}</span>
                      <strong>{item.amount}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </AdminShell>
        </ScreenFrame>
      </section>
    </PageCanvas>
  );
}
