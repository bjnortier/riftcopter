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
    var front = ((val - 10) / -80) * 0.3;
    console.log('front', front)
    client.front(front);
  }

  if(val > 10) {
    var back = ((val + 10) / 80) * 0.3;
    console.log('back', back)
    client.back(back);
  }
};

exports.roll = function(val) {
  if(!flying) return false;

  if(val >= -10 && val <= 10) {
    client.left(0);
    return;
  }

  if(val < -10) {
    var left = ((val - 10) / -80) * 0.3;
    console.log('left', left)
    client.left(left);
  }

  if(val > 10) {
    var right = ((val + 10) / 80) * 0.3;
    console.log('right', right)
    client.right(right);
  }
};

var lastYaw;
var lastOutputs = [0,0,0,0,0,0,0,0,0,0];
var lastClockwise = 0;

exports.yaw = function(val) {
  if(!flying) return false;

  if (!lastYaw) {
    lastYaw = val;
  }
  var dYaw = val - lastYaw;
  if ((val < -90) && (lastYaw > 90)) {
    dYaw = 360 + dYaw;
  } else if ((val > 90) && (lastYaw < -90)) {
    dYaw = dYaw - 360;
  }
  
  var clockwise = dYaw;
  lastOutputs = [clockwise].concat(lastOutputs.slice(0, 9));
  lastYaw = val;

  var damp = 0.1;
  var avg = lastOutputs.reduce(function(acc, x) {
    return acc + x;
  }, 0) / 10*damp;
  if (Math.abs(avg) > 0.1) {

    console.log('clockwise', avg);
    if (avg > 0) {
      client.clockwise(avg);
      lastClockwise = avg;
    } else {
      client.counterClockwise(-avg);
      lastClockwise = avg;
    }
  } else {
    if (lastClockwise !== 0) {
      console.log('clockwise', 0);
      client.clockwise('clockwise', 0);
      lastClockwise = 0;
    }
  }

}

