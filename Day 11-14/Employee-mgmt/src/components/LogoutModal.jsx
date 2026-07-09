import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/LogoutModal.css";

function LogoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="logout-overlay" onClick={onClose}>
      <motion.div
        className="logout-modal"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Logout</h2>

        <p>Are you sure you want to logout?</p>

        <div className="logout-actions">
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button className="confirm-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default LogoutModal;