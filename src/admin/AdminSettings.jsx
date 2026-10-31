
import React, { useState } from "react";

function AdminSettings({ settings, setSettings }) {
  const [form, setForm] = useState(settings);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.storeName.trim()) {
      alert("Store name is required");
      return;
    }

    if (Number(form.deliveryCharge) < 0 ||
        Number(form.freeDeliveryMinimum) < 0) {
      alert("Delivery amounts cannot be negative");
      return;
    }

    setSettings({
      ...form,
      deliveryCharge: Number(form.deliveryCharge),
      freeDeliveryMinimum: Number(form.freeDeliveryMinimum),
    });

    alert("Settings saved successfully");
  };

  return (
    <div className="admin-settings">
      <div className="admin-page-heading">
        <div>
          <h2>Store Settings</h2>
          <p>Manage your ShopZone store information.</p>
        </div>
      </div>

      <form className="settings-form" onSubmit={handleSubmit}>
        <h3>Store Information</h3>

        <div className="settings-grid">
          <div className="admin-form-group">
            <label>Store Name</label>
            <input
              name="storeName"
              value={form.storeName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Store Email</label>
            <input
              type="email"
              name="storeEmail"
              value={form.storeEmail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={form.contactNumber}
              onChange={handleChange}
            />
          </div>

          <div className="admin-form-group">
            <label>Store Address</label>
            <textarea
              name="storeAddress"
              value={form.storeAddress}
              onChange={handleChange}
              rows="3"
            />
          </div>
        </div>

        <h3>Delivery Settings</h3>

        <div className="settings-grid">
          <div className="admin-form-group">
            <label>Delivery Charge (₹)</label>
            <input
              type="number"
              name="deliveryCharge"
              min="0"
              value={form.deliveryCharge}
              onChange={handleChange}
              required
            />
          </div>

          <div className="admin-form-group">
            <label>Free Delivery Above (₹)</label>
            <input
              type="number"
              name="freeDeliveryMinimum"
              min="0"
              value={form.freeDeliveryMinimum}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button className="settings-save-btn" type="submit">
          Save Settings
        </button>
      </form>
    </div>
  );
}

export default AdminSettings;
