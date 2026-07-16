# 🧪 Settings Page Test Cases

## Module Name
Settings Page (SettingsPage)

## Objective
To verify that the Settings page loads correctly, allows users to save and cancel changes, validates input values, supports resetting settings, and maintains a consistent user experience.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- User has permission to access the Settings page.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_SETTINGS_001 | Verify Settings page loads | 1. Login to the application.<br>2. Navigate to the Settings page. | Logged-in user | Settings page should load successfully. | Settings page loaded successfully. | ✅ Pass |
| TC_SETTINGS_002 | Verify settings display | 1. Open the Settings page.<br>2. Verify all available settings. | Existing settings | All settings should be displayed correctly with appropriate controls. | Settings displayed correctly. | ✅ Pass |
| TC_SETTINGS_003 | Verify Save Settings functionality | 1. Modify one or more settings.<br>2. Click **Save**. | Valid settings | Changes should be saved successfully and a confirmation message should appear. | Settings saved successfully. | ✅ Pass |
| TC_SETTINGS_004 | Verify Cancel functionality | 1. Modify settings.<br>2. Click **Cancel**. | Modified settings | Unsaved changes should be discarded and previous values should remain. | Changes discarded successfully. | ✅ Pass |
| TC_SETTINGS_005 | Verify Reset functionality | 1. Modify settings.<br>2. Click **Reset**. | Modified settings | Settings should revert to default values after confirmation. | Settings reset successfully. | ✅ Pass |
| TC_SETTINGS_006 | Verify page responsiveness | 1. Resize the browser window.<br>2. Test on desktop, tablet, and mobile devices. | Various screen sizes | Settings page should remain responsive and usable. | Responsive layout displayed correctly. | ✅ Pass |
| TC_SETTINGS_007 | Verify invalid input values | 1. Enter invalid values into editable fields.<br>2. Click **Save**. | Invalid settings values | Validation messages should prevent invalid settings from being saved. | Invalid values were saved without validation. | ❌ Fail |
| TC_SETTINGS_008 | Verify mandatory field validation | 1. Clear required fields.<br>2. Click **Save**. | Empty mandatory fields | Appropriate validation messages should be displayed. | Required fields accepted empty values. | ❌ Fail |
| TC_SETTINGS_009 | Verify settings persistence | 1. Save valid settings.<br>2. Refresh the page or log in again. | Valid settings | Saved settings should persist after refresh or re-login. | Settings persisted successfully. | ✅ Pass |

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

- Settings page loads and displays correctly.
- Save, Cancel, and Reset functionalities work as expected.
- Settings persist after page refresh and re-login.
- Responsive design functions well across devices.
- Input validation and mandatory field validation require improvement.