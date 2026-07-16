import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUsers,
  FaBell,
  FaUserCircle,
  FaCheckDouble,
  FaTrashAlt,
  FaTimes,
  FaInfoCircle
} from "react-icons/fa";
import {
  FiSearch,
  FiSun,
  FiClock
} from "react-icons/fi";

import ProfileModal from "./ProfileModal";
import "../styles/navbar.css";

function Navbar({
  searchTerm,
  setSearchTerm,
  onSearch,
  onUpdateUser,
}) {
  const [time, setTime] = useState(new Date());
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Persistence of notifications in localStorage
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("decorNestNotifications");
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: "Welcome back to the portal session.", read: false, time: "Just now" },
      { id: 2, text: "Your leave request has been approved.", read: false, time: "1 hour ago" },
      { id: 3, text: "Daily check-in attendance updated.", read: false, time: "3 hours ago" },
      { id: 4, text: "New company announcement published.", read: true, time: "Yesterday" },
      { id: 5, text: "Performance review reports are now available.", read: true, time: "2 days ago" },
      { id: 6, text: "Upcoming department team meeting today at 4 PM.", read: true, time: "3 days ago" }
    ];
  });

  const savedUser = localStorage.getItem("decorNestUser");
  let user = { name: "Admin", role: "admin", email: "admin@decornest.com", avatar: null, department: "HR" };
  try {
    if (savedUser) {
      user = JSON.parse(savedUser);
    }
  } catch (e) {}

  useEffect(() => {
    localStorage.setItem("decorNestNotifications", JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const today = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const liveTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const hour = time.getHours();
  let greeting = "Good Evening";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleMarkOneRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Background Effects */}
      <div className="navbar-glow glow1"></div>
      <div className="navbar-glow glow2"></div>
      <div className="navbar-grid"></div>

      {/* LEFT */}
      <div className="navbar-left">
        <motion.div
          className="logo-box"
          whileHover={{
            rotate: -8,
            scale: 1.08,
          }}
        >
          <FaUsers />
        </motion.div>

        <div className="title-area">
          <h2>Employee Management System</h2>
          <div className="navbar-subtitle">
            <span className="greeting">
              <FiSun />
              {greeting}, {user.name}
            </span>
            <span className="dot"></span>
            <span>{today}</span>
          </div>
        </div>
      </div>

      {/* CENTER - Strictly Visible ONLY for Admin */}
      <div className="navbar-center">
        {user.role === "admin" && (
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
            <motion.button
              className="search-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onSearch}
            >
              Search
            </motion.button>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <motion.div
          className="time-card"
          whileHover={{ y: -3 }}
        >
          <h4>{liveTime}</h4>
          <span>LIVE</span>
        </motion.div>

        {/* Notification Bell */}
        <motion.div
          className={`notification ${unreadCount > 0 ? "has-unread" : ""}`}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          <FaBell />
          {unreadCount > 0 && (
            <span className="notification-count">
              {unreadCount}
            </span>
          )}
        </motion.div>

        <motion.div
          className="profile"
          whileHover={{ y: -3 }}
          onClick={() => setIsProfileOpen(true)}
          style={{ cursor: "pointer" }}
        >
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="profile-icon" style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <FaUserCircle className="profile-icon" />
          )}

          <div className="profile-info">
            <h4>{user.name}</h4>
            <small>{user.role === "admin" ? "HR Manager" : (user.department || "Employee")}</small>
            <div className="online-status">
              <span className="status-dot"></span>
              Online
            </div>
          </div>
        </motion.div>
      </div>

      {/* Notification Drawer Dropdown — portaled to <body> so it can never be
          trapped behind other elements by an ancestor's stacking context */}
      {createPortal(
        <AnimatePresence>
          {isDrawerOpen && (
            <>
              {/* Click outside overlay */}
              <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>

              <motion.div
                className="notification-drawer glass"
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <div className="drawer-header">
                  <h3>Notifications ({unreadCount} new)</h3>
                  <button className="close-drawer-btn" onClick={() => setIsDrawerOpen(false)}>
                    <FaTimes />
                  </button>
                </div>

                <div className="drawer-actions">
                  <button onClick={handleMarkAllRead} className="drawer-action-btn">
                    <FaCheckDouble /> Mark read
                  </button>
                  <button onClick={handleClearAll} className="drawer-action-btn delete">
                    <FaTrashAlt /> Clear all
                  </button>
                </div>

                <div className="drawer-body">
                  {notifications.length === 0 ? (
                    <div className="drawer-empty-state">
                      <FaInfoCircle className="empty-state-icon" />
                      <p>No notifications at the moment.</p>
                    </div>
                  ) : (
                    notifications.map(notif => (
                      <div
                        key={notif.id}
                        className={`notification-item ${notif.read ? "read" : "unread"}`}
                        onClick={() => handleMarkOneRead(notif.id)}
                      >
                        <div className="notification-status-dot"></div>
                        <div className="notification-item-content">
                          <p>{notif.text}</p>
                          <span><FiClock /> {notif.time}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>,
        document.body
      )}

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        onUpdateUser={onUpdateUser}
      />
    </motion.nav>
  );
}

export default Navbar;