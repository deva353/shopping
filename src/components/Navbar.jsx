
const categories = [
  "All",
  "Mobiles",
  "Electronics",
  "Fashion",
  "Home"
];

function Navbar({ selectedCategory, setSelectedCategory }) {
  return (
    <nav className="navbar">
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category ? "active" : ""
          }
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default Navbar;
