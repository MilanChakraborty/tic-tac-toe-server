const net = require('node:net');

const welcomePlayers = (players) => {
  players.forEach((player) => {
    player.write('Welcome To Tic Tak Toe\n');
  });
};

const conductGame = (players) => {
  welcomePlayers(players);
  
};

const main = () => {
  const server = net.createServer();
  server.listen(8000, () => console.log('Server is Live'));

  let players = { old: [], new: [] };

  server.on('connection', (socket) => {
    players.new.push(socket);

    if (players.new.length >= 2) {
      conductGame(players.new);
      players.old.push(...players.new);
      players.new = [];
      return;
    }

    players.new[0].write('Waiting for Another Player\n');
  });
};

main();
