package com.employee.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.DashboardPage;
import com.employee.automation.pages.LoginPage;

public class DashboardTest extends BaseTest {

    @Test
    public void verifyDashboardLoads() {

        LoginPage login = new LoginPage(driver);

        login.clickAdminRole();
        login.enterEmail("admin@decornest.com");
        login.enterPassword("admin");
        login.clickLogin();

        DashboardPage dashboard = new DashboardPage(driver);

        Assert.assertTrue(
                dashboard.isDashboardDisplayed(),
                "Dashboard is not displayed!"
        );

        System.out.println("Dashboard Loaded Successfully");

    }
}