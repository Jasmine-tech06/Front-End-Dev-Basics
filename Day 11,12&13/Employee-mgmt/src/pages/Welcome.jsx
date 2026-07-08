import { useNavigate } from "react-router-dom";
import { FaUsersCog, FaArrowRight } from "react-icons/fa";
import "../styles/Welcome.css";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="welcome-page">

      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      <div className="welcome-card">

        <div className="logo-circle">
          <FaUsersCog />
        </div>

        <h1>
          Employee Management
          <span> System</span>
        </h1>

        <p>
          Welcome to a smart and modern employee management platform.
          Easily add, edit, update and manage employee records with a
          beautiful dashboard experience.
        </p>

        <button
          className="start-btn"
          onClick={() => navigate("/dashboard")}
        >
          Get Started
          <FaArrowRight />
        </button>

      </div>

    </div>
  );
}

export default Welcome;