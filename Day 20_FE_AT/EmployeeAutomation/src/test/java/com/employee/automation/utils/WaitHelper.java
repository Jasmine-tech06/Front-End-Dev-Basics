package com.employee.automation.utils;

import java.time.Duration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class WaitHelper {

    private WebDriver driver;
    private WebDriverWait wait;

    public WaitHelper(WebDriver driver) {

        this.driver = driver;

        wait = new WebDriverWait(driver,
                Duration.ofSeconds(
                        Integer.parseInt(
                                ConfigReader.getProperty("explicitWait"))));

    }

    public void waitForElementToBeVisible(WebElement element) {

        wait.until(ExpectedConditions.visibilityOf(element));

    }

    public void waitForElementToBeClickable(WebElement element) {

        wait.until(ExpectedConditions.elementToBeClickable(element));

    }

}