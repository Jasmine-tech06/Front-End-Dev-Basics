import { motion } from "framer-motion";
import { FaBuilding, FaUserTie, FaEnvelope } from "react-icons/fa";
import "../styles/EmployeeViews.css";

function DepartmentDetails({ user, employees }) {
  const departmentName = user.department || "IT";
  
  // Filter other employees in the same department
  const colleagues = employees.filter(
    emp => emp.department === departmentName && emp.id !== user.id
  );

  return (
    <motion.div
      className="emp-view-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="emp-view-header">
        <h2>
          <FaBuilding /> Department Details
        </h2>
        <span className="profile-badge">
          {departmentName} Team
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
        {/* Manager Card Info */}
        <div
          className="dept-card"
          style={{
            background: "rgba(255,255,255,0.015)",
            border: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            alignItems: "center"
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              background: "rgba(57, 233, 143, 0.1)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "24px",
              color: "#39e98f",
              border: "1px solid rgba(57, 233, 143, 0.2)"
            }}
          >
            <FaUserTie />
          </div>
          <div>
            <h4 style={{ fontSize: "14px", color: "#8fa7c8" }}>DEPARTMENT MANAGER</h4>
            <h3 style={{ fontSize: "18px", fontWeight: "600", marginTop: "3px" }}>
              {departmentName === "IT" ? "Sarah Jenkins" : "David Miller"}
            </h3>
            <p style={{ fontSize: "13px", color: "#8fa7c8", display: "flex", alignItems: "center", gap: "5px", marginTop: "2px" }}>
              <FaEnvelope style={{ fontSize: "11px" }} /> {departmentName.toLowerCase()}manager@decornest.com
            </p>
          </div>
        </div>

        {/* Colleagues Header */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
          <h3>Your Team Colleagues</h3>
          <p style={{ color: "#8fa7c8", fontSize: "13px" }}>
            Here is a list of other members in your department.
          </p>
        </div>

        {colleagues.length === 0 ? (
          <div className="empty" style={{ textAlign: "center", padding: "20px" }}>
            <h4>No Colleagues Found</h4>
            <p style={{ color: "#8fa7c8", fontSize: "13px" }}>You are the only member registered in this department.</p>
          </div>
        ) : (
          <div className="dept-grid">
            {colleagues.map((colleague, index) => (
              <motion.div
                key={colleague.id}
                className="dept-card"
                style={{ padding: "18px", background: "rgba(255,255,255,0.02)" }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={colleague.image}
                    alt={colleague.name}
                    style={{ width: "50px", height: "50px", borderRadius: "50%", objectFit: "cover", border: "2px solid #2d7dff" }}
                  />
                  <div>
                    <h4 style={{ fontSize: "15px", fontWeight: "600" }}>{colleague.name}</h4>
                    <p style={{ fontSize: "12px", color: "#8fa7c8" }}>{colleague.email}</p>
                    <span style={{ fontSize: "11px", color: "#2d7dff" }}>ID: {colleague.id}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default DepartmentDetails;
