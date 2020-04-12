/*
topics covered:
querySelector()
addEventListener
setInterval()
classList
forEach()
Arrow functions
*/

// set an interval for how long each game runs

// The hole that mole appears from is random

// The amount of milliseconds that a mole appears is random

const cells = document.querySelectorAll(".cell");
const score = document.querySelector(".score");
const backdrop = document.querySelector(".backdrop");
const modal = document.querySelector(".modal");
const modalButton = document.querySelector(".modal__button");
const gameTime = 20000;
let gameOver = false;
let lastCellId;
let scoreValue = 0;

// open the game window with modal
const openModal = function() {
  backdrop.classList.add("open");
  modal.classList.add("open__modal");
};

// start game once modal start button is clicked
modalButton.addEventListener("click", function() {
  backdrop.classList.remove("open");
  modal.classList.remove("open__modal");
  setTimeout(startGame, 1000);
});

// get random time span for a mole to appear in a cell
function getRandomTimeSpan(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// Get a random cell for mole
function getRandomCell(cells) {
  let id = Math.floor(Math.random() * cells.length);
  let randomCell = cells[id];
  if (randomCell === lastCellId) {
    return getRandomCell(cells);
  }
  lastCellId = randomCell;
  return randomCell;
}

// return the random hole where the mole appears for randsom seconds
function displayMole() {
  //get random cell
  let cell = getRandomCell(cells);
  let timeOut = getRandomTimeSpan(400, 1000);
  // add "up" class to show mole
  cell.classList.add("up");
  setTimeout(function() {
    cell.classList.remove("up");
    if (!gameOver) {
      displayMole();
    } else {
      setTimeout(openModal, 2000);
    }
  }, timeOut);
}

// update score
function updateScore() {
  scoreValue += 1;
  score.textContent = scoreValue;
}

// Start the game and end it in 20 seconds
function startGame() {
  scoreValue = 0;
  lastCellId = null;
  gameOver = false;
  score.textContent = scoreValue;
  // run display mole
  displayMole();
  // set time to turn game off in 20 sec
  setTimeout(function() {
    gameOver = true;
  }, gameTime);
}

document.addEventListener("click", function(event) {
  // if clicked event does not match mole, return
  if (!event.target.classList.contains("mole")) return;

  // update score if mole is clicked
  if (event.isTrusted) {
    updateScore();
  }
});

// open modal
openModal();
