package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import com.employee.automation.pages.EmployeeManagementPage;
import com.employee.automation.utils.MockApiUtils;
import com.employee.automation.utils.SuiteState;
import com.employee.automation.utils.TestDataUtils;
import com.employee.automation.utils.TestDataUtils.EmployeeData;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 5: mandatory Employees + Add Employee validations
 * (src/components/EmployeeList.jsx, src/components/EmployeeForm.jsx).
 *
 * Creates the specific employee required for this automation run - Name
 * "Arshad", Email "jarshj@gmail.com" - through the real Add Employee form
 * (no invented selectors, no assumed fields), then verifies the result in
 * three independent places:
 *   1. The React app (form submits, returns to the Employees screen)
 *   2. The Employee List (the new row is actually rendered)
 *   3. The Mock API backend (a direct GET confirms the record was
 *      persisted server-side, not just reflected in local UI state)
 *
 * This employee is deliberately reused later by T10_EmployeeLoginTest: the
 * Add Employee form has no password field, so Login.jsx's own fallback
 * rule (employee.password || "password") lets this fresh record log in
 * with password "password" - the app's real default, not an invented
 * credential.
 */
public class T05_AdminEmployeeManagementTest extends BaseTest {

    @Test(priority = 1, description = "Employees list page opens from the sidebar")
    public void test1_employeesPageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToEmployees();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Employees"), "'Employees' sidebar item should become active");
        Assert.assertTrue(dashboard.isEmployeeListVisible(), "Employee list should be visible");
        System.out.println("Employee List Verified");
    }

    @Test(priority = 2, dependsOnMethods = "test1_employeesPageOpens", description = "Add Employee page opens from the sidebar")
    public void test2_addEmployeePageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        EmployeeManagementPage employeeManagement = dashboard.openAddEmployeeForm();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Add Employee"), "'Add Employee' sidebar item should become active");
        Assert.assertTrue(employeeManagement.isFormVisible(), "Add Employee form should be visible");
        Assert.assertEquals(employeeManagement.getFormHeadingText(), "Add Employee",
                "Form heading should read 'Add Employee' when not editing");
    }

    @Test(priority = 3, dependsOnMethods = "test2_addEmployeePageOpens",
            description = "The required employee (Arshad / jarshj@gmail.com) is created through the real Add Employee form")
    public void test3_addArshadEmployee_succeeds() {
        EmployeeManagementPage employeeManagement = new EmployeeManagementPage(driver);
        EmployeeData employeeData = TestDataUtils.arshadEmployee();

        employeeManagement.fillForm(employeeData);
        employeeManagement.submitAndReturnToList();

        // 1. Verify in the React app: submission returned to the Employees screen.
        Assert.assertTrue(employeeManagement.isEmployeeListVisible(),
                "Should be redirected back to the Employees list after a successful Add Employee submission");

        // 3. Verify in the Employee List: the new row is actually rendered
        // (the list is populated only from the Mock API GET response, so
        // this also proves the record round-tripped through the backend).
        Assert.assertTrue(employeeManagement.waitForEmployeeRowByEmail(employeeData.email),
                "Newly added employee (" + employeeData.email + ") should appear in the Employee List "
                        + "after the list refreshes from the Mock API");

        SuiteState.setCreatedEmployee(employeeData.name, employeeData.email);
        System.out.println("New employee added for automation: " + employeeData.name + " / " + employeeData.email);
    }

    @Test(priority = 4, dependsOnMethods = "test3_addArshadEmployee_succeeds",
            description = "Employee List and the Mock API backend both reflect the newly created employee")
    public void test4_employeeListAndMockApiHaveNewRecord() {
        EmployeeManagementPage employeeManagement = new EmployeeManagementPage(driver);
        String createdEmail = SuiteState.getCreatedEmployeeEmail();

        Assert.assertTrue(employeeManagement.getRowCount() > 0,
                "Employees table should list at least one employee row after a successful add");

        // Employee List check (re-confirmed independently of test3).
        Assert.assertTrue(employeeManagement.waitForEmployeeRowByEmail(createdEmail),
                "Employee List should still show the created employee (" + createdEmail + ")");

        // 2. Verify in the Mock API/database directly: a fresh GET against
        // the same endpoint the app uses (src/services/employeeService.js)
        // must contain the created employee's email.
        Assert.assertTrue(MockApiUtils.employeeExistsByEmail(createdEmail),
                "Mock API backend should contain the newly created employee (" + createdEmail + ")");

        System.out.println("Employee creation verified in the React app, the Employee List, and the Mock API.");
    }
}
