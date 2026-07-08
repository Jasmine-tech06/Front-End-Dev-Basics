# 🧪 Dashboard Test Cases

## Module Name
Dashboard

## Objective
To verify that the Dashboard loads correctly and displays employee information, statistics, and navigation options.

## Preconditions
- The application is running.
- User has successfully navigated from the Welcome Page.
- MockAPI is available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_D_001 | Verify Dashboard loading | 1. Click **Get Started** on the Welcome Page. | NA | Dashboard should load successfully. | Dashboard loaded successfully. | ✅ Pass |
| TC_D_002 | Verify greeting message | 1. Open the Dashboard.<br>2. Observe the greeting section. | NA | Greeting message should be displayed. | Greeting message displayed correctly. | ✅ Pass |
| TC_D_003 | Verify statistics cards | 1. Observe the statistics cards. | Employee records available | Statistics cards should display correct employee count. | Statistics displayed correctly. | ✅ Pass |
| TC_D_004 | Verify employee table | 1. Observe the employee table. | Employee records available | Employee records should be displayed correctly. | Employee table displayed successfully. | ✅ Pass |
| TC_D_005 | Verify Add Employee button | 1. Observe the **Add Employee** button.<br>2. Click the button. | NA | Add Employee form should open. | Add Employee form opened successfully. | ✅ Pass |
| TC_D_006 | Verify Edit and Delete buttons | 1. Observe action buttons for each employee. | Existing employee | Edit and Delete buttons should be visible and enabled. | Action buttons displayed correctly. | ✅ Pass |
| TC_D_007 | Verify Dashboard after page refresh | 1. Refresh the Dashboard page. | NA | Employee data should reload automatically. | Employee data reloaded successfully. | ✅ Pass |
| TC_D_008 | Verify Dashboard responsiveness | 1. Resize the browser window.<br>2. Observe the Dashboard layout. | NA | Dashboard should adjust correctly for different screen sizes. | Minor overlap observed in statistics cards on smaller screens. | ❌ Fail |
| TC_D_009 | Verify Dashboard when no employee data exists | 1. Remove all employee records.<br>2. Refresh the Dashboard. | No employee records | Appropriate message should be displayed. | Employee table becomes empty without a user-friendly message. | ❌ Fail |

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

- Dashboard loads successfully.
- Statistics and employee records are displayed correctly.
- Navigation to Add Employee works as expected.
- Minor responsive layout issue observed on smaller screens.
- A user-friendly message for an empty employee list could improve usability.