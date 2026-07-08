import "../styles/SuccessPopup.css";

const SuccessPopup = ({
  customerName,
  productName,
  onClose,
}) => {
  return (
    <div className="success-overlay">

      <div className="success-popup">

        <div className="success-icon">
          ✓
        </div>

        <h2>Order Successfully Placed!</h2>

        <p className="success-message">
          Thank you,
          <strong> {customerName}</strong>!
        </p>

        <p className="product-message">
          Your order for
          <strong> {productName}</strong>
          has been placed successfully.
        </p>

        <div className="delivery-box">

          <h3>Estimated Delivery</h3>

          <p>🚚 3 - 5 Business Days</p>

        </div>

        <button
          className="primary-btn"
          onClick={onClose}
        >
          Continue Shopping
        </button>

      </div>

    </div>
  );
};

export default SuccessPopup;