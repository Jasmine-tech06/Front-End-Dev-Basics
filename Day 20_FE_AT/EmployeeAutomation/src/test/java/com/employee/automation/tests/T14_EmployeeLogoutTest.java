package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeeDashboardPage;
import com.employee.automation.pages.LoginPage;
import com.employee.automation.pages.WelcomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 14: Employee Logout -> Welcome Page - same shared
 * Sidebar.jsx logout-card / LogoutModal.jsx flow as the admin session,
 * followed by the Login page's "Home" back button.
 */
public class T14_EmployeeLogoutTest extends BaseTest {

    @Test(priority = 1, description = "Employee logs out successfully and is returned to the Login page")
    public void test1_employeeLogoutSuccessful() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToDashboard();

        LoginPage loginPage = dashboard.logout();

        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Should be redirected to the Login page after logout");
        System.out.println("Employee Logout Successful");
    }

    @Test(priority = 2, dependsOnMethods = "test1_employeeLogoutSuccessful",
            description = "From the Login page, 'Home' returns to the Welcome page")
    public void test2_backToWelcomePage() {
        LoginPage loginPage = new LoginPage(driver);
        WelcomePage welcomePage = loginPage.clickBackHome();

        Assert.assertTrue(welcomePage.isWelcomeCardDisplayed(), "Should be back on the Welcome page after Employee logout");
        System.out.println("Employee Flow Completed");
    }
}
