# 🧪 Performance Test Cases

## Module Name
Performance Testing

## Objective
To verify that the Employee Management System performs efficiently under normal operating conditions and provides a smooth user experience.

## Preconditions
- The application is running.
- MockAPI server is available.
- Employee records are available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_P_001 | Verify application launch time | 1. Launch the application. | NA | Application should load within 3 seconds. | Application loaded within 2 seconds. | ✅ Pass |
| TC_P_002 | Verify Dashboard loading time | 1. Navigate to Dashboard. | Employee records | Dashboard should load quickly without delay. | Dashboard loaded successfully within expected time. | ✅ Pass |
| TC_P_003 | Verify employee data loading | 1. Open Employee List. | 50 Employee Records | Employee records should load smoothly. | Employee records loaded successfully. | ✅ Pass |
| TC_P_004 | Verify Add Employee performance | 1. Add a new employee.<br>2. Save the record. | Valid employee details | Employee should be added within 2 seconds. | Employee added successfully within expected time. | ✅ Pass |
| TC_P_005 | Verify Update Employee performance | 1. Update an employee.<br>2. Save changes. | Updated employee details | Updated details should reflect immediately. | Employee updated successfully without delay. | ✅ Pass |
| TC_P_006 | Verify Delete Employee performance | 1. Delete an employee.<br>2. Confirm deletion. | Existing employee | Employee should be deleted quickly. | Employee deleted successfully within expected time. | ✅ Pass |
| TC_P_007 | Verify Search performance | 1. Search an employee by name. | Employee Name | Search results should appear instantly. | Search results displayed immediately. | ✅ Pass |
| TC_P_008 | Verify application during continuous CRUD operations | 1. Perform Add, Update, Delete, and Search repeatedly. | Multiple employee records | Application should remain responsive. | Slight delay observed after multiple consecutive operations. | ❌ Fail |
| TC_P_009 | Verify performance during slow API response | 1. Simulate slow network/API response. | Slow API | Loading indicator should be displayed until data loads. | No loading indicator displayed during API delay. | ❌ Fail |
| TC_P_010 | Verify browser memory usage | 1. Use the application continuously for several minutes.<br>2. Monitor browser performance. | NA | Memory usage should remain stable. | Application remained stable without crashes. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 10 |
| Passed | 8 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Application loads quickly and performs CRUD operations efficiently.
- Employee records are retrieved and displayed without noticeable delay.
- Search functionality performs well with available employee data.
- Minor performance degradation was observed during continuous CRUD operations.
- Loading indicator for slow API responses is not implemented and can be added to improve user experience.