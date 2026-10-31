
import { User, Mail, Phone, Package, LogOut } from "lucide-react";

function Account({ user, onLogout, openOrders }) {
  if (!user) return null;

  return (
    <section className="account-page">
      <div className="account-card">
        <div className="account-avatar">
          <User size={45} />
        </div>

        <h1>My Account</h1>
        <p>Welcome, {user.name}!</p>

        <div className="account-details">
          <div>
            <User size={20} />
            <span>{user.name}</span>
          </div>

          <div>
            <Mail size={20} />
            <span>{user.email}</span>
          </div>

          <div>
            <Phone size={20} />
            <span>{user.phone}</span>
          </div>
        </div>

        <button
          className="account-action"
          onClick={openOrders}
        >
          <Package size={19} />
          My Orders
        </button>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          <LogOut size={19} />
          Logout
        </button>
      </div>
    </section>
  );
}

export default Account;
