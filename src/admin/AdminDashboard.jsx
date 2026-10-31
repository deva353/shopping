
import { useState } from "react";

import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "./Admin.css";

function AdminDashboard({
  products,
  users,
  orders,
  onLogout,
  goHome
}) {
  const [activePage, setActivePage] = useState("dashboard");

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const totalProducts = products.length;
  const totalCustomers = users.length;
  const totalOrders = orders.length;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "blue"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "orange"
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      color: "green"
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "purple"
    }
  ];

  const recentOrders = [...orders].slice(0, 5);

  const renderContent = () => {
    if (activePage !== "dashboard") {
      const sectionNames = {
        products: "Product Management",
        orders: "Order Management",
        customers: "Customer Management",
        categories: "Category Management",
        reports: "Sales Reports"
      };

      return (
        <div className="admin-placeholder">
          <Package size={45} />
          <h2>{sectionNames[activePage]}</h2>
          <p>
            This management module will be developed in the
            next implementation step.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="admin-welcome">
          <div>
            <h2>Welcome to ShopZone Admin!</h2>
            <p>
              Here is an overview of your shopping business.
            </p>
          </div>

          <div className="welcome-icon">
            <TrendingUp size={35} />
          </div>
        </div>

        <div className="admin-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="admin-stat-card" key={stat.title}>
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={25} />
                </div>

                <div>
                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-dashboard-content">
          <div className="admin-orders-panel">
            <div className="panel-heading">
              <h2>Recent Orders</h2>
              <button
                onClick={() => setActivePage("orders")}
              >
                View All
              </button>
            </div>

            {recentOrders.length === 0 ? (
              <div className="admin-empty">
                <ShoppingBag size={40} />
                <p>No orders have been placed yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
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
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                          {order.customer?.name || "Customer"}
                        </td>
                        <td>
                          ₹{Number(order.total).toLocaleString("en-IN")}
                        </td>
                        <td>{order.date}</td>
                        <td>
                          <span className="status-badge">
                            <CheckCircle size={13} />
                            Placed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="admin-summary-panel">
            <h2>Business Summary</h2>

            <div className="summary-item">
              <Package size={20} />
              <div>
                <p>Available Products</p>
                <strong>{totalProducts}</strong>
              </div>
            </div>

            <div className="summary-item">
              <Users size={20} />
              <div>
                <p>Registered Customers</p>
                <strong>{totalCustomers}</strong>
              </div>
            </div>

            <div className="summary-item">
              <Clock size={20} />
              <div>
                <p>Orders Placed</p>
                <strong>{totalOrders}</strong>
              </div>
            </div>

            <div className="summary-item">
              <IndianRupee size={20} />
              <div>
                <p>Total Revenue</p>
                <strong>
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
        goHome={goHome}
      />

      <main className="admin-main">
        <AdminHeader activePage={activePage} />

        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
