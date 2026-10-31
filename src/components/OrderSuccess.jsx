
import { CheckCircle, Package } from "lucide-react";

function OrderSuccess({ order, goHome }) {
  if (!order) return null;

  return (
    <section className="success-page">
      <div className="success-card">
        <CheckCircle size={65} color="green" />

        <h1>Order Placed Successfully!</h1>

        <p>Thank you for shopping with ShopZone.</p>

        <div className="order-number">
          <Package size={20} />
          Order ID: {order.id}
        </div>

        <h3>Delivery Details</h3>

        <p>{order.customer.name}</p>
        <p>{order.customer.address}</p>
        <p>
          {order.customer.city} - {order.customer.pincode}
        </p>

        <p>Payment: {order.customer.payment}</p>

        <h3>
          Order Total: ₹{order.total.toLocaleString("en-IN")}
        </h3>

        <button onClick={goHome}>
          Continue Shopping
        </button>
      </div>
    </section>
  );
}

export default OrderSuccess;
