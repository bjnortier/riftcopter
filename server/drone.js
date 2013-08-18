var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var pngStream = client.getPngStream();

var flying = false;

var imageListeners = [];

exports.onImage = function(callback) {
  imageListeners.push(callback);
};

var updateImage = function(png) {
  for(var i = 0, length = imageListeners.length; i < length; i++) {
    imageListeners[i](png);
  }
};

pngStream
  .on('error', console.log)
  .on('data', updateImage);

exports.ready = function() {
  return flying;
};

exports.takeoff = function(callback) {
  if(flying) return;

  client.takeoff(function() {
    flying = true;
  });

  console.log('taking off');
};


exports.land = function() {

  client.stop();
  client.land();
  flying = false;

  console.log('landing');
};

exports.pitch = function(val) {
  if(!flying) return false;

  if(val >= -10 && val <= 10) {
    console.log('front', 0)
    client.front(0);
    return;
  }

  if(val < -10) {
    var front = ((val - 10) / -80) * 0.1;
    console.log('front', front)
    client.front(front);
  }

  if(val > 10) {
    var back = ((val + 10) / 80) * 0.1;
    console.log('back', back)
    client.back(back);
  }
};

exports.roll = function(val) {
  // if(!flying) return false;

  if(val >= -10 && val <= 10) {
    console.log('left', 0)
    client.left(0);
    return;
  }

  if(val < -10) {
    var left = ((val - 10) / -80) * 0.1;
    console.log('left', left)
    client.left(left);
  }

  if(val > 10) {
    var right = ((val + 10) / 80) * 0.1;
    console.log('right', right)
    client.right(right);
  }
};

var lastYaw;

exports.yaw = function(val) {
  if(!flying) return false;

  if (!lastYaw) {
    lastYaw = val;
  }
  var dYaw = val - lastYaw;
  var damp = 0.5;
  if (dYaw > 0.2) {
    var clockwise = dYaw*damp;
    console.log('clockwise', clockwise)
    client.clockwise(clockwise);
    lastYaw = val;
  } else if (dYaw < -0.2) {
    var counterClockwise = dYaw*damp;
    console.log('counterClockwise', counterClockwise)
    client.counterClockwise(counterClockwise);
    lastYaw = val;
  } else {
    client.counterClockwise(0);
  }

}

