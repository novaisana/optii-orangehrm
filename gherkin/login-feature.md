Feature: Login
As a user of OrangeHRM
I want to login to the system
So that I can access the dashboard and manage HR tasks

Background:
Given the user navigates to the OrangeHRM login page

Scenario: Verify successful login with valid credentials
When the user enters username "Admin"
And the user enters password "admin123"
And the user clicks the Login button
Then the user should be redirected to the dashboard page
And the dashboard should be visible

Scenario: Verify login with invalid username
When the user enters username "InvalidUser"
And the user enters password "admin123"
And the user clicks the Login button
Then an error message "Invalid credentials" should be displayed

Scenario: Verify login with invalid password
When the user enters username "Admin"
And the user enters password "InvalidPassword"
And the user clicks the Login button
Then an error message "Invalid credentials" should be displayed

Scenario: Verify user can logout successfully
Given the user is logged in to the dashboard
And the sidebar navigation is accessible
When the user clicks the logout button
Then the user should be redirected to the login page

Scenario: Verify login with empty credentials
Given user is in the login page
And clicks on login without adding credentials
Then verify if error is displayed for Username and Password

Scenario: Verify login with empty username
Given user is in the login page
And clicks on login without adding username
Then verify if error is displayed for Username input

Scenario: Verify login with empty password
Given user is in the login page
And clicks on login without adding password
Then verify if error is displayed for password input