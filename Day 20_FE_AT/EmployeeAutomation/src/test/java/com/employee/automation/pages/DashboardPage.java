package com.employee.automation.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class DashboardPage {

    WebDriver driver;

    public DashboardPage(WebDriver driver) {
        this.driver = driver;
    }

    // Locators
    By dashboardTitle = By.id("dashboard");

    // Verify Dashboard is displayed
    public boolean isDashboardDisplayed() {
        return driver.findElement(dashboardTitle).isDisplayed();
    }
}