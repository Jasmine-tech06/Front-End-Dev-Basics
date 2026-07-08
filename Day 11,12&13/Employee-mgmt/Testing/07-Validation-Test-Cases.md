# 🧪 Validation Test Cases

## Module Name
Form Validation

## Objective
To verify that the Employee Management System validates user inputs correctly before performing Add and Update operations.

## Preconditions
- The application is running.
- User is on the Add Employee or Update Employee form.
- MockAPI is available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_V_001 | Verify mandatory Name field | 1. Leave the Name field empty.<br>2. Click **Save**. | Name: Empty | Validation message should be displayed. | Validation message displayed successfully. | ✅ Pass |
| TC_V_002 | Verify mandatory Department field | 1. Leave the Department field empty.<br>2. Click **Save**. | Department: Empty | Validation message should be displayed. | Validation message displayed successfully. | ✅ Pass |
| TC_V_003 | Verify mandatory Email field | 1. Leave the Email field empty.<br>2. Click **Save**. | Email: Empty | Validation message should be displayed. | Validation message displayed successfully. | ✅ Pass |
| TC_V_004 | Verify submission with all fields empty | 1. Leave all fields blank.<br>2. Click **Save**. | Empty Form | Employee record should not be added. | Form submission prevented successfully. | ✅ Pass |
| TC_V_005 | Verify email format validation | 1. Enter an invalid email.<br>2. Click **Save**. | jasminegmail.com | Invalid email should be rejected. | Invalid email accepted and employee record added. | ❌ Fail |
| TC_V_006 | Verify spaces-only input | 1. Enter only spaces in all fields.<br>2. Click **Save**. | "   " | Spaces-only input should not be accepted. | Spaces-only input accepted as valid data. | ❌ Fail |
| TC_V_007 | Verify numeric input in Name field | 1. Enter only numbers in the Name field.<br>2. Click **Save**. | 123456 | Name field should reject numeric-only input. | Numeric values accepted in the Name field. | ❌ Fail |
| TC_V_008 | Verify special characters in Name field | 1. Enter special characters in the Name field.<br>2. Click **Save**. | @#$%^ | Invalid characters should be rejected. | Special characters accepted without validation. | ❌ Fail |
| TC_V_009 | Verify long input values | 1. Enter more than 100 characters in all fields.<br>2. Click **Save**. | 150-character text | Application should handle long input without crashing. | Application handled long input without crashing. | ✅ Pass |
| TC_V_010 | Verify duplicate employee details | 1. Enter details of an existing employee.<br>2. Click **Save**. | Existing employee details | Duplicate employee should not be added. | Duplicate employee added successfully. | ❌ Fail |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 10 |
| Passed | 5 |
| Failed | 5 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Mandatory field validation works correctly.
- Invalid email format is not validated.
- Spaces-only input is accepted.
- Numeric and special characters are accepted in the Name field.
- Duplicate employee records are allowed.
- Additional input validation can improve data quality and user experience.