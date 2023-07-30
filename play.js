const net = require('node:net');
const { Game } = require('./src/game');
const { GameController } = require('./src/game-controller');
const { Player } = require('./src/player');
const { Players } = require('./src/players');

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

const conductGame = (players) => console.log(players);

const initiateGame = (clients) => {
  const players = [];
  clients.forEach((client, clientIndex) => {
    client.socket.write('\nEnter your name: ');

    client.socket.once('data', (name) => {
      const player = new Player(name, SYMBOLS[clientIndex]);
      players.push({ client: clients[clientIndex], player });

      const bothPlayerEnteredName = players.length === 2;

      if (bothPlayerEnteredName) conductGame(players);
    });
  });
};

const main = () => {
  const gameServer = net.createServer();
  gameServer.listen(8000, () => console.log('Tic Tac Toe Server is Live'));
  const clients = { old: [], new: [] };

  gameServer.on('connection', (socket) => {
    socket.setEncoding('utf-8');
    clients.new.push({ socket });

    if (clients.new.length === 2) {
      initiateGame(clients.new);
      clients.old.push(...clients.new);
      clients.new = [];
      return;
    }

    clients.new[0].socket.write('Waiting for Another Player\n');
  });
};

main();
