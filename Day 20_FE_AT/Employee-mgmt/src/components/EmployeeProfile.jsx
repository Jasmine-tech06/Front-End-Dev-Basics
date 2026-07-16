import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaSave,
  FaIdBadge,
  FaEnvelope,
  FaPhoneAlt,
  FaBuilding,
  FaBriefcase,
  FaUserTie,
  FaCalendarAlt,
  FaCircle,
} from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import "../styles/EmployeeViews.css";

const API_URL = "https://6a4b3698f5eab0bb6b62577e.mockapi.io/Employees";

// Generates a clean, professional initials avatar whenever no real photo is available
function fallbackAvatar(name) {
  const safeName = encodeURIComponent(name?.trim() || "User");
  return `https://ui-avatars.com/api/?name=${safeName}&background=10b981&color=fff&bold=true&size=256`;
}

function EmployeeProfile({ user, isEditMode = false, onUpdateUser }) {
  const [profile, setProfile] = useState({
    name: user?.name || "",
    email: user?.email || "",
    department: user?.department || "",
    image: user?.avatar || "",
    phone: user?.phone || "+91 98765 43210",
    designation: user?.designation || (user?.role === "admin" ? "Administrator" : "Associate Specialist"),
    jobRole: user?.jobRole || "",
    employeeId: user?.employeeId || user?.id || "",
    joiningDate: user?.joiningDate || "12-Jan-2024",
    status: user?.status || "Active",
  });
  const [imgError, setImgError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch fresh profile details from mockapi (employee sessions only — admin has no API record)
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/${user.id}`);
        if (res.data) {
          setProfile((prev) => ({
            ...prev,
            ...res.data,
            phone: res.data.phone || prev.phone,
            designation: res.data.designation || (res.data.department === "IT" ? "Software Engineer" : "Associate Specialist"),
            jobRole: res.data.role || prev.jobRole,
            employeeId: res.data.employeeId || res.data.id || prev.employeeId,
            joiningDate: res.data.joiningDate || prev.joiningDate,
            status: res.data.status || "Active",
          }));
        }
      } catch (err) {
        console.error("Fetch profile details error:", err);
      }
    };

    if (user.id) {
      fetchProfile();
    }
  }, [user.id]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
    if (e.target.name === "image") setImgError(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!profile.name.trim() || !profile.email.trim()) {
      toast.error("Name and Email are required.");
      return;
    }

    setLoading(true);
    try {
      if (!user.id) {
        // Admin session has no MockAPI record — update the local session only
        const savedUserObj = JSON.parse(localStorage.getItem("decorNestUser"));
        const newSession = {
          ...savedUserObj,
          name: profile.name,
          email: profile.email,
          avatar: profile.image,
          phone: profile.phone,
          designation: profile.designation,
          department: profile.department,
        };
        localStorage.setItem("decorNestUser", JSON.stringify(newSession));

        if (onUpdateUser) {
          onUpdateUser();
        }

        toast.success("Profile updated successfully!");
        setLoading(false);
        return;
      }

      // Put update to MockAPI.io
      const updatedData = {
        name: profile.name,
        email: profile.email,
        image: profile.image,
        phone: profile.phone,
        designation: profile.designation,
        department: profile.department
      };

      const res = await axios.put(`${API_URL}/${user.id}`, updatedData);
      if (res.status === 200) {
        // Update Local Storage Session
        const savedUserObj = JSON.parse(localStorage.getItem("decorNestUser"));
        const newSession = {
          ...savedUserObj,
          name: profile.name,
          email: profile.email,
          avatar: profile.image,
          department: profile.department
        };
        localStorage.setItem("decorNestUser", JSON.stringify(newSession));
        
        if (onUpdateUser) {
          onUpdateUser();
        }
        
        toast.success("Profile updated successfully!");
      }
    } catch (err) {
      console.error("Save profile error:", err);
      toast.error("Failed to save profile changes.");
    } finally {
      setLoading(false);
    }
  };

  const avatarSrc = !imgError && profile.image ? profile.image : fallbackAvatar(profile.name);

  return (
    <motion.div
      className="emp-view-card profile-v2"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!isEditMode ? (
        // VIEW MODE
        <>
          <div className="profile-hero">
            <div className="profile-hero-glow"></div>
            <img
              className="profile-hero-avatar"
              src={avatarSrc}
              alt={profile.name}
              onError={() => setImgError(true)}
            />
            <h2 className="profile-hero-name">{profile.name || "Unnamed User"}</h2>
            <p className="profile-hero-role">{profile.designation}{profile.jobRole ? ` · ${profile.jobRole}` : ""}</p>
            <div className="profile-hero-badges">
              <span className="profile-pill">
                <FaBuilding /> {profile.department || "—"}
              </span>
              <span className={`profile-pill status ${(profile.status || "Active").replace(/\s+/g, "-").toLowerCase()}`}>
                <FaCircle className="status-dot" /> {profile.status || "Active"}
              </span>
            </div>
          </div>

          <div className="profile-details-grid profile-details-grid-v2">
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaIdBadge /></span>
              <div>
                <label>Employee ID</label>
                <span>{profile.employeeId || "—"}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaEnvelope /></span>
              <div>
                <label>Email Address</label>
                <span>{profile.email}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaPhoneAlt /></span>
              <div>
                <label>Phone Number</label>
                <span>{profile.phone}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaBuilding /></span>
              <div>
                <label>Department</label>
                <span>{profile.department || "—"}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaBriefcase /></span>
              <div>
                <label>Role</label>
                <span>{profile.jobRole || "—"}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaUserTie /></span>
              <div>
                <label>Designation</label>
                <span>{profile.designation}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaCalendarAlt /></span>
              <div>
                <label>Joining Date</label>
                <span>{profile.joiningDate}</span>
              </div>
            </div>
            <div className="profile-detail-item detail-v2">
              <span className="detail-icon"><FaUser /></span>
              <div>
                <label>System Role</label>
                <span style={{ color: "#34e89e", textTransform: "uppercase" }}>{user.role || "Employee"}</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        // EDIT MODE
        <form className="edit-profile-form" onSubmit={handleSave}>
          <div className="emp-view-header">
            <h2>
              <FaUser /> Edit Profile
            </h2>
            <span className="profile-badge">
              ID: {profile.employeeId || "ADMIN"}
            </span>
          </div>
          <div className="profile-container" style={{ alignItems: "stretch" }}>
            <div className="profile-avatar-card" style={{ justifyContent: "center" }}>
              <img src={avatarSrc} alt={profile.name} onError={() => setImgError(true)} />
              <p style={{ fontSize: "12px", color: "#8fa7c8" }}>Live preview of Image URL</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "20px", flex: 1 }}>
              <div className="form-grid-2">
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none"
                    }}
                    required
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none"
                    }}
                    required
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Phone Number</label>
                  <input
                    type="text"
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none"
                    }}
                  />
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Profile Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={profile.image}
                    onChange={handleChange}
                    placeholder="Leave blank to use a generated avatar"
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Department</label>
                  <select
                    name="department"
                    value={profile.department}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "#081426",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none"
                    }}
                  >
                    <option value="Administration">Administration</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="Support">Support</option>
                  </select>
                </div>

                <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    value={profile.designation}
                    onChange={handleChange}
                    style={{
                      padding: "12px 16px",
                      borderRadius: "12px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      outline: "none"
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="save-profile-btn"
                disabled={loading}
                style={{ marginTop: "10px" }}
              >
                {loading ? <div className="loading-spinner"></div> : <><FaSave /> Save Changes</>}
              </button>
            </div>
          </div>
        </form>
      )}
    </motion.div>
  );
}

export default EmployeeProfile;
