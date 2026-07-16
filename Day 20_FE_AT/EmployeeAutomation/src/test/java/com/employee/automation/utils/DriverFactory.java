package com.employee.automation.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import io.github.bonigarcia.wdm.WebDriverManager;

import java.time.Duration;

public class DriverFactory {

    private static WebDriver driver;

    public static WebDriver getDriver() {

        if (driver == null) {

            String browser = ConfigReader.getProperty("browser");

            if (browser.equalsIgnoreCase("chrome")) {

                WebDriverManager.chromedriver().setup();

                driver = new ChromeDriver();

                driver.manage().timeouts().implicitlyWait(
                        Duration.ofSeconds(
                                Integer.parseInt(
                                        ConfigReader.getProperty("implicitWait"))));

                if (ConfigReader.getProperty("maximize").equalsIgnoreCase("true")) {

                    driver.manage().window().maximize();

                }

            }

        }

        return driver;
    }

    public static void quitDriver() {

        if (driver != null) {

            driver.quit();

            driver = null;

        }

    }

}