Feature: Sidebar Navigation
  As a user
  I want to navigate through different modules using the sidebar
  So that I can access various HR management features

  Background:
    Given the user is logged in to the homepage

@smoke
  Scenario Outline: Verify all sidebar hyperlinks are accessible
    And the side bar is visible
    When the user clicks the "<link_name>" link
    Then user should be redirected to the "<expected_page>" and page should load correctly 

    Examples:
      | link_name   | expected_page     |
      | Admin       | System Users      |
      | PIM         | PIM               |
      | Leave       | Leave             |
      | Time        | Time              |
      | Recruitment | Candidates        |
      | My Info     | My Info           |
      | Performance | Performance       |
      | Dashboard   | Dashboard         |
      | Directory   | Directory         |
      | Maintenance | Maintenance       |
      | Claim       | Claim             |
      | Buzz        | Buzz              |

  Scenario Outline: Verify sidebar search functionality works
    When the user views the sidebar
    And serch for "<link_name>"
    Then "<link_name>" should be displayed

    Examples:
      | link_name   | 
      | Admin       | 
      | PIM         | 
      | Leave       | 
      | Time        | 
      | Recruitment | 
      | My Info     | 
      | Performance | 
      | Dashboard   | 
      | Directory   | 
      | Maintenance | 
      | Claim       | 
      | Buzz        | 