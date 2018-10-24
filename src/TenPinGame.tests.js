const { describe, beforeEach, it } = require('mocha');
const TenPinGame = require('./TenPinGame');
const { expect } = require('chai');

let game, ballResult;

describe('TenPinGame', () => {
  describe('When I start a new game', () => {
    beforeEach(() => {
      game = new TenPinGame();
    });

    itShouldHaveAScoreOf(0);
    itShouldHaveACurrentFrameOf(1);
    itShouldHaveACurrentBallOf(1);
    itShouldHave(10).pinsRemaining();

    describe('when I bowl and say I knocked down 11 pins', () => {
      it('should tell me I am a liar.', () => {
        expect(() => {
          game.bowledAndKnockedDown(11);
        }).to.throw(/liar/i)
      });
    });

    describe('when I bowl and knock down 0 pins', () => {
      beforeEach(() => {
        ballResult = game.bowledAndKnockedDown(0);
      });

      itShouldHaveAScoreOf(0);
      itShouldHaveACurrentFrameOf(1);
      itShouldHaveACurrentBallOf(2);
      itShouldHave(10).pinsRemaining();
      itShouldGiveMeAMessageMatching(/gutter/i);
    });
    
    describe('when I bowl and knock down 3 pins', () => {
      beforeEach(() => {
        ballResult = game.bowledAndKnockedDown(3);
      });

      itShouldHaveAScoreOf(3);
      itShouldHaveACurrentFrameOf(1);
      itShouldHaveACurrentBallOf(2);
      itShouldHave(7).pinsRemaining();
    });
    
    describe('when I bowl and knock down 10 pins', () => {
      beforeEach(() => {
        ballResult = game.bowledAndKnockedDown(10);
      });

      itShouldHaveAScoreOf(10);
      itShouldHaveACurrentFrameOf(2);
      itShouldHaveACurrentBallOf(1);
      itShouldHave(10).pinsRemaining();
      itShouldGiveMeAMessageMatching(/strike/i);
    });
  });
});


function itShouldHaveAScoreOf(score) {
  it(`should have a score of ${score}`, () => {
    expect(game.score).to.equal(score);
  });
}

function itShouldHaveACurrentFrameOf(frame) {
  it(`should have a current frame of ${frame}`, () => {
    expect(game.currentFrame.number).to.equal(frame);
  });
}

function itShouldHaveACurrentBallOf(ball) {
  it(`should have a current ball of ${ball}`, () => {
    expect(game.currentBall).to.equal(ball);
  });
}

function itShouldHave(number) {
  return {
    pinsRemaining: function() {
      it(`should have ${number} pins remaining`, () => {
        expect(game.pinsRemaining).to.equal(number);
      });
    }
  }
}

function itShouldGiveMeAMessageMatching(regex) {
  it('should give me a message matching ${regex}', () => {
    expect(ballResult.message).to.match(regex);
  });
}