# 🧪 Role Selection Test Cases

## Module Name
Role Selection Functionality

## Objective
To verify that users can select the appropriate role (Admin or Employee), that navigation works correctly based on the selected role, and that unauthorized or invalid role selections are handled securely.

## Preconditions
- The application is running.
- User is on the Role Selection page.
- Admin and Employee roles are configured in the system.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_ROLE_001 | Verify Role Selection page loads successfully | 1. Launch the application.<br>2. Navigate to the Role Selection page. | N/A | Role Selection page should load without errors. | Page loaded successfully. | ✅ Pass |
| TC_ROLE_002 | Verify Admin role selection | 1. Select **Admin** role.<br>2. Click Continue/Login. | Admin | User should be redirected to the Admin Login/Dashboard. | Admin navigation successful. | ✅ Pass |
| TC_ROLE_003 | Verify Employee role selection | 1. Select **Employee** role.<br>2. Click Continue/Login. | Employee | User should be redirected to the Employee Login/Dashboard. | Employee navigation successful. | ✅ Pass |
| TC_ROLE_004 | Verify navigation after role selection | 1. Select any valid role.<br>2. Proceed to the next page. | Admin/Employee | User should navigate to the correct page based on the selected role. | Navigation worked correctly. | ✅ Pass |
| TC_ROLE_005 | Verify UI elements on Role Selection page | 1. Observe the page layout.<br>2. Verify role cards/buttons and labels. | N/A | UI should display all roles clearly with proper alignment. | UI displayed correctly. | ✅ Pass |
| TC_ROLE_006 | Verify behavior when no role is selected | 1. Leave all roles unselected.<br>2. Click Continue/Login. | No role selected | Validation message should prompt the user to select a role. | Validation displayed successfully. | ✅ Pass |
| TC_ROLE_007 | Verify invalid role selection | 1. Attempt to access an invalid or non-existent role using browser manipulation/API request. | Invalid role | System should reject the request and display an error. | Invalid role accepted unexpectedly. | ❌ Fail |
| TC_ROLE_008 | Verify unauthorized role access | 1. Attempt to access Admin page without Admin authorization. | Unauthorized user | Access should be denied or redirected to the Login page. | Unauthorized access allowed. | ❌ Fail |
| TC_ROLE_009 | Verify role selection persistence | 1. Select a role.<br>2. Navigate back and reopen the page. | Admin/Employee | Previously selected role should be handled appropriately based on application logic. | Role handled correctly. | ✅ Pass |

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

- Admin and Employee role selection work correctly.
- Navigation directs users to the appropriate pages.
- UI is responsive and user-friendly.
- Validation prevents proceeding without selecting a role.
- Invalid role handling and unauthorized access control require improvement.