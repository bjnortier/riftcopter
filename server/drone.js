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

  if(val > 10) {
    var back = ((val + 10) / 80) * 0.1;
    console.log('back', back)
    client.back(back);
  }
};

exports.roll = function(val) {
  if(!flying) return false;

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