import { motion } from "framer-motion";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import {
  FaBuilding,
  FaHome,
  FaUsers,
  FaUserPlus,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar() {
    const [showLogout, setShowLogout] = useState(false);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <motion.aside
      className="sidebar"
      initial={{ x: -120 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Logo */}

      <motion.div
        className="sidebar-logo"
        whileHover={{ scale: 1.05 }}
      >
        <div className="logo-circle">
          <FaBuilding />
        </div>

        <div>
          <h2>EMS</h2>
          <p>Employee System</p>
        </div>
      </motion.div>

      {/* Menu */}

      <ul className="sidebar-menu">

        <motion.li
          whileHover={{ x: 10 }}
          className="active"
          onClick={() => scrollToSection("dashboard")}
        >
          <FaHome />
          <span>Dashboard</span>
        </motion.li>

        <motion.li
          whileHover={{ x: 10 }}
          onClick={() => scrollToSection("employees")}
        >
          <FaUsers />
          <span>Employees</span>
        </motion.li>

        <motion.li
          whileHover={{ x: 10 }}
          onClick={() => scrollToSection("addEmployee")}
        >
          <FaUserPlus />
          <span>Add Employee</span>
        </motion.li>

        <motion.li
          whileHover={{ x: 10 }}
          onClick={() => scrollToSection("analytics")}
        >
          <FaChartPie />
          <span>Analytics</span>
        </motion.li>

        <motion.li
          whileHover={{ x: 10 }}
          onClick={() => scrollToSection("settings")}
        >
          <FaCog />
          <span>Settings</span>
        </motion.li>

      </ul>

      {/* Bottom */}

     <motion.button
  className="logout-btn"
  whileHover={{
    scale: 1.05,
    backgroundColor: "#dc2626",
  }}
  whileTap={{ scale: 0.95 }}
  onClick={() => setShowLogout(true)}
>
  <FaSignOutAlt />
  Logout
</motion.button>
<LogoutModal
  isOpen={showLogout}
  onClose={() => setShowLogout(false)}
/>
    </motion.aside>
  );
}

export default Sidebar;