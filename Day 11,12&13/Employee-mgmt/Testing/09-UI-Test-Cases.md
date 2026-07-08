# 🧪 UI Test Cases

## Module Name
User Interface (UI)

## Objective
To verify that the Employee Management System provides a consistent, responsive, and user-friendly interface.

## Preconditions
- The application is running.
- User is on the Dashboard.
- Employee data is available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_UI_001 | Verify Welcome Page layout | 1. Launch the application.<br>2. Observe the Welcome Page. | NA | All UI elements should be aligned properly. | Welcome Page layout displayed correctly. | ✅ Pass |
| TC_UI_002 | Verify Dashboard layout | 1. Navigate to the Dashboard.<br>2. Observe all sections. | NA | Dashboard components should be properly aligned. | Dashboard layout displayed correctly. | ✅ Pass |
| TC_UI_003 | Verify navigation buttons | 1. Observe all navigation and action buttons. | NA | All buttons should be visible and clickable. | Buttons displayed and functioned correctly. | ✅ Pass |
| TC_UI_004 | Verify Add Employee form alignment | 1. Open Add Employee form.<br>2. Observe labels and input fields. | NA | Form elements should be properly aligned. | Form layout displayed correctly. | ✅ Pass |
| TC_UI_005 | Verify Employee table layout | 1. Observe the employee table. | Employee records | Table headers and data should be properly aligned. | Table displayed correctly. | ✅ Pass |
| TC_UI_006 | Verify Delete Confirmation Modal | 1. Click Delete.<br>2. Observe the confirmation modal. | Existing employee | Modal should appear at the center with clear buttons. | Delete confirmation modal displayed correctly. | ✅ Pass |
| TC_UI_007 | Verify responsive layout | 1. Resize browser window.<br>2. Observe application layout. | NA | Layout should adjust correctly for different screen sizes. | Minor alignment issues observed on smaller screens. | ❌ Fail |
| TC_UI_008 | Verify button hover effects | 1. Hover over buttons. | NA | Hover effects should be displayed consistently. | Hover effects displayed correctly. | ✅ Pass |
| TC_UI_009 | Verify font consistency | 1. Navigate through different pages. | NA | Font style and size should remain consistent. | Font consistency maintained throughout the application. | ✅ Pass |
| TC_UI_010 | Verify empty employee list UI | 1. Delete all employee records.<br>2. Observe the employee table. | No employee records | A user-friendly "No Employees Found" message should be displayed. | Employee table became empty without an informative message. | ❌ Fail |

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

- User interface is clean and easy to navigate.
- Forms, tables, and buttons are displayed correctly.
- Delete Confirmation Modal works as expected.
- Minor responsive issues were observed on smaller screen sizes.
- Empty employee list does not display a user-friendly message.