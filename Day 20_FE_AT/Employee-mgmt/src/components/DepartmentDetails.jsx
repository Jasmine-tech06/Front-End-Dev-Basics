import { motion } from "framer-motion";
import {
  FaBuilding,
  FaUserTie,
  FaEnvelope,
  FaUsers,
  FaClock,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaBullhorn,
  FaTasks,
  FaBullseye,
  FaChartLine,
  FaHistory,
  FaCode,
  FaProjectDiagram,
} from "react-icons/fa";
import "../styles/EmployeeViews.css";

// Illustrative department reference info — descriptive/organizational content
// that isn't tracked as per-employee data in the API.
const DEPARTMENT_INFO = {
  IT: {
    head: "Sarah Jenkins",
    description: "Owns the company's engineering platform, internal tools, and technical infrastructure — from the employee portal to production deployments.",
    responsibilities: ["Platform engineering", "Infrastructure & DevOps", "Internal tooling", "Technical support", "Security & compliance"],
    technologies: ["React", "Node.js", "AWS", "Docker", "PostgreSQL"],
    projects: ["Employee Portal Revamp", "Cloud Cost Optimization", "Internal API Gateway"],
    currentTasks: ["Ship Analytics v2 dashboard", "Migrate CI pipeline", "Q3 security audit"],
    goals: ["99.9% platform uptime", "Cut deployment time by 30%", "Onboard 2 new engineers"],
    workingHours: "9:00 AM – 6:00 PM (Mon–Fri)",
    contact: "it-support@decornest.com",
    location: "3rd Floor, Tower B — Bengaluru HQ",
  },
  HR: {
    head: "David Miller",
    description: "Manages hiring, employee wellbeing, culture, and internal policy across the organization.",
    responsibilities: ["Recruitment & onboarding", "Employee relations", "Payroll coordination", "Policy & compliance", "Culture & engagement"],
    technologies: ["Workday", "MockAPI HRIS", "Slack", "Google Workspace"],
    projects: ["2026 Hiring Drive", "Wellness Program Rollout", "Policy Handbook Refresh"],
    currentTasks: ["Screen backend engineer candidates", "Finalize Q3 benefits update", "Plan team offsite"],
    goals: ["Reduce time-to-hire by 20%", "95% employee satisfaction score", "Zero policy compliance gaps"],
    workingHours: "9:00 AM – 6:00 PM (Mon–Fri)",
    contact: "hr@decornest.com",
    location: "2nd Floor, Tower A — Bengaluru HQ",
  },
  Finance: {
    head: "Michael Chen",
    description: "Oversees budgeting, payroll, vendor payments, and financial reporting for the company.",
    responsibilities: ["Budgeting & forecasting", "Payroll processing", "Vendor management", "Financial reporting", "Audit coordination"],
    technologies: ["QuickBooks", "Excel Models", "Razorpay", "Tally"],
    projects: ["FY26 Budget Planning", "Vendor Payment Automation", "Expense Policy Update"],
    currentTasks: ["Close Q2 books", "Reconcile vendor invoices", "Prepare board deck"],
    goals: ["Close books 3 days faster", "Reduce processing errors by 15%", "Automate 50% of reconciliations"],
    workingHours: "9:30 AM – 6:30 PM (Mon–Fri)",
    contact: "finance@decornest.com",
    location: "2nd Floor, Tower A — Bengaluru HQ",
  },
  Marketing: {
    head: "Priya Sharma",
    description: "Drives brand strategy, campaigns, and content across every channel the company shows up on.",
    responsibilities: ["Brand strategy", "Content & campaigns", "Social media", "Growth analytics", "Partnerships"],
    technologies: ["HubSpot", "Figma", "Google Analytics", "Meta Ads Manager"],
    projects: ["Q3 Brand Refresh", "Product Launch Campaign", "SEO Overhaul"],
    currentTasks: ["Finalize launch creative", "Review campaign analytics", "Plan influencer outreach"],
    goals: ["+25% qualified leads", "Grow social following 40%", "Improve conversion rate by 10%"],
    workingHours: "9:00 AM – 6:00 PM (Mon–Fri)",
    contact: "marketing@decornest.com",
    location: "4th Floor, Tower B — Bengaluru HQ",
  },
  Sales: {
    head: "Robert Davis",
    description: "Builds and manages client relationships, driving new business and account growth.",
    responsibilities: ["Lead qualification", "Client relationship management", "Deal negotiation", "Revenue forecasting", "Account growth"],
    technologies: ["Salesforce", "Zoho CRM", "DocuSign", "Slack"],
    projects: ["Enterprise Accounts Push", "Referral Program Launch", "CRM Migration"],
    currentTasks: ["Follow up on pending proposals", "Update pipeline forecast", "Onboard new client"],
    goals: ["Hit Q3 revenue target", "Grow enterprise accounts by 15%", "Reduce sales cycle by 1 week"],
    workingHours: "9:00 AM – 6:00 PM (Mon–Fri)",
    contact: "sales@decornest.com",
    location: "1st Floor, Tower A — Bengaluru HQ",
  },
  Support: {
    head: "Emily Watson",
    description: "Keeps customers happy by resolving issues quickly and feeding product insight back to the team.",
    responsibilities: ["Ticket resolution", "Customer onboarding", "Knowledge base upkeep", "Escalation management", "Product feedback loop"],
    technologies: ["Zendesk", "Intercom", "Notion", "Slack"],
    projects: ["Self-Serve Help Center", "Support SLA Revamp", "Chatbot Pilot"],
    currentTasks: ["Clear backlog tickets", "Update help center articles", "Review SLA metrics"],
    goals: ["First-response time under 2 hrs", "CSAT above 92%", "Cut ticket backlog by half"],
    workingHours: "8:00 AM – 5:00 PM (Mon–Sat)",
    contact: "support@decornest.com",
    location: "1st Floor, Tower A — Bengaluru HQ",
  },
};

