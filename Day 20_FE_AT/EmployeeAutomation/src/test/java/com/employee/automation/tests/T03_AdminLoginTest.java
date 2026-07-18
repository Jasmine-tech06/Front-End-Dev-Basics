package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import com.employee.automation.pages.LoginPage;
import com.employee.automation.pages.RoleSelectionPage;
import com.employee.automation.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 3 of the continuous flow: Role Selection -> Admin -> Login
 * (src/pages/Login.jsx) -> Dashboard.
 * Credentials are the real hardcoded admin check in Login.jsx:
 *   email.toLowerCase() === "admin@decornest.com" && password === "admin"
 */
public class T03_AdminLoginTest extends BaseTest {

    @Test(priority = 1, description = "Selecting the Admin role navigates to the Login page")
    public void test1_selectAdminRole_navigatesToLogin() {
        RoleSelectionPage roleSelectionPage = new RoleSelectionPage(driver);
        LoginPage loginPage = roleSelectionPage.selectAdminRole();

        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed after selecting Admin role");
        System.out.println("Role Selected : Admin");
    }

    @Test(priority = 2, dependsOnMethods = "test1_selectAdminRole_navigatesToLogin",
            description = "Login form fields (email/password) are visible")
    public void test2_loginFormFieldsVisible() {
        LoginPage loginPage = new LoginPage(driver);
        Assert.assertTrue(loginPage.isEmailInputDisplayed(), "Email input should be visible on the login form");
        Assert.assertTrue(loginPage.isPasswordInputDisplayed(), "Password input should be visible on the login form");
    }

    @Test(priority = 3, dependsOnMethods = "test2_loginFormFieldsVisible",
            description = "Admin logs in with valid credentials and reaches the Dashboard")
    public void test3_adminLoginSuccessful() {
        LoginPage loginPage = new LoginPage(driver);
        loginPage.chooseAdminRole();
        loginPage.login(ConfigReader.adminUsername(), ConfigReader.adminPassword());

        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        Assert.assertTrue(dashboard.isDashboardLoaded(), "Admin should land on the Dashboard after a successful login");
        System.out.println("Admin Login Successful");
    }
}
