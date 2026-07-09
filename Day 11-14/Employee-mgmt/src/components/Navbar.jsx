import { motion } from "framer-motion";
import { FaUsers, FaBell, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import "../styles/Navbar.css";

function Navbar({
  searchTerm,
  setSearchTerm,
  onSearch,
}) {
    const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-left">
        <div className="logo-box">
          <FaUsers />
        </div>

        <div>
          <h2>Employee Management</h2>
          <p>{today}</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-box">
          <FiSearch />
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
  whileHover={{
    scale: 1.12,
    rotate: 10,
    y: -3,
  }}
  whileTap={{
    scale: 0.9,
    rotate: -10,
  }}
  transition={{
    type: "spring",
    stiffness: 300,
  }}
  onClick={onSearch}
>
  <FiSearch />
</motion.button>
        </div>

        <motion.div
          className="notification"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBell />
          <span className="notification-dot"></span>
        </motion.div>

        <div className="profile">
          <FaUserCircle />
          <div>
            <h4>Admin</h4>
            <small>HR Manager</small>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;