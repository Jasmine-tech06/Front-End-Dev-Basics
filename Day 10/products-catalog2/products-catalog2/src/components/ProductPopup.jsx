import { useState } from "react";
import { useCart } from "../context/CartContext";
import OrderPopup from "./OrderPopup";
import "../styles/ProductPopup.css";

const ProductPopup = ({ product, onClose }) => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);

  const { addToCart } = useCart();

  return (
    <>
      <div className="popup-overlay">
        <div className="popup-card">

          <button
            className="close-btn"
            onClick={onClose}
          >
            ✕
          </button>

          <div className="popup-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>

          <div className="popup-content">

            <span className="popup-category">
              {product.category}
            </span>

            <h2>{product.name}</h2>

            <p className="popup-description">
              {product.description}
            </p>

            <div className="popup-rating">
              ⭐ {product.rating}
            </div>

            <h1 className="popup-price">
              ₹{product.price}
            </h1>

            <div className="popup-actions">

              <button
                className="secondary-btn popup-btn"
                onClick={() => {
                  addToCart(product);
                  alert(`${product.name} added to cart 🛒`);
                }}
              >
                Add to Cart
              </button>

              <button
                className="primary-btn popup-btn"
                onClick={() => setShowOrderPopup(true)}
              >
                Buy Now
              </button>

            </div>

          </div>

        </div>
      </div>

      {showOrderPopup && (
        <OrderPopup
          product={product}
          onClose={() => {
            setShowOrderPopup(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ProductPopup;