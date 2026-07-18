package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to src/pages/RoleSelect.jsx (route "/select-role").
 * Two role buttons call goToLogin("admin") / goToLogin("employee"),
 * navigating to "/login" with router state.
 */
public class RoleSelectionPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By roleSelectCard = By.cssSelector(".roleselect-card");
    private final By backHomeBtn = By.cssSelector(".roleselect-back-btn");
    private final By adminOption =
            By.xpath("//button[contains(@class,'roleselect-option')][.//h3[normalize-space()='Admin']]");
    private final By employeeOption =
            By.xpath("//button[contains(@class,'roleselect-option')][.//h3[normalize-space()='Employee']]");

    public RoleSelectionPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isRoleSelectCardDisplayed() {
        return wait.isDisplayed(roleSelectCard);
    }

    public boolean isAdminOptionDisplayed() {
        return wait.isDisplayed(adminOption);
    }

    public boolean isEmployeeOptionDisplayed() {
        return wait.isDisplayed(employeeOption);
    }

    public LoginPage selectAdminRole() {
        wait.click(adminOption);
        wait.waitForUrlContains("/login");
        return new LoginPage(driver);
    }

    public LoginPage selectEmployeeRole() {
        wait.click(employeeOption);
        wait.waitForUrlContains("/login");
        return new LoginPage(driver);
    }

    public WelcomePage clickBackHome() {
        wait.click(backHomeBtn);
        return new WelcomePage(driver);
    }
}
