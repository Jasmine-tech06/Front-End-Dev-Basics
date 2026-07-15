import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../styles/LogoutModal.css";

function LogoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem("decorNestUser");
    toast.success("Logout Successful");
    navigate("/login");
  };

  return createPortal(
    <AnimatePresence>
      <div className="logout-overlay" onClick={onClose}>
        <motion.div
          className="logout-modal glass"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <h2>Logout Session</h2>
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
    </AnimatePresence>,
    document.body
  );
}

export default LogoutModal;