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

  if(!drone.ready()) return;

  if(data.pitch || data.roll || data.pan) {
    drone.pitch(data.pitch);
    drone.roll(data.roll);
    drone.pan(data.pan);
  }
};