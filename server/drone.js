var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var flying = false;

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
};

var lastYaw;

exports.yaw = function(val) {
  // if(!flying) return false;

  if (!lastYaw) {
    lastYaw = val;
  }
  var dYaw = val - lastYaw;
  var damp = 0.5;
  if (dYaw > 0.2) {
    var right = dYaw*damp;
    console.log('right', right)
    client.right(left);
    lastYaw = val;
  } else if (dYaw < -0.2) {
    var left = dYaw*damp;
    console.log('left', left)
    client.left(left);
    lastYaw = val;
  } else {
    client.left(0);
  }

}

var forward = function(val) {
  client.front();
  console.log('forward: ' + val);
};