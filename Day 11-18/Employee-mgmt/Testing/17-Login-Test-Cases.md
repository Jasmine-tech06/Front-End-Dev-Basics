# 🧪 Login Test Cases

## Module Name
Login Functionality

## Objective
To verify that users can log in securely using valid credentials, that invalid login attempts are handled properly, and that authentication behaves as expected.

## Preconditions
- The application is running.
- User is on the Login page.
- Valid Admin and Employee accounts exist.
- Database is connected.

---

## Test Cases

| Test Case ID | Test Scenario | Test Steps | Test Data | Expected Result | Actual Result | Status |
|---------------|---------------|------------|-----------|-----------------|---------------|--------|
| TC_LOGIN_001 | Verify Login page loads successfully | 1. Launch application.<br>2. Open Login page. | N/A | Login page should load successfully. | Login page loaded successfully. | ✅ Pass |
| TC_LOGIN_002 | Verify login with valid credentials | 1. Enter valid username.<br>2. Enter valid password.<br>3. Click Login. | Valid credentials | User should be redirected to Dashboard. | Login successful. | ✅ Pass |
| TC_LOGIN_003 | Verify login with invalid credentials | 1. Enter invalid username/password.<br>2. Click Login. | Invalid credentials | Error message should be displayed. | Error displayed correctly. | ✅ Pass |
| TC_LOGIN_004 | Verify login with empty fields | 1. Leave username and password blank.<br>2. Click Login. | Empty fields | Validation message should appear. | Validation displayed successfully. | ✅ Pass |
| TC_LOGIN_005 | Verify login with incorrect password | 1. Enter valid username.<br>2. Enter wrong password.<br>3. Click Login. | Wrong password | Login should fail with error message. | Login rejected correctly. | ✅ Pass |
| TC_LOGIN_006 | Verify login with incorrect username | 1. Enter invalid username.<br>2. Enter valid password.<br>3. Click Login. | Wrong username | Login should fail. | Authentication failed correctly. | ✅ Pass |
| TC_LOGIN_007 | Verify SQL Injection protection | 1. Enter SQL injection string.<br>2. Click Login. | ' OR '1'='1 | Login should be prevented. | Application accepted malicious input. | ❌ Fail |
| TC_LOGIN_008 | Verify XSS input handling | 1. Enter script tag in username.<br>2. Click Login. | `<script>alert()</script>` | Script should not execute. | Script executed unexpectedly. | ❌ Fail |
| TC_LOGIN_009 | Verify password masking | 1. Type password. | Password | Password should be hidden with dots/asterisks. | Password masked correctly. | ✅ Pass |
| TC_LOGIN_010 | Verify Enter key login | 1. Enter credentials.<br>2. Press Enter. | Valid credentials | Login should be performed successfully. | Enter key triggered login. | ✅ Pass |
| TC_LOGIN_011 | Verify session creation after login | 1. Login successfully.<br>2. Refresh page. | Valid credentials | User session should remain active. | Session created successfully. | ✅ Pass |

---

## Test Summary

| Item | Count |
|------|------:|
| Total Test Cases | 11 |
| Passed | 9 |
| Failed | 2 |

**Overall Status:** ⚠️ Partially Passed

---

## Remarks

- Login works correctly with valid credentials.
- Validation messages appear correctly.
- Password masking works properly.
- SQL Injection and XSS protection require improvement.
- Session creation functions as expected.