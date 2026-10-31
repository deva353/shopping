
import { useState } from "react";
import { ShieldCheck } from "lucide-react";

function AdminLogin({ onAdminLogin, goHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      email.trim().toLowerCase() === "admin@shopzone.com" &&
      password === "Admin123"
    ) {
      setError("");
      onAdminLogin();
    } else {
      setError("Invalid administrator email or password.");
    }
  };

  return (
    <section className="admin-login-page">
      <div className="admin-login-card">
        <div className="admin-login-icon">
          <ShieldCheck size={45} />
        </div>

        <h1>ShopZone Admin</h1>
        <p>Sign in to manage your shopping website.</p>

        <form onSubmit={handleSubmit}>
          <label>Admin Email</label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="admin-error">{error}</p>}

          <button type="submit">
            Admin Login
          </button>
        </form>

        <div className="admin-demo-info">
          <p>Demo credentials</p>
          <p>Email: admin@shopzone.com</p>
          <p>Password: Admin123</p>
        </div>

        <button
          className="admin-back"
          onClick={goHome}
        >
          Back to Shopping Website
        </button>
      </div>
    </section>
  );
}

export default AdminLogin;
