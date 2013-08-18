var bridge = new OculusBridge({
  "onOrientationUpdate" : function(quatValues) {
    var x = quatValues.x, y = quatValues.y, z = quatValues.z, w = quatValues.w;
    var roll  = Math.atan2(2*y*w - 2*x*z, 1 - 2*y*y - 2*z*z);
    var pitch = Math.atan2(2*x*w - 2*y*z, 1 - 2*x*x - 2*z*z);
    var yaw   =  Math.asin(2*x*y + 2*z*w);
    socket.emit('event', {
      pitch: pitch/Math.PI*180,
      roll: -yaw/Math.PI*180,
      yaw: roll/Math.PI*180,
    })
  }
});
bridge.connect();