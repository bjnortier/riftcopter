var bridge = new OculusBridge({
  "onOrientationUpdate" : function(quatValues) {
    var x = quatValues.x, y = quatValues.y, z = quatValues.z, w = quatValues.w;
    var yaw  = -Math.atan2(2*y*w - 2*x*z, 1 - 2*y*y - 2*z*z)/Math.PI*180;
    var pitch = Math.atan2(2*x*w - 2*y*z, 1 - 2*x*x - 2*z*z)/Math.PI*180;
    var roll   =  -Math.asin(2*x*y + 2*z*w)/Math.PI*180;
    document.getElementById('roll').innerHTML = roll;
    document.getElementById('pitch').innerHTML = pitch;
    document.getElementById('yaw').innerHTML = yaw;
    socket.emit('event', {
      orientation: {
        roll: roll, pitch: pitch, yaw: yaw,
      }
    });

  }
});
bridge.connect();