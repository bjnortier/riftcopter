
var fs = require('fs');
var drone = require('./drone');
var inputHandler = require('./inputHandler');
inputHandler.init(drone);

var serveFile = function(path, res) {
  fs.readFile(__dirname + '/../public' + path, 'utf-8', function(err, data) {
    if (err) {
      if (['/favicon.ico', '/lib/jquery-1.10.2.min.map'].indexOf(path) === -1) {
        console.error('404', path);
      }
      res.writeHead(404);
      res.end();  
    } else {
      res.writeHead(200);
      res.end(data);
    }
  });
};

function handler(req, res) {
  serveFile(req.url, res);
};

var app = require('http').createServer(handler);
app.listen(8000);

var io = require('socket.io').listen(app);
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
  socket.emit('info', { state: 'connected' });

  socket.on('event', function (data) {
    inputHandler.handle(data);
  });

  drone.onImage(function(png) {
    socket.emit('image', {image: png});
  });
});

