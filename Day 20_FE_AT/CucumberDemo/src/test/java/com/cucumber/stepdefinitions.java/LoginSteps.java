package com.cucumber.stepdefinitions;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.github.bonigarcia.wdm.WebDriverManager;

public class LoginSteps {

    WebDriver driver;

    @Given("User opens the login page")
    public void user_opens_the_login_page() {

        WebDriverManager.chromedriver().setup();

        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get("http://localhost:5173/login");
    }

    @When("user enters the username {string}")
    public void user_enters_the_username(String user) {

        driver.findElement(By.cssSelector("input[type='email']")).clear();
        driver.findElement(By.cssSelector("input[type='email']")).sendKeys(user);
    }

    @When("user enters the password {string}")
    public void user_enters_the_password(String pass) {

        driver.findElement(By.cssSelector("input[type='password']")).clear();
        driver.findElement(By.cssSelector("input[type='password']")).sendKeys(pass);
    }

    @Then("click the Login Button")
    public void click_the_login_button() {

        driver.findElement(By.cssSelector("button.login-submit-btn")).click();

        try {
            Thread.sleep(3000); // Wait to observe the result after login
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        driver.quit();
    }
}