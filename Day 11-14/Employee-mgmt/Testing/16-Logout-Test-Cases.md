# 🧪 Logout Test Cases

## Module Name
Logout Functionality

## Objective
To verify that users can log out securely using the Logout button, that the confirmation modal works correctly, and that the application redirects users appropriately after logout.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- User is on the Dashboard.
- Logout button is visible.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_LOGOUT_001 | Verify Logout button visibility | 1. Open Dashboard.<br>2. Observe the Logout button. | Logged-in user | Logout button should be visible and enabled. | Logout button displayed correctly. | ✅ Pass |
| TC_LOGOUT_002 | Verify Logout Confirmation Modal | 1. Click the Logout button. | Logged-in user | Confirmation popup should appear. | Confirmation popup displayed successfully. | ✅ Pass |
| TC_LOGOUT_003 | Verify confirmation message | 1. Observe the confirmation dialog. | N/A | Confirmation message should clearly ask the user to confirm logout. | Confirmation message displayed correctly. | ✅ Pass |
| TC_LOGOUT_004 | Verify logout after confirmation | 1. Click Logout button.<br>2. Click **Confirm** in the popup. | Logged-in user | User should be logged out and redirected to the Login page. | User logged out successfully and redirected to Login page. | ✅ Pass |
| TC_LOGOUT_005 | Verify Cancel button functionality | 1. Click Logout button.<br>2. Click **Cancel**. | Logged-in user | Logout should be cancelled and user should remain on the Dashboard. | Logout cancelled successfully. | ✅ Pass |
| TC_LOGOUT_006 | Verify session after logout | 1. Logout successfully.<br>2. Press browser Back button. | Logged-out user | User should not be able to access the Dashboard without logging in again. | Dashboard access prevented successfully. | ✅ Pass |
| TC_LOGOUT_007 | Verify multiple Logout button clicks | 1. Click Logout button multiple times rapidly. | Logged-in user | Only one confirmation popup should appear. | Multiple popups appeared due to repeated clicks. | ❌ Fail |
| TC_LOGOUT_008 | Verify logout without active session | 1. Expire user session.<br>2. Click Logout button. | Expired session | Application should redirect safely to Login page without errors. | Error message displayed instead of redirecting properly. | ❌ Fail |

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

- Logout functionality works correctly after user confirmation.
- Confirmation popup appears as expected.
- Cancel option prevents accidental logout.
- User session is cleared successfully after logout.
- Multiple-click handling and expired session handling can be improved.