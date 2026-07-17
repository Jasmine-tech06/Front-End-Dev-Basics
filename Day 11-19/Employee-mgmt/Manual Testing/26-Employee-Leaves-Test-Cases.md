# 🧪 Employee Leaves Test Cases

## Module Name
Employee Leaves (EmployeeLeaves)

## Objective
To verify that the Employee Leaves module displays leave requests accurately, correctly identifies Pending, Approved, and Rejected leave statuses, and handles empty or invalid leave data appropriately.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Leave records exist in the database.
- User has permission to view leave details.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_LEAVE_001 | Verify Employee Leaves page loads | 1. Login to the application.<br>2. Navigate to the Employee Leaves page. | Logged-in user | Employee Leaves page should load successfully. | Employee Leaves page loaded successfully. | ✅ Pass |
| TC_LEAVE_002 | Verify leave records display | 1. Open the Employee Leaves page.<br>2. Observe leave records. | Existing leave records | All leave requests should be displayed correctly. | Leave records displayed successfully. | ✅ Pass |
| TC_LEAVE_003 | Verify Pending leave status | 1. View leave requests.<br>2. Check requests with Pending status. | Pending leave request | Pending status should be displayed correctly. | Pending status displayed correctly. | ✅ Pass |
| TC_LEAVE_004 | Verify Approved leave status | 1. View leave requests.<br>2. Check requests with Approved status. | Approved leave request | Approved status should be displayed correctly. | Approved status displayed correctly. | ✅ Pass |
| TC_LEAVE_005 | Verify Rejected leave status | 1. View leave requests.<br>2. Check requests with Rejected status. | Rejected leave request | Rejected status should be displayed correctly. | Rejected status displayed correctly. | ✅ Pass |
| TC_LEAVE_006 | Verify leave details | 1. Open a leave request.<br>2. Verify leave type, duration, dates, and reason. | Valid leave request | All leave information should be displayed accurately. | Leave details displayed correctly. | ✅ Pass |
| TC_LEAVE_007 | Verify behavior with empty leave records | 1. Open the Employee Leaves page when no leave records exist. | Empty leave data | "No Leave Records Found" message should be displayed. | Blank page displayed instead of a message. | ❌ Fail |
| TC_LEAVE_008 | Verify handling of invalid leave data | 1. Load leave records with invalid or incomplete data. | Invalid leave data | Application should handle invalid data gracefully without crashing. | Page crashed due to invalid leave data. | ❌ Fail |
| TC_LEAVE_009 | Verify page refresh | 1. Refresh the Employee Leaves page. | Existing leave records | Leave records should reload correctly without duplication. | Leave records refreshed successfully. | ✅ Pass |

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

- Employee Leaves page loads successfully.
- Pending, Approved, and Rejected leave statuses are displayed accurately.
- Leave details are shown correctly.
- Page refresh functions as expected.
- Empty leave handling and invalid leave data validation require improvement.