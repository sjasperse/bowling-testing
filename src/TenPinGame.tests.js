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
      itShouldGiveMeAMessageMatching(/3/i);

      describe('and then I bowl a spare', () => {
        beforeEach(() => {
          ballResult = game.bowledAndKnockedDown(7);
        });

        itShouldHaveAScoreOf(10);
        itShouldHaveACurrentFrameOf(2);
        itShouldHaveACurrentBallOf(1);
        itShouldHave(10).pinsRemaining();
        itShouldGiveMeAMessageMatching(/spare/i);
      });
    });
    
    describe('when I bowl a strike', () => {
      beforeEach(() => {
        ballResult = game.bowledAndKnockedDown(10);
      });

      itShouldHaveAScoreOf(10);
      itShouldHaveACurrentFrameOf(2);
      itShouldHaveACurrentBallOf(1);
      itShouldHave(10).pinsRemaining();
      itShouldGiveMeAMessageMatching(/strike/i);
    });

    describe('when I bowl three frames of gutterballs', () => {
      beforeEach(() => {
        // frame 1
        game.bowledAndKnockedDown(0);
        game.bowledAndKnockedDown(0);

        // frame 2
        game.bowledAndKnockedDown(0);
        game.bowledAndKnockedDown(0);

        // frame 3
        game.bowledAndKnockedDown(0);
        game.bowledAndKnockedDown(0);
      });

      itShouldHaveAScoreOf(0);
      itShouldHaveACurrentFrameOf(4);
      itShouldHaveACurrentBallOf(1);
      itShouldHave(10).pinsRemaining();
    });

    describe('when I bowl three frames of 2s', () => {
      beforeEach(() => {
        // frame 1
        game.bowledAndKnockedDown(2);
        game.bowledAndKnockedDown(2);

        // frame 2
        game.bowledAndKnockedDown(2);
        game.bowledAndKnockedDown(2);

        // frame 3
        game.bowledAndKnockedDown(2);
        game.bowledAndKnockedDown(2);
      });

      itShouldHaveAScoreOf(12);
      itShouldHaveACurrentFrameOf(4);
      itShouldHaveACurrentBallOf(1);
      itShouldHave(10).pinsRemaining();
    });

    describe('It should evaluate strike scores properly', () => {
      describe('When I bowl three strikes', () => {
        beforeEach(() => {
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(10);
        });
  
        itShouldHaveAScoreOf(60);
        itShouldHaveACurrentFrameOf(4);
        itShouldHaveACurrentBallOf(1);
        itShouldHave(10).pinsRemaining();
      });
  
      describe('When I bowl three strikes, and then a 2', () => {
        beforeEach(() => {
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(2);
        });
  
        itShouldHaveAScoreOf(66);
        itShouldHaveACurrentFrameOf(4);
        itShouldHaveACurrentBallOf(2);
        itShouldHave(8).pinsRemaining();
      });
  
      describe('When I bowl three strikes, and then 2 2s', () => {
        beforeEach(() => {
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(10);
          game.bowledAndKnockedDown(2);
          game.bowledAndKnockedDown(2);
        });
  
        itShouldHaveAScoreOf(70);
        itShouldHaveACurrentFrameOf(5);
        itShouldHaveACurrentBallOf(1);
        itShouldHave(10).pinsRemaining();
      });
    })

    describe('It should evaluate spare scores properly', () => {
      describe('When I bowl two spares in a row', () => {
        beforeEach(() => {
          game.bowledAndKnockedDown(2);
          game.bowledAndKnockedDown(8);
          game.bowledAndKnockedDown(2);
          game.bowledAndKnockedDown(8);
        });
  
        itShouldHaveAScoreOf(22);
        itShouldHaveACurrentFrameOf(3);
        itShouldHaveACurrentBallOf(1);
        itShouldHave(10).pinsRemaining();
      });
    })

    describe('it should evaluate the 10th frame correctly', () => {
      describe('in the 10th frame', () => {
        beforeEach(() => {
          // 9 empty frames
          for(let i =0; i < 9; i++) {
            game.bowledAndKnockedDown(0);
            game.bowledAndKnockedDown(0);
          }
        });

        describe('when I bowl 2 2s', () => {
          beforeEach(() => {
            game.bowledAndKnockedDown(2);
            game.bowledAndKnockedDown(2);
          });
  
          itShouldHaveAScoreOf(4);
          itShouldHaveACurrentFrameOf(10);
          itShouldHaveACurrentBallOf(2);
          itShouldHave(6).pinsRemaining();
          itShouldShowTheGameIsFinished();
        });

        describe('when I bowl a 2 and an 8 (for a spare)', () => {
          beforeEach(() => {
            game.bowledAndKnockedDown(2);
            game.bowledAndKnockedDown(8);
          });
  
          itShouldHaveAScoreOf(10);
          itShouldHaveACurrentFrameOf(10);
          itShouldHaveACurrentBallOf(3);
          itShouldHave(10).pinsRemaining();
          itShouldShowTheGameIsNotFinished();

          describe('and then I bowl a strike', () => {
            beforeEach(() => {
              game.bowledAndKnockedDown(10);
            });
  
            itShouldHaveAScoreOf(20);
            itShouldHaveACurrentFrameOf(10);
            itShouldHaveACurrentBallOf(3);
            itShouldHave(0).pinsRemaining();
            itShouldShowTheGameIsFinished();
          });  
        });

        describe('when I bowl a strike', () => {
          beforeEach(() => {
            game.bowledAndKnockedDown(10);
          });
  
          itShouldHaveAScoreOf(10);
          itShouldHaveACurrentFrameOf(10);
          itShouldHaveACurrentBallOf(2);
          itShouldHave(10).pinsRemaining();
          itShouldShowTheGameIsNotFinished();

          describe('and then I bowl a 2', () => {
            beforeEach(() => {
              game.bowledAndKnockedDown(2);
            });
  
            itShouldHaveAScoreOf(12);
            itShouldHaveACurrentFrameOf(10);
            itShouldHaveACurrentBallOf(2);
            itShouldHave(8).pinsRemaining();
            itShouldShowTheGameIsFinished();
          });  
        });
      });
    });

    describe('when I bowl 12 strikes', () => {
      beforeEach(() => {
        for(let i =0; i < 12; i++) {
          game.bowledAndKnockedDown(10);
        }
      });

      itShouldHaveAScoreOf(300);
      itShouldHaveACurrentFrameOf(10);
      itShouldHaveACurrentBallOf(3);
      itShouldHave(0).pinsRemaining();
      itShouldShowTheGameIsFinished();
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

function itShouldShowTheGameIsFinished() {
  it('should show that the game is finished', () => {
    expect(game.finished).to.be.true;
  });
}

function itShouldShowTheGameIsNotFinished() {
  it('should show that the game is not finished', () => {
    expect(game.finished).to.be.false;
  });
}