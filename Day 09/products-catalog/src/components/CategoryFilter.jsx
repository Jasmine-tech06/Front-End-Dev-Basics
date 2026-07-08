const CategoryFilter = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      className="category-filter"
      id="categories"
    >
      {categories.map((category) => (
        <button
          key={category}
          className={
            selectedCategory === category
              ? "category-btn active"
              : "category-btn"
          }
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;