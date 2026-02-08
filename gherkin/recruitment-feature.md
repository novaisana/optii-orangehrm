Feature: Recruitment
  As an HR manager
  I want to manage recruitment
  So that I can menage recruitment information

  Background:
    Given the user is logged in to the homepage

  Scenario: Add a new candidate
    Given the user navigates to the Recruitment module
    When the user clicks the "Add Candidate" button
    Then the Add Candidate form should be displayed
    When user add Candidate information into the form
    And required information is filled
    And user clicked on the save button
    Then verify if candidate information was added

  Scenario: View candidate list
    Given the user navigates to the Recruitment module
    Then the user views the Candidates list page
    And filter options should be available
    And the candidate table should be displayed

Scenario: Verify if candidate is searcheble by name
    Given the user navigates to the Recruitment module
    When the user views the Candidates list page
    And add a new candidate
    And seach for the candidate in the list page by name
    Then the candidate should be displayed is the list
    