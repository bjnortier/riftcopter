var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var flying = false;

exports.initiate = function() {
  if(flying) return;

  client.takeoff();
  flying = true;

  console.log('taking off');
};

exports.land = function() {
  if(!flying) return;
  
  client.stop();
  client.land();
  flying = false;

  console.log('landing');
};

exports.tilt = function(tilt) {};