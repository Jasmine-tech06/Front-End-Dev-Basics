import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";
import "../styles/employeeList.css";

function EmployeeList({
  employees,
  onDelete,
  onEdit,
  onView,
}) {
  return (
    <div className="employee-list">

      <div className="table-header">
        <h2>Employee Directory</h2>
        <span>{employees.length} Employees</span>
      </div>

      {employees.length === 0 ? (
        <div className="empty">
          <h3>No Employees Found</h3>
        </div>
      ) : (
        <table>

          <thead>
            <tr>
              <th>Employee</th>
              <th>Department</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {employees.map((employee, index) => (

              <motion.tr
                key={employee.id}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: .35,
                  delay: index * .05,
                }}
                whileHover={{
                  scale: 1.01,
                  backgroundColor: "#f8fbff",
                }}
                onClick={() => onView(employee)}
                style={{ cursor: "pointer" }}
              >

                <td>

                  <div className="employee-info">

                    <img
                      src={employee.image}
                      alt={employee.name}
                      className="employee-image"
                    />

                    <div>
                      <h4
    className="employee-name"
    onClick={() => onView(employee)}
>
    {employee.name}
</h4>
                      <small>{employee.email}</small>
                    </div>

                  </div>

                </td>

                <td>

                  <span className="badge">
                    {employee.department}
                  </span>

                </td>

                <td>{employee.email}</td>

                <td>

                  <span className="status active">
                    Active
                  </span>

                </td>

                <td>

                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(employee);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(employee.id);
                    }}
                  >
                    <FaTrash />
                  </button>

                </td>

              </motion.tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}

export default EmployeeList;