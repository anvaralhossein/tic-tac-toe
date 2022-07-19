const gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let gameIsOver = false;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

const playerConfigOverplayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");
const errorsOutputElement = document.getElementById("config-errors");
const gameAreaElement = document.getElementById("active-game");
const activePlayerNameElement = document.getElementById("active-player-name");
const gameOverElement = document.getElementById("game-over");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");

const cancelConfigBtnElement = document.getElementById("cancel-config-btn");
const startNewGameBtnElement = document.getElementById("start-game-btn");
const gameFieldElements = document.querySelectorAll("#game-board li");
const gameBoardElement = document.getElementById("game-board");

function openPlayerConfig() {
  editedPlayer = +event.target.dataset.playerid;
  playerConfigOverplayElement.style.display = "block";
  backdropElement.style.display = "block";
}

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

function closePlayerConfig() {
  playerConfigOverplayElement.style.display = "none";
  backdropElement.style.display = "none";
  formElement.firstElementChild.classList.remove("error");
  errorsOutputElement.textContent = "";
  formElement.firstElementChild.lastElementChild.value = "";
}

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayername = formData.get("playername").trim();

  if (!enteredPlayername) {
    event.target.firstElementChild.classList.add("error");
    errorsOutputElement.textContent = " Please enter a valid name ! ";
    return;
  }

  const updatedPlayerDataElement = document.getElementById(
    "player-" + editedPlayer + "-data"
  );
  updatedPlayerDataElement.children[1].textContent = enteredPlayername;

  if (editedPlayer == 1) {
    players[0].name = enteredPlayername;
  } else {
    players[1].name = enteredPlayername;
  }
  closePlayerConfig();
}

formElement.addEventListener("submit", savePlayerConfig);

function resetGameStatus() {
  activePlayer = 0;
  currentRound = 1;
  gameIsOver = false;
  gameOverElement.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
  gameOverElement.style.display = "none";

  //nafahmidm??
  let gameBoardIndex = 0;
  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData.length; j++) {
      gameData[i][j] = 0;

      // console.log(gameBoardElement.children[gameBoardIndex]);
      const gameBoarItemdElement = gameFieldElements[gameBoardIndex];
      gameBoarItemdElement.textContent = "  ";
      gameBoarItemdElement.classList.remove("disable");
      gameBoardIndex++;
    }
  }
}

function starNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    alert("Please set custom player names for both players");
    return;
  }
  gameAreaElement.style.display = "block";
  resetGameStatus();
  activePlayerNameElement.textContent = players[activePlayer].name;
}

startNewGameBtnElement.addEventListener("click", starNewGame);

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  activePlayerNameElement.textContent = players[activePlayer].name;
}

function selectGameField(event) {
  if (event.target.tagName != "LI" || gameIsOver) {
    return;
  }
  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    alert(" Please select an empty field!");
    return;
  }
  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disable");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerId = checkForGameOver();

  if (winnerId !== 0) {
    endGame(winnerId);
  }

  currentRound++;
  switchPlayer();
}

//for (const gameFieldElement of gameFieldElements) {
//gameFieldElement.addEventListener("click", selectGameField);
//}

gameBoardElement.addEventListener("click", selectGameField);

function checkForGameOver() {
  for (let i = 0; i < 3; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][1] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }

  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }

  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  if (currentRound === 9) {
    return -1;
  }
  return 0;
}

function endGame(winnerId) {
  gameIsOver = true;
  gameOverElement.style.display = "block";

  if (winnerId > 0) {
    const winnerName = players[winnerId - 1].name;
    gameOverElement.firstElementChild.firstElementChild.textContent =
      winnerName;
  } else {
    gameOverElement.firstElementChild.textContent = "it's a draw!";
  }
}
