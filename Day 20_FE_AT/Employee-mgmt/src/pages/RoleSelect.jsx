import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUserShield, FaUser, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import BrandLogo from "../components/BrandLogo";
import "../styles/RoleSelect.css";

function RoleSelect() {
  const navigate = useNavigate();

  const goToLogin = (role) => {
    navigate("/login", { state: { role } });
  };

  return (
    <div className="roleselect-page">
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>
      <div className="landing-grid-overlay"></div>

      <motion.div
        className="roleselect-card glass"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <button className="roleselect-back-btn" onClick={() => navigate("/")}>
          <FaArrowLeft /> Home
        </button>

        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
          <BrandLogo size={70} />
        </div>

        <h1>
          Decor<span>Nest</span>
        </h1>
        <h2 className="brand-subtitle">Continue as</h2>
        <p>Choose how you'd like to sign in to the portal.</p>

        <div className="roleselect-options">
          <motion.button
            className="roleselect-option"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => goToLogin("admin")}
          >
            <div className="roleselect-icon admin">
              <FaUserShield />
            </div>
            <h3>Admin</h3>
            <p>Manage employees, departments, and reports.</p>
            <span className="roleselect-cta">
              Continue <FaArrowRight />
            </span>
          </motion.button>

          <motion.button
            className="roleselect-option"
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => goToLogin("employee")}
          >
            <div className="roleselect-icon employee">
              <FaUser />
            </div>
            <h3>Employee</h3>
            <p>View your profile, attendance, and payslips.</p>
            <span className="roleselect-cta">
              Continue <FaArrowRight />
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default RoleSelect;
