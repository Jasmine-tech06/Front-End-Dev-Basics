# 🧪 Profile Test Cases

## Module Name
Employee Profile (EmployeeProfile & ProfileModal)

## Objective
To verify that the Employee Profile page and Profile Modal display accurate employee information, handle profile images correctly, and function properly under various scenarios.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Employee profile data exists in the database.
- Profile icon/button is visible.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_PROFILE_001 | Verify Profile page loads successfully | 1. Login to the application.<br>2. Navigate to the Profile page. | Logged-in user | Profile page should load without errors. | Profile page loaded successfully. | ✅ Pass |
| TC_PROFILE_002 | Verify opening the Profile Modal | 1. Click the Profile icon/button. | Logged-in user | Profile modal should open successfully. | Profile modal opened correctly. | ✅ Pass |
| TC_PROFILE_003 | Verify closing the Profile Modal | 1. Open the Profile modal.<br>2. Click the Close (X) button or outside the modal. | Logged-in user | Profile modal should close successfully. | Profile modal closed correctly. | ✅ Pass |
| TC_PROFILE_004 | Verify employee profile details | 1. Open the Profile modal.<br>2. Verify employee information. | Employee details | Name, Employee ID, Email, Role, Department, and other details should be displayed correctly. | Employee details displayed correctly. | ✅ Pass |
| TC_PROFILE_005 | Verify profile image display | 1. Open the Profile modal.<br>2. Observe the profile image. | Valid profile image | Employee profile image should load correctly. | Profile image displayed successfully. | ✅ Pass |
| TC_PROFILE_006 | Verify department information | 1. Open the Profile modal.<br>2. Verify department field. | Valid department | Correct department should be displayed. | Department displayed correctly. | ✅ Pass |
| TC_PROFILE_007 | Verify behavior with missing profile image | 1. Open profile for an employee without an image. | No profile image | Default avatar/image should be displayed. | Broken image icon displayed instead of default avatar. | ❌ Fail |
| TC_PROFILE_008 | Verify handling of invalid profile data | 1. Load profile with incomplete or invalid employee data. | Invalid employee data | Application should display placeholders or validation without crashing. | Profile page crashed due to invalid data. | ❌ Fail |
| TC_PROFILE_009 | Verify responsive Profile Modal | 1. Open Profile modal.<br>2. Resize the browser window. | Different screen sizes | Profile modal should remain responsive and readable. | Modal displayed correctly on all screen sizes. | ✅ Pass |

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

- Employee profile loads successfully.
- Profile modal opens and closes correctly.
- Employee details, profile image, and department information are displayed accurately.
- Responsive design works well across different devices.
- Default image handling and invalid profile data validation require improvement.