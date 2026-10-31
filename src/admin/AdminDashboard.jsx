
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
import SalesReports from "./SalesReports";
import AdminSettings from "./AdminSettings";
import "./Admin.css";
function AdminDashboard({
  products = [],
  setProducts,
  users = [],
  orders = [],
  setOrders,
  categories = [],
  setCategories,
  onLogout,
  goHome,settings,
setSettings,
}) 

 {
  // ---------------- STATES ----------------

  const [activePage, setActivePage] = useState("dashboard");
const [searchOrder, setSearchOrder] = useState("");
const [searchCustomer, setSearchCustomer] = useState("");
const [selectedCustomerId, setSelectedCustomerId] = useState(null);
const [categoryName, setCategoryName] = useState("");
const [editingCategory, setEditingCategory] = useState(null);
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

  // ---------------- DASHBOARD CALCULATIONS ----------------

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

  // ---------------- SEARCH PRODUCTS ----------------

  const filteredAdminProducts = useMemo(() => {
    return products.filter((product) =>
      String(product.name || "")
        .toLowerCase()
        .includes(searchProduct.toLowerCase())
    );
  }, [products, searchProduct]);

  // ---------------- ADD PRODUCT ----------------

  const handleAddProduct = () => {
    setEditingProductId(null);
    setProductForm({ ...emptyProduct });
    setShowProductForm(true);
  };

  // ---------------- HANDLE FORM INPUT ----------------

  const handleProductInput = (e) => {
    const { name, value } = e.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value
    }));
  };

  // ---------------- SAVE PRODUCT ----------------
  const handleOrderStatus = (orderId, newStatus) => {
  setOrders((previous) =>
    previous.map((order) =>
      order.id === orderId
        ? { ...order, status: newStatus }
        : order
    )
  );

  alert("Order status updated successfully!");
};

const handleSaveCategory = (e) => {
  e.preventDefault();

  const name = categoryName.trim();

  if (!name) {
    alert("Please enter a category name.");
    return;
  }

  const alreadyExists = categories.some(
    (category) =>
      category.toLowerCase() === name.toLowerCase() &&
      category !== editingCategory
  );

  if (alreadyExists) {
    alert("This category already exists.");
    return;
  }

  if (editingCategory !== null) {
    // Rename category and update related products
    setCategories((previous) =>
      previous.map((category) =>
        category === editingCategory ? name : category
      )
    );

    setProducts((previous) =>
      previous.map((product) =>
        product.category === editingCategory
          ? { ...product, category: name }
          : product
      )
    );

    alert("Category updated successfully!");
  } else {
    // Add category
    setCategories((previous) => [...previous, name]);

    alert("Category added successfully!");
  }

  setCategoryName("");
  setEditingCategory(null);
};

const handleEditCategory = (category) => {
  setEditingCategory(category);
  setCategoryName(category);
};

const handleDeleteCategory = (category) => {
  const productsInCategory = products.filter(
    (product) => product.category === category
  );

  if (productsInCategory.length > 0) {
    alert(
      `Cannot delete ${category}. It contains ${productsInCategory.length} products. Move or delete those products first.`
    );
    return;
  }

  const confirmed = window.confirm(
    `Are you sure you want to delete ${category}?`
  );

  if (!confirmed) return;

  setCategories((previous) =>
    previous.filter((item) => item !== category)
  );

  alert("Category deleted successfully!");
};
if (activePage === "settings") {
  return (
    <AdminSettings
      settings={settings}
      setSettings={setSettings}
    />
  );
}

