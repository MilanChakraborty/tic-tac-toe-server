class GameController {
  #game;
  #inputController;

  constructor(game, IOController) {
    this.#game = game;
    this.#inputController = IOController;
  }

  start() {
    this.#renderer.render(this.#game.status());

    this.#inputController.on('move-entered', (keyPressed) => {
      this.#game.consolidateMove(keyPressed);
      this.#renderer.render(this.#game.status());
      if (this.#game.status().isOver) {
        this.#inputController.stop();
      }
    });

    this.#inputController.on('illegal-move-entered', (move) => {
      this.#renderer.render(this.#game.status());
      console.log('Illegal Move', move);
    });

    this.#inputController.start();
  }
}

module.exports = { GameController };
