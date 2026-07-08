import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";
import CartDrawer from "./CartDrawer";
import "./../styles/Navbar.css";

const Navbar = ({ onCheckout }) => {
  const [sticky, setSticky] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <nav className={sticky ? "navbar sticky" : "navbar"}>
        <div className="navbar-container">

          {/* Logo */}
          <Logo />

          {/* Navigation */}
          <ul className="nav-links">
            <li>
              <button onClick={() => scrollToSection("home")}>
                Home
              </button>
            </li>

            <li>
              <button onClick={() => scrollToSection("products")}>
                Products
              </button>
            </li>

            <li>
              <button onClick={() => scrollToSection("categories")}>
                Categories
              </button>
            </li>

            <li>
              <button onClick={() => scrollToSection("contact")}>
                Contact
              </button>
            </li>
          </ul>

          {/* Right Side */}
          <div className="nav-actions">

            <div
              className="cart-icon"
              onClick={() => setCartOpen(true)}
            >
              🛒

              {totalItems > 0 && (
                <span className="cart-count">
                  {totalItems}
                </span>
              )}
            </div>

            <button
              className="primary-btn nav-btn"
              onClick={() => scrollToSection("products")}
            >
              Shop Now
            </button>

          </div>

        </div>
      </nav>

      <CartDrawer
  open={cartOpen}
  onClose={() => setCartOpen(false)}
  onCheckout={onCheckout}
/>
    </>
  );
};

export default Navbar;