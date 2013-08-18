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

  if (data.orientation) {
    var orientation = data.orientation;
    
    // if(orientation.roll) {
    //   drone.roll(orientation.roll);
    // }
    // if (orientation.pitch) {
    //   drone.pitch(orientation.pitch);
    // }
    // if (orientation.yaw) {
    //   drone.yaw(orientation.yaw);
    // }
  }
};