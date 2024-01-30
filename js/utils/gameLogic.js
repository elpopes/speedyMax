import { generateProblems } from "./problemsGenerator.js";

let currentProblemIndex = 0;
let currentProblems = [];
let timer = null;
let startTime;
let isGameActive = false;

function startGame() {
  if (isGameActive) return;
  isGameActive = true;
  currentProblems = generateProblems(5);
  currentProblemIndex = 0;
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  displayProblem(currentProblems[currentProblemIndex]);
}

function displayProblem(problem) {
  const displayElement = document.getElementById("display");
  displayElement.textContent = problem.question;
}

function nextProblem() {
  if (currentProblemIndex < currentProblems.length - 1) {
    currentProblemIndex += 1;
    displayProblem(currentProblems[currentProblemIndex]);
  } else {
    endGame();
  }
}

function updateTimer() {
  const currentTime = Date.now();
  const elapsedTime = currentTime - startTime;
  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;
  const timerDisplay = document.getElementById("timerDisplay");
  timerDisplay.textContent = formattedTime;
}

function stopTimer() {
  clearInterval(timer);
  timer = null;
}

let userInput = "";

function handleInput(input) {
  const displayElement = document.getElementById("display");

  if (input === "Ent") {
    checkAnswer(userInput);
    userInput = "";
  } else {
    userInput += input;
    displayElement.textContent = userInput;
  }
}

function checkAnswer(userAnswer) {
  const currentProblem = currentProblems[currentProblemIndex];

  if (parseInt(userAnswer) === currentProblem.answer) {
    currentProblemIndex += 1;
  } else {
    currentProblems.push(currentProblem);
  }

  if (currentProblemIndex < currentProblems.length) {
    displayProblem(currentProblems[currentProblemIndex]);
  } else {
    endGame();
  }
}

function endGame() {
  stopTimer();
  const totalTime = (Date.now() - startTime) / 1000;
  const displayElement = document.getElementById("display");
  displayElement.textContent = `${totalTime.toFixed(2)} secs`;
}

export { startGame, handleInput };
