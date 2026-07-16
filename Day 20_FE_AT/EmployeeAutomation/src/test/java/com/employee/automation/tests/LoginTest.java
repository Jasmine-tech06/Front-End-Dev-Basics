package com.employee.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.LoginPage;

public class LoginTest extends BaseTest {

    @Test
    public void adminLoginTest() {

        LoginPage loginPage = new LoginPage(driver);

        loginPage.loginAsAdmin(
                "admin@decornest.com",
                "admin");

        // Wait for page navigation
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Verify dashboard page
        Assert.assertTrue(driver.getCurrentUrl().contains("dashboard"));

    }

}