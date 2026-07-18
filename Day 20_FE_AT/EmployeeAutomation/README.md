# EmployeeAutomation

Selenium + TestNG + Maven automation framework for the **DecorNest Employee
Management System** React app (`Employee-mgmt`). Built strictly from the
actual React source (routes, class names, `name` attributes, button text) -
no invented locators.

## 1. Prerequisites

- Java 17+
- Maven 3.8+
- Google Chrome installed (default browser; Firefox/Edge also supported)
- The React app running locally:

  ```bash
  cd Employee-mgmt
  npm install
  npm run dev
  ```

  This starts the app at `http://localhost:5173` (Vite default), which
  matches `baseUrl` in `src/test/resources/config.properties`. If your app
  runs on a different port, update `baseUrl` there.

## 2. Run

```bash
cd EmployeeAutomation
mvn clean test
```

That's it - no other setup, no code edits required. WebDriverManager
downloads the matching ChromeDriver automatically the first time you run it
(needs internet access once).

## 3. What happens when you run it

One Chrome window opens and stays open for the entire suite - it is never
closed and reopened between tests. The 15 test classes run in this fixed
order (`testng.xml`, `preserve-order="true"`):

```
Browser Open
  -> Welcome Page                         (T01_WelcomeTest)
  -> Role Selection                       (T02_RoleSelectionTest)
  -> Admin Login                          (T03_AdminLoginTest)
  -> Admin Dashboard                      (T04_AdminDashboardTest)
  -> Admin Employees + Add Employee       (T05_AdminEmployeeManagementTest)
  -> Admin Search                         (T06_AdminSearchTest)
  -> Admin Departments/Attendance/Reports/Analytics (T07_AdminAnalyticsTest)
  -> Admin Profile + Settings             (T08_AdminProfileTest)
  -> Admin Logout -> Welcome Page          (T09_AdminLogoutTest)
  -> Employee Role + Employee Login        (T10_EmployeeLoginTest)
  -> Employee Dashboard                   (T11_EmployeeDashboardTest)
  -> Employee Profile                     (T12_EmployeeProfileTest)
  -> Employee Attendance/Leaves/Department/Salary/Settings (T13_EmployeeBasicFeaturesTest)
  -> Employee Logout -> Welcome Page       (T14_EmployeeLogoutTest)
  -> Final sanity check (rests on Welcome) (T15_EndToEndFlowTest)
Browser Close
```

`DriverFactory` hands out one static `WebDriver` for the whole JVM run;
`BaseTest`'s `@AfterSuite` closes it exactly once at the very end.

## 4. How the Employee login is handled (important)

The app validates admin login against a hardcoded check in `Login.jsx`.
Employee login, however, is validated against **real records fetched from
the live mockapi backend** - there's no fixed "test employee" account to
hardcode.

Rather than inventing one, the framework uses the app's own logic:

1. `T05_AdminEmployeeManagementTest` adds a brand-new employee through the
   real **Add Employee** form, with a unique, timestamped email
   (`TestDataUtils.newAutomationEmployee()`).
2. The Add Employee form has no password field, so `Login.jsx`'s own
   fallback applies: `const expectedPassword = employee.password || "password"`.
3. `T09_AdminLogoutTest` logs out and returns to the Welcome page via the
   Login page's **Home** button; `T10_EmployeeLoginTest` continues with
   **Get Started** -> Role Selection -> **Employee** -> Login,
   then logs in with that same email and password `"password"` - the
   app's real default, not a fabricated credential.

Routing back through Welcome and Role Selection (instead of toggling the
role in place on the Login page) is deliberate: `Login.jsx`'s `role` state
is `useState(preselectedRole || "admin")`, so on a bare `/login` visit it
silently defaults to `"admin"` until a role button is clicked. Selecting
the role via Role Selection's router state sets `role` correctly the
instant the Login page mounts, with nothing to click or race against.

If you'd rather log in as a specific, already-existing employee from your
mockapi data, fill in `employee.username` / `employee.password` in
`src/test/resources/config.properties` and the framework will use those
instead.

## 5. Project structure

```
EmployeeAutomation/
├── pom.xml
├── testng.xml
├── src/main/java/com/employee/automation/
│   ├── base/          DriverFactory, BaseTest
│   ├── utils/         ConfigReader, WaitUtils, ScreenshotUtils, ExtentManager,
│   │                  Constants, TestDataUtils, SuiteState
│   ├── listeners/      TestListener (screenshot-on-failure, console logs, Extent hook)
│   └── pages/          WelcomePage, RoleSelectionPage, LoginPage,
│                        DashboardShellPage (shared sidebar/navbar/logout/profile),
│                        AdminDashboardPage, EmployeeDashboardPage,
│                        EmployeeManagementPage, ProfilePage, SettingsPage
└── src/test/
    ├── java/com/employee/automation/tests/   T01…T15 (see above)
    └── resources/config.properties
```

`DashboardShellPage` is a shared base class for the sidebar/navbar/logout
modal/profile modal, since `Sidebar.jsx` and `Navbar.jsx` render for both
roles - `AdminDashboardPage` and `EmployeeDashboardPage` extend it. This is
plain Page Object Model composition to avoid duplicating locators, not an
invented page; every locator inside it still maps to a real element in
`Sidebar.jsx` / `Navbar.jsx` / `LogoutModal.jsx` / `ProfileModal.jsx`.

Note: class names in `src/test/java` are prefixed with `T` (`T01_...`
instead of `01_...`) because Java class names cannot start with a digit.

## 6. Reports & screenshots

- **Surefire/TestNG report**: `target/surefire-reports/`, `test-output/`
- **ExtentReport**: `test-output/ExtentReport.html`
- **Failure screenshots**: `screenshots/` (auto-captured by `TestListener`)

## 7. Configuration

All environment values live in `src/test/resources/config.properties` -
nothing is hardcoded in test or page code:

| Key | Meaning |
|---|---|
| `baseUrl` | React app URL |
| `browser` | `chrome` \| `firefox` \| `edge` |
| `headless` | `true`/`false` |
| `timeout` | explicit wait timeout, seconds |
| `admin.username` / `admin.password` | real hardcoded admin credentials from `Login.jsx` |
| `employee.username` / `employee.password` | optional - overrides the auto-created employee login (see section 4) |
