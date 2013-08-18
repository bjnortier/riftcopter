var drone;

exports.init = function(ardrone) {
  drone = ardrone;
};

exports.handle = function(data) {
  if(!drone) return;

  if(data === 'takeoff') {
    drone.initiate();
    return;
  }

  if(data === 'land') {
    drone.land();
    return;
  }
};