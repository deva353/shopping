
import { useMemo, useState } from "react";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import ProductCard from "./components/ProductCard";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import Account from "./components/Account";
import Auth from "./components/Auth";
import MyOrders from "./components/MyOrders";
import Footer from "./components/Footer";

import AdminLogin from "./admin/AdminLogin";
import AdminDashboard from "./admin/AdminDashboard";

import useLocalStorage from "./hooks/useLocalStorage";
import products from "./data/products";

import "./App.css";

function App() {
  // ---------------- STATE DECLARATIONS ----------------

  const [search, setSearch] = useState("");
  const [productList, setProductList] = useLocalStorage(
  "shopzone-products",
  products
);
  
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [cart, setCart] = useLocalStorage("shopzone-cart", []);
  const [wishlist, setWishlist] = useLocalStorage(
    "shopzone-wishlist",
    []
  );

  const [users, setUsers] = useLocalStorage("shopzone-users", []);

  const [currentUser, setCurrentUser] = useLocalStorage(
    "shopzone-current-user",
    null
  );

  const [orders, setOrders] = useLocalStorage(
    "shopzone-orders",
    []
  );

  const [isAdmin, setIsAdmin] = useLocalStorage(
    "shopzone-admin-session",
    false
  );

  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [order, setOrder] = useState(null);

  // ---------------- NAVIGATION FUNCTIONS ----------------

  const goHome = () => {
    setPage("home");
    setSelectedProduct(null);
  };

  // ---------------- ADMIN FUNCTIONS ----------------

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setPage("admin");
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setPage("home");
  };

  // ---------------- CUSTOMER FUNCTIONS ----------------

  // Login
  const handleLogin = (user) => {
    setCurrentUser(user);
    setPage("account");
  };

  // Logout
  const handleLogout = () => {
    setCurrentUser(null);
    setPage("home");
    alert("You have logged out successfully.");
  };

  // Open product details
  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage("details");
  };

  // Add product to cart
  const addToCart = (product) => {
    setCart((previous) => {
      const existing = previous.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previous.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });

    alert("Product added to cart!");
  };

  // Update cart quantity
  const updateQuantity = (id, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product from cart
  const removeFromCart = (id) => {
    setCart((previous) =>
      previous.filter((item) => item.id !== id)
    );
  };

  // Wishlist
  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  // ---------------- PRODUCT FILTERING ----------------

  const filteredProducts = useMemo(() => {
    let result = productList.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    if (sort === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "discount") {
      result.sort((a, b) => b.discount - a.discount);
    }

    return result;
  }, [search, selectedCategory, sort, productList]);

  // Cart count
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // ---------------- PLACE ORDER ----------------

  const placeOrder = (customer) => {
    if (!currentUser || cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

   const newOrder = {
  id: "SZ" + Date.now(),
  userId: currentUser.id,
  customer,
  items: cart,
  total,
  date: new Date().toLocaleDateString(),
  status: "Placed"
};
    setOrder(newOrder);
    setOrders((previous) => [newOrder, ...previous]);
    setCart([]);
    setPage("success");
  };

  // ---------------- ADMIN LOGIN PAGE ----------------

  if (page === "admin-login") {
    return (
      <AdminLogin
        onAdminLogin={handleAdminLogin}
        goHome={goHome}
      />
    );
  }

  // ---------------- ADMIN DASHBOARD ----------------

  if (page === "admin") {
    if (!isAdmin) {
      return (
        <AdminLogin
          onAdminLogin={handleAdminLogin}
          goHome={goHome}
        />
      );
    }

    return (
      <AdminDashboard
  products={productList}
  setProducts={setProductList}
  users={users}
  orders={orders}
   setOrders={setOrders}
  onLogout={handleAdminLogout}
  goHome={goHome}
/>
    );
  }

  // ---------------- CUSTOMER WEBSITE ----------------

  return (
    <div className="app">

      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        setPage={setPage}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={(category) => {
          setSelectedCategory(category);
          goHome();
        }}
      />

      {/* HOME PAGE */}

      {page === "home" && (
        <>
          <Hero />

          <Categories
            setSelectedCategory={(category) => {
              setSelectedCategory(category);
              goHome();
            }}
          />

          <main className="products-section" id="products">

            <div className="section-heading">
              <div>
                <h2>Explore Our Products</h2>
                <p>
                  Discover the best products at amazing prices.
                </p>
              </div>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">Default Sorting</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="discount">Biggest Discount</option>
              </select>
            </div>

            <div className="product-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    addToCart={addToCart}
                    wishlist={wishlist}
                    toggleWishlist={toggleWishlist}
                    openProduct={openProduct}
                  />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>

          </main>
        </>
      )}

      {/* PRODUCT DETAILS */}

      {page === "details" && (
        <ProductDetails
          product={selectedProduct}
          addToCart={addToCart}
          goBack={goHome}
        />
      )}

      {/* CART */}

      {page === "cart" && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          goToCheckout={() =>
            setPage(currentUser ? "checkout" : "login")
          }
          goHome={goHome}
        />
      )}

      {/* WISHLIST */}

     {page === "wishlist" && (
  <section className="products-section">
    <h2>My Wishlist</h2>

    <div className="product-grid">
      {productList
        .filter((product) => wishlist.includes(product.id))
        .map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            openProduct={openProduct}
          />
        ))}
    </div>
  </section>
)}

      {/* LOGIN AND REGISTER */}

      {page === "login" && (
        <Auth
          users={users}
          setUsers={setUsers}
          onLogin={handleLogin}
          goHome={goHome}
        />
      )}

      {/* CUSTOMER ACCOUNT */}

      {page === "account" && (
        currentUser ? (
          <Account
            user={currentUser}
            onLogout={handleLogout}
            openOrders={() => setPage("orders")}
          />
        ) : (
          <Auth
            users={users}
            setUsers={setUsers}
            onLogin={handleLogin}
            goHome={goHome}
          />
        )
      )}

      {/* MY ORDERS */}

      {page === "orders" && (
        currentUser ? (
          <MyOrders
            orders={orders.filter(
              (item) => item.userId === currentUser.id
            )}
            goBack={() => setPage("account")}
          />
        ) : (
          <Auth
            users={users}
            setUsers={setUsers}
            onLogin={handleLogin}
            goHome={goHome}
          />
        )
      )}

      {/* CHECKOUT */}

      {page === "checkout" && (
        currentUser ? (
          <Checkout
            cart={cart}
            onPlaceOrder={placeOrder}
            goBack={() => setPage("cart")}
          />
        ) : (
          <Auth
            users={users}
            setUsers={setUsers}
            onLogin={handleLogin}
            goHome={goHome}
          />
        )
      )}

      {/* ORDER SUCCESS */}

      {page === "success" && (
        <OrderSuccess
          order={order}
          goHome={goHome}
        />
      )}

      <Footer />

    </div>
  );
}

export default App;
