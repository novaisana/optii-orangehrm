Feature: Recruitment
As an HR manager
I want to manage recruitment
So that I can manage recruitment information

Background:
Given the user is logged in to the homepage

Scenario: Add a new candidate
Given the user navigates to the Recruitment module
When user add Candidate information into the form
Then the Add Candidate form should be displayed
And the user clicks the "Add Candidate" button
And required information is filled
And user clicked on the save button
Then verify if candidate information was added on candidate page

Scenario Outline: Add a new candidate without required information
Given the user navigates to the Recruitment module
When user add Candidate information into the form without "<input>"
Then the Add Candidate form should be displayed
And the user clicks the "Add Candidate" button
Then verify if error is displayed for the required "<input>"

    Examples:
      | input       | 
      | First Name  | 
      | Last Name   | 
      | Email       |



Scenario: View candidate list
Given the user navigates to the Recruitment module
Then the user views the Candidates list page
And filter options should be available
And the candidate table should be displayed

Scenario: Verify if candidate is searchable by name
Given the user navigates to the Recruitment module
When the user views the Candidates list page
And add a new candidate
And search for the candidate in the list page by name
Then the candidate should be displayed in the list

Scenario: Verify add candidate with invalid parameters 
Given the user navigates to the Recruitment module
When user add Candidate information into the form
Then the Add Candidate form should be displayed
And the user clicks the "Add Candidate" button
And required information is filled with "<invalidInput>"
Then verify if error is displayed for  "<invalidInput>"
    Examples:
      | invalidInput   | 
      | First Name     | 
      | Last Name      | 
      | Middle Name    |
      | Contact Number |
      | Email          |

Scenario: Verify add candidate with empty inputs 
Given I am on Recruitment module
And clicked on add new user
And clicked on save new user once page is loaded
Then verify if error is displayed for required fields

Scenario: Verify add candidate and accept candidate
Given the user navigates to the Recruitment module
When user add Candidate information into the form
Then the Add Candidate form should be displayed
And the user clicks the "Add Candidate" button
And required information is filled
And user clicked on the save button
And verify if candidate information was added on candidate page
Then accept candidate
Then verify if candidate was accepted

Scenario: Verify accept existing candidate
Given I am on Recruitment module
And got a random candidate from the list
Then open candidate page
And accept candidate
Then verify if candidate was added

Scenario: Verify reject candidate added
Given the user navigates to the Recruitment module
When user add Candidate information into the form
Then the Add Candidate form should be displayed
And the user clicks the "Add Candidate" button
And required information is filled
And user clicked on the save button
And verify if candidate information was added on candidate page
Then reject candidate
Then verify if candidate was rejected

Scenario: Verify reject existing candidate
Given I am on Recruitment module
And got a random candidate from the list
Then open candidate page
And accept candidate
Then verify if candidate was added
