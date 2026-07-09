import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaImage,
  FaSave,
  FaSyncAlt,
} from "react-icons/fa";

import toast from "react-hot-toast";
import "../styles/EmployeeForm.css";

function EmployeeForm({
  addEmployee,
  updateEmployee,
  editEmployee,
}) {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
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
      toast.error("Please fill all fields");
      return;
    }

    if (editEmployee) {
      updateEmployee(employee);
      toast.success("Employee updated successfully");
    } else {
      addEmployee(employee);
      toast.success("Employee added successfully");
    }

    setEmployee({
      name: "",
      department: "",
      email: "",
      image: "",
    });
  };

  return (
    <motion.form
      className="employee-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2>
        {editEmployee ? "Update Employee" : "Add Employee"}
      </h2>

      {/* Name */}

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

      {/* Department */}

      <div className="input-group">
        <FaBuilding />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
        />
      </div>

      {/* Email */}

      <div className="input-group">
        <FaEnvelope />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={employee.email}
          onChange={handleChange}
        />
      </div>

      {/* Image */}

      <div className="input-group">
        <FaImage />

        <input
          type="text"
          name="image"
          placeholder="Profile Image URL"
          value={employee.image}
          onChange={handleChange}
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        type="submit"
      >
        {editEmployee ? (
          <>
            <FaSyncAlt />
            Update Employee
          </>
        ) : (
          <>
            <FaSave />
            Add Employee
          </>
        )}
      </motion.button>
    </motion.form>
  );
}

export default EmployeeForm;