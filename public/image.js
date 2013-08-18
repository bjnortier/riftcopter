var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");

socket.on('image', function(data) {
  var image = new Image();
  image.src = "data:image/  png;base64," + data.image;
  image.onload = function() {
      ctx.drawImage(image, 0, 0);
  };
});