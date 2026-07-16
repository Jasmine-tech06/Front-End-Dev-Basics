import { motion } from "framer-motion";
import { useState } from "react";
import LogoutModal from "./LogoutModal";
import BrandLogo from "./BrandLogo";

import {
  FaHome,
  FaUsers,
  FaUserPlus,
  FaBuilding,
  FaCalendarCheck,
  FaFilePdf,
  FaChartPie,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCircle,
  FaFileAlt,
  FaMoneyBillWave
} from "react-icons/fa";

import "../styles/Sidebar.css";

function Sidebar({ activeMenu, setActiveMenu, isCollapsed, setIsCollapsed }) {
  const [showLogout, setShowLogout] = useState(false);

  const savedUser = localStorage.getItem("decorNestUser");
  let user = null;
  try {
    user = savedUser ? JSON.parse(savedUser) : null;
  } catch (e) {}

  const role = user?.role || "admin";

  // Explicit, functional Admin menu items
  const adminMenuItems = [
    { id: "dashboard", title: "Dashboard", icon: <FaHome /> },
    { id: "employees", title: "Employees", icon: <FaUsers /> },
    { id: "addEmployee", title: "Add Employee", icon: <FaUserPlus /> },
    { id: "departments", title: "Departments", icon: <FaBuilding /> },
    { id: "attendance", title: "Attendance", icon: <FaCalendarCheck /> },
    { id: "reports", title: "Reports", icon: <FaFilePdf /> },
    { id: "analytics", title: "Analytics", icon: <FaChartPie /> },
    { id: "settings", title: "Settings", icon: <FaCog /> },
  ];

  // Explicit, functional Employee menu items
  const employeeMenuItems = [
    { id: "dashboard", title: "Dashboard", icon: <FaHome /> },
    { id: "attendance", title: "Attendance", icon: <FaCalendarCheck /> },
    { id: "leaves", title: "Leaves", icon: <FaFileAlt /> },
    { id: "departmentDetails", title: "Department", icon: <FaBuilding /> },
    { id: "salary", title: "Salary", icon: <FaMoneyBillWave /> },
    { id: "settings", title: "Settings", icon: <FaCog /> },
  ];

  // Dynamically resolve FaFileAlt and FaMoneyBillWave if needed
  const menuItems = role === "admin" ? adminMenuItems : employeeMenuItems;

  return (
    <motion.aside
      className={`sidebar ${isCollapsed ? "collapsed" : ""}`}
      initial={{ x: -120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative Background Glows */}
      <div className="sidebar-blur blur1"></div>
      <div className="sidebar-blur blur2"></div>

      {/* Collapse Toggle Trigger */}
      <button 
        className="sidebar-toggle-btn"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
      </button>

      {/* Brand */}
      <div className="sidebar-brand">
        <motion.div
          whileHover={{ rotate: 8, scale: 1.08 }}
          transition={{ duration: 0.3 }}
        >
          <BrandLogo size={42} />
        </motion.div>

        {!isCollapsed && (
          <>
            <h1>
              Decor<span>Nest</span>
            </h1>
            <p className="brand-subtitle">Employee Management</p>
            <div className="brand-status">
              <FaCircle />
              <span>System Online</span>
            </div>
          </>
        )}
      </div>

      {/* Navigation List */}
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <motion.li
            key={item.id}
            whileHover={{ x: isCollapsed ? 0 : 8, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={activeMenu === item.id ? "menu-card active" : "menu-card"}
            onClick={() => setActiveMenu(item.id)}
            title={isCollapsed ? item.title : ""}
          >
            <div className="active-line"></div>
            <div className="menu-glow"></div>
            <div className="menu-icon">{item.icon}</div>
            {!isCollapsed && <span data-testid={item.id}>{item.title}</span>}
          </motion.li>
        ))}
      </ul>

      <div className="sidebar-divider"></div>

      {/* Logout button at the bottom of both sidebars */}
      <motion.div
        className="logout-card"
        whileHover={{ x: isCollapsed ? 0 : 8, scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setShowLogout(true)}
        title={isCollapsed ? "Logout" : ""}
      >
        <div className="logout-icon">
          <FaSignOutAlt />
        </div>
        {!isCollapsed && <span data-testid="logout">Logout</span>}
      </motion.div>

      {/* Logout confirmation pop-up modal */}
      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </motion.aside>
  );
}


export default Sidebar;