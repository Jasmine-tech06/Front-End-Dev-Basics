package com.employee.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to the "role === employee" branch of src/pages/Dashboard.jsx,
 * rendering src/components/EmployeeDashboard.jsx (activeMenu === "dashboard"),
 * plus the employee-only sidebar items: Attendance, Leaves, Department,
 * Salary, Settings (src/components/Sidebar.jsx -> employeeMenuItems).
 */
public class EmployeeDashboardPage extends DashboardShellPage {

    // EmployeeDashboard.jsx main view - "Welcome Back, {name}" heading
    private final By welcomeBanner = By.xpath("//h1[contains(.,'Welcome Back')]");

    // Employee "Attendance" screen (EmployeeAttendance.jsx -> .emp-view-card, h2 "Attendance Tracker")
    private final By attendanceHeading = By.xpath("//div[contains(@class,'emp-view-card')]//h2[contains(.,'Attendance Tracker')]");

    // Employee "Leaves" screen (EmployeeLeaves.jsx -> .emp-view-card, h2 "Leave Application")
    private final By leavesHeading = By.xpath("//div[contains(@class,'emp-view-card')]//h2[contains(.,'Leave Application')]");

    // Employee "Department" screen (DepartmentDetails.jsx -> .emp-view-card, h2 "{name} Department")
    private final By departmentHeading = By.xpath("//div[contains(@class,'emp-view-card')]//h2[contains(.,'Department')]");

    // Employee "Salary" screen (EmployeeSalary.jsx -> .emp-view-card, h2 "Salary Information")
    private final By salaryHeading = By.xpath("//div[contains(@class,'emp-view-card')]//h2[contains(.,'Salary Information')]");

    // Employee "Settings" screen (SettingsPage.jsx - shared component)
    private final By settingsCard = By.cssSelector(".settings-card");

    public EmployeeDashboardPage(WebDriver driver) {
        super(driver);
    }

    public boolean isWelcomeBannerVisible() {
        return wait.isDisplayed(welcomeBanner);
    }

    public String getWelcomeBannerText() {
        return wait.getText(welcomeBanner);
    }

    // ----- Navigation shortcuts (via sidebar) -----

    public void goToDashboard() {
        clickSidebarMenu("Dashboard");
    }

    public void goToAttendance() {
        clickSidebarMenu("Attendance");
    }

    public void goToLeaves() {
        clickSidebarMenu("Leaves");
    }

    public void goToDepartment() {
        clickSidebarMenu("Department");
    }

    public void goToSalary() {
        clickSidebarMenu("Salary");
    }

    public void goToSettings() {
        clickSidebarMenu("Settings");
    }

    // ----- Screen checks -----

    public boolean isAttendanceScreenVisible() {
        return wait.isDisplayed(attendanceHeading);
    }

    public boolean isLeavesScreenVisible() {
        return wait.isDisplayed(leavesHeading);
    }

    public boolean isDepartmentScreenVisible() {
        return wait.isDisplayed(departmentHeading);
    }

    public boolean isSalaryScreenVisible() {
        return wait.isDisplayed(salaryHeading);
    }

    public boolean isSettingsScreenVisible() {
        return wait.isDisplayed(settingsCard);
    }
}
