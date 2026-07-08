import { useState, useEffect } from "react";
import "./../styles/Navbar.css";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setSticky(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={sticky ? "navbar sticky" : "navbar"}>
      <div className="navbar-container">

        {/* Logo */}

        <div className="logo">
          Decor<span>Nest</span>
        </div>

        {/* Navigation */}

        <ul className="nav-links">

          <li>
            <a href="#home">Home</a>
          </li>

          <li>
            <a href="#products">Products</a>
          </li>

          <li>
            <a href="#categories">Categories</a>
          </li>

          <li>
            <a href="#contact">Contact</a>
          </li>

        </ul>

        {/* Button */}

        <button
          className="primary-btn nav-btn"
          onClick={() =>
            document
              .getElementById("products")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Shop Now
        </button>

      </div>
    </nav>
  );
};

export default Navbar;