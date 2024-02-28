class ConnectFourView {
  constructor(model, containerId) {
    this.model = model;
    this.container = document.getElementById(containerId);
    this.isComputerTurn = false;
    this.render();
  }

  render() {
    this.container.innerHTML = '';
    for (let row = 0; row < this.model.rows; row++) {
      for (let col = 0; col < this.model.cols; col++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.addEventListener('click', () => this.handleCellClick(col));

        if (this.model.board[row][col] === 1) {
          cell.style.backgroundColor = 'red';
        } else if (this.model.board[row][col] === 2) {
          cell.style.backgroundColor = 'yellow';
        }

        const winningCombo = this.model.checkWinner(row, col);
        if (winningCombo) {
          cell.classList.add('winning-cell');
        }

        this.container.appendChild(cell);
      }
    }
  }

  handleCellClick(col) {
    if (!this.isComputerTurn && !this.model.dropPiece(col)) return;
    this.render();
    if (this.model.winner !== null) {
        alert(`Player ${this.model.winner} wins!`);
        this.model.resetGame();
        this.render();
    } else {
      if (!this.isComputerTurn) {
        this.isComputerTurn = true;
        setTimeout(() => {
          this.computerDropPiece();
          this.isComputerTurn = false;
        }, 1000);
      }
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
