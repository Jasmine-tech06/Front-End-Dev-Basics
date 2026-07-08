import { useCart } from "../context/CartContext";
import "../components/CartDrawer.css";

const CartDrawer = ({ open, onClose, onCheckout }) => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  if (!open) return null;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cart-header">
          <h2>🛒 Shopping Cart</h2>

          <button
            className="close-cart"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h3>Your cart is empty</h3>
            <p>Add beautiful décor items to get started.</p>
          </div>
        ) : (
          <>
            <div className="cart-items">

              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-item"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                  />

                  <div className="cart-info">

                    <h4>{item.name}</h4>

                    <p>₹{item.price}</p>

                    <div className="quantity-controls">

                      <button
                        onClick={() =>
                          decreaseQuantity(item.id)
                        }
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() =>
                          increaseQuantity(item.id)
                        }
                      >
                        +
                      </button>

                    </div>

                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    🗑
                  </button>

                </div>
              ))}

            </div>

            <div className="cart-footer">

              <h3>
                Total : ₹{totalPrice}
              </h3>

              <button
                className="primary-btn"
                onClick={() => {
                  onClose();
                  onCheckout();
                }}
              >
                Checkout
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;