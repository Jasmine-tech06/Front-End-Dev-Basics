import { useState } from "react";
import SuccessPopup from "./SuccessPopup";
import "../styles/OrderPopup.css";

const OrderPopup = ({ product, onClose }) => {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [showSuccess, setShowSuccess] = useState(false);

  const placeOrder = () => {
    if (
      customerName.trim() === "" ||
      phone.trim() === "" ||
      address.trim() === ""
    ) {
      alert("Please fill all the details.");
      return;
    }

    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      <div className="order-overlay">

        <div className="order-popup">

          <button
            className="order-close"
            onClick={onClose}
          >
            ✕
          </button>

          <h2>Complete Your Order</h2>

          <div className="order-product">

            <img
              src={product.image}
              alt={product.name}
            />

            <div>

              <h3>{product.name}</h3>

              <p>₹{product.price}</p>

            </div>

          </div>

          <label>Full Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <label>Phone Number</label>

          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <label>Delivery Address</label>

          <textarea
            rows="4"
            placeholder="Enter delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Quantity</label>

          <select
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>

          <label>Payment Method</label>

          <select
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          >
            <option>Cash on Delivery</option>
            <option>UPI</option>
            <option>Credit / Debit Card</option>
          </select>

          <div className="order-total">

            <span>Total</span>

            <h3>₹{product.price * quantity}</h3>

          </div>

          <button
            className="primary-btn place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

        </div>

      </div>

      {showSuccess && (
        <SuccessPopup
          customerName={customerName}
          productName={product.name}
          onClose={closeSuccess}
        />
      )}
    </>
  );
};

export default OrderPopup;