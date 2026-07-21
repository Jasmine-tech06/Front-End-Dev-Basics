package com.employee.automation.utils;

/**
 * Central place for text/labels/route-fragments taken directly from the
 * React source (App.jsx routes, Sidebar.jsx menu items, Login.jsx copy).
 * Keeping them here means no page object hardcodes a "magic string" twice.
 */
public final class Constants {

    private Constants() {
    }

    // ----- Routes (from src/App.jsx) -----
    public static final String ROUTE_WELCOME = "/";
    public static final String ROUTE_SELECT_ROLE = "/select-role";
    public static final String ROUTE_LOGIN = "/login";
    public static final String ROUTE_DASHBOARD = "/dashboard";
    public static final String ROUTE_UNAUTHORIZED = "/unauthorized";

    // ----- Admin sidebar menu titles (src/components/Sidebar.jsx -> adminMenuItems) -----
    public static final String MENU_DASHBOARD = "Dashboard";
    public static final String MENU_EMPLOYEES = "Employees";
    public static final String MENU_ADD_EMPLOYEE = "Add Employee";
    public static final String MENU_DEPARTMENTS = "Departments";
    public static final String MENU_ATTENDANCE = "Attendance";
    public static final String MENU_REPORTS = "Reports";
    public static final String MENU_ANALYTICS = "Analytics";
    public static final String MENU_SETTINGS = "Settings";

    // ----- Employee sidebar menu titles (src/components/Sidebar.jsx -> employeeMenuItems) -----
    public static final String MENU_LEAVES = "Leaves";
    public static final String MENU_DEPARTMENT = "Department";
    public static final String MENU_SALARY = "Salary";

    // ----- Login page (src/pages/Login.jsx) -----
    public static final String ROLE_ADMIN = "admin";
    public static final String ROLE_EMPLOYEE = "employee";

    // Employee login default password fallback, straight from Login.jsx:
    //   const expectedPassword = employee.password || "password";
    public static final String DEFAULT_EMPLOYEE_PASSWORD = "password";

    // Mock API backend (src/services/employeeService.js -> API_URL), used
    // to verify Add/Update Employee actually persisted server-side,
    // independent of what the UI shows.
    public static final String MOCK_API_EMPLOYEES_URL =
            "https://6a4b3698f5eab0bb6b62577e.mockapi.io/Employees";
}
