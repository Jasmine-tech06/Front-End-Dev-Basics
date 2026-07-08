import { useEffect, useState } from "react";
import "../styles/Welcome.css";

const Welcome = ({ onExplore }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <section className="welcome-page">

      {/* Floating Background Shapes */}
      <div className="shape shape1"></div>
      <div className="shape shape2"></div>
      <div className="shape shape3"></div>
      <div className="shape shape4"></div>

      <div className={`welcome-container ${showContent ? "show" : ""}`}>

        <img
          src="/images/logo/logo.png"
          alt="DecorNest Logo"
          className="welcome-logo"
        />

        <p className="welcome-tag">
          PREMIUM MINIMALIST HOME DECOR
        </p>

        <h1 className="welcome-title">
          Decor<span>Nest</span>
        </h1>

        <h2 className="welcome-heading">
          Design a Home
          <br />
          You'll Love Forever
        </h2>

        <p className="welcome-description">
          Discover elegant home décor crafted to bring warmth,
          beauty and timeless simplicity into every corner of
          your home.
        </p>

        <button
          className="explore-btn"
          onClick={onExplore}
        >
          Explore Collection
        </button>

      </div>

      {/* Statistics */}
      <div className="stats-section">

        <div className="stat-card">
          <h2>500+</h2>
          <p>Happy Customers</p>
        </div>

        <div className="stat-card">
          <h2>40+</h2>
          <p>Premium Products</p>
        </div>

        <div className="stat-card">
          <h2>15+</h2>
          <p>Collections</p>
        </div>

        <div className="stat-card">
          <h2>99%</h2>
          <p>Customer Satisfaction</p>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span></span>
      </div>

    </section>
  );
};

export default Welcome;