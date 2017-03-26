const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.static('public'));
app.use(express.static('images'));

let images = [];
let currentImage = -1;

fs.watch('images', function (eventType, filename) {
  /* ignore the event and read the dir */
  fs.readdir('images', function (err, files) {
    if (err) {
      console.log(err);
      return;
    }

    images = files;
    currentImage = images.length > 0 ?  0 : -1;

    console.log(currentImage);
  });
});

app.listen(3000, function () {
  console.log('slideshow server listening on port 3000');
});

app.get('/', function (req, res) {
  res.sendFile('index.html');
});
