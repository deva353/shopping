
import { useState } from "react";
import { MapPin, CreditCard } from "lucide-react";

function Checkout({ cart, onPlaceOrder, goBack }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD"
  });

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      alert("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.pincode)) {
      alert("Enter a valid 6-digit PIN code.");
      return;
    }

    onPlaceOrder(form);
  };

  if (cart.length === 0) {
    return (
      <section className="checkout-page">
        <h2>Your cart is empty.</h2>
        <button onClick={goBack}>Continue Shopping</button>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <h1>Checkout</h1>

      <div className="checkout-layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit}
        >
          <h2>
            <MapPin size={20} />
            Delivery Address
          </h2>

          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="10-digit Mobile Number"
            value={form.phone}
            onChange={handleChange}
            inputMode="numeric"
            maxLength={10}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="address"
            placeholder="House number, street, area"
            value={form.address}
            onChange={handleChange}
            required
          />

          <div className="checkout-row">
            <input
              name="city"
              placeholder="City"
              value={form.city}
              onChange={handleChange}
              required
            />

            <input
              name="pincode"
              placeholder="PIN Code"
              value={form.pincode}
              onChange={handleChange}
              inputMode="numeric"
              maxLength={6}
              required
            />
          </div>

          <h2>
            <CreditCard size={20} />
            Payment Method
          </h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={form.payment === "COD"}
              onChange={handleChange}
            />
            Cash on Delivery
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="ONLINE"
              checked={form.payment === "ONLINE"}
              onChange={handleChange}
            />
            Online Payment (Demo only)
          </label>

          <button className="checkout-button" type="submit">
            Confirm Order
          </button>
        </form>

        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}
              <strong>
                ₹{(item.price * item.quantity).toLocaleString("en-IN")}
              </strong>
            </p>
          ))}

          <hr />

          <h3>
            Total Amount
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default Checkout;