const renderCategoryManagement = () => (
  <div className="admin-products-page">

    <div className="admin-products-heading">
      <div>
        <h2>Category Management</h2>
        <p>Create and manage your product categories.</p>
      </div>
    </div>

    {/* ADD / EDIT CATEGORY */}

    <form
      className="admin-category-form"
      onSubmit={handleSaveCategory}
    >
      <div className="admin-form-group">
        <label>
          {editingCategory !== null
            ? "Edit Category"
            : "New Category"}
        </label>

        <input
          type="text"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
          required
        />
      </div>

      <div className="admin-category-buttons">
        <button type="submit" className="admin-save-btn">
          <Save size={17} />
          {editingCategory !== null ? "Update" : "Add Category"}
        </button>

        {editingCategory !== null && (
          <button
            type="button"
            className="admin-cancel-btn"
            onClick={() => {
              setEditingCategory(null);
              setCategoryName("");
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>

    {/* CATEGORY TABLE */}

    <div className="admin-products-table-panel">
      <div className="admin-products-table-heading">
        <h3>All Categories</h3>
        <span>{categories.length} categories</span>
      </div>

      {categories.length === 0 ? (
        <div className="admin-empty">
          <Package size={40} />
          <p>No categories available.</p>
        </div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">

            <thead>
              <tr>
                <th>Category Name</th>
                <th>Total Products</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => {
                const count = products.filter(
                  (product) => product.category === category
                ).length;

                return (
                  <tr key={category}>
                    <td><strong>{category}</strong></td>
                    <td>{count}</td>

                    <td>
                      <div className="admin-product-actions">
                        <button
                          type="button"
                          className="admin-edit-btn"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => handleDeleteCategory(category)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  </div>
);


const renderCustomerManagement = () => {
  const filteredCustomers = users.filter((user) => {
    const name = String(user.name || "").toLowerCase();
    const email = String(user.email || "").toLowerCase();
    const search = searchCustomer.toLowerCase();

    return name.includes(search) || email.includes(search);
  });

  return (
    <div className="admin-products-page">

      <div className="admin-products-heading">
        <div>
          <h2>Customer Management</h2>
          <p>View registered customers and their purchase history.</p>
        </div>
      </div>

      {/* SEARCH CUSTOMERS */}

      <div className="admin-product-search">
        <Search size={19} />

        <input
          type="text"
          value={searchCustomer}
          onChange={(e) => setSearchCustomer(e.target.value)}
          placeholder="Search by customer name or email..."
        />
      </div>

      {/* CUSTOMER TABLE */}

      <div className="admin-products-table-panel">

        <div className="admin-products-table-heading">
          <h3>Registered Customers</h3>
          <span>{filteredCustomers.length} customers</span>
        </div>

        {filteredCustomers.length === 0 ? (
          <div className="admin-empty">
            <Users size={40} />
            <p>No customers found.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">

            <table className="admin-table">

              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Total Orders</th>
                  <th>Total Spending</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredCustomers.map((user) => {
                  const customerOrders = orders.filter(
                    (order) =>
                      String(order.userId) === String(user.id)
                  );

                  const totalSpent = customerOrders.reduce(
                    (total, order) =>
                      total + Number(order.total || 0),
                    0
                  );

                  const isSelected =
                    String(selectedCustomerId) === String(user.id);

                  return (
                    <>
                      <tr key={user.id}>
                        <td>{user.id}</td>

                        <td>{user.name || "Customer"}</td>

                        <td>{user.email || "No email"}</td>

                        <td>{customerOrders.length}</td>

                        <td>
                          ₹{totalSpent.toLocaleString("en-IN")}
                        </td>

                        <td>
                          <button
                            type="button"
                            className="admin-edit-btn"
                            onClick={() =>
                              setSelectedCustomerId(
                                isSelected ? null : user.id
                              )
                            }
                          >
                            {isSelected ? "Hide" : "View Orders"}
                          </button>
                        </td>
                      </tr>

                      {isSelected && (
                        <tr key={`${user.id}-orders`}>
                          <td colSpan="6">
                            <div className="customer-order-details">
                              <h4>
                                Order History: {user.name || "Customer"}
                              </h4>

                              {customerOrders.length === 0 ? (
                                <p>This customer has not placed any orders.</p>
                              ) : (
                                customerOrders.map((order) => (
                                  <div
                                    className="customer-order-row"
                                    key={order.id}
                                  >
                                    <span>
                                      {order.id}
                                    </span>

                                    <span>
                                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                                    </span>

                                    <span>{order.date}</span>

                                    <span>
                                      {order.status || "Placed"}
                                    </span>
                                  </div>
                                ))
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const renderOrderManagement = () => {
  const filteredOrders = orders.filter((order) => {
    const orderId = String(order.id || "").toLowerCase();
    const customerName = String(
      order.customer?.name || ""
    ).toLowerCase();

    const search = searchOrder.toLowerCase();

    return (
      orderId.includes(search) ||
      customerName.includes(search)
    );
  });

  return (
    <div className="admin-products-page">

      <div className="admin-products-heading">
        <div>
          <h2>Order Management</h2>
          <p>View customer orders and update delivery status.</p>
        </div>
      </div>

      <div className="admin-product-search">
        <Search size={19} />

        <input
          type="text"
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
          placeholder="Search by order ID or customer name..."
        />
      </div>

      <div className="admin-products-table-panel">

        <div className="admin-products-table-heading">
          <h3>All Orders</h3>
          <span>{filteredOrders.length} orders</span>
        </div>

        {filteredOrders.length === 0 ? (
          <div className="admin-empty">
            <ShoppingBag size={40} />
            <p>No orders found.</p>
          </div>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">

              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id}>

                    <td>{order.id}</td>

                    <td>
                      {order.customer?.name || "Customer"}
                    </td>

                    <td>
                      {order.items?.length || 0} products
                    </td>

                    <td>
                      ₹{Number(order.total || 0).toLocaleString("en-IN")}
                    </td>

                    <td>{order.date}</td>

                    <td>
                      <select
                        value={order.status || "Placed"}
                        onChange={(e) =>
                          handleOrderStatus(
                            order.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Placed">Placed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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
};

  const handleSaveProduct = (e) => {
    e.preventDefault();

    if (typeof setProducts !== "function") {
      alert("Product update function is missing. Check App.jsx.");
      return;
    }

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
    const rating = Number(productForm.rating);
    const discount = Number(productForm.discount || 0);

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

    if (
      !Number.isFinite(rating) ||
      rating < 0 ||
      rating > 5
    ) {
      alert("Rating must be between 0 and 5.");
      return;
    }

    if (
      !Number.isFinite(discount) ||
      discount < 0 ||
      discount > 100
    ) {
      alert("Discount must be between 0 and 100.");
      return;
    }

    const updatedProduct = {
      id: editingProductId ?? Date.now(),
      name: productForm.name.trim(),
      category: productForm.category,
      price,
      oldPrice,
      rating,
      discount,
      image: productForm.image.trim(),
      description: productForm.description.trim()
    };

    if (editingProductId !== null) {
      // Update existing product
      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProductId
            ? updatedProduct
            : product
        )
      );

      alert("Product updated successfully!");
    } else {
      // Add new product
      setProducts((previous) => [
        updatedProduct,
        ...previous
      ]);

      alert("Product added successfully!");
    }

    setProductForm({ ...emptyProduct });
    setEditingProductId(null);
    setShowProductForm(false);
  };

  // ---------------- EDIT PRODUCT ----------------

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

  // ---------------- DELETE PRODUCT ----------------

  const handleDeleteProduct = (id) => {
    if (typeof setProducts !== "function") {
      alert("Product update function is missing. Check App.jsx.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) return;

    setProducts((previous) =>
      previous.filter((product) => product.id !== id)
    );

    alert("Product deleted successfully!");
  };

  // ---------------- CANCEL PRODUCT FORM ----------------

  const handleCancelProductForm = () => {
    setShowProductForm(false);
    setEditingProductId(null);
    setProductForm({ ...emptyProduct });
  };

  // ---------------- PRODUCT MANAGEMENT ----------------

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

      {/* ADD AND EDIT PRODUCT FORM */}

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
    required
  >
    {categories.map((category) => (
      <option key={category} value={category}>
        {category}
      </option>
    ))}
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

      {/* SEARCH PRODUCTS */}

      <div className="admin-product-search">
        <Search size={19} />

        <input
          type="text"
          value={searchProduct}
          onChange={(e) => setSearchProduct(e.target.value)}
          placeholder="Search products by name..."
        />
      </div>

      {/* PRODUCT TABLE */}

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
                          type="button"
                          className="admin-edit-btn"
                          onClick={() => handleEditProduct(product)}
                          title="Edit product"
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          type="button"
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

  // ---------------- DASHBOARD CONTENT ----------------

  const renderContent = () => {

    // Products page
    if (activePage === "products") {
      return renderProductManagement();
    }
    if (activePage === "orders") {
  return renderOrderManagement();
}
if (activePage === "customers") {
  return renderCustomerManagement();
}
if (activePage === "categories") {
  return renderCategoryManagement();
}
if (activePage === "orders") return renderOrderManagement();
if (activePage === "customers") return renderCustomerManagement();
if (activePage === "categories") return renderCategoryManagement();

if (activePage === "reports") {
  return <SalesReports orders={orders} />;
}
    // Other placeholder pages
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

          <h2>
            {sectionNames[activePage] || "Admin Section"}
          </h2>

          <p>
            This management module will be developed
            in the next implementation step.
          </p>
        </div>
      );
    }

    // Main dashboard
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

        {/* STATISTICS */}

        <div className="admin-stats-grid">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                className="admin-stat-card"
                key={stat.title}
              >
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

        {/* DASHBOARD CONTENT */}

        <div className="admin-dashboard-content">

          {/* RECENT ORDERS */}

          <div className="admin-orders-panel">

            <div className="panel-heading">
              <h2>Recent Orders</h2>

              <button
                onClick={() => setActivePage("orders")}
              >
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
                          ₹{Number(order.total || 0).toLocaleString("en-IN")}
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

          {/* BUSINESS SUMMARY */}

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

  // ---------------- MAIN RETURN ----------------

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
