import { motion } from "framer-motion";
import { FaDownload, FaFilePdf } from "react-icons/fa";

import { exportEmployees } from "../utils/exportToExcel";
import { exportPDF } from "../utils/exportToPDF";

import "../styles/DashboardHeader.css";

function DashboardHeader({ employees }) {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <motion.div
      className="dashboard-header-card"
      initial={{ opacity: 0, y: -60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <div className="header-left">
        <motion.h1
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {greeting} 👋
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Welcome back! Manage your employees efficiently with our modern
          Employee Management System.
        </motion.p>
      </div>

      <div className="export-buttons">
        {/* Excel Button */}
        <motion.button
          className="export-btn"
          whileHover={{ scale: 1.08, rotate: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => exportEmployees(employees)}
        >
          <FaDownload />
          Export Excel
        </motion.button>

        {/* PDF Button */}
        <motion.button
          className="pdf-btn"
          whileHover={{ scale: 1.08, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => exportPDF(employees)}
        >
          <FaFilePdf />
          Export PDF
        </motion.button>
      </div>
    </motion.div>
  );
}

export default DashboardHeader;