package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import com.employee.automation.utils.SuiteState;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 6: mandatory search validation on the Employees screen.
 * Navbar's search-box (admin only) filters the Employees table by
 * name/department/email (src/pages/Dashboard.jsx -> matchesSearch).
 */
public class T06_AdminSearchTest extends BaseTest {

    @Test(priority = 1, description = "Search box is visible for the admin role")
    public void test1_searchBoxVisibleOnEmployeesScreen() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToEmployees();
        Assert.assertTrue(dashboard.isSearchBoxVisible(), "Search box should be visible in the Navbar for admin");
    }

    @Test(priority = 2, dependsOnMethods = "test1_searchBoxVisibleOnEmployeesScreen",
            description = "Searching returns the employee created earlier in this run")
    public void test2_searchByCreatedEmployeeName_returnsResult() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);

        Assert.assertTrue(SuiteState.hasCreatedEmployee(),
                "An automation employee should already have been created by T05_AdminEmployeeManagementTest");

        dashboard.searchEmployees(SuiteState.getCreatedEmployeeName());

        Assert.assertTrue(dashboard.getVisibleEmployeeRowCount() > 0,
                "Searching by the newly created employee's name should return at least one row");
        System.out.println("Search Verified");
    }
}
