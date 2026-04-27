import { useState } from "react";
import { navigate } from "../app/router";
import "../dashboard-new.css";
import { recentOrders } from "../data/mockData";

// Inline SVG Icons for a premium feel
const Icons = {
  Dashboard: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  Products: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
  Orders: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
  Customers: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Marketing: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>,
  Storefront: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  Settings: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  Search: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  Bell: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  Menu: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>,
  Plus: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>,
  Eye: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  Link: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>,
  TrendingUp: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
  DollarSign: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  Users: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  ShoppingBag: () => <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: <Icons.Dashboard />, path: "/dashboard" },
  { id: "products", label: "Products", icon: <Icons.Products />, path: "/products" },
  { id: "orders", label: "Orders", icon: <Icons.Orders />, path: "/orders" },
  { id: "customers", label: "Customers", icon: <Icons.Customers />, path: "/customers" },
  { id: "marketing", label: "Marketing", icon: <Icons.Marketing />, path: "/marketing" },
  { id: "storefront", label: "Storefront", icon: <Icons.Storefront />, path: "/storefront" },
  { id: "settings", label: "Settings", icon: <Icons.Settings />, path: "/settings" },
];

export function DashboardSection() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState("7d");

  // Chart dummy data calculation
  const chartBars = Array.from({ length: chartPeriod === "7d" ? 7 : chartPeriod === "30d" ? 15 : 12 }).map((_, i) => ({
    label: chartPeriod === "7d" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i] : `P${i + 1}`,
    value: 30 + Math.random() * 60
  }));

  // Helper to format badges safely
  const getBadgeClass = (status: string) => {
    switch(status) {
      case "Delivered":
      case "Shipped": return "success";
      case "Pending": return "warning";
      default: return "primary";
    }
  };

  return (
    <div className="nd-layout">
      {/* Sidebar */}
      <aside className={`nd-sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="nd-sidebar-header">
          <div className="nd-sidebar-brand">D</div>
          <span>DigitalStore</span>
        </div>
        <div className="nd-sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={`nd-nav-item ${item.id === "dashboard" ? "active" : ""}`}
              onClick={() => {
                if(item.id !== "dashboard") {
                  navigate(item.path as any);
                }
              }}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="nd-main">
        {/* Header */}
        <header className="nd-header">
          <div className="nd-header-title">
            <button className="nd-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <Icons.Menu />
            </button>
            Dashboard Overview
          </div>
          <div className="nd-search">
            <Icons.Search />
            <input type="text" placeholder="Search orders, customers, products..." />
          </div>
          <div className="nd-header-actions">
            <button className="nd-icon-btn">
              <Icons.Bell />
              <span className="badge"></span>
            </button>
            <div className="nd-avatar">AK</div>
          </div>
        </header>

        {/* Scrollable Container */}
        <div className="nd-container">
          
          {/* KPI Row */}
          <div className="nd-kpi-grid">
            <div className="nd-card nd-kpi-card">
              <div className="nd-kpi-header">
                <span className="nd-kpi-label">Total Revenue</span>
                <div className="nd-kpi-icon"><Icons.DollarSign /></div>
              </div>
              <div className="nd-kpi-value">₹1,24,500</div>
              <div className="nd-kpi-subtext positive">
                <Icons.TrendingUp /> +14.5% from last month
              </div>
            </div>
            
            <div className="nd-card nd-kpi-card">
              <div className="nd-kpi-header">
                <span className="nd-kpi-label">Total Orders</span>
                <div className="nd-kpi-icon"><Icons.ShoppingBag /></div>
              </div>
              <div className="nd-kpi-value">428</div>
              <div className="nd-kpi-subtext positive">
                <Icons.TrendingUp /> +8.2% from last month
              </div>
            </div>

            <div className="nd-card nd-kpi-card">
              <div className="nd-kpi-header">
                <span className="nd-kpi-label">Total Customers</span>
                <div className="nd-kpi-icon"><Icons.Users /></div>
              </div>
              <div className="nd-kpi-value">1,584</div>
              <div className="nd-kpi-subtext positive">
                <Icons.TrendingUp /> +24% from last month
              </div>
            </div>

            <div className="nd-card nd-kpi-card">
              <div className="nd-kpi-header">
                <span className="nd-kpi-label">Conversion Rate</span>
                <div className="nd-kpi-icon"><Icons.Dashboard /></div>
              </div>
              <div className="nd-kpi-value">4.8%</div>
              <div className="nd-kpi-subtext neutral">
                <Icons.TrendingUp /> Steady performance
              </div>
            </div>
          </div>

          {/* Quick Actions & Chart */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            {/* Chart Section */}
            <div className="nd-card" style={{ flex: 2, minWidth: '0' }}>
              <div className="nd-section-header">
                <div>
                  <h2 className="nd-section-title">Sales Analytics</h2>
                  <div className="nd-section-subtitle">Revenue over time</div>
                </div>
                <div className="nd-filter-group">
                  {['7d', '30d', '90d'].map(p => (
                    <button 
                      key={p} 
                      className={`nd-filter-btn ${chartPeriod === p ? 'active' : ''}`}
                      onClick={() => setChartPeriod(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="nd-chart-container">
                {chartBars.map((bar, i) => (
                  <div key={i} className="nd-chart-bar-group">
                    <div className="nd-chart-bar-wrap">
                      <div className="nd-chart-bar" style={{ height: `${bar.value}%` }} />
                    </div>
                    <span className="nd-chart-label">{bar.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="nd-card" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="nd-section-header" style={{ marginBottom: '8px' }}>
                <h2 className="nd-section-title">Quick Actions</h2>
              </div>
              
              <div className="nd-action-card">
                <div className="nd-action-icon"><Icons.Plus /></div>
                <div className="nd-action-text">
                  <span className="nd-action-title">Add Product</span>
                  <span className="nd-action-desc">Update live catalog</span>
                </div>
              </div>
              
              <div className="nd-action-card">
                <div className="nd-action-icon"><Icons.Eye /></div>
                <div className="nd-action-text">
                  <span className="nd-action-title">View Orders</span>
                  <span className="nd-action-desc">Manage fulfillments</span>
                </div>
              </div>

              <div className="nd-action-card">
                <div className="nd-action-icon"><Icons.Link /></div>
                <div className="nd-action-text">
                  <span className="nd-action-title">Go to Storefront</span>
                  <span className="nd-action-desc">Preview live website</span>
                </div>
              </div>

            </div>
          </div>

          {/* Recent Orders Table */}
          <div className="nd-card">
            <div className="nd-section-header">
              <div>
                <h2 className="nd-section-title">Recent Orders</h2>
                <div className="nd-section-subtitle">Latest transactions across your store</div>
              </div>
              <button className="nd-btn nd-btn-outline">View All Orders</button>
            </div>
            
            <div className="nd-table-wrapper">
              <table className="nd-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.slice(0, 5).map((order) => (
                    <tr key={order.id}>
                      <td style={{ fontWeight: 600 }}>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.amount}</td>
                      <td style={{ color: 'var(--nd-text-muted)' }}>Today</td>
                      <td>
                        <span className={`nd-badge ${getBadgeClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
