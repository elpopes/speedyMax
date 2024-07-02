import { startGame, handleInput } from "./utils/gameLogic.js";
import {
  initializeDotMatrixDisplay,
  updateCompletionBar,
} from "./utils/dotMatrixDisplay.js";
import {
  toggleCalculatorMode,
  updateCalculatorModeDisplay,
} from "./utils/calculatorMode.js";

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

document.getElementById("btn-enter").addEventListener("click", () => {
  const displayElement = document.getElementById("display");
  if (displayElement.textContent === "ENT TO START") {
    startGame(handleProgressUpdate);
    enterFullscreen();
    lockOrientation();
  } else {
    handleInput("Ent", handleProgressUpdate);
  }
});

document.getElementById("btn-x").addEventListener("click", () => {
  toggleCalculatorMode();
  clearUserInput();
  updateCalculatorModeDisplay();
});

function enterFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.mozRequestFullScreen) {
    // Firefox
    elem.mozRequestFullScreen();
  } else if (elem.webkitRequestFullscreen) {
    // Chrome, Safari and Opera
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) {
    // IE/Edge
    elem.msRequestFullscreen();
  }
}

function lockOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation
      .lock("portrait")
      .catch((error) => console.error("Failed to lock orientation:", error));
  }
}

export { handleProgressUpdate };
