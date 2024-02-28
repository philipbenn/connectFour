// Model
class ConnectFourModel {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.board = [];
    this.currentPlayer = 1;
    this.winner = null;
    this.initBoard();
  }

  initBoard() {
    for (let i = 0; i < this.rows; i++) {
      this.board.push(Array(this.cols).fill(0));
    }
  }

  dropPiece(col) {
    if (this.winner !== null) return false;
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row][col] === 0) {
        this.board[row][col] = this.currentPlayer;
        if (this.checkWinner(row, col)) {
          this.winner = this.currentPlayer;
          return true;
        } else {
          this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
          return true;
        }
      }
    }
    return false;
  }

  checkWinner(row, col) {
    const player = this.board[row][col];

    // Check horizontally
    let count = 0;
    for (let c = 0; c < this.cols; c++) {
      if (this.board[row][c] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }

    // Check vertically
    count = 0;
    for (let r = 0; r < this.rows; r++) {
      if (this.board[r][col] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }

    // Check diagonally (top-left to bottom-right)
    count = 0;
    let startRow = row - Math.min(row, col);
    let startCol = col - Math.min(row, col);
    while (startRow < this.rows && startCol < this.cols) {
      if (this.board[startRow][startCol] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
      startRow++;
      startCol++;
    }

    // Check diagonally (top-right to bottom-left)
    count = 0;
    startRow = row + Math.min(this.rows - 1 - row, col);
    startCol = col - Math.min(this.rows - 1 - row, col);
    while (startRow >= 0 && startCol < this.cols) {
      if (this.board[startRow][startCol] === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
      startRow--;
      startCol++;
    }

    return false;
  }

  resetGame() {
    this.board = [];
    this.winner = null;
    this.initBoard();
  }
}
