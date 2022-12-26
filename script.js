'use strict';

// Selecting elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');

const score0EL = document.querySelector('#score--0');
const score1EL = document.querySelector('#score--1');
const current0EL = document.querySelector('#current--0');
const current1EL = document.querySelector('#current--1');

const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, activePlayer, playingGame, scores;
// Init
const init = function () {
  // Starting conditions
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingGame = true;

  // reset scoreEL
  score0EL.textContent = 0;
  score1EL.textContent = 0;

  // reset currentEL
  current0EL.textContent = 0;
  current1EL.textContent = 0;

  player0EL.classList.remove('player--winner');
  player1EL.classList.remove('player--winner');
  player1EL.classList.remove('player--active');
  player0EL.classList.add('player--active');
  diceEL.classList.add('hidden');
};

init();

// Switch Player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playingGame) {
    //1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6 + 1);
    console.log(dice);

    //2. Display Dice
    diceEL.classList.remove('hidden');
    diceEL.src = `/assets/dice/dice-${dice}.png`;

    //3. Check for rolled 1
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playingGame) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // finish the game
      playingGame = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      diceEL.classList.add('hidden');
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
});

// New Game
btnNew.addEventListener('click', init);
