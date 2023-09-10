const gameData = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];

let editedPlayer = 0;
let activePlayer = 0;
let round = 1;
let isGameOver = false;

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

const configOverlay = document.getElementById("config-overlay");
const backdrop = document.getElementById("backdrop");
const form = document.querySelector("form");
const configErrors = document.getElementById("config-errors");
const enterNamesOverlay = document.getElementById("enter-names-overlay");
const gameArea = document.getElementById("active-game");
const activePlayerName = document.getElementById("active-player-name");
const gameOver = document.getElementById("game-over");

const edit1Btn = document.getElementById("edit-1");
const edit2Btn = document.getElementById("edit-2");
const cancelConfigBtn = document.getElementById("cancel-config-btn");
const startBtn = document.getElementById("start-btn");
const closeEnterNamesBtn = document.getElementById("close-enter-names-btn");
const gameFields = document.querySelectorAll("#game-board li");

edit1Btn.addEventListener("click", openPlayerConfig);
edit2Btn.addEventListener("click", openPlayerConfig);

cancelConfigBtn.addEventListener("click", closePlayerConfig);
backdrop.addEventListener("click", closePlayerConfig);

backdrop.addEventListener("click", closeEnterNamesOverlay);
closeEnterNamesBtn.addEventListener("click", closeEnterNamesOverlay);

form.addEventListener("submit", savePlayerConfig);

startBtn.addEventListener("click", startNewGame);

for (const field of gameFields) {
    field.addEventListener("click", selectField);
}