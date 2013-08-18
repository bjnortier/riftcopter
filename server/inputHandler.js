var drone;

exports.init = function(ardrone) {
  drone = ardrone;
};


exports.handle = function(data) {
  if(!drone || !data) return;

  if(data === 'takeoff') {
    drone.initiate();
    return;
  }

  if(data === 'land') {
    drone.land();
    return;
  }

  if(data.tilt || data.roll || data.pan) {
    drone.tilt(data.tilt);
    drone.roll(data.roll);
    drone.pan(data.pan);
  }
};