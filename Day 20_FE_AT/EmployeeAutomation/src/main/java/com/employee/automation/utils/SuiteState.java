package com.employee.automation.utils;

/**
 * Tiny shared state holder for the ONE continuous suite run.
 * Because the whole suite executes sequentially in a single JVM/browser
 * session (per the required flow), a simple static holder is enough to
 * pass data forward - e.g. the employee record created by the admin flow
 * (05_AdminEmployeeManagementTest) that the employee flow later logs in
 * with (10_EmployeeLoginTest).
 */
public final class SuiteState {

    private SuiteState() {
    }

    private static String createdEmployeeName;
    private static String createdEmployeeEmail;

    public static void setCreatedEmployee(String name, String email) {
        createdEmployeeName = name;
        createdEmployeeEmail = email;
    }

    public static String getCreatedEmployeeName() {
        return createdEmployeeName;
    }

    public static String getCreatedEmployeeEmail() {
        return createdEmployeeEmail;
    }

    public static boolean hasCreatedEmployee() {
        return createdEmployeeEmail != null && !createdEmployeeEmail.isEmpty();
    }
}
