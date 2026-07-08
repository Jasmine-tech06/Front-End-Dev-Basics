import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import DeleteModal from "./components/DeleteModal";

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";

function App() {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // Fetch Employees
  const fetchEmployees = () => {
    getEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Add Employee
  const insertEmployee = (employee) => {
    addEmployee(employee)
      .then(() => {
        fetchEmployees();
      })
      .catch((error) => console.log(error));
  };

  // Update Employee
  const updateEmployeeHandler = (employee) => {
    updateEmployee(employee.id, employee)
      .then(() => {
        fetchEmployees();
        setEditEmployee(null);
      })
      .catch((error) => console.log(error));
  };

  // Open Delete Modal
  const openDeleteModal = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    deleteEmployee(employeeToDelete)
      .then(() => {
        fetchEmployees();
        setShowDeleteModal(false);
        setEmployeeToDelete(null);
      })
      .catch((error) => console.log(error));
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setEmployeeToDelete(null);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />

        <Route
          path="/dashboard"
          element={
            <Dashboard
              employees={employees}
              addEmployee={insertEmployee}
              updateEmployee={updateEmployeeHandler}
              deleteEmployee={openDeleteModal}
              editEmployee={editEmployee}
              setEditEmployee={setEditEmployee}
            />
          }
        />
      </Routes>

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </BrowserRouter>
  );
}

export default App;