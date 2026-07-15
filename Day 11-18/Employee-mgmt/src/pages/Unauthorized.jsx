import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaHome } from "react-icons/fa";
import "../styles/Unauthorized.css";

function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauthorized-page">
      <div className="unauthorized-blob"></div>

      <motion.div
        className="unauthorized-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="lock-icon-wrapper">
          <FaLock />
        </div>

        <h1>
          Access <span>Denied</span>
        </h1>

        <p>
          You do not have permission to access this page. This dashboard view is restricted to specific user roles.
        </p>

        <button
          className="back-home-btn"
          onClick={() => navigate("/")}
        >
          <FaHome />
          Return Home
        </button>
      </motion.div>
    </div>
  );
}

export default Unauthorized;
