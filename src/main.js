import Fraction from "./fraction.js";
import rrefFraction from "./rref.js";
import "./style.css";

function toFractionMatrix(matrix) {
  return matrix.map((row) => row.map((v) => new Fraction(v)));
}

function isZeroRow(row) {
  return row.every((v) => v.isZero());
}

function rankFromRREF(matrix) {
  let rank = 0;
  for (const row of matrix) {
    if (!isZeroRow(row)) rank++;
  }
  return rank;
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  updateMatrixSize();

  // イベントリスナの追加
  document
    .getElementById("updateSizeBtn")
    .addEventListener("click", updateMatrixSize);
  document.getElementById("calculateBtn").addEventListener("click", calculate);
  document.getElementById("clearBtn").addEventListener("click", clearMatrix);
  document.getElementById("exampleBtn").addEventListener("click", fillExample);
});

function updateMatrixSize() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);

  const container = document.getElementById("matrixInput");
  container.innerHTML = "";
  container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const input = document.createElement("input");
      input.type = "number";
      input.step = "any";
      input.value = "0";
      input.dataset.row = i;
      input.dataset.col = j;
      container.appendChild(input);
    }
  }
}

function clearMatrix() {
  const inputs = document.querySelectorAll("#matrixInput input");
  inputs.forEach((input) => (input.value = "0"));
  document.getElementById("resultSection").classList.remove("show");
}

function fillExample() {
  const example = [
    [5, -2, 0, 5],
    [-2, 8, 4, 0],
    [0, 4, 12, 4],
  ];

  document.getElementById("rows").value = 3;
  document.getElementById("cols").value = 4;
  updateMatrixSize();

  const inputs = document.querySelectorAll("#matrixInput input");
  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    if (row < example.length && col < example[0].length) {
      input.value = example[row][col];
    }
  });
}

function getMatrixFromInputs() {
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const matrix = [];

  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const input = document.querySelector(
        `input[data-row="${i}"][data-col="${j}"]`
      );
      row.push(parseFloat(input.value) || 0);
    }
    matrix.push(row);
  }

  return matrix;
}

function displayMatrix(matrix) {
  const container = document.getElementById("resultMatrix");
  const grid = document.createElement("div");
  grid.className = "matrix-grid";
  grid.style.gridTemplateColumns = `repeat(${matrix[0].length}, 1fr)`;

  matrix.forEach((row) => {
    row.forEach((val) => {
      const cell = document.createElement("div");
      cell.style.padding = "10px";
      cell.style.textAlign = "center";
      cell.style.fontFamily = "monospace";
      cell.style.fontSize = "16px";
      cell.textContent = val.toString();
      grid.appendChild(cell);
    });
  });

  container.innerHTML = "";
  container.appendChild(grid);
}

function calculate() {
  const A = getMatrixFromInputs();

  const fracMatrix = toFractionMatrix(A);
  const result = rrefFraction(fracMatrix);
  const rank = rankFromRREF(result.matrix);

  displayMatrix(result.matrix);
  document.getElementById("operationCount").textContent = result.operationCount;
  document.getElementById("rank").textContent = rank;
  document.getElementById("resultSection").classList.add("show");
}
