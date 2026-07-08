import "../styles/DeleteModal.css";

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="delete-modal">

        <div className="warning-icon">⚠️</div>

        <h2>Delete Employee?</h2>

        <p>
          This action cannot be undone.
          Are you sure you want to delete this employee?
        </p>

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default DeleteModal;