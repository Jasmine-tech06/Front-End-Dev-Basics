import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import "../styles/NotFound.css";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-page">
      <div className="notfound-blob"></div>

      <motion.div
        className="notfound-card"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="error-code">404</h1>

        <h2>Page Not Found</h2>

        <p>
          The page you are looking for does not exist or has been moved. Check the URL or navigate back to the home page.
        </p>

        <button
          className="notfound-btn"
          onClick={() => navigate("/")}
        >
          <FaHome />
          Back to Home
        </button>
      </motion.div>
    </div>
  );
}

export default NotFound;
