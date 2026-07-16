import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

import Welcome from "./pages/Welcome";
import RoleSelect from "./pages/RoleSelect";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import DeleteModal from "./components/DeleteModal";
import PageTransition from "./components/PageTransition";
import { Navigate } from "react-router-dom";
import { applyStoredTheme } from "./utils/theme";

function ProtectedRoute({ children, allowedRoles }) {
  const savedUser = localStorage.getItem("decorNestUser");
  if (!savedUser) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = JSON.parse(savedUser);
    if (!allowedRoles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }
    return children;
  } catch (e) {
    localStorage.removeItem("decorNestUser");
    return <Navigate to="/login" replace />;
  }
}

import {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "./services/employeeService";

function AppRoutes({
  employees,
  insertEmployee,
  updateEmployeeHandler,
  openDeleteModal,
  editEmployee,
  setEditEmployee,
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Welcome /></PageTransition>} />
        <Route path="/select-role" element={<PageTransition><RoleSelect /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/unauthorized" element={<PageTransition><Unauthorized /></PageTransition>} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin", "employee"]}>
              <PageTransition>
                <Dashboard
                  employees={employees}
                  addEmployee={insertEmployee}
                  updateEmployee={updateEmployeeHandler}
                  deleteEmployee={openDeleteModal}
                  editEmployee={editEmployee}
                  setEditEmployee={setEditEmployee}
                />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    applyStoredTheme();
  }, []);
  const [editEmployee, setEditEmployee] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  // ===========================
  // Fetch Employees
  // ===========================

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees();

      setEmployees(response.data || []);
    } catch (error) {
      console.error("Fetch Employees Error:", error);

      toast.error("Unable to fetch employees.");
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
      console.error("Add Employee Error:", error);

      toast.error("Failed to add employee.");
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
      console.error("Update Employee Error:", error);

      toast.error("Failed to update employee.");
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
    if (!employeeToDelete) return;

    try {
      await deleteEmployee(employeeToDelete);

      await fetchEmployees();

      toast.success("Employee deleted successfully!");
    } catch (error) {
      console.error("Delete Employee Error:", error);

      toast.error("Failed to delete employee.");
    } finally {
      setShowDeleteModal(false);
      setEmployeeToDelete(null);
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
      <AppRoutes
        employees={employees}
        insertEmployee={insertEmployee}
        updateEmployeeHandler={updateEmployeeHandler}
        openDeleteModal={openDeleteModal}
        editEmployee={editEmployee}
        setEditEmployee={setEditEmployee}
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </BrowserRouter>
  );
}

export default App;