const TenPinGame = require('./TenPinGame');
const game = new TenPinGame();

bowl();
bowl();
bowl();
bowl();
bowl();
bowl();
bowl();
bowl();
bowl();
bowl();
bowl();


function bowl() {
  var result = game.bowl();
  console.log(`I bowled and knocked down ${result.pinsKnockedDown}. Score: ${result.score}. Pins remaining: ${game.pinsRemaining}. Frame ${game.currentFrame.number}. Ball ${game.currentBall}`);
}