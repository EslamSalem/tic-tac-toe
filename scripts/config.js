function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;
  configOverlay.style.display = "block";
  backdrop.style.display = "block";
}

function closePlayerConfig() {
  configOverlay.style.display = "none";
  backdrop.style.display = "none";
  form.firstElementChild.classList.remove("error");
  configErrors.textContent = "";
  form.firstElementChild.lastElementChild.value = "";
}

function savePlayerConfig(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("player-name").trim();

  if (!enteredPlayerName) {
    event.target.firstElementChild.classList.add("error");
    configErrors.textContent = "Please enter a valid name!";
    return;
  }

  const updatedPlayerData = document.getElementById("player-" + editedPlayer + "-data");
  updatedPlayerData.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;

  closePlayerConfig();
}
