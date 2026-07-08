# 🧪 Delete Employee Test Cases

## Module Name
Delete Employee

## Objective
To verify that employee records can be deleted successfully using the Delete Confirmation Modal and that the employee list is updated correctly.

## Preconditions
- The application is running.
- User is on the Dashboard.
- At least one employee record exists.
- MockAPI is available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_DEL_001 | Verify Delete button visibility | 1. Open Dashboard.<br>2. Observe the Delete button. | Existing employee | Delete button should be visible and enabled. | Delete button displayed correctly. | ✅ Pass |
| TC_DEL_002 | Verify Delete Confirmation Modal | 1. Click **Delete**. | Existing employee | Confirmation modal should appear. | Confirmation modal displayed successfully. | ✅ Pass |
| TC_DEL_003 | Verify confirmation message | 1. Observe the confirmation dialog. | NA | Confirmation message should be displayed clearly. | Confirmation message displayed correctly. | ✅ Pass |
| TC_DEL_004 | Delete employee after confirmation | 1. Click **Delete** in the confirmation modal. | Existing employee | Employee should be deleted successfully. | Employee deleted successfully. | ✅ Pass |
| TC_DEL_005 | Cancel delete operation | 1. Click **Cancel** in the confirmation modal. | Existing employee | Employee should not be deleted. | Delete operation cancelled successfully. | ✅ Pass |
| TC_DEL_006 | Verify employee list update | 1. Delete an employee.<br>2. Observe the employee table. | Existing employee | Deleted employee should be removed from the table. | Employee removed successfully from the table. | ✅ Pass |
| TC_DEL_007 | Delete non-existing employee | 1. Attempt to delete an employee that no longer exists. | Invalid Employee ID | Appropriate error message should be displayed. | No user-friendly error message displayed. Error logged in console. | ❌ Fail |
| TC_DEL_008 | Verify Delete button after multiple deletions | 1. Delete multiple employee records.<br>2. Observe remaining records. | Multiple employees | Delete functionality should continue working correctly. | Delete functionality worked correctly for remaining records. | ✅ Pass |
| TC_DEL_009 | Delete last employee record | 1. Delete the last available employee. | Single employee | Employee list should display a "No Employees Found" message. | Employee list becomes empty without a proper empty-state message. | ❌ Fail |

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

- Delete Confirmation Modal functions correctly.
- Employee records are deleted only after user confirmation.
- Employee list updates immediately after deletion.
- User-friendly error handling for invalid delete operations is not implemented.
- Empty-state message after deleting all employees can be improved.