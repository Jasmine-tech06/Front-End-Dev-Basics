package com.employee.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to the "role === admin" branch of src/pages/Dashboard.jsx
 * (activeMenu === "dashboard" / "employees" / "addEmployee" / "departments"
 * / "reports" / "settings" / "analytics" / "attendance"), plus the shared
 * Sidebar/Navbar shell.
 */
public class AdminDashboardPage extends DashboardShellPage {

    // Main "dashboard" view widgets
    private final By statsSection = By.cssSelector("section.stats");
    private final By statCards = By.cssSelector("section.stats .stat-card");
    private final By quickActionAddEmployee =
            By.xpath("//div[contains(@class,'action-button-card')][.//span[normalize-space()='Add Employee']]");
    private final By quickActionDepartments =
            By.xpath("//div[contains(@class,'action-button-card')][.//span[normalize-space()='Departments']]");
    private final By quickActionReports =
            By.xpath("//div[contains(@class,'action-button-card')][.//span[normalize-space()='Generate Report']]");

    // Search (admin only, in Navbar center)
    private final By searchInput = By.cssSelector(".navbar .search-box input");
    private final By searchBtn = By.cssSelector(".navbar .search-box .search-btn");

    // "Employees" screen (EmployeeList.jsx wrapper)
    private final By employeeListSection = By.cssSelector(".employee-list");
    private final By employeeTableRows = By.cssSelector(".employee-list table tbody tr");

    // "Departments" screen (DepartmentManager.jsx)
    private final By departmentsCard = By.cssSelector(".dept-manager-card");

    // "Reports" screen (ReportsModule.jsx)
    private final By reportsHeading = By.xpath("//h2[contains(.,'Corporate Report Builder')]");

    // "Settings" screen (SettingsPage.jsx)
    private final By settingsCard = By.cssSelector(".settings-card");

    // "Analytics" screen
    private final By analyticsPage = By.cssSelector(".analytics-page");

    // "Attendance" (admin roster log) screen
    private final By attendanceHeading = By.xpath("//h2[contains(.,'Team Check-in Logs')]");

    public AdminDashboardPage(WebDriver driver) {
        super(driver);
    }

    // ----- Main dashboard view -----

    public boolean isStatsCardsVisible() {
        return wait.isDisplayed(statsSection) && !driver.findElements(statCards).isEmpty();
    }

    public int getStatCardsCount() {
        return driver.findElements(statCards).size();
    }

    public void clickQuickActionAddEmployee() {
        wait.click(quickActionAddEmployee);
    }

    public void clickQuickActionDepartments() {
        wait.click(quickActionDepartments);
    }

    public void clickQuickActionReports() {
        wait.click(quickActionReports);
    }

    // ----- Navigation shortcuts (via sidebar) -----

    public void goToDashboard() {
        clickSidebarMenu("Dashboard");
    }

    public void goToEmployees() {
        clickSidebarMenu("Employees");
    }

    public void goToAddEmployee() {
        clickSidebarMenu("Add Employee");
    }

    public void goToDepartments() {
        clickSidebarMenu("Departments");
    }

    public void goToAttendance() {
        clickSidebarMenu("Attendance");
    }

    public void goToReports() {
        clickSidebarMenu("Reports");
    }

    public void goToAnalytics() {
        clickSidebarMenu("Analytics");
    }

    public void goToSettings() {
        clickSidebarMenu("Settings");
    }

    // ----- Search (Navbar) -----

    public boolean isSearchBoxVisible() {
        return wait.isDisplayed(searchInput);
    }

    public void searchEmployees(String term) {
        wait.type(searchInput, term);
        wait.click(searchBtn);
    }

    // ----- Employees screen -----

    public boolean isEmployeeListVisible() {
        return wait.isDisplayed(employeeListSection);
    }

    public int getVisibleEmployeeRowCount() {
        return driver.findElements(employeeTableRows).size();
    }

    // ----- Departments screen -----

    public boolean isDepartmentsPageVisible() {
        return wait.isDisplayed(departmentsCard);
    }

    // ----- Reports screen -----

    public boolean isReportsPageVisible() {
        return wait.isDisplayed(reportsHeading);
    }

    // ----- Settings screen -----

    public boolean isSettingsPageVisible() {
        return wait.isDisplayed(settingsCard);
    }

    // ----- Analytics screen -----

    public boolean isAnalyticsPageVisible() {
        return wait.isDisplayed(analyticsPage);
    }

    // ----- Attendance (admin roster) screen -----

    public boolean isAttendanceRosterVisible() {
        return wait.isDisplayed(attendanceHeading);
    }

    // ----- Add Employee screen -----

    public EmployeeManagementPage openAddEmployeeForm() {
        goToAddEmployee();
        return new EmployeeManagementPage(driver);
    }

    public EmployeeManagementPage employeeManagement() {
        return new EmployeeManagementPage(driver);
    }
}
