# 🧪 Welcome Page Test Cases

## Module Name
Welcome Page

## Objective
To verify that the Welcome Page loads correctly and allows users to navigate to the Dashboard.

## Preconditions
- The application is installed and running.
- User launches the application.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_W_001 | Verify application launch | 1. Launch the application. | NA | Welcome Page should load successfully. | Welcome Page loaded successfully. | ✅ Pass |
| TC_W_002 | Verify page title | 1. Observe the page title. | NA | Correct page title should be displayed. | Page title displayed correctly. | ✅ Pass |
| TC_W_003 | Verify welcome message | 1. Check the welcome heading and description. | NA | Welcome message should be displayed correctly. | Welcome message displayed correctly. | ✅ Pass |
| TC_W_004 | Verify logo visibility | 1. Observe the application logo. | NA | Logo should be displayed properly. | Logo displayed without issues. | ✅ Pass |
| TC_W_005 | Verify Get Started button visibility | 1. Observe the Get Started button. | NA | Button should be visible and enabled. | Button displayed and enabled. | ✅ Pass |
| TC_W_006 | Verify navigation to Dashboard | 1. Click **Get Started**. | NA | Dashboard should open successfully. | Dashboard opened successfully. | ✅ Pass |
| TC_W_007 | Verify page responsiveness | 1. Resize the browser window. | NA | Layout should remain responsive. | Minor alignment issue observed on smaller screen sizes. | ❌ Fail |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 7 |
| Passed | 6 |
| Failed | 1 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Welcome Page loads successfully.
- Navigation to Dashboard works correctly.
- UI is responsive on most screen sizes.
- Minor responsiveness issue observed on smaller screens.