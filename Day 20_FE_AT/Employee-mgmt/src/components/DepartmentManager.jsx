import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBuilding,
  FaPlus,
  FaTrash,
  FaUsers,
  FaChartLine,
  FaCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { getDepartmentInfo, getDepartmentPerformance } from "../utils/departmentInfo";
import "../styles/DepartmentManager.css";

function DepartmentManager({ employees }) {
  const [newDeptDraft, setNewDeptDraft] = useState("");
  const [pendingDepartments, setPendingDepartments] = useState([]); // depts added but with 0 employees so far

  // Departments are derived strictly from what's actually present in the
  // Mock API employee records — never a hardcoded list. "Add Department"
  // below just pre-stages a name so it's ready to be assigned to employees.
  const realDepartments = Array.from(
    new Set(employees.map((e) => e.department).filter(Boolean))
  ).sort();

  const allDepartments = Array.from(new Set([...realDepartments, ...pendingDepartments])).sort();

  const handleAddDept = (e) => {
    e.preventDefault();
    const trimmed = newDeptDraft.trim();
    if (!trimmed) {
      toast.error("Department name cannot be empty.");
      return;
    }
    if (allDepartments.some((d) => d.toLowerCase() === trimmed.toLowerCase())) {
      toast.error("Department already exists.");
      return;
    }
    setPendingDepartments((prev) => [...prev, trimmed]);
    setNewDeptDraft("");
    toast.success(`"${trimmed}" is ready — assign an employee to activate it.`);
  };

  const handleDeleteDept = (dept) => {
    setPendingDepartments((prev) => prev.filter((d) => d !== dept));
    toast.success(`"${dept}" removed.`);
  };

  return (
    <motion.div
      className="dept-manager-card"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dept-header">
        <h2>
          <FaBuilding /> Department Management
        </h2>
        <span className="employee-count">
          {allDepartments.length} {allDepartments.length === 1 ? "Department" : "Departments"}
        </span>
      </div>

      <form className="add-dept-form" onSubmit={handleAddDept}>
        <input
          type="text"
          placeholder="Enter new department name..."
          value={newDeptDraft}
          onChange={(e) => setNewDeptDraft(e.target.value)}
        />
        <button type="submit" className="add-dept-btn">
          <FaPlus /> Add Department
        </button>
      </form>

      {allDepartments.length === 0 ? (
        <div className="empty" style={{ textAlign: "center", padding: "30px" }}>
          <h4>No Departments Yet</h4>
          <p style={{ color: "#8fa7c8", fontSize: "13px" }}>
            Departments will appear here automatically once employees are added.
          </p>
        </div>
      ) : (
        <div className="dept-grid dept-grid-v2">
          <AnimatePresence>
            {allDepartments.map((dept, index) => {
              const deptEmployees = employees.filter((emp) => emp.department === dept);
              const count = deptEmployees.length;
              const info = getDepartmentInfo(dept);
              const performance = getDepartmentPerformance(dept, count);
              const recentEmployees = deptEmployees.slice(-3).reverse();

              return (
                <motion.div
                  key={dept}
                  className="dept-card dept-card-v2"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  style={{ "--dept-accent": info.color }}
                >
                  <div className="dept-card-top">
                    <div className="dept-info">
                      <h3>{dept}</h3>
                      <p>{info.head ? `Head: ${info.head}` : "No head assigned"}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <span className="dept-count">{count}</span>
                      {count === 0 && pendingDepartments.includes(dept) && (
                        <button
                          className="delete-dept-btn"
                          onClick={() => handleDeleteDept(dept)}
                          title="Remove Department"
                        >
                          <FaTrash />
                        </button>
                      )}
                    </div>
                  </div>

                  <p className="dept-card-desc">{info.description}</p>

                  <div className="dept-card-meta">
                    <span className={`dept-status-pill ${count > 0 ? "active" : "inactive"}`}>
                      <FaCircle /> {count > 0 ? "Active" : "Unassigned"}
                    </span>
                    <span className="dept-perf-pill">
                      <FaChartLine /> {performance}% performance
                    </span>
                  </div>

                  <div className="dept-card-footer">
                    <span className="dept-card-footer-label">
                      <FaUsers /> Recent Employees
                    </span>
                    <div className="dept-recent-avatars">
                      {recentEmployees.length === 0 ? (
                        <span className="dept-no-recent">None yet</span>
                      ) : (
                        recentEmployees.map((emp) => (
                          <img
                            key={emp.id}
                            src={emp.image}
                            alt={emp.name}
                            title={emp.name}
                            onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(emp.name || "User") + "&background=10b981&color=fff"; }}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export default DepartmentManager;
