# 🧪 Employee Details Modal Test Cases

## Module Name
Employee Details Modal (EmployeeDetailsModal)

## Objective
To verify that the Employee Details Modal opens and closes correctly, displays complete employee information, supports scrolling for lengthy content, and handles missing or invalid data gracefully.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Employee records are available.
- Employee Details button/card is accessible.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_MODAL_001 | Verify Employee Details Modal opens | 1. Navigate to the Employees page.<br>2. Click an employee card or View Details button. | Valid employee | Employee Details Modal should open successfully. | Modal opened successfully. | ✅ Pass |
| TC_MODAL_002 | Verify Employee Details Modal closes | 1. Open the Employee Details Modal.<br>2. Click the Close (X) button or outside the modal. | Valid employee | Modal should close successfully. | Modal closed correctly. | ✅ Pass |
| TC_MODAL_003 | Verify employee information display | 1. Open the Employee Details Modal.<br>2. Verify all displayed information. | Valid employee data | Employee Name, ID, Email, Department, Role, Salary, Attendance, and other available details should be displayed correctly. | Employee information displayed correctly. | ✅ Pass |
| TC_MODAL_004 | Verify profile image display | 1. Open the Employee Details Modal.<br>2. Observe the employee profile image. | Valid profile image | Employee image should load correctly. | Image displayed successfully. | ✅ Pass |
| TC_MODAL_005 | Verify scrolling within the modal | 1. Open details of an employee with lengthy information.<br>2. Scroll through the modal. | Long employee record | Modal should allow smooth scrolling without affecting the background page. | Scrolling worked correctly. | ✅ Pass |
| TC_MODAL_006 | Verify modal responsiveness | 1. Open the Employee Details Modal.<br>2. Resize the browser window or test on mobile view. | Different screen sizes | Modal should remain responsive and readable. | Modal adjusted correctly to different screen sizes. | ✅ Pass |
| TC_MODAL_007 | Verify handling of missing employee data | 1. Open details for an employee with missing fields. | Missing employee information | Default values/placeholders should be displayed without errors. | Blank fields caused UI misalignment. | ❌ Fail |
| TC_MODAL_008 | Verify handling of invalid employee data | 1. Load employee details containing invalid or corrupted data. | Invalid employee data | Application should handle invalid data gracefully without crashing. | Modal crashed due to invalid data. | ❌ Fail |
| TC_MODAL_009 | Verify multiple modal openings | 1. Open and close the Employee Details Modal multiple times. | Valid employee | Modal should function consistently without performance issues. | Modal opened and closed successfully every time. | ✅ Pass |

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

- Employee Details Modal opens and closes correctly.
- Employee information is displayed accurately.
- Scrolling and responsiveness work as expected.
- Missing and invalid employee data handling require improvement.
- Repeated opening and closing of the modal does not affect performance.