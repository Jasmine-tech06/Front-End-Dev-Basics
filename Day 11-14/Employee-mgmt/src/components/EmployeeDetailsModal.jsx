import { motion, AnimatePresence } from "framer-motion";
import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaBuilding,
  FaIdBadge,
} from "react-icons/fa";

import "../styles/EmployeeDetailsModal.css";

function EmployeeDetailsModal({ employee, onClose }) {
  return (
    <AnimatePresence>
      {employee && (
        <motion.div
          className="details-overlay"
          onClick={onclose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="details-modal"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <button
              className="close-btn"
              onClick={onClose}
            >
              <FaTimes />
            </button>

            <img
              src={employee.image}
              alt={employee.name}
              className="details-image"
            />

            <h2>{employee.name}</h2>

            <div className="details-info">

              <p>
                <FaIdBadge />
                <span>ID :</span> {employee.id}
              </p>

              <p>
                <FaEnvelope />
                <span>Email :</span> {employee.email}
              </p>

              <p>
                <FaBuilding />
                <span>Department :</span> {employee.department}
              </p>

              <p>
                <FaUser />
                <span>Status :</span> Active
              </p>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EmployeeDetailsModal;