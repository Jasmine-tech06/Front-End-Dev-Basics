import { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaUserEdit, FaKey, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";

import EmployeeProfile from "./EmployeeProfile";
import "../styles/ProfileModal.css";

function ChangePasswordForm({ onDone }) {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!current.trim() || !next.trim() || !confirm.trim()) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (next.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (next !== confirm) {
      toast.error("New password and confirmation do not match.");
      return;
    }
    toast.success("Password updated successfully!");
    onDone();
  };

  return (
    <form className="profile-password-form" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Current Password</label>
        <input type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="••••••••" />
      </div>
      <div className="form-field">
        <label>New Password</label>
        <input type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="••••••••" />
      </div>
      <div className="form-field">
        <label>Confirm New Password</label>
        <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
      </div>
      <button type="submit" className="save-profile-btn">
        <FaKey /> Update Password
      </button>
    </form>
  );
}

function ProfileModal({ isOpen, onClose, user, onUpdateUser }) {
  const [mode, setMode] = useState("view"); // 'view' | 'edit' | 'password'

  if (!isOpen) return null;

  const handleClose = () => {
    setMode("view");
    onClose();
  };

  return createPortal(
    <AnimatePresence>
      <div className="profile-modal-overlay" onClick={handleClose}>
        <motion.div
          className="profile-modal glass"
          initial={{ scale: 0.92, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="profile-modal-header">
            {mode !== "view" ? (
              <button className="profile-modal-back" onClick={() => setMode("view")}>
                <FaArrowLeft /> Back
              </button>
            ) : (
              <span className="profile-modal-title">My Profile</span>
            )}
            <button className="profile-modal-close" onClick={handleClose}>
              <FaTimes />
            </button>
          </div>

          <div className="profile-modal-body">
            {mode === "password" ? (
              <div className="emp-view-card" style={{ padding: "30px" }}>
                <h2 style={{ color: "white", fontSize: "18px", marginBottom: "20px" }}>Change Password</h2>
                <ChangePasswordForm onDone={() => setMode("view")} />
              </div>
            ) : (
              <EmployeeProfile
                user={user}
                isEditMode={mode === "edit"}
                onUpdateUser={() => {
                  onUpdateUser?.();
                  setMode("view");
                }}
              />
            )}
          </div>

          {mode === "view" && (
            <div className="profile-modal-actions">
              <button className="profile-action-btn" onClick={() => setMode("edit")}>
                <FaUserEdit /> Edit Profile
              </button>
              <button className="profile-action-btn secondary" onClick={() => setMode("password")}>
                <FaKey /> Change Password
              </button>
              <button className="profile-action-btn ghost" onClick={handleClose}>
                Close
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}

export default ProfileModal;
