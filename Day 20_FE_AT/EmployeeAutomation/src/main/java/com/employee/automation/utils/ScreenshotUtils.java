package com.employee.automation.utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class ScreenshotUtils {

    private static final String SCREENSHOT_DIR = "screenshots";

    private ScreenshotUtils() {
    }

    /**
     * Captures a screenshot and returns the absolute path, or null if capture failed.
     */
    public static String capture(WebDriver driver, String testName) {
        try {
            Path dir = Paths.get(SCREENSHOT_DIR);
            if (!Files.exists(dir)) {
                Files.createDirectories(dir);
            }

            String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
            String fileName = testName + "_" + timestamp + ".png";
            Path destination = dir.resolve(fileName);

            File source = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
            Files.copy(source.toPath(), destination);

            System.out.println("[ScreenshotUtils] Screenshot saved: " + destination.toAbsolutePath());
            return destination.toAbsolutePath().toString();
        } catch (IOException | ClassCastException e) {
            System.out.println("[ScreenshotUtils] Failed to capture screenshot: " + e.getMessage());
            return null;
        }
    }
}
