package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to src/components/SettingsPage.jsx - shared between Admin and
 * Employee sessions (reached via the "Settings" sidebar item on both roles).
 */
public class SettingsPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By settingsCard = By.cssSelector(".settings-card");
    private final By settingsHeader = By.cssSelector(".settings-header h2");
    private final By settingsTabs = By.cssSelector(".settings-tabs");
    private final By appInfoGrid = By.cssSelector(".settings-content .profile-details-grid");

    public SettingsPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isSettingsPageVisible() {
        return wait.isDisplayed(settingsCard);
    }

    public boolean isSettingsTabsVisible() {
        return wait.isDisplayed(settingsTabs);
    }

    public String getSettingsHeaderText() {
        return wait.getText(settingsHeader);
    }
}
