import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportPDF = (employees) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Employee Management Report", 14, 20);

  const tableData = employees.map((emp) => [
    emp.id,
    emp.name,
    emp.department,
    emp.email,
    "Active",
  ]);

  autoTable(doc, {
    head: [["ID", "Name", "Department", "Email", "Status"]],
    body: tableData,
    startY: 30,
    theme: "grid",
    headStyles: {
      fillColor: [37, 99, 235],
    },
  });

  doc.save("Employee_Report.pdf");
};