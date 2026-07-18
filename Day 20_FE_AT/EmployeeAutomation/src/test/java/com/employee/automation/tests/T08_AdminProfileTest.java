package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import com.employee.automation.pages.ProfilePage;
import com.employee.automation.pages.SettingsPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 8: mandatory Admin Profile (Navbar -> ProfileModal.jsx) and
 * Settings (SettingsPage.jsx) checks.
 */
public class T08_AdminProfileTest extends BaseTest {

    @Test(priority = 1, description = "Profile modal opens from the Navbar and shows the admin's own details")
    public void test1_profilePageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToDashboard();

        ProfilePage profile = dashboard.openProfile();
        Assert.assertTrue(profile.isProfileModalVisible(), "Profile modal should be visible");
        Assert.assertTrue(profile.isProfileNameVisible(), "Profile name should be visible");
        Assert.assertTrue(profile.isOwnDetailsVisible(), "Admin's own profile details should be visible");
        System.out.println("Profile Verified");

        profile.close();
    }

    @Test(priority = 2, description = "Settings page opens from the sidebar")
    public void test2_settingsPageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToSettings();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Settings"), "'Settings' sidebar item should become active");

        SettingsPage settings = new SettingsPage(driver);
        Assert.assertTrue(settings.isSettingsPageVisible(), "Settings page should be visible");
    }
}
