const playerConfigOverplayElement = document.getElementById("config-overlay");
const backdropElement = document.getElementById("backdrop");
const formElement = document.querySelector("form");

const editPlayer1BtnElement = document.getElementById("edit-player-1-btn");
const editPlayer2BtnElement = document.getElementById("edit-player-2-btn");

const cancelConfigBtnElement = document.getElementById("cancel-config-btn");

function openPlayerConfig() {
  playerConfigOverplayElement.style.display = "block";
  backdropElement.style.display = "block";
}

editPlayer1BtnElement.addEventListener("click", openPlayerConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerConfig);

function closePlayerConfig() {
  playerConfigOverplayElement.style.display = "none";
  backdropElement.style.display = "none";
}

cancelConfigBtnElement.addEventListener("click", closePlayerConfig);
backdropElement.addEventListener("click", closePlayerConfig);

function savePlayerConfig() {}

formElement.addEventListener("submit", savePlayerConfig);
