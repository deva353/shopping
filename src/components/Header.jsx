
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  LogOut
} from "lucide-react";

function Header({
  search,
  setSearch,
  cartCount,
  wishlistCount,
  setPage,
  currentUser,
  onLogout,
    storeName = "ShopZone",
}) {
  return (
    <header className="header">
        <button onClick={() => setPage("admin-login")}>
  Admin
</button>
      <div
        className="header-logo"
        onClick={() => setPage("home")}
        
      >
        <h2>{storeName || "ShopZone"}</h2>
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
        {currentUser ? (
          <>
            <button onClick={() => setPage("account")}>
              <User size={19} />
              {currentUser.name.split(" ")[0]}
            </button>

            <button onClick={onLogout}>
              <LogOut size={19} />
              Logout
            </button>
          </>
        ) : (
          <button onClick={() => setPage("login")}>
            <User size={19} />
            Login
          </button>
        )}

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

