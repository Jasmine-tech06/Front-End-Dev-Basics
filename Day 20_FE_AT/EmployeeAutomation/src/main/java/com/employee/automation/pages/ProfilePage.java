package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to src/components/ProfileModal.jsx, opened from the Navbar's
 * profile trigger for both Admin and Employee sessions.
 */
public class ProfilePage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By profileModal = By.cssSelector(".profile-modal");
    private final By profileName = By.cssSelector(".profile-hero-name");
    private final By profileDetailsGrid = By.cssSelector(".profile-details-grid");
    private final By closeBtn = By.cssSelector(".profile-modal-close");

    public ProfilePage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isProfileModalVisible() {
        return wait.isDisplayed(profileModal);
    }

    public boolean isProfileNameVisible() {
        return wait.isDisplayed(profileName);
    }

    public String getProfileNameText() {
        return wait.getText(profileName);
    }

    public boolean isOwnDetailsVisible() {
        return wait.isDisplayed(profileDetailsGrid);
    }

    public void close() {
        wait.click(closeBtn);
    }
}
