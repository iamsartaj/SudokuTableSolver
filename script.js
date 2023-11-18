//Fill numbers
document.querySelector("#board").addEventListener("keyup", (event) => {
  if (event.target && event.target.nodeName == "TD") {
    let validNum = /[1-9]/;
    let tdElmnt = event.target;
    if (tdElmnt.innerText.length > 0 && validNum.test(tdElmnt.innerText[0])) {
      tdElmnt.innerText = tdElmnt.innerText[0];
      tdElmnt.style.backgroundColor = "lightgrey";
    } else {
      tdElmnt.innerText = "";
      tdElmnt.style.backgroundColor = "white";
    }
  }
});

document.querySelector("#reset-button").addEventListener("click", () => {
  let tdArey = document.getElementsByTagName("td");

  for (let i = 0; i < tdArey.length; i++) {
    tdArey[i].innerText = "";
    tdArey[i].style.backgroundColor = "white";
  }

  document.getElementById("invalid-sudoku").innerText = "";
  document.querySelector("h4").innerText = "Sartaj";
});

document.querySelector("#solve-button").addEventListener("click", () => {
  let sudokuarey = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let tdArey = document.getElementsByTagName("td");
  let row = -1,
    column = 0,
    count = 0;
  for (let i = 0; i < tdArey.length; i++) {
    if (i % 9 === 0) {
      row++;
      column = 0;
    }

    if (tdArey[i].innerText.length != 0) {
      sudokuarey[row][column] = Number(tdArey[i].innerText);
      count++;
    }

    column++;
  }

  if (count === 0) {
    document.querySelector("h4").innerText = "";
    document.querySelector("#invalid-sudoku").innerText =
      "Sudoku is Empty, Please fill numbers!";
    return;
  }

  if (isValidSudoku(sudokuarey)) {
    solveSudoku(sudokuarey, 0, 0);
    dsplySodoku(sudokuarey);
    document.querySelector("#invalid-sudoku").innerText = "";
    document.querySelector("h4").innerText = "Sartaj";
  } else {
    document.querySelector("h4").innerText = "";
    document.getElementById("invalid-sudoku").innerText =
      "Invalid Sudoku, Please fill correct numbers!";
  }
});

function solveSudoku(sudokuarey, row, col) {
  if (col === sudokuarey.length) {
    row++;
    col = 0;
  }

  if (row === sudokuarey.length) {
    return true;
  }

  if (sudokuarey[row][col] !== 0) {
    return solveSudoku(sudokuarey, row, col + 1);
  }

  for (let choice = 1; choice <= 9; choice++) {
    if (isValid(sudokuarey, row, col, choice)) {
      sudokuarey[row][col] = choice;
      if (solveSudoku(sudokuarey, row, col + 1)) {
        return true;
      }
      sudokuarey[row][col] = 0;
    }
  }

  return false;
}

function isValid(sudokuarey, row, col, value) {
  for (let i = 0; i < sudokuarey.length; i++) {
    if (sudokuarey[i][col] === value) {
      return false;
    }
  }

  for (let i = 0; i < sudokuarey.length; i++) {
    if (sudokuarey[row][i] === value) {
      return false;
    }
  }

  const r = row - (row % 3);
  const c = col - (col % 3);

  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      if (sudokuarey[i][j] === value) {
        return false;
      }
    }
  }

  return true;
}

function dsplySodoku(sudokuarey) {
  let tdArey = document.getElementsByTagName("td");
  let idx = 0;
  for (let i = 0; i < sudokuarey.length; i++) {
    for (let j = 0; j < sudokuarey.length; j++) {
      tdArey[idx].innerText = `${sudokuarey[i][j]}`;
      idx++;
    }
  }
}

function isValidSudoku(sudokuarey) {
  for (let i = 0; i < sudokuarey.length; i++) {
    for (let j = 0; j < sudokuarey.length; j++) {
      if (sudokuarey[i][j] !== 0) {
        let val = sudokuarey[i][j];
        sudokuarey[i][j] = 0;
        if (!isValid(sudokuarey, i, j, val)) {
          sudokuarey[i][j] = val;
          return false;
        }

        sudokuarey[i][j] = val;
      }
    }
  }
  return true;
}
