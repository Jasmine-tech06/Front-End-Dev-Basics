package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeeDashboardPage;
import com.employee.automation.pages.SettingsPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 13: mandatory "allowed pages open" checks for the employee-only
 * sidebar items (src/components/Sidebar.jsx -> employeeMenuItems):
 * Attendance, Leaves, Department, Salary, Settings.
 * Admin-only screens (Employees, Add Employee, Departments manager,
 * Reports, Analytics) are intentionally NOT exercised here.
 */
public class T13_EmployeeBasicFeaturesTest extends BaseTest {

    @Test(priority = 1, description = "Employee Attendance page opens")
    public void test1_attendancePageOpens() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToAttendance();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Attendance"), "'Attendance' sidebar item should become active");
        Assert.assertTrue(dashboard.isAttendanceScreenVisible(), "Employee attendance tracker should be visible");
    }

    @Test(priority = 2, description = "Employee Leaves page opens")
    public void test2_leavesPageOpens() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToLeaves();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Leaves"), "'Leaves' sidebar item should become active");
        Assert.assertTrue(dashboard.isLeavesScreenVisible(), "Employee leave application screen should be visible");
    }

    @Test(priority = 3, description = "Employee Department page opens")
    public void test3_departmentPageOpens() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToDepartment();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Department"), "'Department' sidebar item should become active");
        Assert.assertTrue(dashboard.isDepartmentScreenVisible(), "Employee department details should be visible");
    }

    @Test(priority = 4, description = "Employee Salary page opens")
    public void test4_salaryPageOpens() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToSalary();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Salary"), "'Salary' sidebar item should become active");
        Assert.assertTrue(dashboard.isSalaryScreenVisible(), "Employee salary information should be visible");
    }

    @Test(priority = 5, description = "Employee Settings page opens")
    public void test5_settingsPageOpens() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToSettings();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Settings"), "'Settings' sidebar item should become active");

        SettingsPage settings = new SettingsPage(driver);
        Assert.assertTrue(settings.isSettingsPageVisible(), "Settings page should be visible");
        System.out.println("Employee Basic Features Verified");
    }
}
