import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
  FaCircle,
} from "react-icons/fa";

import "../styles/EmployeeDetailsModal.css";

function EmployeeDetailsModal({ employee, onClose }) {
  useEffect(() => {
    if (!employee) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [employee, onClose]);

  return createPortal(
    <AnimatePresence>
      {employee && (
        <motion.div
          className="details-overlay"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{
              opacity: 0,
              y: 60,
              scale: 0.85,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 60,
              scale: 0.85,
            }}
            transition={{
              duration: .45,
            }}
          >
            <div className="modal-glow glow-one"></div>
            <div className="modal-glow glow-two"></div>

            <button
              className="close-btn"
              onClick={onClose}
            >
              <FaTimes />
            </button>

            <div className="profile-wrapper">

              <img
                src={employee.image}
                alt={employee.name}
                className="details-image"
              />

              <div className="online-badge">
                <FaCircle />
              </div>

            </div>

            <h2>{employee.name}</h2>

            <p className="employee-role">
              Employee Profile
            </p>

            <div className="details-info">

              <div className="info-card">
                <FaIdBadge />
                <div>
                  <label>Employee ID</label>
                  <span>{employee.id}</span>
                </div>
              </div>

              <div className="info-card">
                <FaEnvelope />
                <div>
                  <label>Email Address</label>
                  <span>{employee.email}</span>
                </div>
              </div>

              <div className="info-card">
                <FaBuilding />
                <div>
                  <label>Department</label>
                  <span>{employee.department}</span>
                </div>
              </div>

              <div className="info-card">
                <FaUser />
                <div>
                  <label>Status</label>
                  <span className="active-status">
                    Active
                  </span>
                </div>
              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default EmployeeDetailsModal;