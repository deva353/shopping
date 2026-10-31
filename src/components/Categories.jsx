
function Categories({
  categories = [],
  setSelectedCategory
}) {
  return (
    <section className="categories-section">
      <h2>Shop by Category</h2>

      <div className="categories-container">
        {categories.map((category) => (
          <button
            key={category}
            className="category-card"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

export default Categories;
