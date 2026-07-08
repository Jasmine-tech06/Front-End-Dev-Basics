import { useState } from "react";
import OrderPopup from "./OrderPopup";
import "../styles/ProductPopup.css";

const ProductPopup = ({ product, onClose }) => {
  const [showOrderPopup, setShowOrderPopup] = useState(false);

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

            <button
              className="primary-btn popup-btn"
              onClick={() => setShowOrderPopup(true)}
            >
              Place Order
            </button>

          </div>

        </div>

      </div>

      {showOrderPopup && (
        <OrderPopup
product={product}
onClose={()=>{
setShowOrderPopup(false);
onClose();
}}
/>
      )}
    </>
  );
};

export default ProductPopup;