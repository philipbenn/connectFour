// View
class ConnectFourView {
  constructor(model, containerId) {
    this.model = model;
    this.container = document.getElementById(containerId);
    this.render();
  }

  render() {
    this.container.innerHTML = "";
    for (let row = 0; row < this.model.rows; row++) {
      for (let col = 0; col < this.model.cols; col++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener("click", () => this.handleCellClick(col));
        if (this.model.board[row][col] === 1) {
          cell.style.backgroundColor = "red";
        } else if (this.model.board[row][col] === 2) {
          cell.style.backgroundColor = "yellow";
        }
        this.container.appendChild(cell);
      }
    }
  }

  handleCellClick(col) {
    if (!this.model.dropPiece(col)) return;
    this.render();
    if (this.model.winner !== null) {
      alert(`Player ${this.model.winner} wins!`);
      this.model.resetGame();
      this.render();
    } else {
      this.computerDropPiece();
    }
  }

  computerDropPiece() {
    const randomCol = Math.floor(Math.random() * this.model.cols);
    while (!this.model.dropPiece(randomCol)) {
      randomCol = Math.floor(Math.random() * this.model.cols);
    }
    this.render();
    if (this.model.winner !== null) {
      alert(`Player ${this.model.winner} wins!`);
      this.model.resetGame();
      this.render();
    }
  }
}
