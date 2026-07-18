package com.employee.automation.listeners;

import com.employee.automation.base.DriverFactory;
import com.employee.automation.utils.ExtentManager;
import com.employee.automation.utils.ScreenshotUtils;
import com.aventstack.extentreports.Status;
import org.openqa.selenium.WebDriver;
import org.testng.ITestContext;
import org.testng.ITestListener;
import org.testng.ITestResult;

public class TestListener implements ITestListener {

    @Override
    public void onStart(ITestContext context) {
        System.out.println("========================================================");
        System.out.println(" Automation Started : " + context.getName());
        System.out.println("========================================================");
    }

    @Override
    public void onTestStart(ITestResult result) {
        ExtentManager.createTest(result.getTestClass().getName() + " -> " + result.getMethod().getMethodName());
        System.out.println("[START] " + result.getMethod().getMethodName());
    }

    @Override
    public void onTestSuccess(ITestResult result) {
        System.out.println("[PASS]  " + result.getMethod().getMethodName());
        if (ExtentManager.getTest() != null) {
            ExtentManager.getTest().log(Status.PASS, "Test passed");
        }
    }

    @Override
    public void onTestFailure(ITestResult result) {
        System.out.println("[FAIL]  " + result.getMethod().getMethodName() + " -> " + result.getThrowable());

        WebDriver driver = DriverFactory.getDriver();
        String path = ScreenshotUtils.capture(driver, result.getMethod().getMethodName());

        if (ExtentManager.getTest() != null) {
            ExtentManager.getTest().log(Status.FAIL, result.getThrowable());
            if (path != null) {
                try {
                    ExtentManager.getTest().addScreenCaptureFromPath(path);
                } catch (Exception ignored) {
                    // Reporting must never fail the build - swallow and continue.
                }
            }
        }
    }

    @Override
    public void onTestSkipped(ITestResult result) {
        System.out.println("[SKIP]  " + result.getMethod().getMethodName());
        if (ExtentManager.getTest() != null) {
            ExtentManager.getTest().log(Status.SKIP, "Test skipped");
        }
    }

    @Override
    public void onFinish(ITestContext context) {
        System.out.println("========================================================");
        System.out.println(" Automation Completed Successfully : " + context.getName());
        System.out.println("========================================================");
        ExtentManager.flush();
    }
}
