package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeeDashboardPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 11: mandatory Employee dashboard shell validations
 * (src/components/EmployeeDashboard.jsx + shared Sidebar.jsx / Navbar.jsx).
 */
public class T11_EmployeeDashboardTest extends BaseTest {

    @Test(priority = 1, description = "Employee dashboard root is loaded")
    public void test1_dashboardLoaded() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        Assert.assertTrue(dashboard.isDashboardLoaded(), "Dashboard root element should be loaded");
        System.out.println("Employee Dashboard Verified");
    }

    @Test(priority = 2, dependsOnMethods = "test1_dashboardLoaded", description = "Sidebar is visible")
    public void test2_sidebarVisible() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        Assert.assertTrue(dashboard.isSidebarVisible(), "Sidebar should be visible on the employee dashboard");
    }

    @Test(priority = 3, dependsOnMethods = "test1_dashboardLoaded", description = "Navbar is visible")
    public void test3_navbarVisible() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        Assert.assertTrue(dashboard.isNavbarVisible(), "Navbar should be visible on the employee dashboard");
    }

    @Test(priority = 4, dependsOnMethods = "test1_dashboardLoaded", description = "Welcome banner with the employee's name is visible")
    public void test4_welcomeBannerVisible() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToDashboard();
        Assert.assertTrue(dashboard.isWelcomeBannerVisible(), "'Welcome Back' banner should be visible");
        Assert.assertTrue(dashboard.getWelcomeBannerText().contains("Welcome Back"),
                "Welcome banner text should greet the logged-in employee");
    }
}