const DEFAULT_INFO = {
  head: "Not Assigned",
  description: "Department information will appear here once details are configured.",
  responsibilities: [],
  technologies: [],
  projects: [],
  currentTasks: [],
  goals: [],
  workingHours: "9:00 AM – 6:00 PM (Mon–Fri)",
  contact: "info@decornest.com",
  location: "Bengaluru HQ",
};

const TIMELINE = [
  { label: "Team kickoff for the quarter", time: "2 weeks ago" },
  { label: "Mid-quarter review completed", time: "5 days ago" },
  { label: "New teammate onboarded", time: "2 days ago" },
  { label: "Sprint planning for next cycle", time: "Today" },
];

function DepartmentDetails({ user, employees }) {
  const departmentName = user.department || "IT";
  const info = DEPARTMENT_INFO[departmentName] || DEFAULT_INFO;

  // Filter other employees in the same department
  const colleagues = employees.filter(
    emp => emp.department === departmentName && emp.id !== user.id
  );
  const teamSize = colleagues.length + 1; // including the current user
  const performanceScore = 70 + ((departmentName.length * 7 + teamSize * 3) % 26);

  return (
    <motion.div
      className="emp-view-card"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="emp-view-header">
        <h2>
          <FaBuilding /> {departmentName} Department
        </h2>
        <span className="profile-badge">{teamSize} Members</span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "25px" }}>

        {/* Description */}
        <p style={{ color: "#94a3b8", fontSize: "14px", lineHeight: "1.7", margin: 0 }}>
          {info.description}
        </p>

        {/* Quick Stat Tiles */}
        <div className="dept-stats-row">
          <div className="dept-stat-tile">
            <FaUsers />
            <div>
              <span className="dept-stat-value">{teamSize}</span>
              <span className="dept-stat-label">Employees</span>
            </div>
          </div>
          <div className="dept-stat-tile">
            <FaChartLine />
            <div>
              <span className="dept-stat-value">{performanceScore}%</span>
              <span className="dept-stat-label">Performance</span>
            </div>
          </div>
          <div className="dept-stat-tile">
            <FaProjectDiagram />
            <div>
              <span className="dept-stat-value">{info.projects.length}</span>
              <span className="dept-stat-label">Active Projects</span>
            </div>
          </div>
          <div className="dept-stat-tile">
            <FaClock />
            <div>
              <span className="dept-stat-value" style={{ fontSize: "14px" }}>{info.workingHours.split(" (")[0]}</span>
              <span className="dept-stat-label">Working Hours</span>
            </div>
          </div>
        </div>

        {/* Manager / Contact / Location Row */}
        <div className="dept-info-grid">
          <div className="dd-info-card">
            <div className="dd-info-card-icon"><FaUserTie /></div>
            <div>
              <h4>DEPARTMENT HEAD</h4>
              <h3>{info.head}</h3>
              <p><FaEnvelope /> {departmentName.toLowerCase()}manager@decornest.com</p>
            </div>
          </div>
          <div className="dd-info-card">
            <div className="dd-info-card-icon"><FaPhoneAlt /></div>
            <div>
              <h4>DEPARTMENT CONTACT</h4>
              <h3 style={{ fontSize: "15px" }}>{info.contact}</h3>
              <p>General enquiries & escalations</p>
            </div>
          </div>
          <div className="dd-info-card">
            <div className="dd-info-card-icon"><FaMapMarkerAlt /></div>
            <div>
              <h4>OFFICE LOCATION</h4>
              <h3 style={{ fontSize: "15px" }}>{info.location}</h3>
              <p>{info.workingHours}</p>
            </div>
          </div>
        </div>

        {/* Responsibilities / Technologies */}
        <div className="dept-two-col">
          <div className="dept-panel">
            <h3 className="dept-section-title"><FaTasks /> Responsibilities</h3>
            <ul className="dept-list">
              {info.responsibilities.map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
          <div className="dept-panel">
            <h3 className="dept-section-title"><FaCode /> Technologies Used</h3>
            <div className="dept-tag-list">
              {info.technologies.map((t) => <span className="dept-tag" key={t}>{t}</span>)}
            </div>
          </div>
        </div>

        {/* Projects / Current Tasks / Goals */}
        <div className="dept-three-col">
          <div className="dept-panel">
            <h3 className="dept-section-title"><FaProjectDiagram /> Projects</h3>
            <ul className="dept-list">
              {info.projects.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
          <div className="dept-panel">
            <h3 className="dept-section-title"><FaTasks /> Current Tasks</h3>
            <ul className="dept-list">
              {info.currentTasks.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <div className="dept-panel">
            <h3 className="dept-section-title"><FaBullseye /> Department Goals</h3>
            <ul className="dept-list">
              {info.goals.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
        </div>

        {/* Announcements */}
        <div className="dept-panel">
          <h3 className="dept-section-title"><FaBullhorn /> Announcements</h3>
          <div className="compact-announcements-list">
            <div className="compact-notice">
              <h5>Quarterly {departmentName} review scheduled</h5>
              <span>Posted by {info.head}</span>
            </div>
            <div className="compact-notice">
              <h5>New process docs published to the team wiki</h5>
              <span>Posted by {departmentName} Team Lead</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="dept-panel">
          <h3 className="dept-section-title"><FaHistory /> Department Timeline</h3>
          <div className="dept-timeline">
            {TIMELINE.map((item, i) => (
              <div className="dept-timeline-item" key={i}>
                <div className="dept-timeline-dot"></div>
                <div>
                  <p>{item.label}</p>
                  <span>{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colleagues */}
        <div style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "10px" }}>
          <h3 className="dept-section-title" style={{ marginBottom: "4px" }}><FaUsers /> Team Members</h3>
          <p style={{ color: "#8fa7c8", fontSize: "13px", margin: 0 }}>
            Everyone currently registered in the {departmentName} department.
          </p>
        </div>

        {colleagues.length === 0 ? (
          <div className="empty" style={{ textAlign: "center", padding: "20px" }}>
            <h4>No Colleagues Found</h4>
            <p style={{ color: "#8fa7c8", fontSize: "13px" }}>You are the only member registered in this department.</p>
          </div>
        ) : (
          <div className="dd-member-grid">
            {colleagues.map((colleague, index) => (
              <motion.div
                key={colleague.id}
                className="dept-member-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <img
                    src={colleague.image}
                    alt={colleague.name}
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(colleague.name || "User") + "&background=10b981&color=fff"; }}
                  />
                  <div>
                    <h4>{colleague.name}</h4>
                    <p>{colleague.email}</p>
                    <span>ID: {colleague.id}</span>
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
