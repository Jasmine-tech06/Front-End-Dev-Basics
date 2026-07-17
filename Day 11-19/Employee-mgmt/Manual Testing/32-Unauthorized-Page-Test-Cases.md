# 🧪 Unauthorized Page Test Cases

## Module Name
Unauthorized Page (Unauthorized)

## Objective
To verify that unauthorized users are prevented from accessing restricted pages, appropriate messages are displayed, users are redirected correctly, and navigation behaves as expected.

## Preconditions
- The application is running.
- Protected routes are configured.
- At least one restricted page exists (e.g., Admin Dashboard).
- User is either not logged in or does not have the required permissions.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_UNAUTH_001 | Verify unauthorized page is displayed | 1. Attempt to access a protected page without permission. | Unauthorized user | Unauthorized page should be displayed. | Unauthorized page displayed successfully. | ✅ Pass |
| TC_UNAUTH_002 | Verify unauthorized access message | 1. Open the Unauthorized page.<br>2. Observe the displayed message. | N/A | A clear message indicating access is denied should be displayed. | Access denied message displayed correctly. | ✅ Pass |
| TC_UNAUTH_003 | Verify redirect to Login page | 1. Attempt to access a protected page while logged out. | Logged-out user | User should be redirected to the Login page or Unauthorized page based on application logic. | User redirected successfully. | ✅ Pass |
| TC_UNAUTH_004 | Verify Admin page access by Employee | 1. Login as an Employee.<br>2. Attempt to access an Admin page. | Employee account | Access should be denied and Unauthorized page should be displayed. | Access denied successfully. | ✅ Pass |
| TC_UNAUTH_005 | Verify Employee page access by Admin (if applicable) | 1. Login as an Admin.<br>2. Access Employee-specific page. | Admin account | Access should follow the application's authorization rules. | Access handled correctly. | ✅ Pass |
| TC_UNAUTH_006 | Verify Back button navigation | 1. Open the Unauthorized page.<br>2. Press the browser Back button. | Browser navigation | User should not gain access to the restricted page. | Restricted page remained inaccessible. | ✅ Pass |
| TC_UNAUTH_007 | Verify direct URL access after logout | 1. Login successfully.<br>2. Logout.<br>3. Enter the Dashboard URL manually. | Logged-out user | User should not access the Dashboard and should be redirected appropriately. | Dashboard became accessible after logout. | ❌ Fail |
| TC_UNAUTH_008 | Verify invalid role authorization | 1. Modify the user role using browser developer tools or an API request.<br>2. Access a protected page. | Invalid role | System should reject the request and deny access. | Access granted despite invalid role. | ❌ Fail |
| TC_UNAUTH_009 | Verify Unauthorized page responsiveness | 1. Open the Unauthorized page.<br>2. Resize the browser window or test on mobile/tablet. | Various screen sizes | Unauthorized page should remain responsive and readable. | Responsive layout displayed correctly. | ✅ Pass |

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

- Unauthorized users are prevented from accessing restricted resources.
- Appropriate access denied messages are displayed.
- Redirection and role-based authorization work correctly in most scenarios.
- Responsive design is consistent across different devices.
- Session invalidation after logout and role tampering protection require improvement.