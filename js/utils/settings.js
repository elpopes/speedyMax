let selectedTypes = ["×"];
let problemCount = 10;

export function updateProblemTypes(input) {
  const typeMap = {
    "+": "+",
    "-": "-",
    "×": "×",
    "÷": "÷",
  };
  const selectedType = typeMap[input];

  if (selectedTypes.length === 1 && selectedType === "×") {
    return;
  }

  if (selectedTypes.includes(selectedType)) {
    selectedTypes = selectedTypes.filter((type) => type !== selectedType);
  } else {
    selectedTypes.push(selectedType);
  }

  if (selectedTypes.length === 0) {
    selectedTypes.push("×");
  }
}

export function setProblemCount(newCount) {
  problemCount = newCount;
}

export function getProblemCount() {
  return problemCount;
}

export function getSelectedProblemTypes() {
  return selectedTypes;
}

export function resetProblemTypes() {
  selectedTypes = ["×"];
}
