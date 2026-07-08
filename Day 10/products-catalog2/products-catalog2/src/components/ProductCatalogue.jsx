import { useState } from "react";
import products from "../data/products";

import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";
import ProductPopup from "./ProductPopup";

import "../styles/Catalogue.css";

const ProductCatalogue = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    "All",
    "Candles",
    "Clocks",
    "Photo Frames",
    "Lamps",
    "Mirrors",
    "Planters",
    "Storage",
    "Table Decor",
    "Vases",
    "Wall Decor"
  ];

  const filteredProducts = products.filter((product) => {

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    const matchesSearch =
      product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;

  });

  return (

    <section
      className="catalogue"
      id="products"
    >

      <div className="container">

        <h2 className="section-title">
          Our Collection
        </h2>

        <p className="section-subtitle">
          Discover premium minimalist home décor products curated to
          make every corner of your home beautiful.
        </p>

        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="products-grid">

          {filteredProducts.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
              onClick={() =>
                setSelectedProduct(product)
              }
            />

          ))}

        </div>

      </div>

      {selectedProduct && (

        <ProductPopup
          product={selectedProduct}
          onClose={() =>
            setSelectedProduct(null)
          }
        />

      )}

    </section>

  );

};

export default ProductCatalogue;