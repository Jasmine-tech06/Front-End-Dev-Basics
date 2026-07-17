# 🧪 Navbar Test Cases

## Module Name
Navigation Bar (Navbar)

## Objective
To verify that the Navbar displays correctly, provides proper navigation, highlights the active page, and functions correctly across different screen sizes.

## Preconditions
- The application is running.
- User is logged into the Employee Management System.
- Navbar is visible on the current page.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_NAVBAR_001 | Verify Navbar loads successfully | 1. Login to the application.<br>2. Observe the Navbar. | Logged-in user | Navbar should be displayed without errors. | Navbar displayed successfully. | ✅ Pass |
| TC_NAVBAR_002 | Verify company logo visibility | 1. Open any page.<br>2. Observe the logo. | N/A | Logo should be visible and properly aligned. | Logo displayed correctly. | ✅ Pass |
| TC_NAVBAR_003 | Verify navigation links | 1. Click each navigation link one by one. | Dashboard, Employees, Departments, Reports, etc. | User should be redirected to the correct page. | Navigation worked correctly. | ✅ Pass |
| TC_NAVBAR_004 | Verify active menu highlighting | 1. Open different pages.<br>2. Observe the active menu item. | N/A | Current page menu should be highlighted. | Active menu highlighted correctly. | ✅ Pass |
| TC_NAVBAR_005 | Verify responsive Navbar | 1. Resize browser window.<br>2. Test on mobile/tablet view. | Various screen sizes | Navbar should adjust properly without UI issues. | Responsive layout displayed correctly. | ✅ Pass |
| TC_NAVBAR_006 | Verify Navbar buttons | 1. Click all action buttons (Profile, Logout, Notifications, etc.). | Logged-in user | Buttons should perform their intended actions. | Buttons functioned correctly. | ✅ Pass |
| TC_NAVBAR_007 | Verify broken navigation links | 1. Click every Navbar link.<br>2. Check for navigation errors. | N/A | All links should open valid pages. | One navigation link opened a blank page. | ❌ Fail |
| TC_NAVBAR_008 | Verify Navbar after page refresh | 1. Refresh the browser.<br>2. Observe the Navbar. | Logged-in user | Navbar should remain visible and functional. | Navbar loaded correctly after refresh. | ✅ Pass |
| TC_NAVBAR_009 | Verify keyboard accessibility | 1. Navigate using the Tab key.<br>2. Press Enter on menu items. | Keyboard | Navbar should support keyboard navigation. | Some menu items were skipped during navigation. | ❌ Fail |

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

- Navbar loads and displays correctly.
- Navigation links function as expected.
- Active menu highlighting works properly.
- Responsive design performs well on different screen sizes.
- Broken link validation and keyboard accessibility require improvement.