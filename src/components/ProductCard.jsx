
import { Heart, ShoppingCart } from "lucide-react";

function ProductCard({ product, addToCart, wishlist, toggleWishlist, openProduct }) {
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="product-card">
      <div className="product-image">
        <span className="discount">{product.discount}% OFF</span>

        <button
          className={`wishlist-icon ${isWishlisted ? "selected" : ""}`}
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <img
          src={product.image}
          alt={product.name}
          onClick={() => openProduct(product)}
        />
      </div>

      <div className="product-info">
        <p className="product-category">{product.category}</p>

        <h3 onClick={() => openProduct(product)}>
          {product.name}
        </h3>

        <div className="rating">
          ⭐ {product.rating} / 5
        </div>

        <div className="price">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <del>₹{product.oldPrice.toLocaleString("en-IN")}</del>
        </div>

        <button
          className="add-cart"
          onClick={() => addToCart(product)}
        >
          <ShoppingCart size={17} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
