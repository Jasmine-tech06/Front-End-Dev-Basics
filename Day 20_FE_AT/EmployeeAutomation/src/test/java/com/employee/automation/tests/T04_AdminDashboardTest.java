package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 4: mandatory Admin dashboard shell validations
 * (src/pages/Dashboard.jsx main "dashboard" view + Sidebar.jsx + Navbar.jsx).
 */
public class T04_AdminDashboardTest extends BaseTest {

    @Test(priority = 1, description = "Admin dashboard root is loaded")
    public void test1_dashboardLoaded() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        Assert.assertTrue(dashboard.isDashboardLoaded(), "Dashboard root element should be loaded");
        System.out.println("Dashboard Verified");
    }

    @Test(priority = 2, dependsOnMethods = "test1_dashboardLoaded", description = "Sidebar is visible")
    public void test2_sidebarVisible() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        Assert.assertTrue(dashboard.isSidebarVisible(), "Sidebar should be visible on the dashboard");
    }

    @Test(priority = 3, dependsOnMethods = "test1_dashboardLoaded", description = "Navbar is visible")
    public void test3_navbarVisible() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        Assert.assertTrue(dashboard.isNavbarVisible(), "Navbar should be visible on the dashboard");
        Assert.assertEquals(dashboard.getNavbarTitleText(), "Employee Management System",
                "Navbar title should match the app's branding copy");
    }

    @Test(priority = 4, dependsOnMethods = "test1_dashboardLoaded", description = "Dashboard stat cards are visible")
    public void test4_statCardsVisible() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToDashboard();
        Assert.assertTrue(dashboard.isStatsCardsVisible(), "Dashboard stat cards section should be visible");
        Assert.assertTrue(dashboard.getStatCardsCount() > 0, "At least one stat card should be rendered");
    }
}
