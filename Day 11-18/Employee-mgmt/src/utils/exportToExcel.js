import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const exportEmployees = (employees) => {

  const data = employees.map((emp) => ({
    ID: emp.id,
    Name: emp.name,
    Department: emp.department,
    Email: emp.email,
    Status: "Active",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(file, "Employee_Report.xlsx");
};