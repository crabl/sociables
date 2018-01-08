const Deck = require('card-deck');
const readLineSync = require('readline-sync');
const ruleset = require('./ruleset.json');

function reset () {
  return process.stdout.write('\033c');
}

function createDeck(ruleset) {
  let rs = [];

  for (let rule of ruleset) {
    const { frequency } = rule;
    for (let i = 0; i < frequency; i++) {
      rs.push(rule);
    }
  }

  return new Deck(rs);
}

function playGame() {
  const deck = createDeck(ruleset);
  deck.shuffle();

  reset();
  
  while (deck.remaining()) {
    const card = deck.draw();
    console.log(card.name);
    console.log(card.description + '\n');

    const action = readLineSync.question('ENTER to draw the next card, or Q to quit [ENTER]: ');
    if (action.toLowerCase() === 'q') {
      process.exit(0);
    }
  
    reset();
  }
}

while (true) {
  playGame();
  reset();

  const action = readLineSync.question('You\'ve reached the end of the deck! Play again? [Y/n] ');
  if (action.toLowerCase() === 'n') {
    process.exit(0);
  }
}
