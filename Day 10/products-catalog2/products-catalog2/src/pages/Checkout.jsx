import { useState } from "react";
import { useCart } from "../context/CartContext";
import SuccessPopup from "../components/SuccessPopup";
import "../styles/Checkout.css";

const Checkout = ({ onBackToShop }) => {
  const { cartItems, clearCart } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = 0;
  const discount = 0;
  const total = subtotal + shipping - discount;

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Add some products before checking out.");
      return;
    }

    if (
      customerName.trim() === "" ||
      phone.trim() === "" ||
      email.trim() === "" ||
      address.trim() === "" ||
      city.trim() === "" ||
      state.trim() === "" ||
      pincode.trim() === ""
    ) {
      alert("Please fill all the details.");
      return;
    }

    setShowSuccess(true);
  };

  const closeSuccess = () => {
    setShowSuccess(false);
    clearCart();
    if (onBackToShop) onBackToShop();
  };

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* Left Side */}
        <div className="customer-details">

          <h2>Customer Details</h2>

          <input
            type="text"
            placeholder="Full Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <textarea
            placeholder="Delivery Address"
            rows="4"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>

          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <input
            type="text"
            placeholder="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />

          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />

        </div>

        {/* Right Side */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div className="checkout-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="checkout-item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <p className="checkout-item-price">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>
          )}

          <div className="summary-box">

            <p>
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </p>

            <p>
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </p>

            <p>
              <span>Discount</span>
              <span>₹{discount}</span>
            </p>

            <hr />

            <h3>
              <span>Total</span>
              <span>₹{total}</span>
            </h3>

          </div>

          <button
            className="place-order-btn"
            onClick={placeOrder}
          >
            Place Order
          </button>

          <button
            className="back-to-shop-btn"
            onClick={onBackToShop}
          >
            ← Back to Shop
          </button>

        </div>

      </div>

      {showSuccess && (
        <SuccessPopup
          customerName={customerName}
          productName={
            cartItems.length === 1
              ? cartItems[0].name
              : `${cartItems.length} items`
          }
          onClose={closeSuccess}
        />
      )}

    </div>
  );
};

export default Checkout;
