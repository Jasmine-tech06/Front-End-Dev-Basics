package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Shared "shell" behavior around the single "/dashboard" route
 * (src/pages/Dashboard.jsx), which both Admin and Employee sessions land
 * on. Sidebar.jsx and Navbar.jsx render identically in structure for both
 * roles (only the menu items/content differ), so this base class holds
 * the reusable locators/actions and AdminDashboardPage / EmployeeDashboardPage
 * extend it - this is standard Page Object Model composition, not an
 * invented page.
 */
public class DashboardShellPage {

    protected final WebDriver driver;
    protected final WaitUtils wait;

    protected final By sidebar = By.cssSelector(".sidebar");
    protected final By navbar = By.cssSelector(".navbar");
    protected final By navbarTitle = By.cssSelector(".navbar .title-area h2");
    protected final By dashboardRoot = By.cssSelector("#dashboard.dashboard");
    protected final By logoutCard = By.cssSelector(".logout-card");
    protected final By logoutModal = By.cssSelector(".logout-modal");
    protected final By logoutConfirmBtn = By.cssSelector(".logout-modal .confirm-btn");
    protected final By logoutCancelBtn = By.cssSelector(".logout-modal .cancel-btn");
    protected final By profileTrigger = By.cssSelector(".navbar .profile");
    protected final By profileModal = By.cssSelector(".profile-modal");
    protected final By profileModalCloseBtn = By.cssSelector(".profile-modal-close");

    public DashboardShellPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isSidebarVisible() {
        return wait.isDisplayed(sidebar);
    }

    public boolean isNavbarVisible() {
        return wait.isDisplayed(navbar);
    }

    public boolean isDashboardLoaded() {
        return wait.isDisplayed(dashboardRoot);
    }

    public String getNavbarTitleText() {
        return wait.getText(navbarTitle);
    }

    /**
     * Clicks a sidebar menu item by its exact visible title
     * (e.g. "Employees", "Add Employee", "Departments", "Attendance",
     * "Reports", "Analytics", "Settings", "Leaves", "Department", "Salary").
     */
    public void clickSidebarMenu(String menuTitle) {
        By menuItem = By.xpath(
                "//ul[contains(@class,'sidebar-menu')]//li[contains(@class,'menu-card')][.//span[normalize-space()='"
                        + menuTitle + "']]");
        wait.click(menuItem);
    }

    /**
     * Confirms the given menu item is currently the active sidebar entry
     * (Sidebar.jsx sets className to "menu-card active" on the selected item).
     */
    public boolean isSidebarMenuActive(String menuTitle) {
        By activeMenuItem = By.xpath(
                "//ul[contains(@class,'sidebar-menu')]//li[contains(@class,'menu-card')]"
                        + "[contains(@class,'active')][.//span[normalize-space()='" + menuTitle + "']]");
        return wait.isDisplayed(activeMenuItem);
    }

    public ProfilePage openProfile() {
        wait.click(profileTrigger);
        wait.waitForVisible(profileModal);
        return new ProfilePage(driver);
    }

    /**
     * Full logout flow: opens the sidebar's logout confirmation modal and
     * confirms it. LogoutModal.jsx navigates to "/login" on confirm.
     */
    public LoginPage logout() {
        wait.click(logoutCard);
        wait.waitForVisible(logoutModal);
        wait.click(logoutConfirmBtn);
        wait.waitForUrlContains("/login");
        return new LoginPage(driver);
    }

    public boolean isLogoutModalDisplayed() {
        wait.click(logoutCard);
        return wait.isDisplayed(logoutModal);
    }

    public void cancelLogout() {
        wait.click(logoutCancelBtn);
    }
}
