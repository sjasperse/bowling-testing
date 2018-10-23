module.exports = function TenPinGame() {
  let pinsRemaining = 10;
  const frames = [ new Frame(1) ];

  return {
    bowl: bowl,
    bowledAndKnockDown: bowledAndKnockDown,

    get pinsRemaining() {
      return pinsRemaining;
    },
    get currentFrame() {
      return currentFrame();
    },
    get currentBall() {
      return currentFrame().balls.length + 1;
    },
    get frames() {
      return frames;
    },
    get score() {
      return getScore();
    }
  };

  function currentFrame() {
    return frames[frames.length - 1];
  }

  function bowl() {
    const pinsKnockedDown = Math.floor(Math.random() * (pinsRemaining + 1));
    
    return bowledAndKnockDown(pinsKnockedDown);
  }

  function bowledAndKnockDown(pinsKnockedDown) {
    // what if they say they knocked down more pins than there were?
    // what if the game is finished?

    return {
      pinsKnockedDown: pinsKnockedDown,
      score: getScore()
    };
  }

  function getScore() {
    return 0;
  }

  function Frame(number) {
    return {
      number: number,
      balls: []
    };
  }
}
