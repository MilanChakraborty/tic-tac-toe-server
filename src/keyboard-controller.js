const EventEmitter = require('events');

const FORCE_QUIT_SEQUENCES = ['p'];

class KeyboardController extends EventEmitter {
  #stdin;
  #keymap;

  constructor({ stdin }, keymap) {
    super();
    this.#stdin = stdin;
    this.#keymap = keymap;
  }

  start() {
    this.#stdin.setRawMode(true);
    this.#stdin.setEncoding('utf-8');

    this.#stdin.on('data', (data) => {
      console.log(data);
      switch (true) {
        case (FORCE_QUIT_SEQUENCES.includes(data)): this.#stdin.destroy();
          break;
        case (this.#keymap[data] === undefined): this.emit('illegal-move-entered', data);
          break;
        default: this.emit(...this.#keymap[data]);
      }
    });
  }

  stop() {
    this.#stdin.destroy();
  }
}

module.exports = { KeyboardController };