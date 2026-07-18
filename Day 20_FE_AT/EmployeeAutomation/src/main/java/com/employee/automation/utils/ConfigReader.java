package com.employee.automation.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

/**
 * Loads config.properties (src/test/resources/config.properties) once and
 * exposes typed getters. Values are never hardcoded inside test/page code.
 */
public final class ConfigReader {

    private static final Properties PROPERTIES = new Properties();

    static {
        try (InputStream inputStream =
                     ConfigReader.class.getClassLoader().getResourceAsStream("config.properties")) {
            if (inputStream == null) {
                throw new RuntimeException("config.properties not found on classpath (expected under src/test/resources)");
            }
            PROPERTIES.load(inputStream);
        } catch (IOException e) {
            throw new RuntimeException("Failed to load config.properties", e);
        }
    }

    private ConfigReader() {
    }

    public static String get(String key) {
        String value = PROPERTIES.getProperty(key);
        return value == null ? "" : value.trim();
    }

    public static String get(String key, String defaultValue) {
        String value = get(key);
        return value.isEmpty() ? defaultValue : value;
    }

    public static String baseUrl() {
        return get("baseUrl", "http://localhost:5173");
    }

    public static String browser() {
        return get("browser", "chrome");
    }

    public static boolean headless() {
        return Boolean.parseBoolean(get("headless", "false"));
    }

    public static int timeoutSeconds() {
        try {
            return Integer.parseInt(get("timeout", "15"));
        } catch (NumberFormatException e) {
            return 15;
        }
    }

    public static String adminUsername() {
        return get("admin.username");
    }

    public static String adminPassword() {
        return get("admin.password");
    }

    public static String employeeUsername() {
        return get("employee.username");
    }

    public static String employeePassword() {
        return get("employee.password");
    }
}
