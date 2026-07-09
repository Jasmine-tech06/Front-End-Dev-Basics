import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import EmployeeDetailsModal from "../components/EmployeeDetailsModal";
import AnalyticsChart from "../components/AnalyticsChart";
import Sidebar from "../components/Sidebar";
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

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const employeesPerPage = 10;

  const filteredEmployees = employees.filter((employee) => {

  const search = searchTerm.toLowerCase();

  return (

    employee.name.toLowerCase().includes(search) ||

    employee.department.toLowerCase().includes(search) ||

    employee.email.toLowerCase().includes(search)

  );

});

const indexOfLastEmployee = currentPage * employeesPerPage;

const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

const currentEmployees = filteredEmployees.slice(

  indexOfFirstEmployee,

  indexOfLastEmployee

);

const totalPages = Math.ceil(

  filteredEmployees.length / employeesPerPage

);

useEffect(() => {

  setCurrentPage(1);

}, [searchTerm]);

  return (

    <div className="layout">

      <Sidebar />

      <motion.div
        id="dashboard"
        className="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: .6 }}
      >

        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: .5 }}
        >
          <Navbar
  searchTerm={searchTerm}
  setSearchTerm={setSearchTerm}
  onSearch={() => {
    setCurrentPage(1);

    setTimeout(() => {
      document
        .getElementById("employees")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 150);
  }}
/>
        </motion.div>

        <DashboardHeader employees={employees} />
        <StatsCards employees={employees} />

        {/* Form + Analytics */}

<div className="top-section">

  <motion.div
    id="addEmployee"
    className="form-card"
    initial={{ x: -80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: .6, delay: .2 }}
    whileHover={{ y: -5 }}
  >
    <EmployeeForm
      addEmployee={addEmployee}
      updateEmployee={updateEmployee}
      editEmployee={editEmployee}
    />
  </motion.div>

  <motion.div
    id="analytics"
    className="analytics-card"
    initial={{ x: 80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ duration: .6, delay: .3 }}
  >
    <AnalyticsChart employees={employees} />
  </motion.div>

</div>

{/* Employee Table */}

<motion.div
  id="employees"
  className="table-card"
  initial={{ y: 50, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  transition={{ duration: .6, delay: .4 }}
>

  <EmployeeList
    employees={currentEmployees}
    onEdit={setEditEmployee}
    onDelete={deleteEmployee}
    onView={setSelectedEmployee}
  />

  <div className="pagination">

    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      Previous
    </button>

    {[...Array(totalPages)].map((_, index) => (

      <button
        key={index}
        className={currentPage === index + 1 ? "active-page" : ""}
        onClick={() => setCurrentPage(index + 1)}
      >
        {index + 1}
      </button>

    ))}

    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      Next
    </button>

  </div>

</motion.div>
<div
  id="settings"
  style={{
    marginTop: "40px",
    padding: "30px",
    background: "#fff",
    borderRadius: "20px",
    textAlign: "center",
  }}
>
  <h2>Settings</h2>
  <p>Settings page coming soon...</p>
</div>
        <EmployeeDetailsModal
    employee={selectedEmployee}
    onClose={() => setSelectedEmployee(null)}
/>


      </motion.div>

    </div>

  );

}

export default Dashboard;