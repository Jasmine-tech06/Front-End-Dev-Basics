# 🧪 Employee Bar Chart Test Cases

## Module Name
Employees by Department Bar Chart

## Objective
To verify that the Employees by Department Bar Chart displays accurate employee counts for each department, updates dynamically when employee data changes, and renders correctly across different screen sizes.

## Preconditions
- The application is running.
- User is logged into the Employee Management System.
- User is on the Dashboard.
- Employee records are available.
- Each employee is assigned to a valid department.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_BAR_001 | Verify Bar Chart visibility | 1. Open Dashboard.<br>2. Observe the Employees by Department Bar Chart. | Existing employee records | Bar Chart should be displayed correctly. | Bar Chart displayed successfully. | ✅ Pass |
| TC_BAR_002 | Verify employee count accuracy | 1. Compare department-wise employee count with chart values. | Multiple department records | Bar Chart should accurately display employee count for each department. | Employee count displayed correctly. | ✅ Pass |
| TC_BAR_003 | Verify chart update after adding an employee | 1. Add a new employee.<br>2. Refresh Dashboard. | New employee | Bar Chart should update automatically with new employee count. | Chart updated successfully. | ✅ Pass |
| TC_BAR_004 | Verify chart update after deleting an employee | 1. Delete an employee.<br>2. Refresh Dashboard. | Existing employee | Employee count should decrease accordingly in the chart. | Chart updated correctly. | ✅ Pass |
| TC_BAR_005 | Verify Bar Chart with empty employee records | 1. Remove all employee records.<br>2. Open Dashboard. | No employee records | System should display a "No Data Available" message instead of an empty chart. | Empty chart displayed without a proper message. | ❌ Fail |
| TC_BAR_006 | Verify Bar Chart with invalid department data | 1. Add employee with blank/invalid department.<br>2. Refresh Dashboard. | Invalid department value | System should ignore invalid data or display proper validation. | Invalid data affected chart rendering. | ❌ Fail |
| TC_BAR_007 | Verify chart responsiveness | 1. Resize browser window.<br>2. Observe Bar Chart. | Desktop and mobile screen sizes | Chart should resize properly without overlapping labels. | Chart remained responsive. | ✅ Pass |
| TC_BAR_008 | Verify chart axis labels | 1. Open Dashboard.<br>2. Observe X-axis and Y-axis labels. | Employee records | Department names and employee counts should be displayed correctly. | Axis labels displayed correctly. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 8 |
| Passed | 6 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Employees by Department Bar Chart displays correctly.
- Department-wise employee count is represented accurately.
- Chart updates automatically after employee additions and deletions.
- Responsive layout works correctly on different screen sizes.
- Empty-state handling and invalid department data validation require improvement.