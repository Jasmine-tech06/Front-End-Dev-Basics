package com.employee.automation.base;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterSuite;
import org.testng.annotations.BeforeClass;

/**
 * Every test class extends this. It deliberately does NOT open or close
 * the browser per class - DriverFactory.getDriver() always hands back the
 * SAME session, so the whole suite runs as one continuous browser flow:
 *
 *   Browser Open -> Welcome -> Role -> Admin Login -> ... -> Employee
 *   Logout -> Browser Close
 *
 * @AfterSuite here is guarded by DriverFactory's own idempotent quit(),
 * so even though TestNG may invoke an inherited @AfterSuite once per
 * subclass, the real quitDriver() body only executes once.
 */
public class BaseTest {

    protected WebDriver driver;
    protected WaitUtils wait;

    @BeforeClass(alwaysRun = true)
    public void baseSetUp() {
        driver = DriverFactory.getDriver();
        wait = new WaitUtils(driver);
    }

    @AfterSuite(alwaysRun = true)
    public void tearDownSuite() {
        DriverFactory.quitDriver();
    }
}
