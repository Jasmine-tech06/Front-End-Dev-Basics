import "./../styles/Logo.css";

const Logo = () => {
  return (
    <div className="logo-container">

      <img
        src="/images/logo/logo.png"
        alt="DecorNest Logo"
        className="logo-image"
      />

      <div>

        <h2 className="logo-text">
          Decor<span>Nest</span>
        </h2>

        <p className="logo-tagline">
          Minimalist Home Decor
        </p>

      </div>

    </div>
  );
};

export default Logo;