import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaClock, 
  FaUserClock, 
  FaCalendarAlt, 
  FaAward, 
  FaTasks, 
  FaBriefcase, 
  FaVolumeUp,
  FaCheckCircle,
  FaCircle,
  FaUser
} from "react-icons/fa";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import "../styles/EmployeeViews.css";
import toast from "react-hot-toast";

function EmployeeDashboard({ user, setActiveMenu }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Interactive checklist task state
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(`decorNestTasks_${user.id}`);
    if (saved) return JSON.parse(saved);
    return [
      { id: 1, text: "Submit quarterly design retro log sheets", done: true },
      { id: 2, text: "Verify salary payslip for June period", done: false },
      { id: 3, text: "Upload profile image to secure HR storage", done: false },
      { id: 4, text: "Review DecorNest structural guide manual", done: false }
    ];
  });

  const [attendanceStats, setAttendanceStats] = useState({ rate: "96%", presentDays: 24, totalDays: 25 });
  const [leaveBalance, setLeaveBalance] = useState({ available: 12, total: 18 });
  const [clockedIn, setClockedIn] = useState(false);

  useEffect(() => {
    localStorage.setItem(`decorNestTasks_${user.id}`, JSON.stringify(tasks));
  }, [tasks, user.id]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Check if clocked in today
    const records = localStorage.getItem(`attendance_records_${user.id}`);
    if (records) {
      const recordsArr = JSON.parse(records);
      const todayStr = new Date().toDateString();
      const todayRecord = recordsArr.find(r => r.date === todayStr);
      if (todayRecord && !todayRecord.clockOut) {
        setClockedIn(true);
      }
    }
  }, [user.id]);

  const liveTimeStr = currentTime.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  const handleTaskToggle = (id) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    toast.success("Task status updated!");
  };

  const chartData = [
    { name: "Mon", hours: 8 },
    { name: "Tue", hours: 8.5 },
    { name: "Wed", hours: 9 },
    { name: "Thu", hours: 8 },
    { name: "Fri", hours: 7.5 }
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
      {/* Personalized Welcome Header Card */}
      <motion.div
        className="emp-view-card glass"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: "linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%)",
          borderLeft: "4px solid #10b981",
          padding: "30px",
          textAlign: "left"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <img 
              src={user.avatar || "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"} 
              alt={user.name} 
              style={{ width: "70px", height: "70px", borderRadius: "50%", border: "2px solid #10b981", objectFit: "cover" }}
              onError={(e) => e.target.src = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"}
            />
            <div>
              <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "4px", color: "white" }}>
                Welcome Back, <span style={{ color: "#10b981" }}>{user.name}</span>
              </h1>
              <p style={{ color: "#64748b", fontSize: "13px" }}>
                ID: <span style={{ fontFamily: "monospace", color: "#10b981", fontWeight: "600" }}>#{user.id || "102"}</span> | Team: <strong>{user.department || "IT Team"}</strong> | Role: {user.role === "admin" ? "Super Admin" : "Specialist"}
              </p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "700", fontFamily: "monospace", color: "white" }}>{liveTimeStr}</h2>
            <p style={{ color: "#64748b", fontSize: "11px", letterSpacing: "0.5px" }}>CURRENT WORKSHIFT SESSION</p>
          </div>
        </div>
      </motion.div>

      {/* Metrics Counters Row */}
      <div className="salary-overview">
        <motion.div className="salary-stat-card net-pay" whileHover={{ y: -4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h4>Attendance Rate</h4>
            <FaUserClock style={{ color: "#10b981", fontSize: "18px" }} />
          </div>
          <h3>{attendanceStats.rate}</h3>
          <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
            {attendanceStats.presentDays} of {attendanceStats.totalDays} working shifts logged
          </p>
        </motion.div>

        <motion.div className="salary-stat-card" whileHover={{ y: -4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h4>Leave Balance</h4>
            <FaCalendarAlt style={{ color: "#3b82f6", fontSize: "18px" }} />
          </div>
          <h3 style={{ color: "#3b82f6" }}>{leaveBalance.available} Days</h3>
          <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
            Available out of {leaveBalance.total} total leaves
          </p>
        </motion.div>

        <motion.div className="salary-stat-card" whileHover={{ y: -4 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <h4>Performance Score</h4>
            <FaAward style={{ color: "#eab308", fontSize: "18px" }} />
          </div>
          <h3 style={{ color: "#eab308" }}>9.8 / 10</h3>
          <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
            Exceeds quarterly HR targets
          </p>
        </motion.div>
      </div>

      {/* Grid Widgets Section */}
      <div className="profile-container" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "25px" }}>
        
        {/* Left Column: Weekly Hours Area Chart & Checklist Tasks */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Weekly Hour Chart */}
          <div className="emp-view-card glass" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
              <h3 style={{ color: "white", fontSize: "15px" }}>Weekly Shift Hours</h3>
              <span style={{ fontSize: "11px", color: "#64748b" }}>CURRENT WORK WEEK</span>
            </div>
            <div style={{ height: "200px", width: "100%" }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <defs>
                    <linearGradient id="empHoursGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: "11px" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "#64748b", fontSize: "11px" }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white" }} />
                  <Area type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#empHoursGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Interactive Checklist tasks widget */}
          <div className="emp-view-card glass" style={{ padding: "24px", textAlign: "left" }}>
            <h3 style={{ color: "white", fontSize: "15px", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
              <FaTasks style={{ color: "#10b981" }} /> Daily Task Checklist
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => handleTaskToggle(task.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.01)",
                    border: "1px solid rgba(255,255,255,0.03)",
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <input
                    type="checkbox"
                    checked={task.done}
                    onChange={() => {}} // toggled on parent div click
                    style={{ cursor: "pointer", accentColor: "#10b981" }}
                  />
                  <span style={{ fontSize: "12.5px", color: task.done ? "#64748b" : "white", textDecoration: task.done ? "line-through" : "none" }}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Attendance Status & Notice boards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>
          
          {/* Status Box */}
          <div className="emp-view-card glass" style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <h3 style={{ color: "white", fontSize: "14px", alignSelf: "flex-start", marginBottom: "12px" }}>Daily Operations Status</h3>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: clockedIn ? "#10b981" : "#f43f5e",
                boxShadow: `0 0 10px ${clockedIn ? "#10b981" : "#f43f5e"}`,
                margin: "15px 0 8px 0"
              }}
            ></div>
            <p style={{ fontWeight: "700", color: "white", fontSize: "13px" }}>{clockedIn ? "Clocked In Today" : "Clocked Out Today"}</p>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "4px 0 15px 0" }}>Logged arrival shift coordinates</p>
            <button
              className="save-profile-btn"
              style={{ width: "100%", justifyContent: "center" }}
              onClick={() => setActiveMenu("attendance")}
            >
              <FaClock /> Log Attendance
            </button>
          </div>

          {/* Company announcements brief */}
          <div className="emp-view-card glass" style={{ padding: "24px", textAlign: "left" }}>
            <h4 style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#10b981", fontWeight: "600", marginBottom: "15px" }}>
              <FaVolumeUp /> Latest Circular
            </h4>
            <div style={{ fontSize: "13px", color: "#64748b", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ borderBottom: "1px solid rgba(255,255,255,0.03)", paddingBottom: "10px" }}>
                <h5 style={{ color: "#fff", fontWeight: "600", margin: "0 0 4px 0" }}>DecorNest Summer Outing</h5>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>Join us for our retreat in July. Details in notices.</p>
              </div>
              <div>
                <h5 style={{ color: "#fff", fontWeight: "600", margin: "0 0 4px 0" }}>System Server Upgraded</h5>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>UI terminal is now dark glass. Enjoy faster syncing.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default EmployeeDashboard;
