const express = require('express');
const fs = require('fs');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static('public'));
app.use(express.static('images'));

let images = [];
let currentImage = -1;

const readImages = function () {
  fs.readdir('images', function (err, files) {
    if (err) {
      console.log(err);
      return;
    }

    images = files;
    currentImage = images.length > 0 ?  0 : -1;
  });
};

readImages();

fs.watch('images', function (eventType, filename) {
  /* ignore the event and read the dir */
  readImages();
});

server.listen(3000, function () {
  console.log('slideshow server listening on port 3000');
});

app.get('/', function (req, res) {
  res.sendfile('index.html');
});

setInterval(function () {
  if (currentImage < 0) {
    io.emit('image', { index: currentImage });
  } else {
    io.emit('image', { index: currentImage, image: images[currentImage] });
    currentImage = (currentImage+1) % images.length;
  }
}, 3000);
