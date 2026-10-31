function Navbar({
  categories = [],
  selectedCategory,
  setSelectedCategory
}) {
  return (
    <nav className="navbar">
      <button
        onClick={() => setSelectedCategory("All")}
        className={selectedCategory === "All" ? "active" : ""}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={
            selectedCategory === category ? "active" : ""
          }
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
