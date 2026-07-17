# 🧪 Employee Salary Test Cases

## Module Name
Employee Salary (EmployeeSalary)

## Objective
To verify that the Employee Salary module displays salary information accurately, handles missing or invalid salary data gracefully, and formats salary values correctly.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Salary records exist in the database.
- User has permission to view salary details.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_SALARY_001 | Verify Employee Salary page loads | 1. Login to the application.<br>2. Navigate to the Employee Salary page. | Logged-in user | Employee Salary page should load successfully. | Employee Salary page loaded successfully. | ✅ Pass |
| TC_SALARY_002 | Verify salary details display | 1. Open the Employee Salary page.<br>2. Observe salary records. | Existing salary records | Salary details should be displayed accurately for each employee. | Salary details displayed correctly. | ✅ Pass |
| TC_SALARY_003 | Verify employee salary information | 1. Select an employee.<br>2. View salary information. | Valid employee | Basic Salary, Allowances, Deductions, Net Salary, and Payment Date should be displayed correctly. | Salary information displayed correctly. | ✅ Pass |
| TC_SALARY_004 | Verify currency format | 1. View salary values. | Salary data | Salary amounts should be displayed in the correct currency format (e.g., ₹50,000.00). | Currency format displayed correctly. | ✅ Pass |
| TC_SALARY_005 | Verify responsive Salary page | 1. Resize the browser window.<br>2. Test on different devices. | Desktop, Tablet, Mobile | Salary page should remain responsive and readable. | Responsive layout displayed correctly. | ✅ Pass |
| TC_SALARY_006 | Verify salary data after page refresh | 1. Refresh the Salary page. | Existing salary records | Salary data should reload correctly. | Salary data refreshed successfully. | ✅ Pass |
| TC_SALARY_007 | Verify handling of missing salary data | 1. Open salary details for an employee without salary information. | Missing salary data | Appropriate message or placeholder should be displayed. | Blank values displayed without any message. | ❌ Fail |
| TC_SALARY_008 | Verify handling of invalid salary data | 1. Load salary records containing invalid values (negative/null). | Invalid salary data | Application should validate and handle invalid data without crashing. | Invalid salary values displayed without validation. | ❌ Fail |
| TC_SALARY_009 | Verify salary page performance | 1. Open the Salary page containing multiple employee records. | Large salary dataset | Salary page should load within acceptable response time without lag. | Salary page loaded successfully within expected time. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 9 |
| Passed | 7 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Employee Salary page loads successfully.
- Salary information and currency formatting are displayed correctly.
- Page refresh and responsiveness work as expected.
- Missing salary records and invalid salary data handling require improvement.
- Performance remains stable even with multiple salary records.