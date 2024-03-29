let selectedTypes = ["multiplication"];

export function updateProblemTypes(input) {
  const typeMap = {
    "+": "addition",
    "-": "subtraction",
    "×": "multiplication",
    "÷": "division",
  };
  const selectedType = typeMap[input];

  if (selectedTypes.length === 1 && selectedType === "multiplication") {
    return;
  }

  if (selectedTypes.includes(selectedType)) {
    selectedTypes = selectedTypes.filter((type) => type !== selectedType);
  } else {
    selectedTypes.push(selectedType);
  }

  if (selectedTypes.length === 0) {
    selectedTypes.push("multiplication");
  }
}

export function getSelectedProblemTypes() {
  return selectedTypes;
}

export function resetProblemTypes() {
  selectedTypes = ["multiplication"];
}
