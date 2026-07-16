# 🧪 Statistics Cards Test Cases

## Module Name
Statistics Cards (StatsCards)

## Objective
To verify that the Statistics Cards display accurate employee and department counts, update dynamically when data changes, handle empty datasets gracefully, and render correctly across different devices.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Dashboard is accessible.
- Statistics data is available from the database/API.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_STATS_001 | Verify Statistics Cards load successfully | 1. Login to the application.<br>2. Navigate to the Dashboard. | Logged-in user | All Statistics Cards should load without errors. | Statistics Cards loaded successfully. | ✅ Pass |
| TC_STATS_002 | Verify Total Employees count | 1. Open the Dashboard.<br>2. Compare the displayed employee count with the database/API. | Valid employee data | Total Employees count should match the actual number of employees. | Employee count displayed correctly. | ✅ Pass |
| TC_STATS_003 | Verify Total Departments count | 1. Open the Dashboard.<br>2. Compare the displayed department count with the database/API. | Valid department data | Total Departments count should match the actual number of departments. | Department count displayed correctly. | ✅ Pass |
| TC_STATS_004 | Verify additional statistics | 1. Check other statistics (Active Employees, Attendance, Leaves, etc.). | Valid statistics data | All statistics should display accurate values. | Statistics displayed correctly. | ✅ Pass |
| TC_STATS_005 | Verify dynamic data update | 1. Add or remove an employee/department.<br>2. Refresh the Dashboard. | Updated data | Statistics Cards should automatically reflect the latest data. | Statistics updated successfully. | ✅ Pass |
| TC_STATS_006 | Verify Statistics Cards UI | 1. Observe the Statistics Cards layout, icons, and labels. | N/A | Cards should be properly aligned, visually appealing, and readable. | UI displayed correctly. | ✅ Pass |
| TC_STATS_007 | Verify behavior with empty data | 1. Load the Dashboard with no statistics data available. | Empty dataset | Cards should display '0' or an appropriate message instead of remaining blank. | Cards displayed blank values. | ❌ Fail |
| TC_STATS_008 | Verify handling of invalid statistics data | 1. Load corrupted or invalid statistics data from the API/database. | Invalid statistics data | Application should handle invalid data gracefully without crashing. | Dashboard displayed incorrect values without validation. | ❌ Fail |
| TC_STATS_009 | Verify Statistics Cards responsiveness | 1. Resize the browser window.<br>2. Test on desktop, tablet, and mobile devices. | Various screen sizes | Statistics Cards should remain responsive and maintain proper alignment. | Cards displayed correctly on all screen sizes. | ✅ Pass |

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

- Statistics Cards load successfully and display accurate information.
- Employee and Department counts are updated correctly.
- Dynamic updates function as expected.
- UI and responsiveness are consistent across different devices.
- Empty dataset handling and invalid statistics validation require improvement.