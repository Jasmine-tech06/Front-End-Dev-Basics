Feature: Login

Scenario: Valid Admin Login
  Given User opens the login page
  When user enters the username "admin@decornest.com"
  And user enters the password "admin"
  Then click the Login Button