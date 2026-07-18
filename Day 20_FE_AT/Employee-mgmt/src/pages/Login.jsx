import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope, FaEye, FaEyeSlash, FaUserShield, FaArrowLeft } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

import BrandLogo from "../components/BrandLogo";
import "../styles/Login.css";

const API_URL = "https://6a4b3698f5eab0bb6b62577e.mockapi.io/Employees";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const preselectedRole = location.state?.role || null;

  const [role, setRole] = useState(preselectedRole || "admin"); // 'admin' or 'employee'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  // Prefill remembered email only. We intentionally do NOT auto-redirect an
  // already-authenticated visitor away from this screen — the login page
  // must never be silently bypassed.
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      if (role === "admin") {
        // Predefined Admin Check
        if (email.toLowerCase() === "admin@decornest.com" && password === "admin") {
          const adminSession = {
            role: "admin",
            name: "Administrator",
            email: "admin@decornest.com",
            avatar: null,
            department: "Administration",
            designation: "System Administrator",
            employeeId: "ADMIN-001",
            phone: "+91 90000 00000",
            joiningDate: "01-Jan-2023",
            status: "Active"
          };

          localStorage.setItem("decorNestUser", JSON.stringify(adminSession));
          if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
          } else {
            localStorage.removeItem("rememberedEmail");
          }

          toast.success("Welcome back, Administrator!");
          setTimeout(() => navigate("/dashboard"), 800);
        } else {
          toast.error("Invalid Admin credentials.");
        }
      } else {
        // Employee Database Check
        const response = await axios.get(API_URL);
        const employees = response.data || [];
        
        // Find employee by email
        const employee = employees.find(
          (emp) => emp.email && emp.email.toLowerCase() === email.toLowerCase().trim()
        );

        if (employee) {
          // Check password: default is "password" or employee.id
          const expectedPassword = employee.password || "password";
          const alternativePassword = employee.id;

          if (password === expectedPassword || password === alternativePassword) {
            const employeeSession = {
              role: "employee",
              id: employee.id,
              name: employee.name,
              email: employee.email,
              avatar: employee.image,
              department: employee.department,
              employeeId: employee.employeeId || employee.id,
              designation: employee.designation,
              jobRole: employee.role,
              phone: employee.phone,
              joiningDate: employee.joiningDate,
              status: employee.status || "Active"
            };

            localStorage.setItem("decorNestUser", JSON.stringify(employeeSession));
            if (rememberMe) {
              localStorage.setItem("rememberedEmail", email);
            } else {
              localStorage.removeItem("rememberedEmail");
            }

            toast.success(`Welcome back, ${employee.name}!`);
            setTimeout(() => navigate("/dashboard"), 800);
          } else {
            toast.error("Incorrect password.");
          }
        } else {
          toast.error("No employee found with this email.");
        }
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Login verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    toast.success("Password reset instructions sent to your email!");
  };

  return (
    <div className="login-page">
      {/* Background Neon Glows */}
      <div className="login-blob login-blob-1"></div>
      <div className="login-blob login-blob-2"></div>
      <div className="login-blob login-blob-3"></div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate(preselectedRole ? "/select-role" : "/")}
          style={{
            position: "absolute",
            top: "24px",
            left: "24px",
            background: "transparent",
            border: "none",
            color: "#8fa7c8",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "14px"
          }}
        >
          <FaArrowLeft /> {preselectedRole ? "Change Role" : "Home"}
        </button>

        {/* Branding */}
        <div className="login-brand">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
            <BrandLogo size={90} />
          </div>
          <h1>
            Decor<span>Nest</span>
          </h1>
          <p className="brand-subtitle">Employee Management System</p>
        </div>

        {/* Role Selector (only shown if landed directly on /login without picking a role first) */}
        {!preselectedRole ? (
          <div className="role-selector">
            <button
              type="button"
              className={`role-btn ${role === "admin" ? "active" : ""}`}
              onClick={() => setRole("admin")}
            >
              <FaUserShield /> Admin
            </button>
            <button
              type="button"
              className={`role-btn ${role === "employee" ? "active" : ""}`}
              onClick={() => setRole("employee")}
            >
              <FaUser /> Employee
            </button>
          </div>
        ) : (
          <div className="role-selector">
            <button type="button" className="role-btn active">
              {role === "admin" ? <FaUserShield /> : <FaUser />}
              {" "}{role === "admin" ? "Admin" : "Employee"} Login
            </button>
          </div>
        )}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <div className="login-input-group">
              <FaEnvelope className="input-icon" />
              <input
                type="email"
                placeholder={role === "admin" ? "admin@decornest.com" : "employee@example.com"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="login-input-group">
              <FaLock className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-me">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember Me
            </label>
            <button
              type="button"
              className="forgot-btn"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            className="login-submit-btn"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              `Log In as ${role.charAt(0).toUpperCase() + role.slice(1)}`
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;
