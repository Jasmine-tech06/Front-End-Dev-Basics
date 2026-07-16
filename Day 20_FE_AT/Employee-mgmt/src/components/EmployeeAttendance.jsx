import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaClock, FaCalendarCheck, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import "../styles/EmployeeViews.css";

function EmployeeAttendance({ user }) {
  const [clockedIn, setClockedIn] = useState(false);
  const [punchInTime, setPunchInTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState("00:00:00");
  const [attendanceLogs, setAttendanceLogs] = useState([]);

  // Fetch logs on mount
  useEffect(() => {
    const savedLogs = localStorage.getItem(`attendance_records_${user.id}`);
    if (savedLogs) {
      const logs = JSON.parse(savedLogs);
      setAttendanceLogs(logs);

      // Check if user is currently clocked in
      const todayStr = new Date().toDateString();
      const activeRecord = logs.find(log => log.date === todayStr && !log.clockOut);
      if (activeRecord) {
        setClockedIn(true);
        setPunchInTime(new Date(activeRecord.clockInTime));
      }
    }
  }, [user.id]);

  // Handle timer ticks when clocked in
  useEffect(() => {
    let interval = null;
    if (clockedIn && punchInTime) {
      interval = setInterval(() => {
        const diffMs = new Date() - punchInTime;
        const diffHrs = Math.floor(diffMs / 3600000);
        const diffMins = Math.floor((diffMs % 3600000) / 60000);
        const diffSecs = Math.floor((diffMs % 60000) / 1000);

        const pad = (num) => String(num).padStart(2, "0");
        setElapsedTime(`${pad(diffHrs)}:${pad(diffMins)}:${pad(diffSecs)}`);
      }, 1000);
    } else {
      setElapsedTime("00:00:00");
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [clockedIn, punchInTime]);

  const handlePunch = () => {
    const now = new Date();
    const todayStr = now.toDateString();
    const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    if (!clockedIn) {
      // PUNCH IN
      const newRecord = {
        date: todayStr,
        formattedDate: now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" }),
        clockIn: timeStr,
        clockInTime: now.toISOString(),
        clockOut: null,
        duration: "Active"
      };

      const updatedLogs = [newRecord, ...attendanceLogs];
      setAttendanceLogs(updatedLogs);
      localStorage.setItem(`attendance_records_${user.id}`, JSON.stringify(updatedLogs));

      setPunchInTime(now);
      setClockedIn(true);
      toast.success("Clocked In successfully!");
    } else {
      // PUNCH OUT
      const updatedLogs = attendanceLogs.map(log => {
        if (log.date === todayStr && !log.clockOut) {
          const diffMs = now - new Date(log.clockInTime);
          const diffHrs = Math.floor(diffMs / 3600000);
          const diffMins = Math.floor((diffMs % 3600000) / 60000);
          
          return {
            ...log,
            clockOut: timeStr,
            duration: `${diffHrs} hrs ${diffMins} mins`
          };
        }
        return log;
      });

      setAttendanceLogs(updatedLogs);
      localStorage.setItem(`attendance_records_${user.id}`, JSON.stringify(updatedLogs));

      setClockedIn(false);
      setPunchInTime(null);
      toast.success("Clocked Out successfully!");
    }
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
          <FaCalendarCheck /> Attendance Tracker
        </h2>
        <span className="profile-badge">
          Status: {clockedIn ? "On Duty" : "Off Duty"}
        </span>
      </div>

      <div className="punch-card-wrapper">
        <div className="punch-console">
          <div className="punch-timer">{elapsedTime}</div>
          <motion.button
            className={`punch-btn ${clockedIn ? "punch-out" : "punch-in"}`}
            onClick={handlePunch}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {clockedIn ? (
              <>
                <FaSignOutAlt />
                <span>Clock Out</span>
              </>
            ) : (
              <>
                <FaSignInAlt />
                <span>Clock In</span>
              </>
            )}
          </motion.button>
          <div className="punch-status-text">
            {clockedIn ? (
              <p>Clocked in at : <span>{punchInTime?.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</span></p>
            ) : (
              <p>Ready to clock in for today.</p>
            )}
          </div>
        </div>
      </div>

      <div className="table-header" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px", marginTop: "10px" }}>
        <h3>Attendance Logs</h3>
      </div>

      {attendanceLogs.length === 0 ? (
        <div className="empty" style={{ textAlign: "center", padding: "30px" }}>
          <h4>No Attendance Logs</h4>
          <p style={{ color: "#8fa7c8", fontSize: "14px" }}>Your punch records will appear here.</p>
        </div>
      ) : (
        <div className="table-wrapper" style={{ maxHeight: "300px", overflowY: "auto" }}>
          <table className="punch-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Clock In</th>
                <th>Clock Out</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLogs.map((log, index) => (
                <tr key={index}>
                  <td>{log.formattedDate}</td>
                  <td>{log.clockIn}</td>
                  <td>{log.clockOut || "---"}</td>
                  <td>
                    <span className="duration-badge" style={{ color: log.clockOut ? "#39e98f" : "#facc15" }}>
                      {log.duration}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}

export default EmployeeAttendance;
