
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
import Footer from "./components/Footer";

import useLocalStorage from "./hooks/useLocalStorage";
import products from "./data/products";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const [cart, setCart] = useLocalStorage("shopzone-cart", []);
  const [wishlist, setWishlist] = useLocalStorage(
    "shopzone-wishlist",
    []
  );

  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [order, setOrder] = useState(null);

  // Add product to cart
  const addToCart = (product) => {
    setCart((previousCart) => {
      const existing = previousCart.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });

    alert("Product added to cart!");
  };

  // Change quantity
  const updateQuantity = (id, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((previousCart) =>
      previousCart.filter((item) => item.id !== id)
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

  // Search, category and sorting
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase());

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
  }, [search, selectedCategory, sort]);

  // Total cart quantity
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Product details
  const openProduct = (product) => {
    setSelectedProduct(product);
    setPage("details");
  };

  // Go home
  const goHome = () => {
    setPage("home");
    setSelectedProduct(null);
  };

  // Place order
  const placeOrder = (customer) => {
    if (cart.length === 0) return;

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = {
      id: "SZ" + Date.now(),
      customer,
      items: cart,
      total,
      date: new Date().toLocaleDateString()
    };

    setOrder(newOrder);
    setCart([]);
    setPage("success");
  };

  return (
    <div className="app">

      <Header
        search={search}
        setSearch={setSearch}
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        setPage={setPage}
      />

      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={(category) => {
          setSelectedCategory(category);
          goHome();
        }}
      />

      {page === "home" && (
        <>
          <Hero />

          <Categories
            setSelectedCategory={(category) => {
              setSelectedCategory(category);
              goHome();

              setTimeout(() => {
                document.getElementById("products")?.scrollIntoView({
                  behavior: "smooth"
                });
              }, 0);
            }}
          />

          <main className="products-section" id="products">
            <div className="section-heading">
              <div>
                <h2>Explore Our Products</h2>
                <p>Discover the best products at amazing prices.</p>
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
                <div className="no-products">
                  <h2>No Products Found</h2>
                  <p>Try another product name or category.</p>
                </div>
              )}
            </div>
          </main>
        </>
      )}

      {page === "details" && (
        <ProductDetails
          product={selectedProduct}
          addToCart={addToCart}
          goBack={goHome}
        />
      )}

      {page === "cart" && (
        <Cart
          cart={cart}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          goToCheckout={() => setPage("checkout")}
          goHome={goHome}
        />
      )}

      {page === "wishlist" && (
        <section className="products-section">
          <h2>My Wishlist</h2>

          <div className="product-grid">
            {wishlist.length > 0 ? (
              products
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
                ))
            ) : (
              <p>Your wishlist is empty.</p>
            )}
          </div>
        </section>
      )}

      {page === "checkout" && (
        <Checkout
          cart={cart}
          onPlaceOrder={placeOrder}
          goBack={() => setPage("cart")}
        />
      )}

      {page === "success" && (
        <OrderSuccess
          order={order}
          goHome={goHome}
        />
      )}

      {page === "login" && (
        <section className="login-page">
          <div className="login-card">
            <h2>Welcome to ShopZone</h2>
            <p>Authentication will be integrated in a later stage.</p>

            <input type="email" placeholder="Enter your email" />
            <input type="password" placeholder="Enter your password" />

            <button
              onClick={() =>
                alert("Demo only. Real authentication is not connected.")
              }
            >
              Login
            </button>

            <button className="back-button" onClick={goHome}>
              Back to Shopping
            </button>
          </div>
        </section>
      )}

      <Footer />

    </div>
  );
}

export default App;
