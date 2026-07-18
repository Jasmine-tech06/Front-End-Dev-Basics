package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.RoleSelectionPage;
import com.employee.automation.pages.WelcomePage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 2 of the continuous flow: Welcome -> "Get Started" -> Role Selection
 * (src/pages/RoleSelect.jsx, route "/select-role").
 */
public class T02_RoleSelectionTest extends BaseTest {

    @Test(priority = 1, description = "Clicking 'Get Started' navigates to the Role Selection page")
    public void test1_clickGetStarted_navigatesToRoleSelection() {
        WelcomePage welcomePage = new WelcomePage(driver);
        RoleSelectionPage roleSelectionPage = welcomePage.clickGetStarted();

        Assert.assertTrue(roleSelectionPage.isRoleSelectCardDisplayed(),
                "Role selection card should be displayed after clicking 'Get Started'");
        System.out.println("Role Selection Page Loaded");
    }

    @Test(priority = 2, dependsOnMethods = "test1_clickGetStarted_navigatesToRoleSelection",
            description = "Both Admin and Employee role options are visible")
    public void test2_adminAndEmployeeOptionsVisible() {
        RoleSelectionPage roleSelectionPage = new RoleSelectionPage(driver);
        Assert.assertTrue(roleSelectionPage.isAdminOptionDisplayed(), "'Admin' role option should be visible");
        Assert.assertTrue(roleSelectionPage.isEmployeeOptionDisplayed(), "'Employee' role option should be visible");
    }
}
