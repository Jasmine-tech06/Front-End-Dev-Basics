import React from "react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <div className="newsletter-container">
        <h2>Stay Inspired with DecorNest</h2>

        <p>
          Subscribe to receive exclusive offers, new arrivals, home décor
          inspiration, and styling tips directly to your inbox.
        </p>

        <div className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email address"
          />

          <button>Subscribe</button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;