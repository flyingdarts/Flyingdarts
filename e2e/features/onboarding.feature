Feature: Onboarding

    Scenario: I can register my profile
        Given the login page is loaded
        And I select the checkbox
        And I click the login with facebook button
        Then The AWS Oauth window opens
