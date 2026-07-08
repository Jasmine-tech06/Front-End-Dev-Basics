# 🧪 Add Employee Test Cases

## Module Name
Add Employee

## Objective
To verify that new employee records can be added successfully and the application validates user inputs before saving.

## Preconditions
- The application is running.
- User is on the Dashboard.
- MockAPI is available.
- Add Employee form is accessible.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_A_001 | Verify Add Employee form | 1. Click **Add Employee**. | NA | Add Employee form should open successfully. | Form opened successfully. | ✅ Pass |
| TC_A_002 | Add employee with valid details | 1. Enter valid employee details.<br>2. Click **Save**. | Name: Jasmine<br>Department: IT<br>Email: jasmine@gmail.com | Employee should be added successfully. | Employee added successfully and displayed in the employee list. | ✅ Pass |
| TC_A_003 | Verify mandatory Name field | 1. Leave Name empty.<br>2. Click **Save**. | Name: Empty | Validation message should be displayed. | Validation message displayed. | ✅ Pass |
| TC_A_004 | Verify mandatory Department field | 1. Leave Department empty.<br>2. Click **Save**. | Department: Empty | Validation message should be displayed. | Validation message displayed. | ✅ Pass |
| TC_A_005 | Verify mandatory Email field | 1. Leave Email empty.<br>2. Click **Save**. | Email: Empty | Validation message should be displayed. | Validation message displayed. | ✅ Pass |
| TC_A_006 | Verify all fields empty | 1. Leave all fields blank.<br>2. Click **Save**. | Empty Form | Employee should not be added. | Form submission prevented with validation messages. | ✅ Pass |
| TC_A_007 | Verify invalid email format | 1. Enter an invalid email.<br>2. Click **Save**. | jasminegmail.com | Invalid email should be rejected. | Employee added with invalid email format. | ❌ Fail |
| TC_A_008 | Verify duplicate employee entry | 1. Add an employee with existing details.<br>2. Click **Save**. | Existing employee details | Duplicate employee should not be added. | Duplicate employee record added successfully. | ❌ Fail |
| TC_A_009 | Verify form reset after saving | 1. Add a valid employee.<br>2. Observe the form. | Valid employee | Form should clear after successful submission. | Form cleared successfully after saving. | ✅ Pass |
| TC_A_010 | Verify employee list update | 1. Add a new employee.<br>2. Observe the employee table. | Valid employee | Newly added employee should appear immediately. | Employee displayed successfully in the employee list. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 10 |
| Passed | 8 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Employee records are added successfully with valid inputs.
- Mandatory field validation works correctly.
- Invalid email format validation is not implemented.
- Duplicate employee records are currently allowed.
- Employee list updates immediately after successful addition.