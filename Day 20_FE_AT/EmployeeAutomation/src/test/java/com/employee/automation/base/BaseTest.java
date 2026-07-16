package com.employee.automation.base;

import org.openqa.selenium.WebDriver;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

import com.employee.automation.utils.ConfigReader;
import com.employee.automation.utils.DriverFactory;

public class BaseTest {

    protected WebDriver driver;

    @BeforeMethod
    public void setUp() {

        driver = DriverFactory.getDriver();

        driver.get(ConfigReader.getProperty("baseUrl"));

    }

    @AfterMethod
    public void tearDown() {

        DriverFactory.quitDriver();

    }

}