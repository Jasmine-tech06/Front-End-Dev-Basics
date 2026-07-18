package com.employee.automation.base;

import com.employee.automation.utils.ConfigReader;
import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.edge.EdgeDriver;
import org.openqa.selenium.edge.EdgeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.time.Duration;

/**
 * Holds ONE static WebDriver instance for the entire TestNG suite run.
 *
 * getDriver() is idempotent: the first caller creates the browser, every
 * subsequent caller (from any of the 15 test classes) just receives the
 * same live session. quitDriver() is likewise idempotent and safe to call
 * more than once, which matters because @AfterSuite hooks declared in a
 * shared base class can be invoked once per subclass by TestNG.
 *
 * Net effect: "mvn clean test" opens exactly one browser window and closes
 * it exactly once, at the very end of the whole run.
 */
public final class DriverFactory {

    private static volatile WebDriver driver;

    private DriverFactory() {
    }

    public static synchronized WebDriver getDriver() {
        if (driver == null) {
            driver = createDriver();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(2));
            driver.manage().window().maximize();
            System.out.println("[DriverFactory] Browser Started");
        }
        return driver;
    }

    public static synchronized void quitDriver() {
        if (driver != null) {
            System.out.println("[DriverFactory] Closing Browser");
            driver.quit();
            driver = null;
        }
    }

    private static WebDriver createDriver() {
        String browser = ConfigReader.browser().toLowerCase();
        boolean headless = ConfigReader.headless();

        switch (browser) {
            case "firefox": {
                WebDriverManager.firefoxdriver().setup();
                FirefoxOptions options = new FirefoxOptions();
                if (headless) {
                    options.addArguments("-headless");
                }
                return new FirefoxDriver(options);
            }
            case "edge": {
                WebDriverManager.edgedriver().setup();
                EdgeOptions options = new EdgeOptions();
                if (headless) {
                    options.addArguments("--headless=new");
                }
                return new EdgeDriver(options);
            }
            case "chrome":
            default: {
                WebDriverManager.chromedriver().setup();
                ChromeOptions options = new ChromeOptions();
                options.addArguments("--remote-allow-origins=*");
                options.addArguments("--disable-notifications");
                options.addArguments("--start-maximized");
                if (headless) {
                    options.addArguments("--headless=new");
                }
                return new ChromeDriver(options);
            }
        }
    }
}
