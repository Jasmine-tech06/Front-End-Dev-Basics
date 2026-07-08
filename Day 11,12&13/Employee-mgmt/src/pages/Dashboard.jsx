import { useState } from "react";

import Navbar from "../components/Navbar";
import DashboardHeader from "../components/DashboardHeader";
import StatsCards from "../components/StatsCards";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

import "../styles/Dashboard.css";

function Dashboard({
  employees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  editEmployee,
  setEditEmployee,
}) {
  // Search State
  const [searchTerm, setSearchTerm] = useState("");

  // Filter Employees
  const filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();

    return (
      employee.name.toLowerCase().includes(search) ||
      employee.department.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
    );
  });

  return (
    <div className="dashboard">
      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Welcome Header */}
      <DashboardHeader />

      {/* Statistics */}
      <StatsCards employees={employees} />

      {/* Main Dashboard */}
      <div className="dashboard-grid">
        {/* Employee Form */}
        <div className="form-card">
          <EmployeeForm
            addEmployee={addEmployee}
            updateEmployee={updateEmployee}
            editEmployee={editEmployee}
          />
        </div>

        {/* Employee List */}
        <div className="table-card">
          <EmployeeList
            employees={filteredEmployees}
            onEdit={setEditEmployee}
            onDelete={deleteEmployee}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;