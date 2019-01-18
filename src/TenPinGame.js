module.exports = function TenPinGame() {
  let pinsRemaining = 10;
  let finished = false;
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
      if (finished) {
        return currentFrame().balls.length;
      }

      return currentFrame().balls.length + 1;
    },
    get score() {
      return getScore();
    },
    get finished() {
      return finished;
    },
    get frameSummary() {
      return getFrameSummary();
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

    const _currentFrame = currentFrame();

    pinsRemaining -= pinsKnockedDown;

    _currentFrame.balls.push(pinsKnockedDown);
    const currentBall = _currentFrame.balls.length;

    var resultMessage = (function () {
      switch (pinsKnockedDown) {
        case 0: return 'Gutterball!';
        case 10: return 'Strike!';
        default:
          if (pinsRemaining === 0) {
            return 'Spare!';
          }

          return pinsKnockedDown;
      }
    })();

    if (_currentFrame.number === 10) {
      if (currentBall === 1 || currentBall === 2 && pinsRemaining === 0) {
        // keep going

        if (pinsRemaining === 0) {
          pinsRemaining = 10;
        }
      } else {
        finished = true;
      }
    }
    else {
      if (pinsRemaining === 0 || _currentFrame.balls.length === 2) {
        frames.push(new Frame(_currentFrame.number + 1));
        pinsRemaining = 10;
      }
    }

    return {
      message: resultMessage
    }
  }

  function getScore(endingFrame = 10) {
    let _endingFrame = Math.min(frames.length, endingFrame);
    let scoreAccum = 0;
    for (let frameIndex = 0; frameIndex < _endingFrame; frameIndex++) {
      const frame = frames[frameIndex];
      for(let ball = 0; ball < frame.balls.length; ball++) {
        const pins = frame.balls[ball];

        if (frame.number === 10) {
          scoreAccum += pins;
        }
        else if (ball === 0 && pins === 10) {
          const futureScore = getScoreFromNextXBalls(2);
          scoreAccum += (pins + futureScore);
        }
        else if (ball === 1 && pins + frame.balls[0] === 10) {
          const futureScore = getScoreFromNextXBalls(1);
          scoreAccum += (pins + futureScore);
        } else {
          scoreAccum += pins;
        }

        function getNextXBalls(x) {
          const r = [];
          for (let frameOffset = 0; frameIndex + frameOffset < frames.length; frameOffset++) {
            const futureFrame = frames[frameIndex + frameOffset];

            for (let futureBall = 0; futureBall < futureFrame.balls.length; futureBall++) {
              if (frameOffset === 0 && futureBall <= ball) { continue; }

              const futurePins = futureFrame.balls[futureBall];

              r.push(futurePins);

              if (r.length === x) {
                return r;
              }
            }
          }

          return r;
        }
        function getScoreFromNextXBalls(x) {
          return getNextXBalls(x).reduce((p, x) => p + x, 0);
        }
      }
    }

    return scoreAccum;
  }

  function getFrameSummary() {
    return frames
      .map(f => ({
        balls: f.balls,
        score: getScore(f.number)
      }));
  }

  function Frame(number) {
    return {
      number: number,
      balls: []
    };
  }
}
