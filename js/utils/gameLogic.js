import { turnBarRed } from "./dotMatrixDisplay.js";
import { generateProblems } from "./problemsGenerator.js";
import {
  updateProblemTypes,
  getSelectedProblemTypes,
  setProblemCount,
  getProblemCount,
} from "./settings.js";

let currentProblemIndex = 0;
let currentProblems = [];
let timer = null;
let startTime;
let isGameActive = false;
let isSettingProblemCount = false;
let problemCountInput = "";
let userInput = "";

function startGame(onProgressUpdate) {
  console.log("Starting game...");
  if (isGameActive || isSettingProblemCount) {
    console.log("Game is already active or setting problem count");
    return;
  }
  isGameActive = true;
  const problemsCount = getProblemCount() || 10;
  currentProblems = generateProblems();
  currentProblemIndex = 0;
  onProgressUpdate(0);
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  displayProblem(currentProblems[currentProblemIndex]);
}

function displayProblem(problem) {
  console.log("Displaying problem:", problem.question);
  const displayElement = document.getElementById("display");
  displayElement.textContent = problem.question;
}

function updateTimer() {
  const timerDisplay = document.getElementById("timerDisplay");
  if (timerDisplay) {
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
    timerDisplay.textContent = formattedTime;
  }
}

function stopTimer() {
  console.log("Stopping timer...");
  clearInterval(timer);
  timer = null;
}

function handleInput(input, onProgressUpdate) {
  console.log("Handling input:", input);
  const displayElement = document.getElementById("display");

  if (
    !isGameActive &&
    (input === "M" || ["+", "-", "×", "÷"].includes(input))
  ) {
    console.log("Setting problem types...");
    handleSettingsInput(input);
    return;
  }

  if (input === "A" && !isGameActive) {
    console.log("Setting problem count...");
    isSettingProblemCount = true;
    problemCountInput = "";
    displayElement.textContent = "Set Count:";
    return;
  }

  if (isSettingProblemCount) {
    console.log("In problem count setting mode...");
    handleProblemCountSetting(input, displayElement);
    return;
  }

  if (isGameActive && input === "Ent") {
    console.log("Checking answer...");
    if (userInput) {
      checkAnswer(userInput, onProgressUpdate);
      userInput = "";
    }
    return;
  }

  if (input === "O/C") {
    console.log("Clearing user input...");
    clearUserInput();
    return;
  }

  if (isGameActive) {
    console.log("Adding to user input:", input);
    userInput += input;
    displayElement.textContent = userInput;
  }
}

function handleSettingsInput(input) {
  console.log("Handling settings input:", input);
  const displayElement = document.getElementById("display");
  if (input !== "M") {
    updateProblemTypes(input);
  }
  const currentTypes = getSelectedProblemTypes();
  displayElement.textContent = `Types: ${currentTypes.join(", ")}`;
}

function handleProblemCountSetting(input, displayElement) {
  console.log("Handling problem count setting:", input);
  if (!isNaN(input)) {
    problemCountInput += input;
    displayElement.textContent = problemCountInput;
  } else if (input === "Ent") {
    console.log("Finalizing problem count setting...");
    finalizeProblemCountSetting(displayElement);
  }
}

function finalizeProblemCountSetting(displayElement) {
  console.log("Finalizing problem count...");
  const count = parseInt(problemCountInput);
  if (!isNaN(count) && count > 0) {
    setProblemCount(count);
    displayElement.textContent = `Set ${count} problems`;
    setTimeout(() => {
      isSettingProblemCount = false;
      problemCountInput = "";
      displayElement.textContent = "ENT TO START";
      isGameActive = false; // Reset game
      console.log("Problem count set and game reset");
    }, 2000);
  }
}

function clearUserInput() {
  console.log("Clearing user input...");
  userInput = "";
  const displayElement = document.getElementById("display");
  displayElement.textContent = isGameActive
    ? currentProblems[currentProblemIndex].question
    : "ENT TO START";
}

function checkAnswer(userAnswer, onProgressUpdate) {
  console.log("Checking answer:", userAnswer);
  if (!userAnswer) return;
  const currentProblem = currentProblems[currentProblemIndex];
  const isCorrect = parseInt(userAnswer) === currentProblem.answer;
  const displayElement = document.getElementById("display");
  if (isCorrect) {
    console.log("Answer is correct, moving to next problem...");
    currentProblemIndex += 1;
  } else {
    console.log("Answer is incorrect, showing correct answer...");
    turnBarRed();
    displayElement.textContent = `${currentProblem.question} = ${currentProblem.answer}`;
    setTimeout(() => {
      if (currentProblemIndex < currentProblems.length) {
        displayProblem(currentProblems[currentProblemIndex]);
      } else {
        endGame();
      }
    }, 500);
  }

  if (currentProblemIndex < currentProblems.length) {
    displayProblem(currentProblems[currentProblemIndex]);
  } else {
    endGame();
  }
  onProgressUpdate((currentProblemIndex + 1) / currentProblems.length);
}

function endGame() {
  console.log("Ending game...");
  stopTimer();
  const totalTime = (Date.now() - startTime) / 1000;
  const displayElement = document.getElementById("display");
  displayElement.textContent = `${totalTime.toFixed(2)} secs`;
  isGameActive = false;
}

export { startGame, handleInput };
