import { startGame, handleInput } from "./utils/gameLogic.js";
import {
  initializeDotMatrixDisplay,
  updateCompletionBar,
} from "./utils/dotMatrixDisplay.js";

// Initialize the dot matrix display with 20 dots
initializeDotMatrixDisplay(20);

function handleProgressUpdate(progressPercentage) {
  updateCompletionBar(progressPercentage);
}

// Add an event listener to handle button clicks in the button grid
document.querySelector(".button-grid").addEventListener("click", (event) => {
  if (event.target.matches(".button")) {
    const buttonValue = event.target.textContent;
    handleInput(buttonValue, handleProgressUpdate);
  }
});

// Add an event listener to the Enter button to start the game or handle input
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

// Function to enter fullscreen mode
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

// Function to lock the screen orientation to portrait
function lockOrientation() {
  if (screen.orientation && screen.orientation.lock) {
    screen.orientation
      .lock("portrait")
      .catch((error) => console.error("Failed to lock orientation:", error));
  }
}
