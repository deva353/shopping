
import { Trash2, Minus, Plus } from "lucide-react";

function Cart({
  cart,
  updateQuantity,
  removeFromCart,
  goToCheckout,
  goHome
}) {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const originalTotal = cart.reduce(
    (total, item) => total + item.oldPrice * item.quantity,
    0
  );

  const savings = originalTotal - subtotal;

  if (cart.length === 0) {
    return (
      <div className="empty-cart">
        <h2>Your cart is empty!</h2>
        <p>Add products to start shopping.</p>
        <button className="checkout-button" onClick={goHome}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <section className="cart-page">
      <h1>My Shopping Cart</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-item-info">
                <h3>{item.name}</h3>

                <strong>
                  ₹{item.price.toLocaleString("en-IN")}
                </strong>

                <div className="quantity">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    <Minus size={15} />
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 size={15} /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="price-details">
          <h2>Price Details</h2>

          <p>
            Original Price
            <strong>₹{originalTotal.toLocaleString("en-IN")}</strong>
          </p>

          <p>
            Discount
            <strong className="green">
              -₹{savings.toLocaleString("en-IN")}
            </strong>
          </p>

          <p>
            Delivery Charges
            <strong className="green">FREE</strong>
          </p>

          <hr />

          <h3>
            Total Amount
            <strong>₹{subtotal.toLocaleString("en-IN")}</strong>
          </h3>

          <p className="green">
            You saved ₹{savings.toLocaleString("en-IN")}
          </p>

          <button
            className="checkout-button"
            onClick={goToCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;

