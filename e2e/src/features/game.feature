@requires-registered-user
Feature: Game Page
    
    Scenario: I can join a game
        Given the game page is loaded

    Scenario: Game has correct state
        Given the game page is loaded
        Then the player name is 'Socrates'
        And the player score is '501'
        And the player sets is '0'
        And the player legs is '0'

    Scenario: Score updates when shortcut is pressed
        Given the game page is loaded
        When I press the shortcut '26'
        Then the player score is '475'

    Scenario: Score input field updates correctly
        Given the game page is loaded
        When I press the number '1'
        Then the input is '1'
        When I press the number '5'
        Then the input is '15'

    Scenario: Score updates when input is submitted
        Given the game page is loaded
        When I press the number '4'
        Then the input is '4'
        And I press the number '8'
        Then the input is '48'
        When I press OK
        Then the player score is '453'
        And the input is '0'

    Scenario: Clear button resets the input
        Given the game page is loaded
        When I press the number '7'
        Then the input is '7'
        And I press the number '5'
        Then the input is '75'
        When I press CLEAR
        Then the player score is '501'
        And the input is '0'
