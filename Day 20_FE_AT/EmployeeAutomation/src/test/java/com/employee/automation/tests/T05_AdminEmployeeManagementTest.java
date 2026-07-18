package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import com.employee.automation.pages.EmployeeManagementPage;
import com.employee.automation.utils.SuiteState;
import com.employee.automation.utils.TestDataUtils;
import com.employee.automation.utils.TestDataUtils.EmployeeData;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 5: mandatory Employees + Add Employee validations
 * (src/components/EmployeeList.jsx, src/components/EmployeeForm.jsx).
 *
 * The employee created here is deliberately reused later by
 * T10_EmployeeLoginTest: the Add Employee form has no password field, so
 * Login.jsx's own fallback rule (employee.password || "password") lets
 * this fresh record log in with password "password" - the app's real
 * default, not an invented credential.
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
            description = "A new employee can be added through the real Add Employee form")
    public void test3_addNewEmployee_succeeds() {
        EmployeeManagementPage employeeManagement = new EmployeeManagementPage(driver);
        EmployeeData employeeData = TestDataUtils.newAutomationEmployee();

        employeeManagement.fillForm(employeeData);
        employeeManagement.submitAndReturnToList();

        Assert.assertTrue(employeeManagement.isEmployeeListVisible(),
                "Should be redirected back to the Employees list after a successful Add Employee submission");

        SuiteState.setCreatedEmployee(employeeData.name, employeeData.email);
        System.out.println("New employee added for automation: " + employeeData.email);
    }

    @Test(priority = 4, dependsOnMethods = "test3_addNewEmployee_succeeds",
            description = "Employees list reflects at least one record after adding")
    public void test4_employeeListHasRecords() {
        EmployeeManagementPage employeeManagement = new EmployeeManagementPage(driver);
        Assert.assertTrue(employeeManagement.getRowCount() > 0,
                "Employees table should list at least one employee row after a successful add");
    }
}
