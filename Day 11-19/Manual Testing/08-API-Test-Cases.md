# 🧪 API Test Cases

## Module Name
MockAPI Integration

## Objective
To verify that the application communicates correctly with MockAPI for performing CRUD operations and handles API responses appropriately.

## Preconditions
- The application is running.
- MockAPI server is active.
- Internet connection is available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_API_001 | Verify GET API request | 1. Launch the application. | NA | Employee records should be fetched successfully. | Employee records fetched and displayed successfully. | ✅ Pass |
| TC_API_002 | Verify POST API request | 1. Add a new employee.<br>2. Click **Save**. | Valid employee details | Employee record should be stored in MockAPI. | Employee added successfully to MockAPI. | ✅ Pass |
| TC_API_003 | Verify PUT API request | 1. Edit an employee.<br>2. Click **Update**. | Updated employee details | Employee details should be updated successfully. | Employee details updated successfully. | ✅ Pass |
| TC_API_004 | Verify DELETE API request | 1. Delete an employee.<br>2. Confirm deletion. | Existing employee | Employee record should be deleted successfully. | Employee deleted successfully from MockAPI. | ✅ Pass |
| TC_API_005 | Verify API response after Add operation | 1. Add a new employee.<br>2. Observe employee list. | Valid employee details | Employee list should refresh automatically. | Employee list refreshed successfully. | ✅ Pass |
| TC_API_006 | Verify API response after Update operation | 1. Update employee details.<br>2. Observe employee list. | Updated employee details | Updated details should appear immediately. | Updated details displayed successfully. | ✅ Pass |
| TC_API_007 | Verify API response after Delete operation | 1. Delete an employee.<br>2. Observe employee list. | Existing employee | Deleted employee should no longer appear in the list. | Employee removed successfully from the list. | ✅ Pass |
| TC_API_008 | Verify application behavior when MockAPI server is unavailable | 1. Stop MockAPI or disconnect the internet.<br>2. Refresh the application. | API unavailable | User-friendly error message should be displayed. | Error logged in browser console. No message displayed to the user. | ❌ Fail |
| TC_API_009 | Verify API timeout handling | 1. Simulate a delayed API response. | Slow API response | Loading indicator or timeout message should be displayed. | No loading indicator displayed while waiting for response. | ❌ Fail |

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

- CRUD operations using MockAPI function correctly.
- Employee data is fetched, added, updated, and deleted successfully.
- Error handling for API failures can be improved.
- Loading indicator for slow API responses is not implemented.