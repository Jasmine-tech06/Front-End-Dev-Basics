import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaCog, FaPalette, FaBell, FaShieldAlt, FaInfoCircle, FaSave, FaSun, FaMoon } from "react-icons/fa";
import toast from "react-hot-toast";
import { applyTheme, getStoredTheme } from "../utils/theme";
import "../styles/SettingsPage.css";

function SettingsPage() {
  const [activeTab, setActiveTab] = useState("appearance");
  
  // Settings state
  const [settings, setSettings] = useState({
    theme: getStoredTheme(),
    sidebarCollapse: false,
    emailNotifications: true,
    pushNotifications: false,
    sessionTimeout: "30", // in minutes
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    const savedSettings = localStorage.getItem("decorNestSettings");
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      // Guard against a previously-corrupted boolean theme value from the old buggy toggle
      const safeTheme = parsed.theme === "light" ? "light" : "dark";
      setSettings({ ...parsed, theme: safeTheme });
      applyTheme(safeTheme);
    } else {
      applyTheme("dark");
    }
  }, []);

  const handleThemeChange = (theme) => {
    const updated = { ...settings, theme };
    setSettings(updated);
    localStorage.setItem("decorNestSettings", JSON.stringify(updated));
    applyTheme(theme);
    toast.success(`Theme switched to ${theme === "dark" ? "Dark" : "Light"} mode!`);
  };

  const handleToggle = (key) => {
    const updated = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(updated);
    localStorage.setItem("decorNestSettings", JSON.stringify(updated));
    toast.success("Setting updated!");
  };

  const handleSelectChange = (key, val) => {
    const updated = {
      ...settings,
      [key]: val
    };
    setSettings(updated);
    localStorage.setItem("decorNestSettings", JSON.stringify(updated));
    toast.success(`Timeout set to ${val} minutes!`);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    // Success
    toast.success("Password changed successfully!");
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
  };

  return (
    <motion.div
      className="settings-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="settings-header">
        <h2>
          <FaCog /> Settings
        </h2>
      </div>

      <div className="settings-tabs">
        <button
          className={`settings-tab-btn ${activeTab === "appearance" ? "active" : ""}`}
          onClick={() => setActiveTab("appearance")}
        >
          <FaPalette /> Appearance
        </button>
        <button
          className={`settings-tab-btn ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          <FaBell /> Notifications
        </button>
        <button
          className={`settings-tab-btn ${activeTab === "security" ? "active" : ""}`}
          onClick={() => setActiveTab("security")}
        >
          <FaShieldAlt /> Security
        </button>
        <button
          className={`settings-tab-btn ${activeTab === "about" ? "active" : ""}`}
          onClick={() => setActiveTab("about")}
        >
          <FaInfoCircle /> About
        </button>
      </div>

      <div className="settings-content">
        {activeTab === "appearance" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="settings-section-title">Visual Appearance</h3>
            <div className="settings-option-row">
              <div className="settings-option-info">
                <h4>Appearance Theme</h4>
                <p>Switch instantly between a dark SaaS layout and a bright light theme.</p>
              </div>
              <div className="theme-toggle-buttons">
                <button
                  type="button"
                  className={`theme-toggle-btn ${settings.theme === "dark" ? "active" : ""}`}
                  onClick={() => handleThemeChange("dark")}
                >
                  <FaMoon /> Dark
                </button>
                <button
                  type="button"
                  className={`theme-toggle-btn ${settings.theme === "light" ? "active" : ""}`}
                  onClick={() => handleThemeChange("light")}
                >
                  <FaSun /> Light
                </button>
              </div>
            </div>

            <div className="settings-option-row">
              <div className="settings-option-info">
                <h4>Collapse Sidebar</h4>
                <p>Toggle the sidebar compact/uncollapsed view.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.sidebarCollapse}
                  onChange={() => handleToggle("sidebarCollapse")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </motion.div>
        )}

        {activeTab === "notifications" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="settings-section-title">Notification Alerts</h3>
            <div className="settings-option-row">
              <div className="settings-option-info">
                <h4>Email Notifications</h4>
                <p>Receive weekly summary reports and leave approval alerts.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={() => handleToggle("emailNotifications")}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="settings-option-row">
              <div className="settings-option-info">
                <h4>Push Alerts</h4>
                <p>Enable live desktop notifications for clock reminders.</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={() => handleToggle("pushNotifications")}
                />
                <span className="slider"></span>
              </label>
            </div>
          </motion.div>
        )}

        {activeTab === "security" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="settings-section-title">Account Security</h3>
            
            <div className="settings-option-row">
              <div className="settings-option-info">
                <h4>Session Timeout</h4>
                <p>Specify the idle time threshold to logout automatically.</p>
              </div>
              <select
                className="settings-select"
                value={settings.sessionTimeout}
                onChange={(e) => handleSelectChange("sessionTimeout", e.target.value)}
              >
                <option value="15">15 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="60">60 Minutes</option>
                <option value="120">120 Minutes</option>
              </select>
            </div>

            <form onSubmit={handlePasswordSubmit} style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "15px" }}>
              <h4>Change Account Password</h4>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "12px", color: "#8fa7c8" }}>Current Password</label>
                <input
                  type="password"
                  className="settings-input"
                  placeholder="••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "12px", color: "#8fa7c8" }}>New Password</label>
                <input
                  type="password"
                  className="settings-input"
                  placeholder="••••••••"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <label style={{ fontSize: "12px", color: "#8fa7c8" }}>Confirm New Password</label>
                <input
                  type="password"
                  className="settings-input"
                  placeholder="••••••••"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                />
              </div>

              <button type="submit" className="save-profile-btn" style={{ marginTop: "10px" }}>
                <FaSave /> Update Password
              </button>
            </form>
          </motion.div>
        )}

        {activeTab === "about" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="settings-section-title">Application Info</h3>
            <div className="profile-details-grid">
              <div className="profile-detail-item">
                <label>App Name</label>
                <span>DecorNest Hub</span>
              </div>
              <div className="profile-detail-item">
                <label>Application Subtitle</label>
                <span>Employee Management System</span>
              </div>
              <div className="profile-detail-item">
                <label>Current Version</label>
                <span>v1.2.5 (Stable Build)</span>
              </div>
              <div className="profile-detail-item">
                <label>Developer Details</label>
                <span>DecorNest Technical Core Team</span>
              </div>
              <div className="profile-detail-item">
                <label>License</label>
                <span>Enterprise SaaS License</span>
              </div>
              <div className="profile-detail-item">
                <label>Vite Build Engine</label>
                <span>v8.1.1</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default SettingsPage;
