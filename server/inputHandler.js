var drone;

exports.init = function(ardrone) {
  drone = ardrone;
};


exports.handle = function(data) {

  if(!drone || !data) return;

  if(data === 'takeoff') {
    drone.takeoff();
    return;
  }

  if(data === 'land') {
    drone.land();
    return;
  }

  if(!drone.ready()) return;

  if (data.orientation) {
    var orientation = data.orientation;
    
    if (orientation.pitch) {
      drone.pitch(orientation.pitch);
    }

    if(orientation.roll) {
      drone.roll(orientation.roll);
    }
  }
};