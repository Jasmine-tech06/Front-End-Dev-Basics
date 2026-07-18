package com.employee.automation.tests;

import com.employee.automation.base.BaseTest;
import com.employee.automation.pages.AdminDashboardPage;
import org.testng.Assert;
import org.testng.annotations.Test;

/**
 * Step 7: mandatory "opens" checks for the remaining admin sidebar screens
 * that exist in Sidebar.jsx's adminMenuItems - Departments, Attendance,
 * Reports, Analytics, Settings. Kept to basic "does it open" validations,
 * per the "don't test every component" instruction.
 */
public class T07_AdminAnalyticsTest extends BaseTest {

    @Test(priority = 1, description = "Departments page opens")
    public void test1_departmentsPageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToDepartments();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Departments"), "'Departments' sidebar item should become active");
        Assert.assertTrue(dashboard.isDepartmentsPageVisible(), "Departments page should be visible");
    }

    @Test(priority = 2, description = "Attendance roster page opens")
    public void test2_attendancePageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToAttendance();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Attendance"), "'Attendance' sidebar item should become active");
        Assert.assertTrue(dashboard.isAttendanceRosterVisible(), "Admin attendance roster should be visible");
    }

    @Test(priority = 3, description = "Reports page opens")
    public void test3_reportsPageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToReports();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Reports"), "'Reports' sidebar item should become active");
        Assert.assertTrue(dashboard.isReportsPageVisible(), "Reports page should be visible");
    }

    @Test(priority = 4, description = "Analytics page opens")
    public void test4_analyticsPageOpens() {
        AdminDashboardPage dashboard = new AdminDashboardPage(driver);
        dashboard.goToAnalytics();

        Assert.assertTrue(dashboard.isSidebarMenuActive("Analytics"), "'Analytics' sidebar item should become active");
        Assert.assertTrue(dashboard.isAnalyticsPageVisible(), "Analytics page should be visible");
        System.out.println("Analytics Page Verified");
    }
}
