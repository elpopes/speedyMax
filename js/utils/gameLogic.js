import { turnBarRed } from "./dotMatrixDisplay.js";
import { generateProblems } from "./problemsGenerator.js";
import {
  updateProblemTypes,
  getSelectedProblemTypes,
  setProblemCount,
  getProblemCount,
} from "./settings.js";
import {
  toggleCalculatorMode,
  handleCalculatorInput,
  isCalculatorMode,
  updateCalculatorModeDisplay,
} from "./calculatorMode.js";

let currentProblemIndex = 0;
let currentProblems = [];
let timer = null;
let startTime;
let isGameActive = false;
let isSettingProblemCount = false;
let isSettingProblemTypes = false;
let problemCountInput = "";
let userInput = "";

const MAX_USER_INPUT_LENGTH = 10;
const MAX_PROBLEM_COUNT = 999;
const displayElement = document.getElementById("display");

function startGame(onProgressUpdate) {
  console.log("Starting game...");
  clearUserInput();
  if (isGameActive || isSettingProblemCount) {
    console.log("Game is already active or setting problem count");
    return;
  }
  isGameActive = true;
  const problemsCount = getProblemCount() || 10;
  currentProblems = generateProblems(problemsCount);
  currentProblemIndex = 0;
  onProgressUpdate(0);
  startTime = Date.now();
  timer = setInterval(updateTimer, 1000);
  displayProblem(currentProblems[currentProblemIndex]);
}

function displayProblem(problem) {
  console.log("Displaying problem:", problem.question);
  displayElement.textContent = problem.question;
  console.log(
    `Updated displayElement with problem question: ${displayElement.textContent}`
  );
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

  if (isCalculatorMode) {
    // Correctly using the variable
    if (input === "X") {
      toggleCalculatorMode();
      clearUserInput();
      updateCalculatorModeDisplay();
      return;
    }
    userInput = handleCalculatorInput(input, userInput);
    return;
  }

  if (
    !isGameActive &&
    isSettingProblemTypes &&
    ["+", "-", "×", "÷"].includes(input)
  ) {
    console.log("Setting problem types...");
    handleSettingsInput(input);
    return;
  }

  if (!isGameActive && input === "M") {
    console.log("Entering problem types setting mode...");
    isSettingProblemTypes = true;
    displayElement.textContent = `Types: ${getSelectedProblemTypes().join(
      ", "
    )}`;
    return;
  }

  if (input === "A" && !isGameActive) {
    console.log("Setting problem count...");
    isSettingProblemCount = true;
    problemCountInput = "";
    displayElement.textContent = "Set Count:";
    return;
  }

  if (!isGameActive && input === "X") {
    console.log("Toggling calculator mode...");
    toggleCalculatorMode();
    clearUserInput();
    updateCalculatorModeDisplay();
    return;
  }

  if (isSettingProblemCount) {
    console.log("In problem count setting mode...");
    handleProblemCountSetting(input, displayElement);
    return;
  }

  if (!isGameActive && input === "Ent") {
    if (userInput.length > 0) {
      evaluateUserInput();
    } else {
      displayElement.textContent = "ENT TO START";
    }
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

  if (!isGameActive) {
    if (userInput.length < MAX_USER_INPUT_LENGTH) {
      console.log("Displaying input:", input);
      userInput += input;
      displayElement.textContent = userInput;
    } else {
      console.log("User input reached max length");
    }
    return;
  }

  if (isGameActive) {
    if (userInput.length < MAX_USER_INPUT_LENGTH) {
      console.log("Adding to user input:", input);
      userInput += input;
      displayElement.textContent = userInput;
    } else {
      console.log("User input reached max length");
    }
  }
}

function handleSettingsInput(input) {
  console.log("Handling settings input:", input);
  if (input !== "M") {
    updateProblemTypes(input);
  }
  const currentTypes = getSelectedProblemTypes();
  displayElement.textContent = `Types: ${currentTypes.join(", ")}`;
  if (input === "Ent") {
    isSettingProblemTypes = false;
    displayElement.textContent = `Types set: ${currentTypes.join(", ")}`;
    setTimeout(() => {
      displayElement.textContent = "ENT TO START";
    }, 2000);
  }
}

function handleProblemCountSetting(input, displayElement) {
  console.log("Handling problem count setting:", input);
  if (!isNaN(input) && problemCountInput.length < 3) {
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
  if (!isNaN(count) && count > 0 && count <= MAX_PROBLEM_COUNT) {
    setProblemCount(count);
    displayElement.textContent = `Set ${count} probs`;
    setTimeout(() => {
      isSettingProblemCount = false;
      problemCountInput = "";
      displayElement.textContent = "ENT TO START";
      isGameActive = false;
      console.log("Problem count set and game reset");
    }, 2000);
  } else {
    console.log("Invalid problem count, resetting...");
    problemCountInput = "";
    displayElement.textContent = "Set Count:";
  }
}

function clearUserInput() {
  console.log("Clearing user input...");
  userInput = "";
  displayElement.textContent = isGameActive
    ? currentProblems[currentProblemIndex].question
    : "ENT TO START";
}

function evaluateUserInput() {
  if (/^[0-9]+$/.test(userInput)) {
    displayElement.textContent = userInput;
  } else if (/^[0-9+\-×÷]+$/.test(userInput)) {
    try {
      const expression = userInput.replace("×", "*").replace("÷", "/");
      const result = eval(expression);
      displayElement.textContent = result;
    } catch {
      displayElement.textContent = "ERROR";
      setTimeout(() => {
        displayElement.textContent = "ENT TO START";
      }, 2000);
    }
  } else {
    displayElement.textContent = "ERROR";
    setTimeout(() => {
      displayElement.textContent = "ENT TO START";
    }, 2000);
  }
  userInput = "";
}

function checkAnswer(userAnswer, onProgressUpdate) {
  console.log("Checking answer:", userAnswer);
  if (!userAnswer) return;
  const currentProblem = currentProblems[currentProblemIndex];
  const isCorrect = parseInt(userAnswer) === currentProblem.answer;

  if (isCorrect) {
    console.log("Answer is correct, moving to next problem...");
    currentProblemIndex += 1;
    onProgressUpdate(currentProblemIndex / currentProblems.length);

    if (currentProblemIndex < currentProblems.length) {
      displayProblem(currentProblems[currentProblemIndex]);
    } else {
      endGame();
      return;
    }
  } else {
    console.log("Answer is incorrect, showing correct answer...");
    turnBarRed();
    displayElement.textContent = `${currentProblem.question} = ${currentProblem.answer}`;
    setTimeout(() => {
      currentProblems.push(currentProblems.splice(currentProblemIndex, 1)[0]);
      console.log("Moved incorrect problem to the back of the queue");
      displayProblem(currentProblems[currentProblemIndex]);
    }, 3000);
  }
}

function endGame() {
  console.log("Ending game...");
  stopTimer();
  const totalTime = (Date.now() - startTime) / 1000;
  console.log(`Total time: ${totalTime.toFixed(2)} secs`);

  displayElement.textContent = `${totalTime.toFixed(1)} secs`;
  console.log(
    `Updated displayElement with total time: ${displayElement.textContent}`
  );

  setTimeout(() => {
    console.log("Game ended");
    isGameActive = false;
  }, 5000);
}

export { startGame, handleInput };
