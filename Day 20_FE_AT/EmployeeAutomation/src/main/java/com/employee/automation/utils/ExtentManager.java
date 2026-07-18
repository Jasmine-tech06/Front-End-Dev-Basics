package com.employee.automation.utils;

import com.aventstack.extentreports.ExtentReports;
import com.aventstack.extentreports.ExtentTest;
import com.aventstack.extentreports.reporter.ExtentSparkReporter;

import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

/**
 * Optional ExtentReports wiring. Produces test-output/ExtentReport.html
 * summarising the whole run alongside the standard TestNG/Surefire reports.
 */
public final class ExtentManager {

    private static ExtentReports extent;
    private static final Map<Long, ExtentTest> TEST_MAP = new ConcurrentHashMap<>();

    private ExtentManager() {
    }

    public static synchronized ExtentReports getInstance() {
        if (extent == null) {
            ExtentSparkReporter spark = new ExtentSparkReporter("test-output/ExtentReport.html");
            spark.config().setDocumentTitle("Employee Management System - Automation Report");
            spark.config().setReportName("DecorNest EMS - Selenium/TestNG Execution Report");

            extent = new ExtentReports();
            extent.attachReporter(spark);
            extent.setSystemInfo("Application", "DecorNest Employee Management System");
            extent.setSystemInfo("Base URL", ConfigReader.baseUrl());
            extent.setSystemInfo("Browser", ConfigReader.browser());
        }
        return extent;
    }

    public static ExtentTest createTest(String testName) {
        ExtentTest test = getInstance().createTest(testName);
        TEST_MAP.put(Thread.currentThread().getId(), test);
        return test;
    }

    public static ExtentTest getTest() {
        return TEST_MAP.get(Thread.currentThread().getId());
    }

    public static synchronized void flush() {
        if (extent != null) {
            extent.flush();
        }
    }
}
