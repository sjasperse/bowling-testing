const { Given, When, Then } = require('cucumber');
const assert = require('assert');
const TenPinGame = require('./TenPinGame');
const { expect } = require('chai');

Given(`I start a new ten-pin game`, function () {
  this.game = new TenPinGame();
});

When('it is initialized', function () {
  // empty step.
});

Then(/^it should show a score of (\d+)/, function (score) {
  expect(this.game.score).to.equal(score);
});

Then(/^a current frame of (\d+)/, function (currentFrame) {
  expect(this.game.currentFrame.number).to.equal(currentFrame);
});

Then(/^a current ball of (\d+)/, function (currentBall) {
  expect(this.game.currentBall).to.equal(currentBall);
});

Then(/^(\d+) pins remaining/, function (pinsRemaining) {
  expect(this.game.pinsRemaining).to.equal(pinsRemaining);
});