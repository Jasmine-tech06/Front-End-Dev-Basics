# 🧪 Department Pie Chart Test Cases

## Module Name
Department Distribution Pie Chart

## Objective
To verify that the Department Distribution Pie Chart is displayed correctly, accurately represents employee distribution across departments, and updates dynamically when employee data changes.

## Preconditions
- The application is running.
- User is logged into the Employee Management System.
- User is on the Dashboard.
- Employee records are available.
- Each employee is assigned to a department.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_PIE_001 | Verify Pie Chart visibility | 1. Open Dashboard.<br>2. Observe the Department Distribution Pie Chart. | Existing employee records | Pie Chart should be displayed correctly. | Pie Chart displayed successfully. | ✅ Pass |
| TC_PIE_002 | Verify department distribution accuracy | 1. Compare employee counts with chart values. | Employee records from multiple departments | Pie Chart should accurately represent department-wise employee distribution. | Department distribution displayed correctly. | ✅ Pass |
| TC_PIE_003 | Verify chart updates after adding an employee | 1. Add a new employee.<br>2. Refresh Dashboard. | New employee assigned to a department | Pie Chart should update automatically with the latest data. | Pie Chart updated successfully. | ✅ Pass |
| TC_PIE_004 | Verify chart updates after deleting an employee | 1. Delete an employee.<br>2. Refresh Dashboard. | Existing employee | Pie Chart should update to reflect the removed employee. | Chart updated correctly. | ✅ Pass |
| TC_PIE_005 | Verify Pie Chart with no employee records | 1. Remove all employee records.<br>2. Open Dashboard. | No employee records | System should display a "No Data Available" message instead of an empty chart. | Empty chart displayed without a proper message. | ❌ Fail |
| TC_PIE_006 | Verify Pie Chart with invalid department data | 1. Add employee with invalid/blank department.<br>2. Refresh Dashboard. | Invalid department value | System should handle invalid department values gracefully. | Invalid department caused incorrect chart rendering. | ❌ Fail |
| TC_PIE_007 | Verify chart responsiveness | 1. Resize browser window.<br>2. Observe Pie Chart. | Desktop and mobile screen sizes | Pie Chart should remain responsive and readable. | Chart resized correctly without UI issues. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 7 |
| Passed | 5 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Department Distribution Pie Chart displays correctly.
- Department-wise employee count is calculated accurately.
- Chart updates dynamically after adding or deleting employees.
- Empty data handling and invalid department validation need improvement.
- Responsive behavior works as expected across different screen sizes.