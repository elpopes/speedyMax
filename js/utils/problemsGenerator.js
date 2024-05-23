import { getSelectedProblemTypes, getProblemCount } from "./settings.js";

function generateProblem() {
  let problem = {
    question: "",
    answer: null,
  };

  const createAdditionProblem = () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * 100);
    return {
      question: `${num1} + ${num2}`,
      answer: num1 + num2,
    };
  };

  const createSubtractionProblem = () => {
    const num1 = Math.floor(Math.random() * 100);
    const num2 = Math.floor(Math.random() * num1);
    return {
      question: `${num1} - ${num2}`,
      answer: num1 - num2,
    };
  };

  const createMultiplicationProblem = () => {
    const num1 = Math.floor(Math.random() * 13);
    const num2 = Math.floor(Math.random() * 13);
    return {
      question: `${num1} × ${num2}`,
      answer: num1 * num2,
    };
  };

  const createDivisionProblem = () => {
    const num2 = Math.floor(Math.random() * 12) + 1;
    const multiplier = Math.floor(Math.random() * 12) + 1;
    const num1 = num2 * multiplier;
    return {
      question: `${num1} ÷ ${num2}`,
      answer: multiplier,
    };
  };

  const problemTypeFunctions = {
    "+": createAdditionProblem,
    "-": createSubtractionProblem,
    "×": createMultiplicationProblem,
    "÷": createDivisionProblem,
  };

  const selectedTypes = getSelectedProblemTypes();
  let problemTypes = Object.keys(problemTypeFunctions);

  if (selectedTypes.length > 0) {
    problemTypes = problemTypes.filter((type) => selectedTypes.includes(type));
  }

  const selectedType =
    problemTypes[Math.floor(Math.random() * problemTypes.length)];
  const createProblem = problemTypeFunctions[selectedType];

  problem = createProblem();

  return problem;
}

function generateProblems() {
  const problems = [];
  const count = getProblemCount();
  for (let i = 0; i < count; i++) {
    problems.push(generateProblem());
  }
  return problems;
}

export { generateProblems };
