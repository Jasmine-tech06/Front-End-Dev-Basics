package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import com.employee.automation.pages.LoginPage;
import com.employee.automation.pages.WelcomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 9: Admin Logout -> Welcome Page.
 * (Sidebar.jsx logout-card -> LogoutModal.jsx -> navigate("/login"),
 * then the Login page's "Home" back button -> navigate("/")).
 * This completes the Admin half of the required end-to-end flow.
 */
public class T09_AdminLogoutTest extends BaseTest {

    @Test(priority = 1, description = "Admin logs out successfully and is returned to the Login page")
    public void test1_adminLogoutSuccessful() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToDashboard();

        LoginPage loginPage = dashboard.logout();

        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Should be redirected to the Login page after logout");
        System.out.println("Logout Successful");
    }

    @Test(priority = 2, dependsOnMethods = "test1_adminLogoutSuccessful",
            description = "From the Login page, 'Home' returns to the Welcome page")
    public void test2_backToWelcomePage() {
        LoginPage loginPage = new LoginPage(driver);
        WelcomePage welcomePage = loginPage.clickBackHome();

        Assert.assertTrue(welcomePage.isWelcomeCardDisplayed(), "Should be back on the Welcome page after Admin logout");
        System.out.println("Admin Flow Completed");
    }
}
