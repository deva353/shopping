
import { Bell, ShieldCheck } from "lucide-react";

function AdminHeader({ activePage }) {
  const pageNames = {
    dashboard: "Dashboard Overview",
    products: "Product Management",
    orders: "Order Management",
    customers: "Customer Management",
    categories: "Category Management",
    reports: "Sales Reports"
  };

  return (
    <header className="admin-header">
      <div>
        <h2>{pageNames[activePage] || "Admin Dashboard"}</h2>
        <p>Manage your ShopZone business</p>
      </div>

      <div className="admin-header-user">
        <Bell size={21} />
        <div className="admin-user-avatar">
          <ShieldCheck size={21} />
        </div>
        <span>Administrator</span>
      </div>
    </header>
  );
}

export default AdminHeader;
