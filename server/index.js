var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
  socket.emit('info', { state: 'connected' });


  socket.on('event', function (data) {
    console.log(data);
  });
});