package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.WelcomePage;
import com.employee.automation.utils.ConfigReader;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 1 of the continuous flow: open the browser (once, for the whole
 * suite) and land on the Welcome page (src/pages/Welcome.jsx, route "/").
 */
public class T01_WelcomeTest extends BaseTest {

    @Test(priority = 1, description = "Browser opens and Welcome page loads")
    public void test1_browserOpensAndWelcomePageLoads() {
        driver.get(ConfigReader.baseUrl());
        System.out.println("Browser Started");

        WelcomePage welcomePage = new WelcomePage(driver);
        Assert.assertTrue(welcomePage.isWelcomeCardDisplayed(), "Welcome card should be displayed on app load");
        System.out.println("Welcome Page Loaded");
    }

    @Test(priority = 2, dependsOnMethods = "test1_browserOpensAndWelcomePageLoads",
            description = "Welcome page heading and subtitle are visible")
    public void test2_headingAndSubtitleVisible() {
        WelcomePage welcomePage = new WelcomePage(driver);
        Assert.assertTrue(welcomePage.isHeadingDisplayed(), "Welcome heading should be visible");
        Assert.assertTrue(welcomePage.getHeadingText().contains("Decor"),
                "Welcome heading should contain the DecorNest brand name");
        Assert.assertEquals(welcomePage.getSubtitleText(), "Employee Management System",
                "Welcome subtitle text should match the app's branding copy");
    }

    @Test(priority = 3, dependsOnMethods = "test1_browserOpensAndWelcomePageLoads",
            description = "Get Started button is visible and ready")
    public void test3_getStartedButtonVisible() {
        WelcomePage welcomePage = new WelcomePage(driver);
        Assert.assertTrue(welcomePage.isGetStartedButtonDisplayed(), "'Get Started' button should be visible");
    }
}
