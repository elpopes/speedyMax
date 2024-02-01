let selectedTypes = ["multiplication"];

export function updateProblemTypes(input) {
  const typeMap = {
    "+": "addition",
    "-": "subtraction",
    x: "multiplication",
    "÷": "division",
  };
  const selectedType = typeMap[input];

  if (
    selectedTypes.length === 1 &&
    selectedTypes[0] === "multiplication" &&
    selectedType === "multiplication"
  ) {
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
  selectedTypes = [];
}
