import { turnBarRed } from "./dotMatrixDisplay.js";
import { generateProblems } from "./problemsGenerator.js";
import { updateProblemTypes, getSelectedProblemTypes } from "./settings.js";

let currentProblemIndex = 0;
let currentProblems = [];
let timer = null;
let startTime;
let isGameActive = false;

function startGame(onProgressUpdate) {
  if (isGameActive) return;
  isGameActive = true;
  userInput = "";
  currentProblems = generateProblems(10);
  currentProblemIndex = 0;
  onProgressUpdate(0);
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  displayProblem(currentProblems[currentProblemIndex]);
}

function displayProblem(problem) {
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
  clearInterval(timer);
  timer = null;
}

let userInput = "";

function handleInput(input, onProgressUpdate) {
  const displayElement = document.getElementById("display");

  if (!isGameActive && input === "M") {
    const currentTypes = getSelectedProblemTypes();
    const typeSymbols = {
      addition: "+",
      subtraction: "-",
      multiplication: "x",
      division: "÷",
    };
    const symbols = currentTypes.map((type) => typeSymbols[type]);
    displayElement.textContent = `Types = [${symbols.join(", ")}]`;
    return;
  }

  if (!isGameActive && ["+", "-", "x", "÷"].includes(input)) {
    updateProblemTypes(input);
    const currentTypes = getSelectedProblemTypes();
    const symbols = currentTypes.map((type) => typeSymbols[type]);
    displayElement.textContent = `Types = [${symbols.join(", ")}]`;
    return;
  }

  if (input === "Ent") {
    if (!isGameActive) {
      startGame(onProgressUpdate);
    } else {
      checkAnswer(userInput, onProgressUpdate);
      userInput = "";
    }
    return;
  }

  if (input === "O/C") {
    userInput = "";
    if (isGameActive) {
      displayElement.textContent =
        currentProblems[currentProblemIndex].question;
    } else {
      displayElement.textContent = "0";
    }
    return;
  }

  userInput += input;
  displayElement.textContent = userInput;
}

function checkAnswer(userAnswer, onProgressUpdate) {
  if (!userAnswer) return;
  const currentProblem = currentProblems[currentProblemIndex];
  const isCorrect = parseInt(userAnswer) === currentProblem.answer;

  const displayElement = document.getElementById("display");
  if (isCorrect) {
    currentProblemIndex += 1;
  } else {
    turnBarRed();
    displayElement.textContent = `${currentProblem.question} = ${currentProblem.answer}`;
    currentProblems.push(currentProblem);
    currentProblems.splice(currentProblemIndex, 1);

    setTimeout(() => {
      if (currentProblemIndex < currentProblems.length) {
        displayProblem(currentProblems[currentProblemIndex]);
      } else {
        endGame();
      }
    }, 1000);
    return;
  }

  if (currentProblemIndex < currentProblems.length) {
    displayProblem(currentProblems[currentProblemIndex]);
  } else {
    endGame();
  }

  onProgressUpdate(currentProblemIndex / currentProblems.length);
}

function endGame() {
  stopTimer();
  const totalTime = (Date.now() - startTime) / 1000;
  const displayElement = document.getElementById("display");
  displayElement.textContent = `${totalTime.toFixed(2)} secs`;
  isGameActive = false;
}

export { startGame, handleInput };
