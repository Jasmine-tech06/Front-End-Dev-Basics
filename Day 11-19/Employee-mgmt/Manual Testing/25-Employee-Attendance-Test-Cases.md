# 🧪 Employee Attendance Test Cases

## Module Name
Employee Attendance (EmployeeAttendance)

## Objective
To verify that the Employee Attendance module displays attendance records accurately, correctly identifies Present and Absent statuses, handles empty or invalid attendance data gracefully, and functions reliably.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Attendance records exist in the database.
- User has permission to view attendance details.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_ATTENDANCE_001 | Verify Attendance page loads | 1. Login to the application.<br>2. Navigate to the Attendance page. | Logged-in user | Attendance page should load successfully. | Attendance page loaded successfully. | ✅ Pass |
| TC_ATTENDANCE_002 | Verify attendance records display | 1. Open the Attendance page.<br>2. Observe attendance records. | Existing attendance records | All attendance records should be displayed correctly. | Attendance records displayed successfully. | ✅ Pass |
| TC_ATTENDANCE_003 | Verify Present status | 1. View attendance records.<br>2. Check employees marked as Present. | Present employee | Present status should be displayed correctly. | Present status displayed correctly. | ✅ Pass |
| TC_ATTENDANCE_004 | Verify Absent status | 1. View attendance records.<br>2. Check employees marked as Absent. | Absent employee | Absent status should be displayed correctly. | Absent status displayed correctly. | ✅ Pass |
| TC_ATTENDANCE_005 | Verify attendance date display | 1. View attendance records.<br>2. Check attendance dates. | Attendance data | Correct attendance date should be displayed for each record. | Dates displayed correctly. | ✅ Pass |
| TC_ATTENDANCE_006 | Verify responsive Attendance page | 1. Resize browser window.<br>2. Test on different screen sizes. | Desktop, Tablet, Mobile | Attendance page should remain responsive and readable. | Responsive layout displayed correctly. | ✅ Pass |
| TC_ATTENDANCE_007 | Verify behavior with empty attendance records | 1. Open Attendance page when no attendance records exist. | Empty attendance data | "No Attendance Records Found" message should be displayed. | Blank page displayed instead of a message. | ❌ Fail |
| TC_ATTENDANCE_008 | Verify handling of invalid attendance data | 1. Load attendance records with invalid values. | Invalid attendance data | Invalid records should be handled gracefully without crashing the application. | Attendance page crashed due to invalid data. | ❌ Fail |
| TC_ATTENDANCE_009 | Verify page refresh | 1. Refresh the Attendance page. | Existing attendance records | Attendance records should reload correctly. | Attendance data refreshed successfully. | ✅ Pass |

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

- Attendance page loads successfully.
- Present and Absent statuses are displayed accurately.
- Attendance dates and records are shown correctly.
- Responsive design works well across different devices.
- Empty attendance handling and invalid attendance data validation require improvement.