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
    forward(0);
    return;
  }

  if(val < -10) {
    forward(((val - 10) / -80) * 0.1);
  }
};

var forward = function(val) {
  client.front();
  console.log('forward: ' + val);
};