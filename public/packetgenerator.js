var bridge = new OculusBridge({
  "onOrientationUpdate" : function(quatValues) {
    socket.emit('quat', quatValues);
  }
});
bridge.connect();