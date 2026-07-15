import { useState } from "react";
import { FaFilePdf, FaFileExcel, FaDownload, FaEye } from "react-icons/fa";
import { exportPDF } from "../utils/exportToPDF";
import { exportEmployees } from "../utils/exportToExcel";
import toast from "react-hot-toast";

function ReportsModule({ employees }) {
  const [reportType, setReportType] = useState("Employee Report");
  const [selectedFormat, setSelectedFormat] = useState("PDF");

  const reportsList = [
    { name: "Employee Report", desc: "Detailed summary of all registered staff profiles and contacts." },
    { name: "Attendance Report", desc: "Clock-in records, shift offsets, and average attendance statistics." },
    { name: "Department Report", desc: "Corporate split, count allocations, and department budget estimates." },
    { name: "Leave Report", desc: "Summary of leaves applied, approval rates, and outstanding requests." },
    { name: "Performance Report", desc: "Quarterly review grades, accomplishments summaries, and KPIs." }
  ];

  // Map employee rows for selected report type preview
  const getPreviewData = () => {
    switch (reportType) {
      case "Attendance Report":
        return employees.map(emp => ({
          col1: `#${emp.id}`,
          col2: emp.name,
          col3: emp.department || "IT",
          col4: "95%",
          col5: "19 / 20 Present"
        }));
      case "Department Report":
        return employees.map(emp => ({
          col1: `#${emp.id}`,
          col2: emp.name,
          col3: emp.department || "IT",
          col4: "Active Staff",
          col5: "$4,500 Budget Share"
        }));
      case "Leave Report":
        return employees.map(emp => ({
          col1: `#${emp.id}`,
          col2: emp.name,
          col3: emp.department || "HR",
          col4: "0 Applied",
          col5: "12 Days Avail"
        }));
      case "Performance Report":
        return employees.map(emp => ({
          col1: `#${emp.id}`,
          col2: emp.name,
          col3: emp.department || "Sales",
          col4: "Grade A",
          col5: "Exceeds Expectations"
        }));
      default:
        return employees.map(emp => ({
          col1: `#${emp.id}`,
          col2: emp.name,
          col3: emp.department,
          col4: emp.email,
          col5: "Active"
        }));
    }
  };

  const getHeaders = () => {
    switch (reportType) {
      case "Attendance Report": return ["ID", "Employee", "Department", "Attendance %", "Present Stats"];
      case "Department Report": return ["ID", "Employee", "Department", "Status", "Allocations"];
      case "Leave Report": return ["ID", "Employee", "Department", "Pending Requests", "Balance"];
      case "Performance Report": return ["ID", "Employee", "Department", "Score Level", "Remarks"];
      default: return ["ID", "Employee", "Department", "Email Address", "Status"];
    }
  };

  const handleExport = () => {
    if (employees.length === 0) {
      toast.error("No employee records to compile reports!");
      return;
    }

    if (selectedFormat === "PDF") {
      exportPDF(employees);
      toast.success("PDF Report generated!");
    } else {
      exportEmployees(employees);
      toast.success("Excel Spreadsheet exported!");
    }
  };

  const previewRows = getPreviewData();
  const headers = getHeaders();

  return (
    <div className="emp-view-card glass" style={{ padding: "30px", textAlign: "left" }}>
      <div style={{ marginBottom: "25px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: "700", color: "white", display: "flex", alignItems: "center", gap: "10px" }}>
          <FaFilePdf style={{ color: "#10b981" }} /> Corporate Report Builder
        </h2>
        <p style={{ color: "#64748b", fontSize: "12px", marginTop: "4px" }}>
          Compile system-wide lists, shift analytics, leaves, and budgets into formatted exports.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.8fr", gap: "30px" }}>
        {/* Left Control Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <h3 style={{ fontSize: "14px", color: "white", marginBottom: "15px" }}>Select Report Template</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {reportsList.map((rep) => (
                <div
                  key={rep.name}
                  onClick={() => setReportType(rep.name)}
                  style={{
                    padding: "12px",
                    borderRadius: "10px",
                    background: reportType === rep.name ? "rgba(16, 185, 129, 0.08)" : "transparent",
                    border: `1px solid ${reportType === rep.name ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.02)"}`,
                    cursor: "pointer",
                    transition: "all 0.2s ease"
                  }}
                >
                  <h4 style={{ color: reportType === rep.name ? "#10b981" : "white", fontSize: "13px", fontWeight: "600", margin: "0 0 4px 0" }}>{rep.name}</h4>
                  <p style={{ color: "#64748b", fontSize: "11px", margin: 0, lineHeight: "1.4" }}>{rep.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ padding: "20px", borderRadius: "14px", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
            <h3 style={{ fontSize: "14px", color: "white", marginBottom: "15px" }}>Format Preference</h3>
            <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
              <button
                onClick={() => setSelectedFormat("PDF")}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  background: selectedFormat === "PDF" ? "rgba(244, 63, 94, 0.12)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedFormat === "PDF" ? "rgba(244, 63, 94, 0.2)" : "rgba(255,255,255,0.05)"}`,
                  color: selectedFormat === "PDF" ? "#f43f5e" : "#94a3b8",
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <FaFilePdf /> PDF Report
              </button>
              <button
                onClick={() => setSelectedFormat("EXCEL")}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  background: selectedFormat === "EXCEL" ? "rgba(16, 185, 129, 0.12)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selectedFormat === "EXCEL" ? "rgba(16, 185, 129, 0.2)" : "rgba(255,255,255,0.05)"}`,
                  color: selectedFormat === "EXCEL" ? "#10b981" : "#94a3b8",
                  cursor: "pointer",
                  fontWeight: "600",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                <FaFileExcel /> Excel sheet
              </button>
            </div>
            <button onClick={handleExport} className="save-profile-btn" style={{ width: "100%", justifyContent: "center" }}>
              <FaDownload /> Compile & Download
            </button>
          </div>
        </div>

        {/* Right Preview Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <h3 style={{ fontSize: "14px", color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
            <FaEye style={{ color: "#10b981" }} /> Print Preview: {reportType}
          </h3>
          <div style={{ flex: 1, overflowX: "auto", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "12px", background: "rgba(0,0,0,0.2)" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "450px" }}>
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.02)" }}>
                  {headers.map(h => (
                    <th key={h} style={{ padding: "12px 16px", color: "#10b981", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.5px", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {previewRows.slice(0, 5).map((row, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: "12px 16px", color: "#64748b", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>{row.col1}</td>
                    <td style={{ padding: "12px 16px", color: "white", fontSize: "13px", fontWeight: "600", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>{row.col2}</td>
                    <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>{row.col3}</td>
                    <td style={{ padding: "12px 16px", color: "#94a3b8", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>{row.col4}</td>
                    <td style={{ padding: "12px 16px", color: "#10b981", fontSize: "13px", borderBottom: "1px solid rgba(255,255,255,0.02)" }}>{row.col5}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {employees.length === 0 && (
              <p style={{ color: "#64748b", fontSize: "13px", textAlign: "center", padding: "20px" }}>No preview data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsModule;
