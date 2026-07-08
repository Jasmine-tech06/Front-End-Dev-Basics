import "../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero" id="home">

      <div className="hero-left">

        <p className="hero-tag">
          ✨ New Minimalist Collection 2026
        </p>

        <h1 className="hero-title">
          Elevate Your
          <br />
          Home With
          <span> Timeless Elegance</span>
        </h1>

        <p className="hero-description">
          Discover thoughtfully designed home décor that combines
          simplicity, warmth, and modern aesthetics. Every product
          is carefully selected to transform your living space into
          a place you'll truly love.
        </p>

        <div className="hero-buttons">

          <button
            className="hero-primary-btn"
            onClick={() =>
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Shop Collection
          </button>

          <button
            className="hero-secondary-btn"
            onClick={() =>
              document
                .getElementById("why-us")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Learn More
          </button>

        </div>

      </div>

      <div className="hero-right">

        <div className="hero-image-card">

          <img
            src="https://images.unsplash.com/photo-1617806265182-7b3f847f0b75?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW50cm8lMjBwaWMlMjBmb3IlMjBob21lJTIwZGVjb3IlMjBwcm9kdWN0c3xlbnwwfHwwfHx8MA%3D%3D"
            alt="DecorNest Hero"
            className="hero-image"
          />

          <div className="floating-card top-card">
            ⭐ Premium Quality
          </div>

          <div className="floating-card bottom-card">
            🚚 Free Delivery
          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;