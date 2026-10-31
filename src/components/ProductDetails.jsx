
import { ArrowLeft, ShoppingCart, Truck, ShieldCheck } from "lucide-react";
import Reviews from "./Reviews";

function ProductDetails({ product, addToCart, goBack }) {
  if (!product) return null;

  return (
    <section className="details-page">
      <button className="back-button" onClick={goBack}>
        <ArrowLeft size={18} />
        Back to shopping
      </button>

      <div className="details-container">
        <div>
          <img
            src={product.image}
            alt={product.name}
          />

          <button
            className="add-cart details-cart"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>

        <div className="details-info">
          <p>{product.category}</p>

          <h1>{product.name}</h1>

          <div className="rating">
            ⭐ {product.rating} / 5
          </div>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p>
            <del>
              ₹{product.oldPrice.toLocaleString("en-IN")}
            </del>
            {" "}{product.discount}% OFF
          </p>

          <h3>Product Description</h3>
          <p>{product.description}</p>

          <div className="delivery-info">
            <p>
              <Truck size={20} />
              Free delivery on eligible orders
            </p>

            <p>
              <ShieldCheck size={20} />
              Secure shopping experience
            </p>
          </div>

          <h3>Product Highlights</h3>
          <ul>
            <li>Quality product</li>
            <li>Value for money</li>
            <li>Easy order management</li>
          </ul>
        </div>
      </div>

      <Reviews productId={product.id} />
    </section>
  );
}

export default ProductDetails;

