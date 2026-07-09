import { motion, AnimatePresence } from "framer-motion";
import { FaTrashAlt, FaTimes } from "react-icons/fa";
import "../styles/DeleteModal.css";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="delete-modal"
            initial={{
              scale: 0.7,
              opacity: 0,
              y: 40,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              y: 0,
            }}
            exit={{
              scale: 0.7,
              opacity: 0,
              y: 40,
            }}
            transition={{
              duration: 0.3,
            }}
          >
            <div className="warning-icon">
              <FaTrashAlt />
            </div>

            <h2>Delete Employee?</h2>

            <p>
              This action cannot be undone.
              <br />
              Are you sure you want to delete this employee?
            </p>

            <div className="modal-buttons">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cancel-btn"
                onClick={onClose}
              >
                <FaTimes />
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="confirm-btn"
                onClick={onConfirm}
              >
                <FaTrashAlt />
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteModal;