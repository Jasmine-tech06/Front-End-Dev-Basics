package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeeDashboardPage;
import com.employee.automation.pages.LoginPage;
import com.employee.automation.pages.RoleSelectionPage;
import com.employee.automation.pages.WelcomePage;
import com.employee.automation.utils.ConfigReader;
import com.employee.automation.utils.Constants;
import com.employee.automation.utils.SuiteState;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 10: Welcome Page -> Employee Role -> Employee Login -> Employee Dashboard.
 *
 * T09_AdminLogoutTest already brought the browser back to the Welcome page,
 * so this class continues from there exactly like a real user re-entering
 * as an Employee:
 *
 *   Welcome -> "Get Started" -> Role Selection -> "Employee"
 *   -> Login (preselected) -> Dashboard
 *
 * Selecting the role via Role Selection (router state) means Login.jsx's
 * `role` state is set directly to "employee" the instant the page mounts -
 * there is no role-toggle button to click or race against.
 *
 * Login credentials use the employee created in T05 (email + the app's
 * own default password fallback "password") unless the user has filled in
 * employee.username/employee.password in config.properties, in which case
 * those take priority.
 */
public class T10_EmployeeLoginTest extends BaseTest {

    @Test(priority = 1, description = "'Get Started' on the Welcome page navigates to Role Selection")
    public void test1_getStarted_navigatesToRoleSelection() {
        WelcomePage welcomePage = new WelcomePage(driver);
        RoleSelectionPage roleSelectionPage = welcomePage.clickGetStarted();

        Assert.assertTrue(roleSelectionPage.isRoleSelectCardDisplayed(), "Role selection card should be displayed");
    }

    @Test(priority = 2, dependsOnMethods = "test1_getStarted_navigatesToRoleSelection",
            description = "Selecting the Employee role navigates to the Login page")
    public void test2_selectEmployeeRole_navigatesToLogin() {
        RoleSelectionPage roleSelectionPage = new RoleSelectionPage(driver);
        LoginPage loginPage = roleSelectionPage.selectEmployeeRole();

        Assert.assertTrue(loginPage.isLoginPageDisplayed(), "Login page should be displayed after selecting Employee role");
        System.out.println("Role Selected : Employee");
    }

    @Test(priority = 3, dependsOnMethods = "test2_selectEmployeeRole_navigatesToLogin",
            description = "Employee logs in with valid credentials and reaches the Dashboard")
    public void test3_employeeLoginSuccessful() {
        String email = ConfigReader.employeeUsername();
        String password = ConfigReader.employeePassword();

        if (email == null || email.isEmpty()) {
            Assert.assertTrue(SuiteState.hasCreatedEmployee(),
                    "No employee.username configured and no employee was created earlier in this run to log in with");
            email = SuiteState.getCreatedEmployeeEmail();
            password = Constants.DEFAULT_EMPLOYEE_PASSWORD;
        }

        LoginPage loginPage = new LoginPage(driver);
        loginPage.login(email, password);

        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        Assert.assertTrue(dashboard.isDashboardLoaded(), "Employee should land on the Dashboard after a successful login");
        System.out.println("Employee Login Successful");
    }
}
