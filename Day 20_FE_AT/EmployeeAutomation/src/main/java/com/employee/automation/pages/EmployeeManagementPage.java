package com.employee.automation.pages;

import com.employee.automation.utils.TestDataUtils.EmployeeData;
import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.Select;

/**
 * Maps to src/components/EmployeeList.jsx (admin "Employees" screen) and
 * src/components/EmployeeForm.jsx (admin "Add Employee" screen). Every
 * input is located by its real "name" attribute from EmployeeForm.jsx.
 */
public class EmployeeManagementPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    // Employee list
    private final By employeeListSection = By.cssSelector(".employee-list");
    private final By tableRows = By.cssSelector(".employee-list table tbody tr");

    // Add/Update Employee form (name attributes from EmployeeForm.jsx)
    private final By form = By.cssSelector(".employee-form");
    private final By nameInput = By.cssSelector(".employee-form input[name='name']");
    private final By employeeIdInput = By.cssSelector(".employee-form input[name='employeeId']");
    private final By emailInput = By.cssSelector(".employee-form input[name='email']");
    private final By phoneInput = By.cssSelector(".employee-form input[name='phone']");
    private final By departmentField = By.cssSelector(".employee-form [name='department']");
    private final By roleInput = By.cssSelector(".employee-form input[name='role']");
    private final By designationInput = By.cssSelector(".employee-form input[name='designation']");
    private final By salaryInput = By.cssSelector(".employee-form input[name='salary']");
    private final By statusSelect = By.cssSelector(".employee-form select[name='status']");
    private final By joiningDateInput = By.cssSelector(".employee-form input[name='joiningDate']");
    private final By imageInput = By.cssSelector(".employee-form input[name='image']");
    private final By submitBtn = By.cssSelector(".employee-form button[type='submit']");
    private final By formHeading = By.cssSelector(".employee-form .form-header h2");

    public EmployeeManagementPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    // ----- Employees list -----

    public boolean isEmployeeListVisible() {
        return wait.isDisplayed(employeeListSection);
    }

    public int getRowCount() {
        return driver.findElements(tableRows).size();
    }

    /**
     * Locates the specific employee row by the email shown in its
     * "email-cell" column (EmployeeList.jsx renders {employee.email}
     * there). Used to prove a given employee is actually present in the
     * list - not just that the list has "some" rows.
     */
    private By rowByEmail(String email) {
        return By.xpath(
                "//div[contains(@class,'employee-list')]//table/tbody/tr" +
                        "[.//td[contains(@class,'email-cell')][normalize-space()='" + email + "']]");
    }

    /**
     * Genuinely waits (does not short-circuit) for a row containing the
     * given email to appear in the Employee List. Because the list is
     * populated exclusively from the Mock API response (App.jsx's
     * fetchEmployees(), never from local/optimistic state), seeing this
     * row confirms both "added in the React app" and "stored in the Mock
     * API" - the row cannot exist here unless the GET that repopulated it
     * returned this employee.
     */
    public boolean waitForEmployeeRowByEmail(String email) {
        return wait.isDisplayed(rowByEmail(email));
    }

    /**
     * Best-effort check for the "Employee added successfully!" toast,
     * used as a secondary "API completion" signal alongside
     * waitForEmployeeRowByEmail(). Not treated as the sole proof of
     * success since react-hot-toast messages auto-dismiss quickly.
     */
    public boolean waitForAddSuccessToast() {
        return wait.waitForToastMessage("Employee added successfully!", 8);
    }

    // ----- Add Employee form -----

    public boolean isFormVisible() {
        return wait.isDisplayed(form);
    }

    public String getFormHeadingText() {
        return wait.getText(formHeading);
    }

    public void fillForm(EmployeeData data) {
        wait.type(nameInput, data.name);
        wait.type(employeeIdInput, data.employeeId);
        wait.type(emailInput, data.email);
        wait.type(phoneInput, data.phone);
        setDepartment(data.department);
        wait.type(roleInput, data.role);
        wait.type(designationInput, data.designation);
        wait.type(salaryInput, data.salary);
        setStatus(data.status);
        wait.type(joiningDateInput, data.joiningDate);
        wait.type(imageInput, "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150");
    }

    /**
     * Department renders as a <select> once department options exist,
     * otherwise as a free-text <input> (see EmployeeForm.jsx). Handle both.
     */
    private void setDepartment(String department) {
        var element = wait.waitForVisible(departmentField);
        if ("select".equalsIgnoreCase(element.getTagName())) {
            Select select = new Select(element);
            boolean matched = select.getOptions().stream()
                    .anyMatch(opt -> opt.getAttribute("value").equalsIgnoreCase(department));
            if (matched) {
                select.selectByValue(department);
            } else {
                // Falls back to the first real department option rather than
                // guessing a value that doesn't exist in the dropdown.
                select.selectByIndex(select.getOptions().size() > 1 ? 1 : 0);
            }
        } else {
            element.clear();
            element.sendKeys(department);
        }
    }

    private void setStatus(String status) {
        Select select = new Select(wait.waitForVisible(statusSelect));
        select.selectByVisibleText(status);
    }

    public void submitForm() {
        wait.click(submitBtn);
    }

    /**
     * On success, EmployeeForm's onSuccess callback (wired in Dashboard.jsx)
     * switches activeMenu back to "employees", so the list re-appears
     * automatically - no separate navigation click needed.
     */
    public void submitAndReturnToList() {
        wait.click(submitBtn);
        wait.waitForPageLoad();
        wait.waitForVisible(employeeListSection);
    }

    public String getSubmitButtonText() {
        return wait.getText(submitBtn);
    }
}
