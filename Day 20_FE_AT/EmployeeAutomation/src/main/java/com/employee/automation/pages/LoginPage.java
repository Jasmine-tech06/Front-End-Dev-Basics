package com.employee.automation.pages;

import com.employee.automation.utils.WaitUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

/**
 * Maps to src/pages/Login.jsx (route "/login").
 *
 * Notes from the real component:
 *  - role state = useState(preselectedRole || "admin"). So when arriving
 *    WITHOUT a preselected role (e.g. straight navigation to "/login"),
 *    role silently defaults to "admin" until a role button is clicked.
 *  - When arriving WITH a preselected role (from RoleSelect's navigate
 *    state), only ONE decorative role button is shown and role is already
 *    correctly set - no click is required or even wired to an onClick
 *    handler in that branch.
 *  - The back button navigates to "/select-role" if a role was
 *    preselected, otherwise to "/" (Welcome) - see clickBackHome()/
 *    clickChangeRole() below.
 *  - Email/password inputs have no name/id/data-testid, only type
 *    attributes, so those are the most stable locators available.
 */
public class LoginPage {

    private final WebDriver driver;
    private final WaitUtils wait;

    private final By loginCard = By.cssSelector(".login-card");
    private final By emailInput = By.cssSelector(".login-form input[type='email']");
    private final By passwordInput = By.cssSelector(".login-form input[type='password']");
    private final By rememberMeCheckbox = By.cssSelector(".remember-me input[type='checkbox']");
    private final By submitBtn = By.cssSelector(".login-submit-btn");
    private final By roleBtnAdmin = By.xpath("//div[@class='role-selector']//button[contains(.,'Admin')]");
    private final By roleBtnEmployee = By.xpath("//div[@class='role-selector']//button[contains(.,'Employee')]");
    private final By backBtn = By.xpath("//div[contains(@class,'login-card')]//button[contains(.,'Home') or contains(.,'Change Role')]");

    public LoginPage(WebDriver driver) {
        this.driver = driver;
        this.wait = new WaitUtils(driver);
    }

    public boolean isLoginPageDisplayed() {
        return wait.isDisplayed(loginCard);
    }

    public boolean isEmailInputDisplayed() {
        return wait.isDisplayed(emailInput);
    }

    public boolean isPasswordInputDisplayed() {
        return wait.isDisplayed(passwordInput);
    }

    /**
     * Selects the Admin role. Uses an explicit wait+click (no "check then
     * maybe click" race) so it works whether the button is the clickable
     * toggle (no preselection) or the decorative preselected label.
     */
    public LoginPage chooseAdminRole() {
        wait.click(roleBtnAdmin);
        return this;
    }

    /**
     * Selects the Employee role the same way - explicit wait+click,
     * never a no-wait existence check that can race the page transition.
     */
    public LoginPage chooseEmployeeRole() {
        wait.click(roleBtnEmployee);
        return this;
    }

    public LoginPage enterEmail(String email) {
        wait.type(emailInput, email);
        return this;
    }

    public LoginPage enterPassword(String password) {
        wait.type(passwordInput, password);
        return this;
    }

    public String getSubmitButtonText() {
        return wait.getText(submitBtn);
    }

    /**
     * Clicks the back button (top-left of the login card) and waits for
     * the Welcome page to render. Only valid when no role was preselected,
     * i.e. the button reads "Home" and navigates to "/". Use
     * clickChangeRole() instead when the button reads "Change Role".
     */
    public WelcomePage clickBackHome() {
        wait.click(backBtn);
        WelcomePage welcomePage = new WelcomePage(driver);
        welcomePage.isWelcomeCardDisplayed();
        return welcomePage;
    }

    /**
     * Clicks the back button when it reads "Change Role" (role was
     * preselected via RoleSelect), landing back on Role Selection.
     */
    public RoleSelectionPage clickChangeRole() {
        wait.click(backBtn);
        return new RoleSelectionPage(driver);
    }

    /**
     * Submits the login form and waits for the app to route to /dashboard.
     * Login.jsx uses a setTimeout(..., 800) before navigating on success,
     * so we wait on the URL rather than a fixed sleep.
     */
    public AdminDashboardPage submitAndExpectDashboard() {
        wait.click(submitBtn);
        wait.waitForUrlContains("/dashboard");
        return new AdminDashboardPage(driver);
    }

    public void submit() {
        wait.click(submitBtn);
    }

    public void login(String email, String password) {
        enterEmail(email);
        enterPassword(password);
        submit();
    }
}
