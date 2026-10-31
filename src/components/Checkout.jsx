
import { useState } from "react";
import { MapPin, CreditCard } from "lucide-react";

function Checkout({ cart, settings, onPlaceOrder, goBack }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    payment: "COD",
  });

  // Calculate cart subtotal
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Calculate delivery charge
  const freeDeliveryMinimum = Number(
    settings?.freeDeliveryMinimum ?? 1000
  );

  const standardDeliveryCharge = Number(
    settings?.deliveryCharge ?? 50
  );

  const deliveryCharge =
    subtotal >= freeDeliveryMinimum
      ? 0
      : standardDeliveryCharge;

  // Calculate final amount
  const finalTotal = subtotal + deliveryCharge;

  // Handle form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Handle order submission
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

    // Send customer details and final amount to App.jsx
    onPlaceOrder(form, finalTotal);
  };

  // Empty cart check
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
        {/* Delivery Address and Payment Form */}
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
            type="tel"
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
            Online Payment
          </label>

          <button
            className="checkout-button"
            type="submit"
          >
            Confirm Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="checkout-summary">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <p key={item.id}>
              {item.name} × {item.quantity}

              <strong>
                ₹
                {(item.price * item.quantity).toLocaleString(
                  "en-IN"
                )}
              </strong>
            </p>
          ))}

          <hr />

          <p>
            Subtotal

            <strong>
              ₹{subtotal.toLocaleString("en-IN")}
            </strong>
          </p>

          <p>
            Delivery Charge

            <strong>
              {deliveryCharge === 0
                ? "FREE"
                : `₹${deliveryCharge.toLocaleString("en-IN")}`}
            </strong>
          </p>

          <hr />

          <h3>
            Total Amount

            <strong>
              ₹{finalTotal.toLocaleString("en-IN")}
            </strong>
          </h3>

          {deliveryCharge > 0 && (
            <p className="free-delivery-message">
              Add ₹
              {(freeDeliveryMinimum - subtotal).toLocaleString(
                "en-IN"
              )}{" "}
              more to get free delivery.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Checkout;
