
import { Search, ShoppingCart, Heart, User } from "lucide-react";

function Header({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  setPage
}) {
  return (
    <header className="header">
      <div className="header-logo" onClick={() => setPage("home")}>
        <h2>Shop<span>Zone</span></h2>
        <small>Explore More. Shop More.</small>
      </div>

      <div className="search-box">
        <Search size={20} />
        <input
          type="text"
          placeholder="Search for products, brands and more"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="header-actions">
        <button onClick={() => setPage("login")}>
          <User size={19} />
          Login
        </button>

        <button onClick={() => setPage("wishlist")}>
          <Heart size={19} />
          Wishlist ({wishlistCount})
        </button>

        <button onClick={() => setPage("cart")}>
          <ShoppingCart size={20} />
          Cart ({cartCount})
        </button>
      </div>
    </header>
  );
}

export default Header;
