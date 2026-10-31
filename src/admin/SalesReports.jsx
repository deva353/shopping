
import React, { useMemo } from "react";
import {
  IndianRupee,
  ShoppingBag,
  TrendingUp,
  CheckCircle,
  Package,
} from "lucide-react";

function SalesReports({ orders = [] }) {
  const report = useMemo(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const totalOrders = orders.length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "Delivered"
    ).length;

    const averageOrderValue =
      totalOrders > 0 ? totalRevenue / totalOrders : 0;

    const statusCounts = {
      Placed: 0,
      Processing: 0,
      Shipped: 0,
      Delivered: 0,
      Cancelled: 0,
    };

    const productSales = {};

    orders.forEach((order) => {
      const status = order.status || "Placed";

      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }

      (order.items || []).forEach((item) => {
        const name = item.name || item.title || "Unknown product";
        const quantity = Number(item.quantity || 1);

        productSales[name] =
          (productSales[name] || 0) + quantity;
      });
    });

    const bestSellingProducts = Object.entries(productSales)
      .map(([name, quantity]) => ({ name, quantity }))
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      totalRevenue,
      totalOrders,
      deliveredOrders,
      averageOrderValue,
      statusCounts,
      bestSellingProducts,
    };
  }, [orders]);

  const formatPrice = (amount) =>
    `₹${Number(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    })}`;

  return (
    <div className="sales-reports">
      <div className="admin-page-heading">
        <div>
          <h2>Sales Reports</h2>
          <p>Monitor your store's sales performance.</p>
        </div>
      </div>

      <div className="report-stats">
        <div className="report-card">
          <IndianRupee />
          <div>
            <p>Total Revenue</p>
            <h3>{formatPrice(report.totalRevenue)}</h3>
          </div>
        </div>

        <div className="report-card">
          <ShoppingBag />
          <div>
            <p>Total Orders</p>
            <h3>{report.totalOrders}</h3>
          </div>
        </div>

        <div className="report-card">
          <TrendingUp />
          <div>
            <p>Average Order Value</p>
            <h3>{formatPrice(report.averageOrderValue)}</h3>
          </div>
        </div>

        <div className="report-card">
          <CheckCircle />
          <div>
            <p>Delivered Orders</p>
            <h3>{report.deliveredOrders}</h3>
          </div>
        </div>
      </div>

      <div className="report-section">
        <h3>Order Status Summary</h3>

        <div className="status-report-list">
          {Object.entries(report.statusCounts).map(
            ([status, count]) => (
              <div className="status-report-row" key={status}>
                <span>{status}</span>
                <strong>{count}</strong>
                <div className="status-report-track">
                  <div
                    className="status-report-fill"
                    style={{
                      width: `${
                        report.totalOrders
                          ? (count / report.totalOrders) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      <div className="report-section">
        <h3>Best-Selling Products</h3>

        {report.bestSellingProducts.length === 0 ? (
          <p className="report-empty">
            No product sales available yet.
          </p>
        ) : (
          <div className="best-selling-list">
            {report.bestSellingProducts.map((product, index) => (
              <div className="best-selling-row" key={product.name}>
                <span className="product-rank">{index + 1}</span>
                <span>{product.name}</span>
                <strong>{product.quantity} sold</strong>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SalesReports;
