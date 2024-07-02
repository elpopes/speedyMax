let calculatorMode = false;

function toggleCalculatorMode() {
  calculatorMode = !calculatorMode;
  console.log(`Calc mode: ${calculatorMode ? "ON" : "OFF"}`);
  updateCalculatorModeDisplay();
}

function handleCalculatorInput(input, userInput) {
  const displayElement = document.getElementById("display");
  if (input === "O/C") {
    userInput = "";
    displayElement.textContent = "0";
  } else if (input === "Ent") {
    try {
      const result = eval(userInput.replace("×", "*").replace("÷", "/"));
      displayElement.textContent = result;
      userInput = "";
    } catch (error) {
      displayElement.textContent = "ERROR";
      userInput = "";
    }
  } else {
    userInput += input;
    displayElement.textContent = userInput;
  }
  return userInput;
}

function updateCalculatorModeDisplay() {
  const displayElement = document.getElementById("display");
  displayElement.textContent = calculatorMode
    ? "Calc Mode: On"
    : "Calc Mode: Off";
}

function isCalculatorMode() {
  return calculatorMode;
}

export {
  toggleCalculatorMode,
  handleCalculatorInput,
  isCalculatorMode,
  updateCalculatorModeDisplay,
};
