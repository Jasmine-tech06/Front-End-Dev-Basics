# 🧪 Employee Pagination Test Cases

## Module Name
Employee Listing & Pagination

## Objective
To verify that employee records are displayed with pagination functionality where only 10 employees are shown per page and users can navigate through all employee records using Previous and Next buttons.

## Preconditions
- The application is running.
- User is logged into the Employee Management System.
- User is on the Dashboard.
- Employee records are available.
- MockAPI is connected successfully.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_PAGE_001 | Verify employee list loading | 1. Open Dashboard.<br>2. Navigate to employee section. | Existing employee records | Employee list should load successfully. | Employee list displayed successfully. | ✅ Pass |
| TC_PAGE_002 | Verify 10 employees displayed per page | 1. Open employee list page.<br>2. Count displayed employees. | More than 10 employee records | Only 10 employees should be displayed on one page. | Exactly 10 employees displayed per page. | ✅ Pass |
| TC_PAGE_003 | Verify Next button functionality | 1. Click Next button.<br>2. Observe employee records. | Multiple pages available | Next set of 10 employees should be displayed. | Next page loaded successfully. | ✅ Pass |
| TC_PAGE_004 | Verify Previous button functionality | 1. Navigate to second page.<br>2. Click Previous button. | Multiple pages available | Previous employee page should be displayed. | Previous page displayed successfully. | ✅ Pass |
| TC_PAGE_005 | Verify Next button on last page | 1. Navigate to the last page.<br>2. Click Next button. | Last available page | User should not navigate beyond last page. | Next button disabled correctly. | ✅ Pass |
| TC_PAGE_006 | Verify Previous button on first page | 1. Open first page.<br>2. Click Previous button. | First page | User should not navigate before first page. | Previous button disabled correctly. | ✅ Pass |
| TC_PAGE_007 | Verify pagination with less than 10 employees | 1. Add fewer than 10 employees.<br>2. Open employee list. | 5 employee records | Available employees should display without errors. | Employees displayed correctly. | ✅ Pass |
| TC_PAGE_008 | Verify pagination with empty employee records | 1. Remove all employee records.<br>2. Open employee list page. | No employee data | System should display proper empty state message. | Empty table displayed without proper message. | ❌ Fail |
| TC_PAGE_009 | Verify employee data consistency during navigation | 1. Move between pages using Next and Previous buttons.<br>2. Compare employee details. | Existing employee records | Employee information should remain unchanged. | Employee details maintained correctly. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 9 |
| Passed | 8 |
| Failed | 1 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Pagination feature works correctly.
- Employee records are limited to 10 per page successfully.
- Next and Previous navigation functions properly.
- Empty employee list handling needs improvement with a proper "No Employees Found" message.