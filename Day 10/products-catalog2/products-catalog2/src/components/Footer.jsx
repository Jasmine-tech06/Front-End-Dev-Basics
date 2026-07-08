import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        <div className="footer-left">

          <h2>
            Decor<span>Nest</span>
          </h2>

          <p>
            Transform your home with timeless minimalist décor.
            Every piece is thoughtfully selected to bring elegance,
            warmth, and simplicity into your living space.
          </p>

        </div>

        <div className="footer-center">

          <h3>Quick Links</h3>

          <ul>

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

        </div>

        <div className="footer-right">

          <h3>Contact Us</h3>

          <p>📍 Chennai, Tamil Nadu</p>

          <p>📞 +91 98765 43210</p>

          <p>✉️ support@decornest.com</p>

          <p>🕒 Mon - Sat | 9:00 AM - 7:00 PM</p>

        </div>

      </div>

      <div className="footer-bottom">

        © 2026 DecorNest. All Rights Reserved.

      </div>

    </footer>
  );
};

export default Footer;