package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.EmployeeDashboardPage;
import com.employee.automation.pages.ProfilePage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 12: mandatory Employee Profile check - the employee's own details
 * must be visible (src/components/ProfileModal.jsx -> EmployeeProfile.jsx).
 */
public class T12_EmployeeProfileTest extends BaseTest {

    @Test(priority = 1, description = "Profile modal opens from the Navbar and shows the employee's own details")
    public void test1_profileOpensWithOwnDetails() {
        EmployeeDashboardPage dashboard = new EmployeeDashboardPage(driver);
        dashboard.goToDashboard();

        ProfilePage profile = dashboard.openProfile();
        Assert.assertTrue(profile.isProfileModalVisible(), "Profile modal should be visible");
        Assert.assertTrue(profile.isProfileNameVisible(), "Employee's own name should be visible in the profile");
        Assert.assertTrue(profile.isOwnDetailsVisible(), "Employee's own details grid should be visible");

        profile.close();
    }
}
