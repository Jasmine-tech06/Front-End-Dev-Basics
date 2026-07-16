package com.employee.automation.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class LoginPage {

    private WebDriver driver;
    private WebDriverWait wait;

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Locators
    private By adminRole = By.id("adminRole");
    private By employeeRole = By.id("employeeRole");
    private By email = By.id("email");
    private By password = By.id("password");
    private By loginBtn = By.id("loginBtn");

    // Dashboard check
    private By dashboardLoaded = By.xpath("//span[@data-testid='employees']");

    public void clickAdminRole() {
        wait.until(ExpectedConditions.elementToBeClickable(adminRole)).click();
    }

    public void clickEmployeeRole() {
        wait.until(ExpectedConditions.elementToBeClickable(employeeRole)).click();
    }

    public void enterEmail(String emailValue) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(email)).clear();
        driver.findElement(email).sendKeys(emailValue);
    }

    public void enterPassword(String passwordValue) {
        wait.until(ExpectedConditions.visibilityOfElementLocated(password)).clear();
        driver.findElement(password).sendKeys(passwordValue);
    }

    public void clickLogin() {
        wait.until(ExpectedConditions.elementToBeClickable(loginBtn)).click();
    }

    public void loginAsAdmin(String emailValue, String passwordValue) {

        clickAdminRole();

        enterEmail(emailValue);

        enterPassword(passwordValue);

        clickLogin();

        // Wait until Dashboard is fully loaded
        wait.until(ExpectedConditions.visibilityOfElementLocated(dashboardLoaded));
    }

    public void loginAsEmployee(String emailValue, String passwordValue) {

        clickEmployeeRole();

        enterEmail(emailValue);

        enterPassword(passwordValue);

        clickLogin();
    }
}