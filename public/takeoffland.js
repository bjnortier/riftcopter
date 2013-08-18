setTimeout(function() {

  socket.emit('event', 'takeoff');
  setTimeout(function() {
    socket.emit('event', 'land');
  }, 8000);

}, 1000);