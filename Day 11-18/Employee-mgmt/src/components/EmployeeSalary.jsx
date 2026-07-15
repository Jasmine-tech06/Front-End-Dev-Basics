import { motion } from "framer-motion";
import { FaMoneyBillWave, FaDownload, FaListAlt } from "react-icons/fa";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
import "../styles/EmployeeViews.css";

function EmployeeSalary({ user }) {
  const salaryDetails = {
    basic: 3800.0,
    hra: 400.0,
    conveyance: 150.0,
    special: 250.0,
    pf: 180.0,
    tax: 20.0
  };

  const grossSalary = salaryDetails.basic + salaryDetails.hra + salaryDetails.conveyance + salaryDetails.special;
  const totalDeductions = salaryDetails.pf + salaryDetails.tax;
  const netSalary = grossSalary - totalDeductions;

  const handleDownloadPayslip = () => {
    try {
      const doc = new jsPDF();
      
      // Title / Header
      doc.setFontSize(22);
      doc.setTextColor(37, 99, 235);
      doc.text("DecorNest Ltd.", 14, 20);
      
      doc.setFontSize(12);
      doc.setTextColor(100);
      doc.text("Employee Management System Payslip", 14, 26);
      doc.text("Month: July 2026", 14, 32);
      
      // Divider
      doc.setDrawColor(200);
      doc.line(14, 36, 196, 36);

      // Employee Info Table
      doc.setFontSize(11);
      doc.setTextColor(50);
      doc.text(`Employee ID: ${user.id}`, 14, 46);
      doc.text(`Employee Name: ${user.name}`, 14, 52);
      doc.text(`Department: ${user.department || "N/A"}`, 14, 58);
      
      // Salary Breakdown Table
      const tableData = [
        ["Basic Pay", `$${salaryDetails.basic.toFixed(2)}`, "Provident Fund (PF)", `$${salaryDetails.pf.toFixed(2)}`],
        ["House Rent Allowance (HRA)", `$${salaryDetails.hra.toFixed(2)}`, "Professional Tax", `$${salaryDetails.tax.toFixed(2)}`],
        ["Conveyance Allowance", `$${salaryDetails.conveyance.toFixed(2)}`, "", ""],
        ["Special Allowance", `$${salaryDetails.special.toFixed(2)}`, "", ""],
        ["Gross Earnings", `$${grossSalary.toFixed(2)}`, "Total Deductions", `$${totalDeductions.toFixed(2)}`],
        ["", "", "Net Take-Home Salary", `$${netSalary.toFixed(2)}`]
      ];

      autoTable(doc, {
        head: [["Earnings", "Amount", "Deductions", "Amount"]],
        body: tableData,
        startY: 68,
        theme: "striped",
        headStyles: { fillColor: [37, 99, 235] },
        footStyles: { fillColor: [57, 233, 143] }
      });

      // Signature / Footer
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text("This is a computer generated document and does not require signature.", 14, doc.lastAutoTable.finalY + 30);
      
      doc.save(`Payslip_${user.name.replace(/\s+/g, "_")}_July2026.pdf`);
      toast.success("Payslip PDF downloaded!");
    } catch (e) {
      console.error(e);
      toast.error("Failed to generate Payslip PDF.");
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
          <FaMoneyBillWave /> Salary Information
        </h2>
        <button className="payslip-download-btn" onClick={handleDownloadPayslip}>
          <FaDownload /> Download Payslip (PDF)
        </button>
      </div>

      <div className="salary-overview">
        <div className="salary-stat-card">
          <h4>GROSS EARNINGS</h4>
          <h3>${grossSalary.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="salary-stat-card" style={{ borderLeft: "4px solid #ef4444" }}>
          <h4 style={{ color: "#ef4444" }}>TOTAL DEDUCTIONS</h4>
          <h3 style={{ color: "#ef4444" }}>${totalDeductions.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h3>
        </div>
        <div className="salary-stat-card net-pay">
          <h4>NET TAKE-HOME</h4>
          <h3>${netSalary.toLocaleString("en-US", { minimumFractionDigits: 2 })}</h3>
        </div>
      </div>

      <div className="salary-breakdown">
        <div className="breakdown-block">
          <h3>Earnings</h3>
          <div className="breakdown-row">
            <span>Basic Pay</span>
            <strong>${salaryDetails.basic.toFixed(2)}</strong>
          </div>
          <div className="breakdown-row">
            <span>House Rent Allowance (HRA)</span>
            <strong>${salaryDetails.hra.toFixed(2)}</strong>
          </div>
          <div className="breakdown-row">
            <span>Conveyance Allowance</span>
            <strong>${salaryDetails.conveyance.toFixed(2)}</strong>
          </div>
          <div className="breakdown-row">
            <span>Special Allowance</span>
            <strong>${salaryDetails.special.toFixed(2)}</strong>
          </div>
        </div>

        <div className="breakdown-block" style={{ borderLeftColor: "#ef4444" }}>
          <h3>Deductions</h3>
          <div className="breakdown-row">
            <span>Provident Fund (PF)</span>
            <strong style={{ color: "#ef4444" }}>${salaryDetails.pf.toFixed(2)}</strong>
          </div>
          <div className="breakdown-row">
            <span>Professional Tax</span>
            <strong style={{ color: "#ef4444" }}>${salaryDetails.tax.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default EmployeeSalary;
