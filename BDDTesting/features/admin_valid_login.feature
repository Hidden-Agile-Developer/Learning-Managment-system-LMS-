Feature: Is it valid Admin login?
   Admin wants to have valid login.

   Scenario Outline: Admin Valid Sign In
   Given admin navigates to sign in page
   When admin enter valid “<email>”
  And admin enter valid “<password>”
  And admin choose valdid user type as “<user_type>”
   Then user is redirected to Admin dashboard

Examples:
| email       | password | user_type |
|abc@gmail.com| abc      | Admin     |