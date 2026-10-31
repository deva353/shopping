
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Boxes,
  Home,
  LogOut
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "customers", label: "Customers", icon: Users },
  { id: "categories", label: "Categories", icon: Boxes },
  { id: "reports", label: "Sales Reports", icon: BarChart3 }
];

function AdminSidebar({
  activePage,
  setActivePage,
  onLogout,
  goHome
}) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <h2>Shop<span>Zone</span></h2>
        <p>ADMIN PANEL</p>
      </div>

      <nav className="admin-menu">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              className={
                activePage === item.id ? "admin-menu-active" : ""
              }
              onClick={() => setActivePage(item.id)}
            >
              <Icon size={19} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="admin-sidebar-bottom">
        <button onClick={goHome}>
          <Home size={19} />
          Shopping Website
        </button>

        <button onClick={onLogout}>
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
