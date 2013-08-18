var arDrone = require('ar-drone');
var client  = arDrone.createClient();
var flying = false;

exports.initiate = function() {
  client.takeoff();
  flying = true;

  console.log('taking off');
};

exports.land = function() {
  client.stop();
  client.land();
  flying = false;

  console.log('landing');
};