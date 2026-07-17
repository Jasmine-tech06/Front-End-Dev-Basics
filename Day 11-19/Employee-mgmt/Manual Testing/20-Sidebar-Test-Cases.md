# 🧪 Sidebar Test Cases

## Module Name
Sidebar Navigation

## Objective
To verify that the Sidebar loads correctly, supports expand/collapse functionality, provides accurate navigation, displays icons properly, highlights the active menu, and remains responsive across different screen sizes.

## Preconditions
- The application is running.
- User is successfully logged into the Employee Management System.
- Sidebar is available on the Dashboard.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_SIDEBAR_001 | Verify Sidebar loads successfully | 1. Login to the application.<br>2. Navigate to the Dashboard.<br>3. Observe the Sidebar. | Logged-in user | Sidebar should load successfully with all menu items. | Sidebar loaded correctly. | ✅ Pass |
| TC_SIDEBAR_002 | Verify Sidebar menu items | 1. Observe all Sidebar options. | Dashboard, Employees, Departments, Reports, Settings, etc. | All configured menu items should be displayed correctly. | Menu items displayed correctly. | ✅ Pass |
| TC_SIDEBAR_003 | Verify Sidebar expand functionality | 1. Click the expand button/icon. | N/A | Sidebar should expand and display menu labels. | Sidebar expanded successfully. | ✅ Pass |
| TC_SIDEBAR_004 | Verify Sidebar collapse functionality | 1. Click the collapse button/icon. | N/A | Sidebar should collapse while keeping icons visible. | Sidebar collapsed successfully. | ✅ Pass |
| TC_SIDEBAR_005 | Verify Sidebar navigation | 1. Click each Sidebar menu item. | Dashboard, Employees, Departments, Reports, Settings | User should be redirected to the selected page. | Navigation worked correctly. | ✅ Pass |
| TC_SIDEBAR_006 | Verify Sidebar icons | 1. Observe all menu icons. | N/A | Icons should be displayed correctly without distortion or missing images. | Icons displayed correctly. | ✅ Pass |
| TC_SIDEBAR_007 | Verify active menu highlighting | 1. Navigate to different pages.<br>2. Observe the Sidebar. | N/A | Current page menu should be highlighted. | Active menu highlighted correctly. | ✅ Pass |
| TC_SIDEBAR_008 | Verify Sidebar responsiveness | 1. Resize the browser window.<br>2. Test in tablet/mobile view. | Different screen sizes | Sidebar should adjust properly without overlapping content. | Sidebar overlapped page content on smaller screens. | ❌ Fail |
| TC_SIDEBAR_009 | Verify invalid navigation handling | 1. Click a menu linked to an unavailable page (if applicable). | Invalid route | Application should display an appropriate error page instead of crashing. | Blank page displayed instead of error handling. | ❌ Fail |

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

- Sidebar loads and displays all menu items correctly.
- Expand and collapse functionality works as expected.
- Navigation and active menu highlighting function properly.
- Icons are displayed correctly.
- Responsive behavior and invalid navigation handling require improvement.