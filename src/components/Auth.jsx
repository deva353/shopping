
import { useState } from "react";

function Auth({ users, setUsers, onLogin, goHome }) {
  const [isLogin, setIsLogin] = useState(true);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();

    if (isLogin) {
      const user = users.find(
        (item) =>
          item.email === email &&
          item.password === form.password
      );

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      onLogin(user);
      return;
    }

    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const alreadyExists = users.some(
      (item) => item.email === email
    );

    if (alreadyExists) {
      setError("An account with this email already exists.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: form.name.trim(),
      email,
      phone: form.phone,
      password: form.password
    };

    setUsers((previous) => [...previous, newUser]);

    onLogin(newUser);
  };

  return (
    <section className="auth-page">
      <div className="auth-card">
        <div className="auth-heading">
          <h1>{isLogin ? "Welcome Back!" : "Create Account"}</h1>

          <p>
            {isLogin
              ? "Login to continue shopping."
              : "Register to enjoy shopping with ShopZone."}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <label>Full Name</label>
              <input
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <label>Phone Number</label>
              <input
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={form.phone}
                onChange={handleChange}
                maxLength={10}
                required
              />
            </>
          )}

          <label>Email Address</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </>
          )}

          {error && (
            <p className="auth-error">{error}</p>
          )}

          <button className="auth-submit" type="submit">
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="auth-switch">
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        <button className="auth-back" onClick={goHome}>
          Back to Shopping
        </button>
      </div>
    </section>
  );
}

export default Auth;
