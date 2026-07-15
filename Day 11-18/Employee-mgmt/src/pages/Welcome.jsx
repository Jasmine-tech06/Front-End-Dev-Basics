import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import BrandLogo from "../components/BrandLogo";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">
      {/* Premium dark glowing backdrops */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
      <div className="landing-grid-overlay"></div>

      <motion.div
        className="welcome-card glass"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Consistent premium logo icon */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "25px" }}>
          <BrandLogo size={90} />
        </div>

        <h1>
          Decor<span>Nest</span>
        </h1>
        <h2 className="brand-subtitle">
          Employee Management System
        </h2>

        <p>
          Welcome to a smart and modern employee management platform.
          Easily add, edit, update and manage employee records with a
          beautiful dashboard experience.
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/select-role")}
        >
          Get Started
          <FaArrowRight />
        </button>
      </motion.div>
    </div>
  );
}

export default Welcome;