import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaFileAlt, FaPaperPlane, FaCalendarTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import "../styles/EmployeeViews.css";

const DEFAULT_LEAVES = [
  {
    id: 1,
    type: "Sick Leave",
    startDate: "2026-06-10",
    endDate: "2026-06-11",
    reason: "Severe Flu and Headache",
    status: "approved"
  },
  {
    id: 2,
    type: "Casual Leave",
    startDate: "2026-07-20",
    endDate: "2026-07-22",
    reason: "Family gathering out of town",
    status: "pending"
  }
];

function EmployeeLeaves({ user }) {
  const [leaves, setLeaves] = useState([]);
  const [leaveType, setLeaveType] = useState("Sick Leave");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const savedLeaves = localStorage.getItem(`leave_requests_${user.id}`);
    if (savedLeaves) {
      setLeaves(JSON.parse(savedLeaves));
    } else {
      setLeaves(DEFAULT_LEAVES);
      localStorage.setItem(`leave_requests_${user.id}`, JSON.stringify(DEFAULT_LEAVES));
    }
  }, [user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate || !reason.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("Start date cannot be after end date.");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const newLeave = {
        id: Date.now(),
        type: leaveType,
        startDate,
        endDate,
        reason: reason.trim(),
        status: "pending"
      };

      const updated = [newLeave, ...leaves];
      setLeaves(updated);
      localStorage.setItem(`leave_requests_${user.id}`, JSON.stringify(updated));

      // Reset Form
      setStartDate("");
      setEndDate("");
      setReason("");
      setSubmitting(false);
      toast.success("Leave application submitted successfully!");
    }, 800);
  };

  return (
    <motion.div
      className="emp-view-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="emp-view-header">
        <h2>
          <FaCalendarTimes /> Leave Application
        </h2>
        <span className="profile-badge">
          Leave Balance: 12 Days Left
        </span>
      </div>

      <div className="leaves-container">
        {/* Form */}
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <h3>Apply for Leave</h3>
          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Leave Type</label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                background: "#081426",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
                outline: "none"
              }}
            >
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Annual Leave">Annual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
          </div>

          <div className="form-grid-2">
            <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
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
              <label style={{ color: "#cbd5e1", fontSize: "13px" }}>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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

          <div className="form-group" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ color: "#cbd5e1", fontSize: "13px" }}>Reason for Leave</label>
            <textarea
              rows="4"
              placeholder="Please explain the details of your leave request..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              style={{
                padding: "12px 16px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "white",
                outline: "none",
                resize: "vertical"
              }}
              required
            />
          </div>

          <button type="submit" className="save-profile-btn" disabled={submitting}>
            {submitting ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <FaPaperPlane /> Submit Application
              </>
            )}
          </button>
        </form>

        {/* History Table */}
        <div>
          <h3 style={{ marginBottom: "15px" }}>Leave Statuses</h3>
          {leaves.length === 0 ? (
            <div className="empty" style={{ textAlign: "center", padding: "30px", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "18px" }}>
              <h4>No Leave Requests</h4>
              <p style={{ color: "#8fa7c8", fontSize: "13px" }}>Apply for a leave to view status logs here.</p>
            </div>
          ) : (
            <div className="table-wrapper" style={{ maxHeight: "400px", overflowY: "auto" }}>
              <table className="punch-history-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Duration</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td style={{ fontWeight: "600" }}>{leave.type}</td>
                      <td>
                        <span style={{ fontSize: "12px" }}>
                          {leave.startDate} to {leave.endDate}
                        </span>
                      </td>
                      <td style={{ maxWidth: "200px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }} title={leave.reason}>
                        {leave.reason}
                      </td>
                      <td>
                        <span className={`leave-status-badge ${leave.status}`}>
                          {leave.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default EmployeeLeaves;
