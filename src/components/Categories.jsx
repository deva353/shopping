
const categoryItems = [
  {
    name: "Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300"
  },
  {
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300"
  },
  {
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=300"
  },
  {
    name: "Home",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300"
  }
];

function Categories({ setSelectedCategory }) {
  return (
    <section className="categories-section">
      <h2>Shop By Categories</h2>

      <div className="categories-grid">
        {categoryItems.map((item) => (
          <div
            className="category-card"
            key={item.name}
            onClick={() => setSelectedCategory(item.name)}
          >
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;
