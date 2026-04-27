import { useState } from "react";
import { customerDetail, customers } from "../data/mockData";
import { Badge, Button, Card, Input, ScreenFrame, SectionHeader, Table } from "../components/ui";
import { AdminShell, PageCanvas, StatusBadge } from "./shared";

export function CustomersSection() {
  const [search, setSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<string>(customerDetail.name);

  const visibleCustomers = customers.filter((customer) => {
    const query = search.toLowerCase();

    return (
      customer.name.toLowerCase().includes(query) ||
      customer.phone.toLowerCase().includes(query) ||
      customer.city.toLowerCase().includes(query)
    );
  });

  return (
    <PageCanvas>
      <section className="content-section">
        <SectionHeader
          eyebrow="Customers"
          title="A light CRM view centered on contact history and repeat purchase behavior."
          body="The list stays searchable and compact. The detail screen focuses on contact info, recent orders, and a short internal note."
        />
        <ScreenFrame title="Customers" route="/customers">
          <AdminShell activeId="customers" title="Customers">
            <div className="dashboard-grid">
              <Card className="showroom-card">
                <div className="showroom-toolbar">
                  <Input placeholder="Search customer by name, phone, or city" value={search} onChange={setSearch} />
                </div>
                <Table
                  headers={["Customer", "Phone", "City", "Orders", "Last Order"]}
                  rows={visibleCustomers.map((customer) => [
                    <button
                      type="button"
                      className="caption-link"
                      onClick={() => setSelectedCustomer(customer.name)}
                    >
                      {customer.name}
                    </button>,
                    customer.phone,
                    customer.city,
                    `${customer.orders}`,
                    customer.lastOrder,
                  ])}
                />
              </Card>
              <Card className="showroom-card">
                <div className="card-topline">
                  <div>
                    <strong>{selectedCustomer}</strong>
                    <span>Simple CRM snapshot</span>
                  </div>
                  <Badge tone="primary">Repeat Buyer</Badge>
                </div>
                <div className="info-list">
                  <div>
                    <span>Phone</span>
                    <strong>{customerDetail.phone}</strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>{customerDetail.email}</strong>
                  </div>
                  <div>
                    <span>City</span>
                    <strong>{customerDetail.city}</strong>
                  </div>
                </div>
                <div className="divider" />
                <p className="showroom-note">{customerDetail.note}</p>
                <Button variant="outline">Send WhatsApp Update</Button>
              </Card>
            </div>
            <Card className="showroom-card">
              <div className="card-topline">
                <div>
                  <strong>Order History</strong>
                  <span>Most recent purchases</span>
                </div>
              </div>
              <Table
                headers={["Order", "Date", "Amount", "Status"]}
                rows={customerDetail.orderHistory.map((order) => [
                  order.id,
                  order.date,
                  order.amount,
                  <StatusBadge status={order.status} />,
                ])}
              />
            </Card>
          </AdminShell>
        </ScreenFrame>
      </section>
    </PageCanvas>
  );
}
