# 🧪 Update Employee Test Cases

## Module Name
Update Employee

## Objective
To verify that existing employee details can be updated successfully and appropriate validations are performed before saving the changes.

## Preconditions
- The application is running.
- User is on the Dashboard.
- At least one employee record exists.
- MockAPI is available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_U_001 | Verify Edit button | 1. Open Dashboard.<br>2. Click **Edit** for an employee. | Existing employee | Update form should open with employee details. | Update form opened successfully with employee details. | ✅ Pass |
| TC_U_002 | Update employee name | 1. Modify employee name.<br>2. Click **Update**. | Name: Jasmine A | Employee name should be updated successfully. | Employee name updated successfully. | ✅ Pass |
| TC_U_003 | Update employee department | 1. Modify department.<br>2. Click **Update**. | Department: HR | Department should be updated successfully. | Department updated successfully. | ✅ Pass |
| TC_U_004 | Update employee email | 1. Modify email.<br>2. Click **Update**. | jasmine@gmail.com | Email should be updated successfully. | Email updated successfully. | ✅ Pass |
| TC_U_005 | Update all employee details | 1. Modify all fields.<br>2. Click **Update**. | Valid employee details | All employee details should be updated successfully. | All details updated successfully. | ✅ Pass |
| TC_U_006 | Verify mandatory Name field | 1. Remove Name.<br>2. Click **Update**. | Name: Empty | Validation message should be displayed. | Validation message displayed. | ✅ Pass |
| TC_U_007 | Verify mandatory Department field | 1. Remove Department.<br>2. Click **Update**. | Department: Empty | Validation message should be displayed. | Validation message displayed. | ✅ Pass |
| TC_U_008 | Verify mandatory Email field | 1. Remove Email.<br>2. Click **Update**. | Email: Empty | Validation message should be displayed. | Validation message displayed. | ✅ Pass |
| TC_U_009 | Verify invalid email format | 1. Enter an invalid email.<br>2. Click **Update**. | jasminegmail.com | Invalid email should not be accepted. | Invalid email accepted and employee updated successfully. | ❌ Fail |
| TC_U_010 | Verify updated record in employee table | 1. Update employee details.<br>2. Observe the employee list. | Updated employee | Updated details should be reflected immediately. | Updated employee details displayed successfully. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 10 |
| Passed | 9 |
| Failed | 1 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Employee details are updated successfully.
- Updated information is reflected immediately in the employee table.
- Mandatory field validation works correctly.
- Email format validation is not implemented during the update operation.
- No critical issues were observed apart from email validation.