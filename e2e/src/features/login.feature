Feature: Login

    Scenario: I can click the login button
        Given the login page is loaded
        Then I cannot login
        When I select the checkbox
        Then I can login
