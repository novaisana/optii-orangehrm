Feature: Home Page
  As a logged in user
  I want to view the dashboard
  So that I can see important information and quick actions

  Scenario: Verify user is directed to the home page when logged in
    Given the user navigates to the OrangeHRM login page
    When the user logs in with valid credentials
    Then the user should be redirected to the dashboard page
    And the sidebar should be visible
    And the dashboard widgets should be visible

  Scenario Outline: Verify all information widgets are available on dashboard
    Given the user is logged in to the dashboard
    When the user views the Dashboard page
    Then the "<widget_name>" <widget_type> should be visible

    Examples:
      | widget_name            | widget_type |
      | Time at Work           | widget      |
      | My Actions             | widget      |
      | Quick Launch           | section     |
      | Buzz                   | widget      |
      | Employees on Leave     | widget      |
      | Employee Distribution  | widget      |