# 🧪 Not Found Page Test Cases

## Module Name
Not Found Page (NotFound)

## Objective
To verify that the Not Found (404) page is displayed correctly for invalid URLs, provides appropriate navigation back to the application, maintains a user-friendly interface, and is responsive across different devices.

## Preconditions
- The application is running.
- User has access to the application.
- Routing is configured.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_NOTFOUND_001 | Verify 404 page for invalid URL | 1. Launch the application.<br>2. Enter an invalid URL in the browser. | Invalid URL | The Not Found (404) page should be displayed. | 404 page displayed successfully. | ✅ Pass |
| TC_NOTFOUND_002 | Verify error message | 1. Open an invalid URL.<br>2. Observe the page message. | Invalid URL | A clear message indicating "Page Not Found" should be displayed. | Error message displayed correctly. | ✅ Pass |
| TC_NOTFOUND_003 | Verify Return Home button visibility | 1. Open the 404 page.<br>2. Observe the Return Home button. | N/A | Return Home button should be visible and enabled. | Button displayed correctly. | ✅ Pass |
| TC_NOTFOUND_004 | Verify Return Home navigation | 1. Click the Return Home button. | N/A | User should be redirected to the Home/Dashboard page. | Navigation worked correctly. | ✅ Pass |
| TC_NOTFOUND_005 | Verify page UI | 1. Observe fonts, icons, spacing, and layout. | N/A | UI should be visually appealing and consistent with the application theme. | UI displayed correctly. | ✅ Pass |
| TC_NOTFOUND_006 | Verify page responsiveness | 1. Resize the browser window.<br>2. Test on mobile and tablet views. | Different screen sizes | The 404 page should remain responsive without layout issues. | Responsive layout displayed correctly. | ✅ Pass |
| TC_NOTFOUND_007 | Verify browser Back button behavior | 1. Navigate to the 404 page.<br>2. Press the browser Back button. | Browser navigation | User should return to the previous valid page. | Browser remained on the 404 page unexpectedly. | ❌ Fail |
| TC_NOTFOUND_008 | Verify handling of malformed URLs | 1. Enter a malformed or unsupported URL. | Malformed URL | Application should display the Not Found page without crashing. | Application crashed due to malformed URL. | ❌ Fail |
| TC_NOTFOUND_009 | Verify page refresh | 1. Refresh the 404 page. | Invalid URL | The Not Found page should reload correctly without errors. | 404 page refreshed successfully. | ✅ Pass |

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

- The Not Found page is displayed correctly for invalid URLs.
- Return Home navigation works as expected.
- The page is responsive and maintains a consistent UI.
- Browser Back button handling and malformed URL handling require improvement.