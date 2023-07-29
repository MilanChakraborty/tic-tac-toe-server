const { Game } = require("./src/game");
const { GameController } = require("./src/game-controller");
const { GameRenderer } = require("./src/game-renderer");
const { KeyboardController } = require("./src/keyboard-controller");
const { Player } = require("./src/player");
const { Players } = require("./src/players");

const SYMBOLS = ['O', 'X'];

const keymap = {
  q: ['move-entered', 0],
  w: ['move-entered', 1],
  e: ['move-entered', 2],
  a: ['move-entered', 3],
  s: ['move-entered', 4],
  d: ['move-entered', 5],
  z: ['move-entered', 6],
  x: ['move-entered', 7],
  c: ['move-entered', 8],
};

const main = () => {
  const player1Name = process.argv[2];
  const player2Name = process.argv[3];

  const player1 = new Player(player1Name, SYMBOLS[0]);
  const player2 = new Player(player2Name, SYMBOLS[1]);

  const players = new Players(player1, player2);

  const game = new Game(players);

  const inputController = new KeyboardController(process, keymap);
  const renderer = new GameRenderer();

  const gameController = new GameController(game, inputController, renderer);
  gameController.start();
}

main();