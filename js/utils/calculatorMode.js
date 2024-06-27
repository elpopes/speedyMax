let isCalculatorMode = false;

function toggleCalculatorMode() {
  isCalculatorMode = !isCalculatorMode;
  console.log(`Cal mode: ${isCalculatorMode ? "ON" : "OFF"}`);
  const displayElement = document.getElementById("display");
  displayElement.textContent = isCalculatorMode ? "Calc Mode" : "ENT TO START";
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

export { toggleCalculatorMode, handleCalculatorInput, isCalculatorMode };
