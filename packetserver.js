var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8000);

var serveFile = function(path, res) {
  fs.readFile('public' + path, 'utf-8', function(err, data) {
    if (err) {
      console.error(err);
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

io.sockets.on('connection', function (socket) {
  socket.on('quat', function (data) {
    console.log(data);
  });
});