package com.employee.automation.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.ElementClickInterceptedException;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

/**
 * Every wait in the framework goes through this class. No Thread.sleep()
 * is used anywhere in the project.
 *
 * click()/type() are hardened against the two most common flaky-UI
 * exceptions in an animated (framer-motion) React app:
 *  - StaleElementReferenceException: the element is re-located and retried
 *    a few times instead of failing immediately.
 *  - ElementClickInterceptedException: the element is scrolled into view
 *    first; if a normal click is still intercepted (e.g. by an overlapping
 *    hover/glow layer mid-animation), a JavaScript click is used as a
 *    fallback - never as the first choice.
 */
public class WaitUtils {

    private static final int MAX_RETRY_ATTEMPTS = 3;

    private final WebDriver driver;
    private final WebDriverWait wait;

    public WaitUtils(WebDriver driver) {
        this.driver = driver;
        this.wait = new WebDriverWait(driver, Duration.ofSeconds(ConfigReader.timeoutSeconds()));
    }

    public WebElement waitForVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfElementLocated(locator));
    }

    public WebElement waitForClickable(By locator) {
        return wait.until(ExpectedConditions.elementToBeClickable(locator));
    }

    public List<WebElement> waitForAllVisible(By locator) {
        return wait.until(ExpectedConditions.visibilityOfAllElementsLocatedBy(locator));
    }

    public boolean waitForUrlContains(String fragment) {
        return wait.until(ExpectedConditions.urlContains(fragment));
    }

    public boolean waitForInvisibility(By locator) {
        return wait.until(ExpectedConditions.invisibilityOfElementLocated(locator));
    }

    /**
     * Scrolls the element to the center of the viewport before any click
     * attempt, per the framework's Selenium requirements.
     */
    private void scrollIntoView(WebElement element) {
        ((JavascriptExecutor) driver).executeScript(
                "arguments[0].scrollIntoView({block: 'center', inline: 'center'});", element);
    }

    private void jsClick(WebElement element) {
        ((JavascriptExecutor) driver).executeScript("arguments[0].click();", element);
    }

    /**
     * Waits for the element to be clickable, scrolls it into view, then
     * clicks it. Retries on StaleElementReferenceException (re-locating the
     * element from the By each time) and falls back to a JavaScript click
     * only if the normal Selenium click is intercepted.
     */
    public void click(By locator) {
        StaleElementReferenceException lastStale = null;

        for (int attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
            try {
                WebElement element = waitForClickable(locator);
                scrollIntoView(element);

                try {
                    element.click();
                } catch (ElementClickInterceptedException intercepted) {
                    // Normal click was blocked (e.g. an overlapping
                    // animated layer) - fall back to a JS click only now.
                    jsClick(element);
                }
                return;
            } catch (StaleElementReferenceException stale) {
                // The element was detached/re-rendered between locating it
                // and clicking it (common with framer-motion re-renders).
                // Re-locate and retry rather than failing immediately.
                lastStale = stale;
            }
        }

        throw lastStale;
    }

    /**
     * Clears and types into the element. Retries once on
     * StaleElementReferenceException, and scrolls the element into view
     * first, mirroring click()'s robustness.
     */
    public void type(By locator, String text) {
        StaleElementReferenceException lastStale = null;

        for (int attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt++) {
            try {
                WebElement element = waitForVisible(locator);
                scrollIntoView(element);
                element.clear();
                element.sendKeys(text);
                return;
            } catch (StaleElementReferenceException stale) {
                lastStale = stale;
            }
        }

        throw lastStale;
    }

    public String getText(By locator) {
        return waitForVisible(locator).getText();
    }

    /**
     * Non-throwing visibility check - used for "mandatory" UI assertions
     * where we want a clean boolean/assert rather than an exception.
     * Genuinely waits (does not short-circuit) so it also covers elements
     * that only appear after a navigation/transition triggered just before
     * this call (e.g. right after a login submit or a sidebar click), or
     * after an async API call + list refresh completes.
     */
    public boolean isDisplayed(By locator) {
        try {
            return wait.until(ExpectedConditions.visibilityOfElementLocated(locator)) != null;
        } catch (Exception e) {
            return false;
        }
    }

    public boolean isDisplayedNoWait(By locator) {
        List<WebElement> elements = driver.findElements(locator);
        return !elements.isEmpty() && elements.get(0).isDisplayed();
    }

    /**
     * Waits for the browser's document.readyState to reach "complete".
     * Useful right after a navigation/route change before interacting
     * with the new page.
     */
    public void waitForPageLoad() {
        wait.until(webDriver -> "complete".equals(
                ((JavascriptExecutor) webDriver).executeScript("return document.readyState")));
    }

    /**
     * Waits for a loader/spinner locator to disappear. Safe no-op (does
     * not fail the test) if the loader never appears at all, since not
     * every action in this app shows one (e.g. Add Employee has none, only
     * the Login submit does).
     */
    public void waitForLoaderToDisappear(By loaderLocator) {
        try {
            wait.until(ExpectedConditions.invisibilityOfElementLocated(loaderLocator));
        } catch (Exception ignored) {
            // No loader appeared for this action - nothing to wait out.
        }
    }

    /**
     * Best-effort wait for a react-hot-toast message to appear, used as an
     * "API completion" signal: the app only calls toast.success(...)
     * after its Mock API request (and, for Add/Update/Delete Employee,
     * the subsequent list re-fetch) has resolved (see App.jsx). Returns
     * false rather than throwing if the toast isn't found in time, since
     * toasts are transient (react-hot-toast auto-dismisses them) and this
     * is meant as a supporting signal, not the sole proof of success.
     */
    public boolean waitForToastMessage(String messageText, int timeoutSeconds) {
        try {
            By toastLocator = By.xpath("//*[contains(text(),'" + messageText + "')]");
            new WebDriverWait(driver, Duration.ofSeconds(timeoutSeconds))
                    .until(ExpectedConditions.visibilityOfElementLocated(toastLocator));
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
