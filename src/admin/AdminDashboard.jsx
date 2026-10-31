
import { useMemo, useState } from "react";

import {
  IndianRupee,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Save
} from "lucide-react";

import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import "./Admin.css";
<AdminDashboard
  products={productList}
  setProducts={setProductList}
  users={users}
  orders={orders}
  onLogout={handleAdminLogout}
  goHome={goHome}
/>

{
  const [activePage, setActivePage] = useState("dashboard");

  // Product management states
  const [searchProduct, setSearchProduct] = useState("");
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const emptyProduct = {
    name: "",
    category: "Electronics",
    price: "",
    oldPrice: "",
    rating: "4.0",
    discount: "",
    image: "",
    description: ""
  };

  const [productForm, setProductForm] = useState(emptyProduct);

  // Dashboard calculations
  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.total || 0),
    0
  );

  const totalProducts = products.length;
  const totalCustomers = users.length;
  const totalOrders = orders.length;

  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      color: "blue"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "orange"
    },
    {
      title: "Total Customers",
      value: totalCustomers,
      icon: Users,
      color: "green"
    },
    {
      title: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "purple"
    }
  ];

  const recentOrders = [...orders].slice(0, 5);

  // Search products
  const filteredAdminProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  // Open add product form
  const handleAddProduct = () => {
    setEditingProductId(null);
    setProductForm(emptyProduct);
    setShowProductForm(true);
  };

  // Handle form input
  const handleProductInput = (e) => {
    const { name, value } = e.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // Save product
  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (
      !productForm.name.trim() ||
      !productForm.price ||
      !productForm.oldPrice
    ) {
      alert("Please enter product name and both prices.");
      return;
    }

    const price = Number(productForm.price);
    const oldPrice = Number(productForm.oldPrice);

    if (
      !Number.isFinite(price) ||
      !Number.isFinite(oldPrice) ||
      price <= 0 ||
      oldPrice <= 0
    ) {
      alert("Enter valid prices greater than zero.");
      return;
    }

    if (price > oldPrice) {
      alert("Selling price cannot be greater than old price.");
      return;
    }

    const updatedProduct = {
      id: editingProductId ?? Date.now(),
      name: productForm.name.trim(),
      category: productForm.category,
      price,
      oldPrice,
      rating: Number(productForm.rating) || 0,
      discount: Number(productForm.discount) || 0,
      image: productForm.image.trim(),
      description: productForm.description.trim()
    };

    if (editingProductId !== null) {
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProductId
            ? updatedProduct
            : product
        )
      );

      alert("Product updated successfully!");
    } else {
      setProducts((previous) => [
        updatedProduct,
        ...previous
      ]);

      alert("Product added successfully!");
    }

    setProductForm(emptyProduct);
    setEditingProductId(null);
    setShowProductForm(false);
  };

  // Edit product
  const handleEditProduct = (product) => {
    setEditingProductId(product.id);

    setProductForm({
      name: product.name || "",
      category: product.category || "Electronics",
      price: String(product.price ?? ""),
      oldPrice: String(product.oldPrice ?? ""),
      rating: String(product.rating ?? "4.0"),
      discount: String(product.discount ?? ""),
      image: product.image || "",
      description: product.description || ""
    });

    setShowProductForm(true);
  };

  // Delete product
  const handleDeleteProduct = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );

    alert("Product deleted successfully!");
  };

  // Cancel form
  const handleCancelProductForm = () => {
    setShowProductForm(false);
    setEditingProductId(null);
    setProductForm(emptyProduct);
  };

  // Product management page
  const renderProductManagement = () => (
    <div className="admin-products-page">

      <div className="admin-products-heading">
        <div>
          <h2>Product Management</h2>
          <p>Add, edit, search and manage your products.</p>
        </div>

        <button
          className="admin-add-product-btn"
          onClick={handleAddProduct}
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Product form */}

      {showProductForm && (
        <form
          className="admin-product-form"
          onSubmit={handleSaveProduct}
        >
          <div className="admin-form-heading">
            <h3>
              {editingProductId !== null
                ? "Edit Product"
                : "Add New Product"}
            </h3>

            <button
              type="button"
              className="admin-close-btn"
              onClick={handleCancelProductForm}
            >
              <X size={20} />
            </button>
          </div>

          <div className="admin-form-grid">

            <div className="admin-form-group">
              <label>Product Name</label>
              <input
                type="text"
                name="name"
                value={productForm.name}
                onChange={handleProductInput}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Category</label>
              <select
                name="category"
                value={productForm.category}
                onChange={handleProductInput}
              >
                <option value="Mobiles">Mobiles</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
                <option value="Home">Home</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label>Selling Price (₹)</label>
              <input
                type="number"
                name="price"
                min="1"
                value={productForm.price}
                onChange={handleProductInput}
                placeholder="Enter selling price"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Old Price (₹)</label>
              <input
                type="number"
                name="oldPrice"
                min="1"
                value={productForm.oldPrice}
                onChange={handleProductInput}
                placeholder="Enter old price"
                required
              />
            </div>

            <div className="admin-form-group">
              <label>Rating</label>
              <input
                type="number"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={productForm.rating}
                onChange={handleProductInput}
              />
            </div>

            <div className="admin-form-group">
              <label>Discount (%)</label>
              <input
                type="number"
                name="discount"
                min="0"
                max="100"
                value={productForm.discount}
                onChange={handleProductInput}
                placeholder="Enter discount"
              />
            </div>

            <div className="admin-form-group admin-full-width">
              <label>Product Image URL</label>
              <input
                type="url"
                name="image"
                value={productForm.image}
                onChange={handleProductInput}
                placeholder="Paste product image URL"
              />
            </div>

            <div className="admin-form-group admin-full-width">
              <label>Description</label>
              <textarea
                name="description"
                value={productForm.description}
                onChange={handleProductInput}
                placeholder="Enter product description"
                rows="3"
              />
            </div>

          </div>

          <div className="admin-form-actions">
            <button
              type="button"
              className="admin-cancel-btn"
              onClick={handleCancelProductForm}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="admin-save-btn"
            >
              <Save size={17} />
              {editingProductId !== null
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>
        </form>
      )}

      {/* Search products */}

      <div className="admin-product-search">
        <Search size={19} />

        <input
          type="text"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          placeholder="Search products by name..."
        />
      </div>

      {/* Product table */}

      <div className="admin-products-table-panel">
        <div className="admin-products-table-heading">
          <h3>All Products</h3>
          <span>{filteredAdminProducts.length} products</span>
        </div>

        {filteredAdminProducts.length === 0 ? (
          <div className="admin-empty">
            <Package size={40} />
            <p>No products found.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Old Price</th>
                  <th>Rating</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredAdminProducts.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="admin-product-info">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                          />
                        ) : (
                          <div className="admin-product-no-image">
                            <Package size={22} />
                          </div>
                        )}

                        <strong>{product.name}</strong>
                      </div>
                    </td>

                    <td>{product.category}</td>

                    <td>
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </td>

                    <td>
                      ₹{Number(product.oldPrice).toLocaleString("en-IN")}
                    </td>

                    <td>{product.rating} ★</td>

                    <td>
                      <div className="admin-product-actions">
                        <button
                          className="admin-edit-btn"
                          onClick={() => handleEditProduct(product)}
                          title="Edit product"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="admin-delete-btn"
                          onClick={() => handleDeleteProduct(product.id)}
                          title="Delete product"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  // Dashboard content
  const renderContent = () => {
    if (activePage === "products") {
      return renderProductManagement();
    }

    if (activePage !== "dashboard") {
      const sectionNames = {
        orders: "Order Management",
        customers: "Customer Management",
        categories: "Category Management",
        reports: "Sales Reports"
      };

      return (
        <div className="admin-placeholder">
          <Package size={45} />
          <h2>{sectionNames[activePage]}</h2>
          <p>
            This management module will be developed in
            the next implementation step.
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="admin-welcome">
          <div>
            <h2>Welcome to ShopZone Admin!</h2>
            <p>
              Here is an overview of your shopping business.
            </p>
          </div>

          <div className="welcome-icon">
            <TrendingUp size={35} />
          </div>
        </div>

        <div className="admin-stats-grid">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div className="admin-stat-card" key={stat.title}>
                <div className={`stat-icon ${stat.color}`}>
                  <Icon size={25} />
                </div>

                <div>
                  <p>{stat.title}</p>
                  <h2>{stat.value}</h2>
                </div>
              </div>
            );
          })}
        </div>

        <div className="admin-dashboard-content">
          <div className="admin-orders-panel">
            <div className="panel-heading">
              <h2>Recent Orders</h2>
              <button onClick={() => setActivePage("orders")}>
                View All
              </button>
            </div>

            {recentOrders.length === 0 ? (
              <div className="admin-empty">
                <ShoppingBag size={40} />
                <p>No orders have been placed yet.</p>
              </div>
            ) : (
              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>
                          {order.customer?.name || "Customer"}
                        </td>
                        <td>
                          ₹{Number(order.total).toLocaleString("en-IN")}
                        </td>
                        <td>{order.date}</td>
                        <td>
                          <span className="status-badge">
                            <CheckCircle size={13} />
                            Placed
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="admin-summary-panel">
            <h2>Business Summary</h2>

            <div className="summary-item">
              <Package size={20} />
              <div>
                <p>Available Products</p>
                <strong>{totalProducts}</strong>
              </div>
            </div>

            <div className="summary-item">
              <Users size={20} />
              <div>
                <p>Registered Customers</p>
                <strong>{totalCustomers}</strong>
              </div>
            </div>

            <div className="summary-item">
              <Clock size={20} />
              <div>
                <p>Orders Placed</p>
                <strong>{totalOrders}</strong>
              </div>
            </div>

            <div className="summary-item">
              <IndianRupee size={20} />
              <div>
                <p>Total Revenue</p>
                <strong>
                  ₹{totalRevenue.toLocaleString("en-IN")}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="admin-layout">
      <AdminSidebar
        activePage={activePage}
        setActivePage={setActivePage}
        onLogout={onLogout}
        goHome={goHome}
      />

      <main className="admin-main">
        <AdminHeader activePage={activePage} />

        <div className="admin-content">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;

