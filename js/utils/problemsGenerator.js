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
      question: `${num1} x ${num2}`,
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

  const problemTypes = [
    // createAdditionProblem,
    // createSubtractionProblem,
    createMultiplicationProblem,
    // createDivisionProblem,
  ];
  const createProblem =
    problemTypes[Math.floor(Math.random() * problemTypes.length)];

  problem = createProblem();

  return problem;
}

function generateProblems(count) {
  const problems = [];
  for (let i = 0; i < count; i++) {
    problems.push(generateProblem());
  }
  return problems;
}

export { generateProblems };