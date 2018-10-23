Feature: Ten-pin bowling game

Scenario: Game should be initialized properly
 Given I start a new ten-pin game
 When it is initialized
 Then it should show a score of 0
 And a current frame of 1
 And a current ball of 1
 And 10 pins remaining