package com.employee.automation.utils;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Generates unique, collision-free test data for the "Add Employee" form
 * (src/components/EmployeeForm.jsx). Every field written here maps 1:1 to
 * a real input the form actually has - nothing invented.
 */
public final class TestDataUtils {

    private TestDataUtils() {
    }

    public static class EmployeeData {
        public final String name;
        public final String employeeId;
        public final String email;
        public final String phone;
        public final String department;
        public final String role;
        public final String designation;
        public final String salary;
        public final String status;
        public final String joiningDate; // yyyy-MM-dd (HTML date input format)

        public EmployeeData(String name, String employeeId, String email, String phone,
                             String department, String role, String designation,
                             String salary, String status, String joiningDate) {
            this.name = name;
            this.employeeId = employeeId;
            this.email = email;
            this.phone = phone;
            this.department = department;
            this.role = role;
            this.designation = designation;
            this.salary = salary;
            this.status = status;
            this.joiningDate = joiningDate;
        }
    }

    public static EmployeeData newAutomationEmployee() {
        long stamp = System.currentTimeMillis();
        String email = "automation.qa" + stamp + "@decornest.com";
        return new EmployeeData(
                "Automation QA " + stamp,
                "EMP-AUTO-" + stamp,
                email,
                "+91 90000 " + String.valueOf(stamp).substring(String.valueOf(stamp).length() - 5),
                "IT",
                "QA Engineer",
                "Automation Specialist",
                "45000",
                "Active",
                LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        );
    }

    /**
     * Fixed dataset for the specific employee the Add Employee flow must
     * create: Name "Arshad", Email "jarshj@gmail.com". Department is
     * required by the real form validation (EmployeeForm.jsx
     * handleSubmit), so a real, valid value is supplied for it and for the
     * other supported-but-optional fields, exactly as a user filling out
     * the form would.
     */
    public static EmployeeData arshadEmployee() {
        return new EmployeeData(
                "Arshad",
                "EMP-ARSHAD-01",
                "jarshj@gmail.com",
                "+91 90000 11111",
                "IT",
                "QA Engineer",
                "Automation Specialist",
                "45000",
                "Active",
                LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))
        );
    }
}
