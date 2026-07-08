import { useEffect, useState } from "react";
import {
  FaUser,
  FaBuilding,
  FaEnvelope,
  FaPlus,
  FaEdit,
} from "react-icons/fa";

import "../styles/employeeForm.css";

function EmployeeForm({
  addEmployee,
  updateEmployee,
  editEmployee,
}) {
  const [employee, setEmployee] = useState({
    name: "",
    department: "",
    email: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setEmployee(editEmployee);
    } else {
      setEmployee({
        name: "",
        department: "",
        email: "",
      });
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
      !employee.name.trim() ||
      !employee.department.trim() ||
      !employee.email.trim()
    ) {
      alert("Please fill all fields.");
      return;
    }

    if (editEmployee) {
      updateEmployee(employee);
    } else {
      addEmployee(employee);
    }

    setEmployee({
      name: "",
      department: "",
      email: "",
    });
  };

  return (
    <div className="employee-form">

      <h2>
        {editEmployee ? "Update Employee" : "Add Employee"}
      </h2>

      <form onSubmit={handleSubmit}>

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

        <button className="add-btn" type="submit">
          {editEmployee ? (
            <>
              <FaEdit />
              Update Employee
            </>
          ) : (
            <>
              <FaPlus />
              Add Employee
            </>
          )}
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;