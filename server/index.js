var io = require('socket.io').listen(1337);
var drone = require('./drone');
var inputHandler = require('./inputHandler');
inputHandler.init(drone);

io.sockets.on('connection', function (socket) {
  drone.initiate();

  socket.emit('info', { state: 'connected' });

  socket.on('event', function (data) {
    inputHandler.handle(data);
  });
});