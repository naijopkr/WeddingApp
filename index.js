const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const AWS = require('aws-sdk');
const multer = require('multer');
const size = require('image-size');
const gm = require('gm');
const path = require('path');
const keys = require('./config/keys');

//Require models
const Greetings = require('./models/greetings');
const Photo = require('./models/photos');

//Connect mongoose to mongoDB
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

//AWS S3 setup
let s3bucket = new AWS.S3({
  accessKeyId: keys.IAM_USER_KEY,
  secretAccessKey: keys.IAM_USER_SECRET,
  region: 'sa-east-1',
  Bucket: keys.BUCKET_NAME
});

//Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

//Express setup
const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')));

//Route

app.post('/api/rsvp', (req, res) => {
  var Rsvp = require('./models/rsvp');
  var rsvp = { name, email, rsvp, guests } = req.body;
  Rsvp.create(rsvp, (err) => {
    if (err) {
      res.send(err);
    } else {
      res.send('SUCCESS');
    }
  });
});

app.post('/api/songs', (req, res) => {
  var Song = require('./models/song');
  var song = { name, artist, song } = req.body;
  Song.create(song, err => {
    if (err) {
      res.send(err);
    } else {
      res.send('SUCCESS');
    }
  })
});

app.get('/api/greetings', (req, res) => {
  Greetings.find((err, greetingsIndex) => {
    if (err) {
      res.send(err);
    } else {
      res.send(greetingsIndex);
    }
  });
});

app.post('/api/greetings', (req, res) => {
  const greetings = { name, message } = req.body;
  Greetings.create(greetings, err => {
    if (err) {
      res.send(err);
    } else {
      Greetings.find((err, greetingsIndex) => {
        if (err) {
          res.send(err);
        } else {
          res.send(greetingsIndex);
        }
      });
    }
  })
});

app.post('/api/photos', upload.single('file'), (req, res) => {

  //Create buffer to orient images based on EXIF
  gm(req.file.buffer)
  .autoOrient()
  .toBuffer((err, buffer) => {
    if (err) {
      console.log(err);
    } else {
      //Get image params for DB and S3Bucket
      var height = size(buffer).height.toString()
      var width = size(buffer).width.toString();
      var params = {
        Bucket: keys.BUCKET_NAME,
        ACL: 'public-read',
        Metadata: {
          height,
          width
        },
        Key: Date.now().toString(),
        Body: buffer
      }

      //Upload image to S3 bucket
      s3bucket.upload(params, (err, data) => {
        if (err) {
          console.log(err);
        } else {

          //Create new document in DB for image
          var newPhoto = {
            key: data.Key,
            location: data.Location,
            height,
            width
          }
          Photo.create(newPhoto, err => {
            if (err) {
              console.log(err)
            } else {
              //Create thumbnail for image
              gm(buffer)
              .resize(480, 480)
              .toBuffer((err, buffer) => {
                if (err) {
                  console.log(err);
                } else {
                  params.Key += '_thumbnail';
                  params.Body = buffer;
                  s3bucket.upload(params, (err, data) => {
                    if (err) {
                      console.log(err);
                    }
                  })
                }
              });
              res.end()
            }
          });
        }
      });
    }
  });
  
});

app.get('/api/photos', (req, res) => {
  Photo.find({ authorized: true }, (err, photos) => {
    if (err) {
      console.log(err);
    } else {
      res.send(photos);
    }
  })
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Server is listening on ' + PORT);
    }
});