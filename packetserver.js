var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');

app.listen(8000);

var serveFile = function(url, res) {
  switch(url) {
    case '/packetserver':
      fs.readFile('public/packetserver.html', 'utf-8', function(err, data) {
        if (err) {
          console.error(err);
          res.writeHead(500);
          res.end(data);  
        } else {
          res.writeHead(200);
          res.end(data);
        }
      });
      return true;
    default: 
      return false;
  }
};

function handler(req, res) {

  console.log('!!!', req.url);
  if (serveFile(req.url, res)) {
    return;
  } else {
    res.writeHead(404);
    return res.end();
  }
};

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});