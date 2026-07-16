package com.employee.automation.pages;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class EmployeePage {

    WebDriver driver;
    WebDriverWait wait;

    public EmployeePage(WebDriver driver) {
        this.driver = driver;
        wait = new WebDriverWait(driver, Duration.ofSeconds(15));
    }

    // Sidebar Employees menu
    private By employeeMenu =
By.xpath("//li[contains(@class,'menu-card')]//span[text()='Employees']");

    // Employee Table
    private By employeeTable =
            By.tagName("table");

    private By employeeRows =
            By.xpath("//tbody/tr");



    public void openEmployeesPage() {

    wait.until(ExpectedConditions.elementToBeClickable(employeeMenu)).click();

    wait.until(ExpectedConditions.visibilityOfElementLocated(By.tagName("table")));

}



    public boolean isEmployeeTableDisplayed() {

        return driver.findElement(employeeTable).isDisplayed();

    }



    public int getEmployeeCount() {

        return driver.findElements(employeeRows).size();

    }

}