# 🧪 Search Employee Test Cases

## Module Name
Search Employee

## Objective
To verify that the search functionality correctly filters employee records based on the entered keyword.

## Preconditions
- The application is running.
- User is on the Dashboard.
- Employee records are available.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_S_001 | Search employee by valid name | 1. Enter an existing employee name in the search box. | Jasmine | Matching employee record should be displayed. | Matching employee record displayed successfully. | ✅ Pass |
| TC_S_002 | Search using partial employee name | 1. Enter part of an employee name. | Jas | Matching employee(s) should be displayed. | Partial search returned matching employee records. | ✅ Pass |
| TC_S_003 | Search with different letter case | 1. Enter employee name using uppercase/lowercase letters. | JASMINE | Search should return matching employee regardless of case. | Search returned matching employee successfully. | ✅ Pass |
| TC_S_004 | Search non-existing employee | 1. Enter a name that does not exist. | Rahul | "No Employees Found" message should be displayed. | Employee list became empty without displaying an informative message. | ❌ Fail |
| TC_S_005 | Search with empty input | 1. Leave the search box empty. | Empty | All employee records should be displayed. | Complete employee list displayed successfully. | ✅ Pass |
| TC_S_006 | Clear search text | 1. Search an employee.<br>2. Remove the search text. | NA | Complete employee list should be displayed again. | Employee list restored successfully. | ✅ Pass |
| TC_S_007 | Search using special characters | 1. Enter special characters in the search box. | @#$% | Application should handle input without crashing. | Application remained stable and no matching records were displayed. | ✅ Pass |
| TC_S_008 | Search with leading/trailing spaces | 1. Enter spaces before and after employee name. | " Jasmine " | Spaces should be ignored and matching record displayed. | Search failed to ignore extra spaces. | ❌ Fail |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 8 |
| Passed | 6 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Search functionality works correctly for valid employee names.
- Partial search and case-insensitive search work as expected.
- Empty search restores the complete employee list.
- Search handling for extra spaces can be improved.
- User-friendly "No Employees Found" message should be displayed when there are no matching records.