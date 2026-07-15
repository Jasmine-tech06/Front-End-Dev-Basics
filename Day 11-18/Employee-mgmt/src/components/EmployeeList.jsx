import { motion } from "framer-motion";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCircle,
  FaFileExcel,
  FaFilePdf
} from "react-icons/fa";

import { exportEmployees } from "../utils/exportToExcel";
import { exportPDF } from "../utils/exportToPDF";
import "../styles/employeeList.css";

function EmployeeList({
  employees,
  onDelete,
  onEdit,
  onView,
}) {
  return (
    <div className="employee-list">

      {/* Header */}

      <div className="table-header">

        <div>
          <h2>Employee Directory</h2>
          <p>Manage all employees from one place</p>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exportEmployees(employees)}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #10b981, #059669)",
              color: "white",
              fontSize: "13px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 10px rgba(16, 185, 129, 0.2)"
            }}
          >
            <FaFileExcel /> Export Excel
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => exportPDF(employees)}
            style={{
              padding: "10px 16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              color: "white",
              fontSize: "13px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 10px rgba(59, 130, 246, 0.2)"
            }}
          >
            <FaFilePdf /> Export PDF
          </motion.button>

          <div className="employee-count" style={{ padding: "10px 16px", borderRadius: "12px" }}>
            {employees.length} Employees
          </div>
        </div>

      </div>

      {employees.length === 0 ? (

        <div className="empty">

          <h3>No Employees Found</h3>

          <p>Add your first employee to begin.</p>

        </div>

      ) : (

        <div className="table-wrapper">

          <table>

            <thead>

              <tr>

                <th>Employee</th>

                <th>Department</th>

                <th>Email</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {employees.map((employee, index) => (

                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.05,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                >

                  {/* Employee */}

                  <td>

                    <div
                      className="employee-info"
                      onClick={() => onView(employee)}
                    >

                      <img
                        src={employee.image}
                        alt={employee.name}
                        className="employee-image"
                      />

                      <div>

                        <h4 className="employee-name">

                          {employee.name}

                        </h4>

                        <small>ID : {employee.id}</small>

                      </div>

                    </div>

                  </td>

                  {/* Department */}

                  <td>

                    <span className="badge">

                      {employee.department}

                    </span>

                  </td>

                  {/* Email */}

                  <td className="email-cell">

                    {employee.email}

                  </td>

                  {/* Status */}

                  <td>

                    <span className="status active">

                      <FaCircle />

                      Active

                    </span>

                  </td>

                  {/* Actions */}

                  <td>

                    <div className="action-buttons">

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="view-btn"
                        onClick={() => onView(employee)}
                      >
                        <FaEye />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEdit(employee);
                        }}
                      >
                        <FaEdit />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        className="delete-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(employee.id);
                        }}
                      >
                        <FaTrash />
                      </motion.button>

                    </div>

                  </td>

                </motion.tr>

              ))}

            </tbody>

          </table>

        </div>

      )}

    </div>
  );
}

export default EmployeeList;