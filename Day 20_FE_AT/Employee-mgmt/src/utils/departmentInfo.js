// Shared, illustrative department reference info — descriptive/organizational
// content that isn't tracked as per-employee data in the API. Used by both
// the admin Departments page and the employee Department Details page so
// the two stay consistent.

export const DEPARTMENT_INFO = {
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
    icon: "FaLaptopCode",
    color: "#10b981",
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
    icon: "FaUsers",
    color: "#0ea5e9",
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
    icon: "FaMoneyBillWave",
    color: "#fbbf24",
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
    icon: "FaBullhorn",
    color: "#f472b6",
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
    icon: "FaChartLine",
    color: "#38bdf8",
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
    icon: "FaHeadset",
    color: "#a78bfa",
  },
};

export const DEFAULT_DEPARTMENT_INFO = {
  head: null,
  description: "No additional information has been configured for this department yet.",
  responsibilities: [],
  technologies: [],
  projects: [],
  currentTasks: [],
  goals: [],
  workingHours: "9:00 AM – 6:00 PM (Mon–Fri)",
  contact: "info@decornest.com",
  location: "Bengaluru HQ",
  icon: "FaBuilding",
  color: "#64748b",
};

export function getDepartmentInfo(name) {
  return DEPARTMENT_INFO[name] || DEFAULT_DEPARTMENT_INFO;
}

// A deterministic, illustrative performance score derived from the
// department name + team size (there is no real "performance" metric
// tracked in the API).
export function getDepartmentPerformance(name, teamSize) {
  return 70 + (((name || "").length * 7 + teamSize * 3) % 26);
}
