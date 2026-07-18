package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to src/pages/Welcome.jsx (route "/").
 */
public class WelcomePage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By welcomeCard = By.cssSelector(".welcome-card");
    private final By heading = By.cssSelector(".welcome-card h1");
    private final By subtitle = By.cssSelector(".welcome-card .brand-subtitle");
    private final By getStartedBtn = By.cssSelector(".start-btn");

    public WelcomePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isWelcomeCardDisplayed() {
        return wait.isDisplayed(welcomeCard);
    }

    public boolean isHeadingDisplayed() {
        return wait.isDisplayed(heading);
    }

    public String getHeadingText() {
        return wait.getText(heading);
    }

    public String getSubtitleText() {
        return wait.getText(subtitle);
    }

    public boolean isGetStartedButtonDisplayed() {
        return wait.isDisplayed(getStartedBtn);
    }

    public RoleSelectionPage clickGetStarted() {
        wait.click(getStartedBtn);
        wait.waitForUrlContains("/select-role");
        return new RoleSelectionPage(driver);
    }
}
