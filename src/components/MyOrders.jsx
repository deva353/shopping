
import { Package, ArrowLeft } from "lucide-react";

function MyOrders({ orders, goBack }) {
  return (
    <section className="orders-page">
      <button className="back-button" onClick={goBack}>
        <ArrowLeft size={18} />
        Back to Account
      </button>

      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <Package size={55} />
          <h2>No Orders Yet</h2>
          <p>Your shopping orders will appear here.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <small>Order Date: {order.date}</small>
                </div>

                <span className="order-status">
                  Placed
                </span>
              </div>

              {order.items.map((item) => (
                <div className="order-product" key={item.id}>
                  <img src={item.image} alt={item.name} />

                  <div>
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}

              <div className="order-total">
                Total Amount:
                <strong>
                  ₹{order.total.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MyOrders;
