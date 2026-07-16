package com.employee.automation.tests;

import org.testng.Assert;
import org.testng.annotations.Test;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeePage;
import com.employee.automation.pages.LoginPage;

public class EmployeeTest extends BaseTest {

    @Test
public void verifyEmployeePage() {

    LoginPage login = new LoginPage(driver);

    login.loginAsAdmin(
            "admin@gmail.com",
            "admin123"
    );

    EmployeePage employee = new EmployeePage(driver);

    employee.openEmployeesPage();

    System.out.println(driver.getCurrentUrl());

    Assert.assertTrue(employee.isEmployeeTableDisplayed());

    System.out.println(employee.getEmployeeCount());

}

}