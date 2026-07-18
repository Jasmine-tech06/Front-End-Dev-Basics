import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaImage,
  FaSave,
  FaSyncAlt,
  FaChevronDown,
  FaPhone,
  FaIdBadge,
  FaBriefcase,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaToggleOn,
} from "react-icons/fa";

import toast from "react-hot-toast";
import "../styles/employeeForm.css";

const emptyEmployee = {
  name: "",
  employeeId: "",
  department: "",
  email: "",
  phone: "",
  role: "",
  designation: "",
  salary: "",
  status: "Active",
  joiningDate: "",
  image: "",
};

function EmployeeForm({
  addEmployee,
  updateEmployee,
  editEmployee,
  onCancelEdit,
  onSuccess,
  departmentOptions = [],
}) {

  const [employee, setEmployee] = useState(emptyEmployee);

  useEffect(() => {
    if (editEmployee) {
      setEmployee({ ...emptyEmployee, ...editEmployee });
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      employee.name.trim() === "" ||
      employee.department.trim() === "" ||
      employee.email.trim() === ""
    ) {
      toast.error("Please fill in Name, Department and Email.");
      return;
    }

    if (editEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee(emptyEmployee);
    onSuccess?.();
  };

  return (
    <motion.form
      className="employee-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-header">
        <h2>{editEmployee ? "Update Employee" : "Add Employee"}</h2>
        <p>Enter employee details below.</p>
      </div>

      <div className="form-body">
        <div className="form-field" style={{ gridColumn: "1 / -1" }}>
          <label>Employee Name</label>
          <div className="input-group">
            <FaUser />
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={employee.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Employee ID</label>
          <div className="input-group">
            <FaIdBadge />
            <input
              type="text"
              name="employeeId"
              placeholder="e.g. EMP-1024 (optional)"
              value={employee.employeeId}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Email</label>
          <div className="input-group">
            <FaEnvelope />
            <input
              type="email"
              name="email"
              placeholder="Employee Email"
              value={employee.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Phone</label>
          <div className="input-group">
            <FaPhone />
            <input
              type="text"
              name="phone"
              placeholder="e.g. +91 98765 43210"
              value={employee.phone}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Department</label>
          <div className="input-group select-group">
            <FaBuilding />
            {departmentOptions.length > 0 ? (
              <select
                name="department"
                value={employee.department}
                onChange={handleChange}
              >
                <option value="">Select Department</option>
                {departmentOptions.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
                {employee.department && !departmentOptions.includes(employee.department) && (
                  <option value={employee.department}>{employee.department}</option>
                )}
              </select>
            ) : (
              <input
                type="text"
                name="department"
                placeholder="e.g. IT (no departments recorded yet)"
                value={employee.department}
                onChange={handleChange}
              />
            )}
            {departmentOptions.length > 0 && <FaChevronDown className="dropdown-icon"/>}
          </div>
        </div>

        <div className="form-field">
          <label>Role</label>
          <div className="input-group">
            <FaBriefcase />
            <input
              type="text"
              name="role"
              placeholder="e.g. Software Engineer"
              value={employee.role}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Designation</label>
          <div className="input-group">
            <FaBriefcase />
            <input
              type="text"
              name="designation"
              placeholder="e.g. Senior / Team Lead"
              value={employee.designation}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field">
          <label>Salary</label>
          <div className="input-group">
            <FaMoneyBillWave />
            <input
              type="number"
              name="salary"
              placeholder="Monthly salary"
              value={employee.salary}
              onChange={handleChange}
              min="0"
            />
          </div>
        </div>

        <div className="form-field">
          <label>Status</label>
          <div className="input-group select-group">
            <FaToggleOn />
            <select
              name="status"
              value={employee.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="On Leave">On Leave</option>
              <option value="Probation">Probation</option>
            </select>
            <FaChevronDown className="dropdown-icon"/>
          </div>
        </div>

        <div className="form-field">
          <label>Joining Date</label>
          <div className="input-group">
            <FaCalendarAlt />
            <input
              type="date"
              name="joiningDate"
              value={employee.joiningDate}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-field" style={{ gridColumn: "1 / -1" }}>
          <label>Profile Image</label>
          <div className="input-group">
            <FaImage />
            <input
              type="text"
              name="image"
              placeholder="Paste image URL"
              value={employee.image}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-footer" style={{ display: "flex", gap: "10px", width: "100%" }}>
        {editEmployee && onCancelEdit && (
          <motion.button
            type="button"
            onClick={() => {
              setEmployee(emptyEmployee);
              onCancelEdit();
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .97 }}
            style={{
              padding: "12px 24px",
              borderRadius: "14px",
              background: "rgba(239, 68, 68, 0.15)",
              color: "#ef4444",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              fontWeight: "600",
              flex: 1
            }}
          >
            Cancel Edit
          </motion.button>
        )}

        {!editEmployee && (
          <motion.button
            type="button"
            onClick={() => setEmployee(emptyEmployee)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: .97 }}
            style={{
              padding: "12px 24px",
              borderRadius: "14px",
              background: "rgba(255, 255, 255, 0.04)",
              color: "#cbd5e1",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              fontWeight: "600",
              flex: 1
            }}
          >
            Reset
          </motion.button>
        )}

        <motion.button
          type="submit"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: .97 }}
          style={{ flex: 2 }}
        >
          {editEmployee ? (
            <>
              <FaSyncAlt/>
              Update Employee
            </>
          ) : (
            <>
              <FaSave/>
              Add Employee
            </>
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}

export default EmployeeForm;
