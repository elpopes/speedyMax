let isCalculatorMode = false;

function toggleCalculatorMode() {
  isCalculatorMode = !isCalculatorMode;
  console.log(`Calc mode: ${isCalculatorMode ? "ON" : "OFF"}`);
  updateCalculatorModeDisplay(); // Update the display
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
  displayElement.textContent = isCalculatorMode
    ? "Calc Mode: On"
    : "Calc Mode: Off";
}

export {
  toggleCalculatorMode,
  handleCalculatorInput,
  isCalculatorMode,
  updateCalculatorModeDisplay,
};
