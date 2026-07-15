package com.employee.automation.demo;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.github.bonigarcia.wdm.WebDriverManager;

public class FirstTest {

    public static void main(String[] args) {

        // Download and setup ChromeDriver
        WebDriverManager.chromedriver().setup();

        // Launch Chrome
        WebDriver driver = new ChromeDriver();

        // Maximize window
        driver.manage().window().maximize();

        // Open Google
        driver.get("https://www.google.com");

        // Print title
        System.out.println("Page Title: " + driver.getTitle());

        // Wait for 3 seconds (just for demo)
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        // Close browser
        driver.quit();
    }
}