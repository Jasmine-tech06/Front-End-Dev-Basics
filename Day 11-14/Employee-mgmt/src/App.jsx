import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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

  // ===========================
  // Fetch Employees
  // ===========================
  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to fetch employees!");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ===========================
  // Add Employee
  // ===========================
  const insertEmployee = async (employee) => {
    try {
      await addEmployee(employee);

      await fetchEmployees();

      toast.success("Employee added successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add employee!");
    }
  };

  // ===========================
  // Update Employee
  // ===========================
  const updateEmployeeHandler = async (employee) => {
    try {
      await updateEmployee(employee.id, employee);

      await fetchEmployees();

      setEditEmployee(null);

      toast.success("Employee updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update employee!");
    }
  };

  // ===========================
  // Open Delete Modal
  // ===========================
  const openDeleteModal = (id) => {
    setEmployeeToDelete(id);
    setShowDeleteModal(true);
  };

  // ===========================
  // Confirm Delete
  // ===========================
  const confirmDelete = async () => {
    try {
      await deleteEmployee(employeeToDelete);

      toast.success("Employee deleted successfully!");

      setShowDeleteModal(false);
      setEmployeeToDelete(null);

      await fetchEmployees();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete employee!");
    }
  };

  // ===========================
  // Close Delete Modal
  // ===========================
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