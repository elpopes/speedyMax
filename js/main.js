import { startGame, handleInput } from "./utils/gameLogic.js";
import {
  initializeDotMatrixDisplay,
  updateCompletionBar,
} from "./utils/dotMatrixDisplay.js";

initializeDotMatrixDisplay(20);

function handleProgressUpdate(progressPercentage) {
  updateCompletionBar(progressPercentage);
}

document.querySelector(".button-grid").addEventListener("click", (event) => {
  if (event.target.matches(".button")) {
    const buttonValue = event.target.textContent;
    handleInput(buttonValue, handleProgressUpdate);
  }
});

document
  .getElementById("btn-enter")
  .addEventListener("click", () => startGame(handleProgressUpdate));
