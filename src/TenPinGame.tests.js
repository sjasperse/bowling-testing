const { describe, beforeEach, it } = require('mocha');
const TenPinGame = require('./TenPinGame');
const { expect } = require('chai');

describe('TenPinGame', () => {
  describe('When I start a new game', () => {
    let game;
    beforeEach(() => {
      game = new TenPinGame();
    });

    it('should have a score of 0', () => {
      expect(game.score).to.equal(0);
    });

    it('should have a current frame of 1', () => {
      expect(game.currentFrame.number).to.equal(1);
    });

    it('should have a current ball of 1', () => {
      expect(game.currentBall).to.equal(1);
    });

    it('should have 10 pins remaining', () => {
      expect(game.pinsRemaining).to.equal(10);
    });
  });
});

