import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  FaUserPlus, 
  FaBuilding, 
  FaFilePdf, 
  FaCalendarAlt, 
  FaBullhorn, 
  FaArrowRight,
  FaBirthdayCake,
  FaTasks,
  FaUserCheck,
  FaCircle,
  FaCalendarCheck,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts";


import EmployeeDetailsModal from "../components/EmployeeDetailsModal";
import PieChartCard from "../components/PieChartCard";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCards from "../components/StatsCards";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

// Existing Components
import DepartmentManager from "../components/DepartmentManager";
import SettingsPage from "../components/SettingsPage";
import EmployeeDashboard from "../components/EmployeeDashboard";
import EmployeeAttendance from "../components/EmployeeAttendance";
import EmployeeLeaves from "../components/EmployeeLeaves";
import EmployeeSalary from "../components/EmployeeSalary";
import DepartmentDetails from "../components/DepartmentDetails";

// Upgraded Modules
import ReportsModule from "../components/ReportsModule";

import "../styles/Dashboard.css";

function Dashboard({
  employees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  editEmployee,
  setEditEmployee,
}) {
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("decorNestUser");
    return saved ? JSON.parse(saved) : null;
  });

  const handleUpdateUser = () => {
    const saved = localStorage.getItem("decorNestUser");
    if (saved) {
      setUser(JSON.parse(saved));
    }
  };

  useEffect(() => {
    if (editEmployee) {
      setActiveMenu("addEmployee");
    }
  }, [editEmployee]);

  const [sortBy, setSortBy] = useState("name");
  const [filterDept, setFilterDept] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterRole, setFilterRole] = useState("all");
  const [attendanceSearch, setAttendanceSearch] = useState("");
  const [attendanceDept, setAttendanceDept] = useState("all");
  const [attendanceStatus, setAttendanceStatus] = useState("all");
  const [attendancePage, setAttendancePage] = useState(1);

  const employeesPerPage = 10;

  let filteredEmployees = employees.filter((employee) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch = (
      (employee.name && employee.name.toLowerCase().includes(search)) ||
      (employee.department && employee.department.toLowerCase().includes(search)) ||
      (employee.email && employee.email.toLowerCase().includes(search))
    );
    const matchesDept = filterDept === "all" || employee.department === filterDept;
    const matchesStatus = filterStatus === "all" || (employee.status || "Active") === filterStatus;
    const matchesRole = filterRole === "all" || (employee.role || "") === filterRole;
    return matchesSearch && matchesDept && matchesStatus && matchesRole;
  });

  // Sorting
  filteredEmployees = [...filteredEmployees].sort((a, b) => {
    if (sortBy === "name") return (a.name || "").localeCompare(b.name || "");
    if (sortBy === "department") {
      const deptA = a.department || "";
      const deptB = b.department || "";
      return deptA.localeCompare(deptB);
    }
    if (sortBy === "id") return Number(a.id) - Number(b.id);
    return 0;
  });

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Attendance tab — independent search/filter/pagination over ALL employees
  const attendancePerPage = 8;
  const filteredAttendance = employees.filter((emp) => {
    const s = attendanceSearch.toLowerCase();
    const matchesSearch = !s || (emp.name && emp.name.toLowerCase().includes(s)) || (emp.employeeId && String(emp.employeeId).toLowerCase().includes(s));
    const matchesDept = attendanceDept === "all" || emp.department === attendanceDept;
    const matchesStatus = attendanceStatus === "all" || getAttendanceRecord(emp).status === attendanceStatus;
    return matchesSearch && matchesDept && matchesStatus;
  });
  const attendanceTotalPages = Math.ceil(filteredAttendance.length / attendancePerPage) || 1;
  const currentAttendance = filteredAttendance.slice(
    (attendancePage - 1) * attendancePerPage,
    attendancePage * attendancePerPage
  );

  useEffect(() => {
    setAttendancePage(1);
  }, [attendanceSearch, attendanceDept, attendanceStatus]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDept, filterStatus, filterRole]);

  const role = user?.role || "admin";

  // Recharts Attendance and Hiring Trends mock data
  const attendanceTrendData = [
    { day: "Mon", rate: 94 },
    { day: "Tue", rate: 96 },
    { day: "Wed", rate: 95 },
    { day: "Thu", rate: 98 },
    { day: "Fri", rate: 96 },
  ];

  const hiringTrendData = [
    { month: "Jan", hires: 2 },
    { month: "Feb", hires: 4 },
    { month: "Mar", hires: 3 },
    { month: "Apr", hires: 6 },
    { month: "May", hires: 5 },
    { month: "Jun", hires: 8 },
  ];

  // Filter options — always derived live from actual employee records, never hardcoded
  const departmentOptions = Array.from(new Set(employees.map((e) => e.department).filter(Boolean))).sort();
  const statusOptions = Array.from(new Set(employees.map((e) => e.status || "Active").filter(Boolean))).sort();
  const roleOptions = Array.from(new Set(employees.map((e) => e.role).filter(Boolean))).sort();

  // Deterministic (stable, not random) attendance record per employee — there is
  // no real attendance-tracking endpoint in the API, so this stays consistent
  // across renders instead of reshuffling on every re-render.
  const getAttendanceRecord = (emp) => {
    const seed = String(emp.id || emp.name || "").split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
    const statuses = ["On Time", "Late", "On Time", "On Time", "Absent"];
    const status = statuses[seed % statuses.length];
    const checkInHour = 9 + (seed % 2);
    const checkInMin = (seed * 7) % 60;
    const checkOutHour = 17 + (seed % 2);
    const workingHours = status === "Absent" ? "0h 0m" : `${checkOutHour - checkInHour}h ${(60 - checkInMin) % 60}m`;
    return {
      status,
      checkIn: status === "Absent" ? "—" : `${String(checkInHour).padStart(2, "0")}:${String(checkInMin).padStart(2, "0")} AM`,
      checkOut: status === "Absent" ? "—" : `${String(checkOutHour - 12).padStart(2, "0")}:${String(checkInMin).padStart(2, "0")} PM`,
      workingHours,
    };
  };

  // Employee status distribution (falls back to "Active" for legacy records)
  const statusCounts = {};
  employees.forEach((e) => {
    const s = e.status || "Active";
    statusCounts[s] = (statusCounts[s] || 0) + 1;
  });
  const employeeStatusData = Object.keys(statusCounts).map((status) => ({
    name: status,
    value: statusCounts[status],
  }));
  const STATUS_COLORS = { Active: "#10b981", Inactive: "#64748b", "On Leave": "#fbbf24", Probation: "#0ea5e9" };

  // Leave statistics, sourced from the same localStorage leaves data used elsewhere in the app
  const leaveStatsData = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem("decorNestLeaves") || "[]");
      const counts = { Pending: 0, Approved: 0, Rejected: 0 };
      saved.forEach((l) => {
        const s = (l.status || "Pending");
        const key = s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
        counts[key] = (counts[key] || 0) + 1;
      });
      return Object.keys(counts).map((k) => ({ name: k, value: counts[k] }));
    } catch (e) {
      return [{ name: "Pending", value: 0 }, { name: "Approved", value: 0 }, { name: "Rejected", value: 0 }];
    }
  })();

  // Department performance overview (illustrative composite score per department)
  const performanceData = Array.from(new Set(employees.map((e) => e.department).filter(Boolean))).map((dept) => {
    const deptCount = employees.filter((e) => e.department === dept).length;
    const score = 70 + ((dept.length * 7 + deptCount * 3) % 26);
    return { name: dept, score };
  });

  // Activities logs list
  const recentActivities = [
    { id: 1, text: "Employee Gertrude Zieme added", desc: "Assigned to HR department", time: "Just now" },
    { id: 2, text: "IT department updated", desc: "Budgets allocations adjusted", time: "2 hours ago" },
    { id: 3, text: "Attendance Submitted", desc: "Arnold O'Conner shift logged", time: "3 hours ago" },
    { id: 4, text: "Leave request Approved", desc: "Maggie Klocko Sick Leave", time: "1 day ago" },
    { id: 5, text: "Profile details Updated", desc: "System Admin settings profile", time: "Yesterday" }
  ];

  // Tasks checklist
  const todayTasks = [
    { id: 1, task: "Sign off June salary payslips" },
    { id: 2, task: "Approve pending leave applications" },
    { id: 3, task: "Review IT team retrospective charts" }
  ];

  return (
    <div className={`layout ${isCollapsed ? "sidebar-collapsed" : ""}`}>
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={(menuId) => {
          if (menuId === "addEmployee") {
            setEditEmployee(null);
          }
          setActiveMenu(menuId);
        }}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <motion.div
        id="dashboard"
        className="dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Navbar */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Navbar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onSearch={() => {
              setCurrentPage(1);
              if (role === "admin") {
                setActiveMenu("employees");
              }
            }}
            onUpdateUser={handleUpdateUser}
          />
        </motion.div>

        {/* ==========================================
                     ADMIN PORTAL SCREENS
           ========================================== */}
        {role === "admin" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", flex: 1 }}>
            
            {/* 1. Main Structured Dashboard View */}
            {activeMenu === "dashboard" && (
              <>
                {/* Top Row: KPI statistic cards with animated counters */}
                <StatsCards employees={employees} />

                {/* Middle Row & Right Panel Grid */}
                <div className="middle-row-grid">
                  
                  {/* Middle Left: Quick Glance Column (no charts here — see Analytics) */}
                  <div className="charts-column">
                    <div className="chart-panel glass">
                      <div className="panel-header">
                        <div>
                          <h3>Today at a Glance</h3>
                          <p>Live operational snapshot</p>
                        </div>
                      </div>
                      <div className="glance-grid">
                        <div className="glance-tile">
                          <span className="glance-value">{attendanceTrendData[attendanceTrendData.length - 1].rate}%</span>
                          <span className="glance-label">Attendance Today</span>
                        </div>
                        <div className="glance-tile">
                          <span className="glance-value">{hiringTrendData[hiringTrendData.length - 1].hires}</span>
                          <span className="glance-label">New Hires this Month</span>
                        </div>
                        <div className="glance-tile">
                          <span className="glance-value">{new Set(employees.map(e => e.department).filter(Boolean)).size}</span>
                          <span className="glance-label">Active Departments</span>
                        </div>
                        <div className="glance-tile">
                          <span className="glance-value">{employees.length}</span>
                          <span className="glance-label">Total Employees</span>
                        </div>
                      </div>
                      <button className="glance-analytics-btn" onClick={() => setActiveMenu("analytics")}>
                        View Full Analytics <FaArrowRight />
                      </button>
                    </div>

                    <div className="chart-panel glass">
                      <h3><FaUserCheck style={{ color: "#10b981" }} /> Department Snapshot</h3>
                      <div className="compact-announcements-list">
                        {Array.from(new Set(employees.map(e => e.department).filter(Boolean))).slice(0, 5).map((dept) => (
                          <div className="compact-notice" key={dept}>
                            <h5>{dept}</h5>
                            <span>{employees.filter(e => e.department === dept).length} employees</span>
                          </div>
                        ))}
                        {employees.length === 0 && (
                          <div className="compact-notice">
                            <h5>No employees yet</h5>
                            <span>Add your first employee to get started</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle Right / Right Sidebar Panel: Unified Operational widgets */}
                  <div className="right-sidebar-column">
                    
                    {/* Announcements Brief */}
                    <div className="sidebar-panel glass">
                      <h3><FaBullhorn style={{ color: "#10b981" }} /> Company Notices</h3>
                      <div className="compact-announcements-list">
                        <div className="compact-notice">
                          <h5>Summer retreat on July 25</h5>
                          <span>Posted by HR Operations</span>
                        </div>
                        <div className="compact-notice">
                          <h5>System upgraded to Dark Emerald</h5>
                          <span>Posted by IT Support</span>
                        </div>
                      </div>
                    </div>

                    {/* Today's Tasks */}
                    <div className="sidebar-panel glass">
                      <h3><FaTasks style={{ color: "#10b981" }} /> Today's Deliverables</h3>
                      <div className="compact-tasks-list">
                        {todayTasks.map(t => (
                          <div key={t.id} className="compact-task-item">
                            <input type="checkbox" style={{ accentColor: "#10b981" }} />
                            <span>{t.task}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Upcoming Meetings */}
                    <div className="sidebar-panel glass">
                      <h3><FaCalendarAlt style={{ color: "#10b981" }} /> Upcoming Meetings</h3>
                      <div className="compact-schedule-list">
                        <div className="compact-schedule-item">
                          <div className="schedule-time">09:30 AM</div>
                          <div className="schedule-meta">
                            <h6>Daily Scrum Sync</h6>
                            <span>HR & IT Teams</span>
                          </div>
                        </div>
                        <div className="compact-schedule-item">
                          <div className="schedule-time">03:00 PM</div>
                          <div className="schedule-meta">
                            <h6>Roster Review</h6>
                            <span>Manager retro</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Birthdays */}
                    <div className="sidebar-panel glass">
                      <h3><FaBirthdayCake style={{ color: "#10b981" }} /> Upcoming Birthdays</h3>
                      <div className="compact-birthday-list">
                        <div className="birthday-row">
                          <span className="bday-date">July 20</span>
                          <span className="bday-name">Gertrude Zieme</span>
                        </div>
                        <div className="birthday-row">
                          <span className="bday-date">Aug 05</span>
                          <span className="bday-name">Arnold O'Conner</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Row Grid */}
                <div className="bottom-row-grid">
                  
                  {/* Bottom Left: Recent Employees table */}
                  <div className="bottom-panel table-panel glass">
                    <h3>Recent Employees</h3>
                    <div className="compact-table-wrapper">
                      <table>
                        <thead>
                          <tr>
                            <th>Employee Name</th>
                            <th>Department</th>
                            <th>Status</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {employees.slice(-3).reverse().map((emp) => (
                            <tr key={emp.id}>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <img src={emp.image} alt={emp.name} className="table-avatar" onError={(e) => e.target.src = "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150"} />
                                  <div style={{ textAlign: "left" }}>
                                    <h5 style={{ color: "white", fontSize: "12.5px", fontWeight: "600", margin: 0 }}>{emp.name}</h5>
                                    <small style={{ color: "#64748b", fontSize: "10px" }}>Specialist</small>
                                  </div>
                                </div>
                              </td>
                              <td><span className="badge-department">{emp.department || "No Dept"}</span></td>
                              <td>
                                <span className="status-indicator-badge">
                                  <FaCircle className="dot" /> Active
                                </span>
                              </td>
                              <td>
                                <button className="action-view-btn" onClick={() => setSelectedEmployee(emp)}>
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Bottom Center: Recent Activity Timeline */}
                  <div className="bottom-panel activity-panel glass">
                    <h3>Recent Activities</h3>
                    <div className="timeline-cards-list">
                      {recentActivities.slice(0, 3).map((act) => (
                        <div key={act.id} className="timeline-card-item">
                          <div className="timeline-marker success"></div>
                          <div className="timeline-details">
                            <h5>{act.text}</h5>
                            <p>{act.desc}</p>
                            <span>{act.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Right: Quick Actions panel */}
                  <div className="bottom-panel actions-panel glass">
                    <h3>Quick Actions</h3>
                    <div className="panel-actions-layout">
                      <div className="action-button-card" onClick={() => setActiveMenu("addEmployee")}>
                        <FaUserPlus className="action-icon" />
                        <span>Add Employee</span>
                      </div>
                      <div className="action-button-card" onClick={() => setActiveMenu("departments")}>
                        <FaBuilding className="action-icon" />
                        <span>Departments</span>
                      </div>
                      <div className="action-button-card" onClick={() => setActiveMenu("reports")}>
                        <FaFilePdf className="action-icon" />
                        <span>Generate Report</span>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {/* 2. Employee roster table directory */}
            {activeMenu === "employees" && (
              <motion.div
                id="employees"
                className="table-card"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                {/* Sorting and Filtering Controls */}
                <div className="filters-bar glass">
                  <div className="filter-field">
                    <label>Department</label>
                    <select
                      className="premium-dropdown"
                      value={filterDept}
                      onChange={(e) => setFilterDept(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-field">
                    <label>Role</label>
                    <select
                      className="premium-dropdown"
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                    >
                      <option value="all">All Roles</option>
                      {roleOptions.length > 0 ? (
                        roleOptions.map((role) => (
                          <option key={role} value={role}>{role}</option>
                        ))
                      ) : (
                        <option value="all" disabled>No roles recorded yet</option>
                      )}
                    </select>
                  </div>

                  <div className="filter-field">
                    <label>Status</label>
                    <select
                      className="premium-dropdown"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="filter-field">
                    <label>Sort By</label>
                    <select
                      className="premium-dropdown"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">Name</option>
                      <option value="id">ID</option>
                      <option value="department">Department</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    className="reset-filters-btn"
                    onClick={() => {
                      setSearchTerm("");
                      setFilterDept("all");
                      setFilterStatus("all");
                      setFilterRole("all");
                      setSortBy("name");
                      setCurrentPage(1);
                    }}
                  >
                    Reset Filters
                  </button>
                </div>

                <EmployeeList
                  employees={currentEmployees}
                  onEdit={setEditEmployee}
                  onDelete={deleteEmployee}
                  onView={setSelectedEmployee}
                />

                <div className="premium-pagination-wrap">
                  <div className="premium-pagination">
                    <button
                      className="premium-page-btn nav-btn"
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      aria-label="Previous page"
                    >
                      <FaChevronLeft />
                    </button>

                    {[...Array(totalPages)].map((_, index) => (
                      <button
                        key={index}
                        className={`premium-page-btn ${currentPage === index + 1 ? "active-page" : ""}`}
                        onClick={() => setCurrentPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}

                    <button
                      className="premium-page-btn nav-btn"
                      disabled={currentPage === totalPages || totalPages === 0}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      aria-label="Next page"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Add Employee Form */}
            {activeMenu === "addEmployee" && (
              <motion.div
                id="addEmployee"
                className="form-card"
                initial={{ x: -80, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <EmployeeForm
                  addEmployee={addEmployee}
                  updateEmployee={updateEmployee}
                  editEmployee={editEmployee}
                  departmentOptions={departmentOptions}
                  onCancelEdit={() => {
                    setEditEmployee(null);
                    setActiveMenu("employees");
                  }}
                  onSuccess={() => {
                    setEditEmployee(null);
                    setActiveMenu("employees");
                  }}
                />
              </motion.div>
            )}

            {/* 4. Departments manager cards */}
            {activeMenu === "departments" && (
              <DepartmentManager employees={employees} />
            )}

            {/* 5. Reports builder exports */}
            {activeMenu === "reports" && (
              <ReportsModule employees={employees} />
            )}

            {/* 6. Settings toggler preferences */}
            {activeMenu === "settings" && (
              <SettingsPage />
            )}

            {/* 7. Admin Analytics view — the ONLY place charts live */}
            {activeMenu === "analytics" && (
              <div className="analytics-page">

                {/* TOP SECTION — Key Statistics */}
                <div className="analytics-stats-row">
                  <div className="analytics-stat-card">
                    <div className="analytics-stat-icon"><FaUserCheck /></div>
                    <div>
                      <span className="analytics-stat-value">{employees.length}</span>
                      <span className="analytics-stat-label">Total Employees</span>
                    </div>
                  </div>
                  <div className="analytics-stat-card">
                    <div className="analytics-stat-icon"><FaCalendarCheck /></div>
                    <div>
                      <span className="analytics-stat-value">{attendanceTrendData[attendanceTrendData.length - 1].rate}%</span>
                      <span className="analytics-stat-label">Attendance Rate</span>
                    </div>
                  </div>
                  <div className="analytics-stat-card">
                    <div className="analytics-stat-icon"><FaBuilding /></div>
                    <div>
                      <span className="analytics-stat-value">{departmentOptions.length}</span>
                      <span className="analytics-stat-label">Active Departments</span>
                    </div>
                  </div>
                  <div className="analytics-stat-card">
                    <div className="analytics-stat-icon"><FaArrowRight style={{ transform: "rotate(-45deg)" }} /></div>
                    <div>
                      <span className="analytics-stat-value">
                        {performanceData.length > 0 ? Math.round(performanceData.reduce((s, d) => s + d.score, 0) / performanceData.length) : 0}%
                      </span>
                      <span className="analytics-stat-label">Monthly Performance</span>
                    </div>
                  </div>
                </div>

                {/* MIDDLE SECTION — Growth & Attendance */}
                <h3 className="analytics-section-title">Growth &amp; Attendance</h3>
                <div className="analytics-grid analytics-grid-2">
                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Employee Growth</h3>
                        <p>New hires onboarded per month</p>
                      </div>
                    </div>
                    <div style={{ height: "260px", width: "100%" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hiringTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <Tooltip contentStyle={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", fontSize: "12px" }} cursor={{ fill: "rgba(16,185,129,0.04)" }} />
                          <Bar dataKey="hires" name="New Hires" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={32} animationDuration={900} animationEasing="ease-out" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Attendance Trend</h3>
                        <p>Weekly check-in levels trend</p>
                      </div>
                    </div>
                    <div style={{ height: "260px", width: "100%" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <defs>
                            <linearGradient id="attendGradAnalytics" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="day" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[90, 100]} />
                          <Tooltip contentStyle={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", fontSize: "12px" }} />
                          <Area type="monotone" dataKey="rate" name="Attendance %" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#attendGradAnalytics)" animationDuration={900} animationEasing="ease-out" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* BOTTOM SECTION — Distribution & Performance */}
                <h3 className="analytics-section-title">Distribution &amp; Performance</h3>
                <div className="analytics-grid">

                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Department Distribution</h3>
                        <p>Headcount split across departments</p>
                      </div>
                    </div>
                    <PieChartCard employees={employees} />
                  </div>

                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Employee Distribution</h3>
                        <p>Workforce split by employment status</p>
                      </div>
                    </div>
                    <div style={{ height: "260px", width: "100%" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={employeeStatusData}
                            dataKey="value"
                            nameKey="name"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={4}
                            strokeWidth={3}
                            stroke="#0f172a"
                            animationDuration={900}
                            animationEasing="ease-out"
                          >
                            {employeeStatusData.map((entry, index) => (
                              <Cell key={index} fill={STATUS_COLORS[entry.name] || "#8b5cf6"} />
                            ))}
                          </Pie>
                          <Tooltip contentStyle={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", fontSize: "12px" }} />
                          <Legend wrapperStyle={{ fontSize: "12px", color: "#94a3b8" }} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Leave Analytics</h3>
                        <p>Leave requests by status</p>
                      </div>
                    </div>
                    <div style={{ height: "260px", width: "100%" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={leaveStatsData} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                          <XAxis type="number" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                          <YAxis type="category" dataKey="name" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} width={80} />
                          <Tooltip contentStyle={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", fontSize: "12px" }} cursor={{ fill: "rgba(16,185,129,0.04)" }} />
                          <Bar dataKey="value" name="Requests" radius={[0, 8, 8, 0]} maxBarSize={22} animationDuration={900} animationEasing="ease-out">
                            {leaveStatsData.map((entry, index) => (
                              <Cell key={index} fill={entry.name === "Approved" ? "#10b981" : entry.name === "Rejected" ? "#f43f5e" : "#fbbf24"} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Performance Analytics</h3>
                        <p>Composite score by department</p>
                      </div>
                    </div>
                    <div style={{ height: "260px", width: "100%" }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} />
                          <YAxis tick={{ fill: "#64748b", fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                          <Tooltip contentStyle={{ background: "#0d1527", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px", color: "white", fontSize: "12px" }} cursor={{ fill: "rgba(16,185,129,0.04)" }} />
                          <Bar dataKey="score" name="Score" radius={[8, 8, 0, 0]} maxBarSize={32} animationDuration={900} animationEasing="ease-out">
                            {performanceData.map((entry, index) => (
                              <Cell key={index} fill={["#10b981", "#0ea5e9", "#8b5cf6", "#fbbf24", "#f43f5e", "#34e89e"][index % 6]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="chart-panel glass analytics-panel">
                    <div className="panel-header">
                      <div>
                        <h3>Monthly Summary</h3>
                        <p>This month at a glance</p>
                      </div>
                    </div>
                    <div className="monthly-summary-list">
                      <div className="monthly-summary-item">
                        <span>New Hires</span>
                        <strong>{hiringTrendData[hiringTrendData.length - 1].hires}</strong>
                      </div>
                      <div className="monthly-summary-item">
                        <span>Avg Attendance</span>
                        <strong>{Math.round(attendanceTrendData.reduce((s, d) => s + d.rate, 0) / attendanceTrendData.length)}%</strong>
                      </div>
                      <div className="monthly-summary-item">
                        <span>Pending Leaves</span>
                        <strong>{leaveStatsData.find(l => l.name === "Pending")?.value || 0}</strong>
                      </div>
                      <div className="monthly-summary-item">
                        <span>Departments Active</span>
                        <strong>{departmentOptions.length}</strong>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* 8. Upgraded Attendance Roster Log sheet */}
            {activeMenu === "attendance" && (
              <div className="emp-view-card glass" style={{ padding: "30px", textAlign: "left" }}>
                <h2 style={{ color: "white", fontSize: "20px", display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                  <FaCalendarCheck style={{ color: "#10b981" }} /> Team Check-in Logs
                </h2>
                <p style={{ color: "#64748b", fontSize: "12px", marginBottom: "20px" }}>Roster check-in/out records for the current workweek — {filteredAttendance.length} of {employees.length} employees.</p>

                <div className="filters-bar glass" style={{ marginBottom: "20px" }}>
                  <div className="filter-field" style={{ minWidth: "220px" }}>
                    <label>Search</label>
                    <input
                      type="text"
                      className="premium-dropdown"
                      style={{ backgroundImage: "none", paddingRight: "14px" }}
                      placeholder="Search by name or ID..."
                      value={attendanceSearch}
                      onChange={(e) => setAttendanceSearch(e.target.value)}
                    />
                  </div>
                  <div className="filter-field">
                    <label>Department</label>
                    <select
                      className="premium-dropdown"
                      value={attendanceDept}
                      onChange={(e) => setAttendanceDept(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {departmentOptions.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div className="filter-field">
                    <label>Status</label>
                    <select
                      className="premium-dropdown"
                      value={attendanceStatus}
                      onChange={(e) => setAttendanceStatus(e.target.value)}
                    >
                      <option value="all">All Statuses</option>
                      <option value="On Time">On Time</option>
                      <option value="Late">Late</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </div>
                  <button
                    type="button"
                    className="reset-filters-btn"
                    onClick={() => {
                      setAttendanceSearch("");
                      setAttendanceDept("all");
                      setAttendanceStatus("all");
                    }}
                  >
                    Reset Filters
                  </button>
                </div>

                <div className="compact-table-wrapper attendance-table-wrapper">
                  <table>
                    <colgroup>
                      <col style={{ width: "22%" }} />
                      <col style={{ width: "12%" }} />
                      <col style={{ width: "13%" }} />
                      <col style={{ width: "12%" }} />
                      <col style={{ width: "12%" }} />
                      <col style={{ width: "13%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "12%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Employee</th>
                        <th>Employee ID</th>
                        <th>Department</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Working Hours</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentAttendance.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ textAlign: "center", padding: "30px", color: "#64748b" }}>
                            No attendance records match your filters.
                          </td>
                        </tr>
                      ) : (
                        currentAttendance.map(emp => {
                          const record = getAttendanceRecord(emp);
                          return (
                            <tr key={emp.id}>
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                  <img src={emp.image} alt={emp.name} className="table-avatar" onError={(e) => e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(emp.name || "User") + "&background=10b981&color=fff"} />
                                  <span className="ellipsis-cell" style={{ color: "white", fontWeight: "600" }}>{emp.name}</span>
                                </div>
                              </td>
                              <td className="ellipsis-cell">{emp.employeeId || emp.id}</td>
                              <td className="ellipsis-cell">{emp.department || "—"}</td>
                              <td>{record.checkIn}</td>
                              <td>{record.checkOut}</td>
                              <td>{record.workingHours}</td>
                              <td>{new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</td>
                              <td>
                                <span className="badge-dept" style={record.status === "Absent" ? { background: "rgba(239,68,68,0.12)", color: "#f87171" } : record.status === "Late" ? { background: "rgba(251,191,36,0.12)", color: "#fbbf24" } : undefined}>
                                  {record.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                {attendanceTotalPages > 1 && (
                  <div className="premium-pagination-wrap">
                    <div className="premium-pagination">
                      <button
                        className="premium-page-btn nav-btn"
                        disabled={attendancePage === 1}
                        onClick={() => setAttendancePage(attendancePage - 1)}
                        aria-label="Previous page"
                      >
                        <FaChevronLeft />
                      </button>
                      {[...Array(attendanceTotalPages)].map((_, index) => (
                        <button
                          key={index}
                          className={`premium-page-btn ${attendancePage === index + 1 ? "active-page" : ""}`}
                          onClick={() => setAttendancePage(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        className="premium-page-btn nav-btn"
                        disabled={attendancePage === attendanceTotalPages}
                        onClick={() => setAttendancePage(attendancePage + 1)}
                        aria-label="Next page"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* ==========================================
                    EMPLOYEE PORTAL SCREENS
           ========================================== */}
        {role === "employee" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "25px", flex: 1 }}>
            
            {/* 1. Personalized Employee Dashboard View */}
            {activeMenu === "dashboard" && (
              <EmployeeDashboard user={user} setActiveMenu={setActiveMenu} />
            )}

            {/* 2. Daily shift Attendance Check In */}
            {activeMenu === "attendance" && (
              <EmployeeAttendance user={user} />
            )}

            {/* 3. Leaves requests */}
            {activeMenu === "leaves" && (
              <EmployeeLeaves user={user} />
            )}

            {/* 4. Department directory */}
            {activeMenu === "departmentDetails" && (
              <DepartmentDetails user={user} employees={employees} />
            )}

            {/* 6. Salary Payslips */}
            {activeMenu === "salary" && (
              <EmployeeSalary user={user} />
            )}

            {/* 7. Settings Page */}
            {activeMenu === "settings" && (
              <SettingsPage />
            )}

          </div>
        )}

        <EmployeeDetailsModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      </motion.div>
    </div>
  );
}

export default Dashboard;