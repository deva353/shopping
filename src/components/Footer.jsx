
function Footer({ settings = {} }) {
  const storeName = settings.storeName || "ShopZone";
  const storeEmail = settings.storeEmail || "support@shopzone.com";
  const contactNumber = settings.contactNumber || "Not provided";
  const storeAddress = settings.storeAddress || "Address not provided";

  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h2>{storeName}</h2>
          <p>
            Your trusted online shopping destination.
          </p>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: {storeEmail}</p>
          <p>Phone: {contactNumber}</p>
          <p>Address: {storeAddress}</p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <p>Home</p>
          <p>My Account</p>
          <p>My Orders</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {storeName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
