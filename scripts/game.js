function openEnterNamesOverlay() {
  enterNamesOverlay.style.display = "block";
  backdrop.style.display = "block";
}

function closeEnterNamesOverlay() {
  enterNamesOverlay.style.display = "none";
  backdrop.style.display = "none";
}

function resetGame() {
  activePlayer = 0;
  round = 1;
  isGameOver = false;
  gameOver.firstElementChild.innerHTML =
    'You won, <span id="winner-name">PLAYER NAME</span>!';
    gameOver.style.display = "none";

    let fieldIndex = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        gameData[i][j] = 0;
        const gameField = gameFields[fieldIndex];
        gameField.textContent = "";
        gameField.classList.remove("disabled");
        fieldIndex++;
      }
    }
}

function startNewGame() {
  if (players[0].name === "" || players[1].name === "") {
    openEnterNamesOverlay();
    return;
  }

  resetGame();

  activePlayerName.textContent = players[activePlayer].name;
  gameArea.style.display = "block";
}

function selectField(event) {
  if (isGameOver) {
    return;
  }

  const selectedField = event.target;
  const selectedColumn = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedColumn] > 0) {
    return;
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedColumn] = activePlayer + 1;

  const winnerID = checkForGameOver();
  if (winnerID !== 0) {
    endGame(winnerID);
  }

  round++;

  activePlayer = +!activePlayer; // Switch player ID from 1 to 0 or vice versa
  activePlayerName.textContent = players[activePlayer].name;
}

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
      gameData[1][i] === gameData[2][i]
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

  if (round === 9) {
    return -1;
  }

  return 0;
}

function endGame(winnerID) {
  isGameOver = true;
  gameOver.style.display = "block";
  if (winnerID > 0) {
    gameOver.firstElementChild.firstElementChild.textContent = // Span element winner name
      players[winnerID - 1].name;
  } else {
    gameOver.firstElementChild.textContent = "It's a Draw!"; // h2 element
  }
}
