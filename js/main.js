import { startGame, handleInput } from "./utils/gameLogic.js";

document.querySelector(".button-grid").addEventListener("click", (event) => {
  if (event.target.matches(".button")) {
    const buttonValue = event.target.textContent;
    handleInput(buttonValue);
  }
});

document.getElementById("btn-enter").addEventListener("click", startGame);
