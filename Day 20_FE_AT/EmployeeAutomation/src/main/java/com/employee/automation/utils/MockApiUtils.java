package com.employee.automation.utils;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

/**
 * Direct, out-of-browser verification against the same Mock API backend the
 * React app talks to (src/services/employeeService.js -> API_URL). This
 * proves an "Add Employee" submission was actually persisted server-side,
 * independent of anything the UI shows. Uses only the JDK's built-in
 * java.net.http.HttpClient (Java 11+), so no new dependency/framework is
 * introduced - the project already targets Java 17 (see pom.xml).
 */
public final class MockApiUtils {

    private MockApiUtils() {
    }

    private static final HttpClient CLIENT = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

    /**
     * GETs the live Employees collection and returns true if the raw JSON
     * body contains the given email (case-insensitive). mockapi.io returns
     * a plain JSON array where every stored record includes the exact
     * email string that was POSTed, so a substring check is a reliable,
     * dependency-free way to confirm persistence without pulling in a
     * JSON parsing library just for this one check.
     */
    public static boolean employeeExistsByEmail(String email) {
        if (email == null || email.isEmpty()) {
            return false;
        }

        try {
            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(Constants.MOCK_API_EMPLOYEES_URL))
                    .timeout(Duration.ofSeconds(10))
                    .GET()
                    .build();

            HttpResponse<String> response = CLIENT.send(request, HttpResponse.BodyHandlers.ofString());

            return response.statusCode() == 200
                    && response.body() != null
                    && response.body().toLowerCase().contains(email.toLowerCase());
        } catch (Exception e) {
            System.out.println("[MockApiUtils] Failed to verify employee via Mock API: " + e.getMessage());
            return false;
        }
    }
}
