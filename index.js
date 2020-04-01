const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(express.static('images'));

// carica le immagini alla partenza
var images = [];
fs.readdir('images', function (err, files) {
  if (err) {
    console.log(err);
    return;
  }

  images = files;
});

// rilegge la cartella immagini in casi di variazioni
fs.watch('images', function (eventType, filename) {
  /* ignore the event and read the dir */
  fs.readdir('images', function (err, files) {
    if (err) {
      console.log(err);
      return;
    }

    images = files;
    io.emit('images', images);
  });
});

server.listen(3000, function () {
  console.log('slideshow server listening on port 3000');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', function (socket) {
  socket.emit('images', images);
});