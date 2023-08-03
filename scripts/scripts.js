'use strict';

//selecting elements
const btnNew = document.getElementById('btn--new');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');

const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.getElementById('dice');

const player0El = document.getElementById('player--0');
const player1El = document.getElementById('player--1');

//global variables - used
let scores, currentScore, activePlayer, dice;

//functions

function init() {
  //making scores 0 on UI
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0El.innerText = 0;
  current1El.innerText = 0;

  //modifying classes from player elements
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  //activating game buttons
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');

  //hide the image

  diceEl.classList.add('hidden');

  //update global values
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  dice = 0;
}

function getRandomNumber(num) {
  return Math.floor(Math.random() * num) + 1;
}

function switchPlayer() {
  //toggle player active class
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');

  document.getElementById(`score--${activePlayer}`).innerText =
    scores[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;

  //change active player
  // if (activePlayer === 0) {
  //   activePlayer = 1;
  // } else if (activePlayer === 1) {
  //   activePlayer = 0;
  // }
  activePlayer = activePlayer === 0 ? 1 : 0;
}

//Event listeners

btnRoll.addEventListener('click', function () {
  //1. Generate Random dice
  dice = getRandomNumber(6);

  //2. Display dice on UI
  diceEl.classList.remove('hidden');
  diceEl.src = `./assets/images/dice-${dice}.png`;

  //3.check dice === 1
  if (dice !== 1) {
    //add dice to current score
    currentScore = currentScore + dice;
    //display current score on UI
    document.getElementById(`current--${activePlayer}`).innerText =
      currentScore;
  } else {
    //switch player
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //1. Add current score to score
  scores[activePlayer] = scores[activePlayer] + currentScore;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).innerText = currentScore;

  //2. check if score >=100
  if (scores[activePlayer] >= 10) {
    //player wins
    document
      .getElementById(`player--${activePlayer}`)
      .classList.remove('player--active');
    document
      .getElementById(`player--${activePlayer}`)
      .classList.add('player--winner');

    document.getElementById(`score--${activePlayer}`).innerText =
      scores[activePlayer];

    diceEl.classList.add('hidden');
    btnRoll.classList.add('hidden');
    btnHold.classList.add('hidden');
  } else {
    //switch player
    switchPlayer();
  }
});

btnNew.addEventListener('click', function () {
  init();
});

//initial setup
init();