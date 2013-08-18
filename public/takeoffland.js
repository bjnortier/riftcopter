setTimeout(function() {

  socket.emit('event', 'takeoff');
  setTimeout(function() {
    socket.emit('event', 'land');
  }, 3000);

}, 1000);