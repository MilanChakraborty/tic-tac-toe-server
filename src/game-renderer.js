class GameRenderer {
  #renderBoard(moves) {
    console.clear();
    for (let i = 0; i < 9; i += 3) {
      const row = [i, i + 1, i + 2].map(x => moves[x] || ' ').join('|');
      console.log(row);
    }
  }

  #promptPlayerForInput(player) {
    console.log(player, "'s turn");
  }

  #printWelcomeMessage() {
    console.log('Welcome to TicTacToe Game\n');
  }

  #congratulateWinner(winnerName) {
    console.log(winnerName, ' Won!!!');
  }

  #printGameOverMessage() {
    console.log('Game Over!!!');
  }

  render(gameStatus) {
    const { moves, currentPlayerName, winner, isOver } = gameStatus;
    this.#renderBoard(moves);

    switch (true) {
      case (winner && isOver):
        this.#congratulateWinner(winner);
        break;
      case (isOver):
        this.#printGameOverMessage();
        break;
      case (moves.length === 0):
        this.#printWelcomeMessage();
        break;
      default: this.#promptPlayerForInput(currentPlayerName);
    }
  }
}

module.exports = { GameRenderer };