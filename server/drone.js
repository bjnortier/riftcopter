var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var flying = false;

exports.ready = function() {
  return flying;
};

exports.initiate = function(callback) {
  if(flying) return;

  client.takeoff(function() {
    client.up(0.5);
    setTimeout(function() {
      client.stop();
      flying = true;

      callback();
    }, 1000);
  });

  console.log('taking off');
};

exports.land = function() {
  if(!flying) return;

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