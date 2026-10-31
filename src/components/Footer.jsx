function Footer({ settings }) {
  return (
    <footer className="footer">
      <h2>{settings.storeName}</h2>

      <p>{settings.storeAddress}</p>

      <p>
        Email: {settings.storeEmail}
      </p>

      <p>
        Contact: {settings.contactNumber || "Contact details unavailable"}
      </p>

      <p>
        © {new Date().getFullYear()} {settings.storeName}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;