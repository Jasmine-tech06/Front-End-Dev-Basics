import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaBuilding, FaPlus, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import "../styles/DepartmentManager.css";

const DEFAULT_DEPARTMENTS = ["HR", "IT", "Finance", "Marketing", "Sales", "Support"];

function DepartmentManager({ employees }) {
  const [departments, setDepartments] = useState([]);
  const [newDept, setNewDept] = useState("");

  useEffect(() => {
    const savedDepts = localStorage.getItem("decorNestDepartments");
    if (savedDepts) {
      setDepartments(JSON.parse(savedDepts));
    } else {
      setDepartments(DEFAULT_DEPARTMENTS);
      localStorage.setItem("decorNestDepartments", JSON.stringify(DEFAULT_DEPARTMENTS));
    }
  }, []);

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDept.trim()) {
      toast.error("Department name cannot be empty.");
      return;
    }

    const trimmedDept = newDept.trim();
    if (departments.some(d => d.toLowerCase() === trimmedDept.toLowerCase())) {
      toast.error("Department already exists.");
      return;
    }

    const updated = [...departments, trimmedDept];
    setDepartments(updated);
    localStorage.setItem("decorNestDepartments", JSON.stringify(updated));
    setNewDept("");
    toast.success(`Department "${trimmedDept}" added!`);
  };

  const handleDeleteDept = (deptToDelete) => {
    if (DEFAULT_DEPARTMENTS.includes(deptToDelete)) {
      toast.error("Default departments cannot be deleted.");
      return;
    }

    const count = employees.filter(emp => emp.department === deptToDelete).length;
    if (count > 0) {
      toast.error(`Cannot delete! ${count} employees belong to this department.`);
      return;
    }

    const updated = departments.filter(d => d !== deptToDelete);
    setDepartments(updated);
    localStorage.setItem("decorNestDepartments", JSON.stringify(updated));
    toast.success(`Department "${deptToDelete}" deleted.`);
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
          {departments.length} Active Departments
        </span>
      </div>

      <form className="add-dept-form" onSubmit={handleAddDept}>
        <input
          type="text"
          placeholder="Enter new department name..."
          value={newDept}
          onChange={(e) => setNewDept(e.target.value)}
        />
        <button type="submit" className="add-dept-btn">
          <FaPlus /> Add Department
        </button>
      </form>

      <div className="dept-grid">
        {departments.map((dept, index) => {
          const count = employees.filter(emp => emp.department === dept).length;
          return (
            <motion.div
              key={dept}
              className="dept-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="dept-info">
                <h3>{dept}</h3>
                <p>{count} {count === 1 ? "Employee" : "Employees"}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span className="dept-count">{count}</span>
                {!DEFAULT_DEPARTMENTS.includes(dept) && (
                  <button
                    className="delete-dept-btn"
                    onClick={() => handleDeleteDept(dept)}
                    title="Delete Department"
                  >
                    <FaTrash />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default DepartmentManager;
