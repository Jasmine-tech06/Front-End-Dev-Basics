import { motion } from "framer-motion";
import {
  FaUsers,
  FaBuilding,
  FaEnvelope,
  FaUserCheck,
} from "react-icons/fa";

import "../styles/StatsCards.css";

function StatsCards({ employees }) {
  const totalEmployees = employees.length;

  const totalDepartments = [
    ...new Set(employees.map((emp) => emp.department)),
  ].length;

  const totalEmails = employees.filter(
    (emp) => emp.email && emp.email.trim() !== ""
  ).length;

  const activeEmployees = employees.length;

  const stats = [
    {
      title: "Total Employees",
      value: totalEmployees,
      icon: <FaUsers />,
      color: "#4f46e5",
    },
    {
      title: "Departments",
      value: totalDepartments,
      icon: <FaBuilding />,
      color: "#0ea5e9",
    },
    {
      title: "Email Records",
      value: totalEmails,
      icon: <FaEnvelope />,
      color: "#10b981",
    },
    {
      title: "Active Employees",
      value: activeEmployees,
      icon: <FaUserCheck />,
      color: "#f59e0b",
    },
  ];

  return (
    <div className="stats">
      {stats.map((item, index) => (
        <motion.div
          className="stat-card"
          key={index}
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.15,
          }}
          whileHover={{
            y: -10,
            scale: 1.03,
          }}
        >
          <div
            className="stat-icon"
            style={{
              background: item.color,
            }}
          >
            {item.icon}
          </div>

          <div className="stat-content">
            <h2>{item.value}</h2>

            <p>{item.title}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;