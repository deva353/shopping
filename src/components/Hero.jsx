
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-tag">MEGA SHOPPING FESTIVAL</p>

        <h1>Big Deals. Bigger Savings.</h1>

        <p>
          Discover amazing products at exciting prices.
          Shop your favourites today!
        </p>

        <button
          onClick={() =>
            document.getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Shop Now →
        </button>
      </div>

      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900"
          alt="Shopping offers"
        />
      </div>
    </section>
  );
}

export default Hero;
