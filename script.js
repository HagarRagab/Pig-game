'use strict';
const player1Ele = document.querySelector('.player1');
const player2Ele = document.querySelector('.player2');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

let playerTotals, activePlayer, currentScore, playing;

//! Init function
const init = function () {
  playerTotals = {
    player1: 0,
    player2: 0,
  };
  activePlayer = 'player1';
  currentScore = 0;
  playing = true;

  player1Ele.classList.remove('player--winner');
  player2Ele.classList.remove('player--winner');
  diceImg.classList.remove('hidden');
  if (!document.querySelector('.player1').classList.contains('player--active'))
    activatePlayer();
  diplayTotalScore('player1');
  diplayTotalScore('player2');
};

init();

//! Switch player function
const switchPlayer = function () {
  activePlayer = activePlayer === 'player1' ? 'player2' : 'player1';
  activatePlayer();
};

//! Activation function
const activatePlayer = function () {
  player1Ele.classList.toggle('player--active');
  player2Ele.classList.toggle('player--active');
};

//! Display current score function
const diplayCurrentScore = function () {
  document.getElementById(`${activePlayer}--current`).textContent =
    currentScore;
};

//! Display total score function
function diplayTotalScore(player) {
  document.getElementById(`${player}--score`).textContent =
    playerTotals[player];
}

// User clicks Roll Dice button
btnRoll.addEventListener('click', () => {
  if (playing) {
    // 1- Generate random number from 1 to 6
    const randomDiceNum = Math.trunc(Math.random() * 6) + 1;
    // 2- Display dice image
    diceImg.src = `/images/dice-${randomDiceNum}.png`;
    diceImg.alt = `Playing dice ${randomDiceNum}`;
    // 3- Check if random number is 1
    if (randomDiceNum === 1) {
      currentScore = 0;
      diplayCurrentScore();
      switchPlayer();
    } else {
      currentScore += randomDiceNum;
      diplayCurrentScore();
    }
  }
});

// User clicks Hold button
btnHold.addEventListener('click', () => {
  if (playing) {
    // 1- Update total score
    playerTotals[activePlayer] += currentScore;
    // 2- Reset current score
    currentScore = 0;
    // 3- Display current score
    diplayCurrentScore();
    // 4- Display total score
    document.getElementById(`${activePlayer}--score`).textContent =
      playerTotals[activePlayer];
    // 5- Check for the winner
    if (playerTotals[activePlayer] >= 100) {
      document
        .querySelector(`.${activePlayer}`)
        .classList.add('player--winner');
      diceImg.classList.add('hidden');
      playing = false;
    } else {
      switchPlayer();
    }
  }
});

// User clicks new game button
btnNew.addEventListener('click', init);
