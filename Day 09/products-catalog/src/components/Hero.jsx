import "./../styles/Hero.css";

const Hero = ({ onExplore }) => {
  return (
    <section className="hero" id="home">

      {/* Decorative Circles */}

      <div className="circle circle1"></div>
      <div className="circle circle2"></div>
      <div className="circle circle3"></div>

      <div className="hero-container">

        <div className="hero-content">

          <p className="hero-tag">
            ✨ Welcome to DecorNest
          </p>

          <h1 className="hero-title">
            Elevate Your
            <span> Home </span>
            With Timeless
            <br />
            Minimalist Décor
          </h1>

          <p className="hero-description">
            Discover carefully curated home décor products that blend
            simplicity, elegance, and modern craftsmanship.
            Transform every corner of your home into a beautiful,
            peaceful living space.
          </p>

          <button
            className="primary-btn hero-btn"
            onClick={onExplore}
          >
            Explore Collection →
          </button>

        </div>

        <div className="hero-right">

          <div className="hero-card">

            <h3>DecorNest</h3>

            <p>
              Minimal Living
            </p>

            <div className="card-line"></div>

            <div className="hero-stats">

              <div>
                <h2>28+</h2>
                <span>Products</span>
              </div>

              <div>
                <h2>10+</h2>
                <span>Categories</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="scroll-down">
        ↓ Scroll
      </div>

    </section>
  );
};

export default Hero;