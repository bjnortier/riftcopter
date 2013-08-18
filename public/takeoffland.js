socket.emit('event', 'takeoff');
setTimeout(function() {
  socket.emit('event', 'land');
})