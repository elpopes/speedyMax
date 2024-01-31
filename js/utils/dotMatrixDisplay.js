export function initializeDotMatrixDisplay(dotCount) {
  const dotMatrixDisplay = document.getElementById("dotMatrixDisplay");
  dotMatrixDisplay.innerHTML = "";

  for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    dotMatrixDisplay.appendChild(dot);
  }
}

export function updateCompletionBar(progressPercentage) {
  const dots = document.querySelectorAll("#dotMatrixDisplay .dot");
  const activeDotCount = Math.round(dots.length * progressPercentage);

  dots.forEach((dot, index) => {
    dot.style.opacity = index < activeDotCount ? 1 : 0.2;
  });
}
