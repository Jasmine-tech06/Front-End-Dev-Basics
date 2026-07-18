package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.WelcomePage;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 15: final sanity check for the complete, continuous, single-browser
 * flow: Welcome -> Role -> Admin Login -> Admin Dashboard -> Verify
 * Dashboard -> Admin Logout -> Welcome -> Employee Role -> Employee Login
 * -> Employee Dashboard -> Verify Dashboard -> Employee Logout -> Welcome.
 *
 * This class does not open or close the browser - the same session used
 * by every earlier test class is still alive here. The browser is closed
 * exactly once, automatically, in BaseTest's @AfterSuite after this class
 * finishes.
 */
public class T15_EndToEndFlowTest extends BaseTest {

    @Test(priority = 1, description = "The single browser session survived the entire Admin + Employee flow")
    public void test1_singleBrowserSessionStillAlive() {
        WebDriver activeDriver = driver;
        Assert.assertNotNull(activeDriver, "The one shared WebDriver session should still be alive at the end of the flow");
        Assert.assertNotNull(activeDriver.getWindowHandle(), "Exactly one browser window should still be open");
    }

    @Test(priority = 2, dependsOnMethods = "test1_singleBrowserSessionStillAlive",
            description = "The final app state is the Welcome page, after both roles logged out")
    public void test2_finalStateIsWelcomePage() {
        WelcomePage welcomePage = new WelcomePage(driver);
        Assert.assertTrue(welcomePage.isWelcomeCardDisplayed(),
                "After both the Admin and Employee flows log out, the app should be resting on the Welcome page");

        System.out.println("Automation Completed Successfully");
    }
}
