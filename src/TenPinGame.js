module.exports = function TenPinGame() {
  let pinsRemaining = 10;
  const frames = [ new Frame(1) ];

  return {
    bowledAndKnockedDown: bowledAndKnockedDown,

    get pinsRemaining() {
      return pinsRemaining;
    },
    get currentFrame() {
      return currentFrame();
    },
    get currentBall() {
      return currentFrame().balls.length + 1;
    },
    get score() {
      return getScore();
    }
  };

  function currentFrame() {
    return frames[frames.length - 1];
  }

  // not sure how to test this yet.
  // function bowl() {
  //   const pinsKnockedDown = Math.floor(Math.random() * (pinsRemaining + 1));
    
  //   return bowledAndKnockedDown(pinsKnockedDown);
  // }

  function bowledAndKnockedDown(pinsKnockedDown) {
    if (pinsKnockedDown > pinsRemaining) {
      throw new Error('Liar. That\'s more pins than were up.');
    }

    pinsRemaining -= pinsKnockedDown;

    currentFrame().balls.push(pinsKnockedDown);

    var resultMessage = (() => {
      switch (pinsKnockedDown) {
        case 0: return 'Gutterball!';
        case 10: return 'Strike!'
      }
    })();

    if (pinsRemaining === 0) {
      frames.push(new Frame(currentFrame().number + 1));
      pinsRemaining = 10;
    }

    return {
      message: resultMessage
    }
  }

  function getScore() {
    return frames.reduce((p,x) => p + x.balls.reduce((p2, x2) => p2 + x2, 0), 0);
  }

  function Frame(number) {
    return {
      number: number,
      balls: []
    };
  }
}
