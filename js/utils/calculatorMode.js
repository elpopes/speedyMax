let isCalculatorMode = false;

function toggleCalculatorMode() {
  isCalculatorMode = !isCalculatorMode;
  console.log(`Calculator mode: ${isCalculatorMode ? "ON" : "OFF"}`);
  const displayElement = document.getElementById("display");
  displayElement.textContent = isCalculatorMode
    ? "Calculator Mode"
    : "ENT TO START";
}

function handleCalculatorInput(input) {
  const displayElement = document.getElementById("display");
  if (input === "O/C") {
    clearUserInput();
  } else if (input === "Ent") {
    try {
      const result = eval(userInput.replace("×", "*").replace("÷", "/"));
      displayElement.textContent = result;
      userInput = "";
    } catch (error) {
      displayElement.textContent = "ERROR";
    }
  } else {
    userInput += input;
    displayElement.textContent = userInput;
  }
}

function clearUserInput() {
  userInput = "";
  const displayElement = document.getElementById("display");
  displayElement.textContent = "0";
}

export { toggleCalculatorMode, handleCalculatorInput, isCalculatorMode };
