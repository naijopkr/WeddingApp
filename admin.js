const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const keys = require('./config/keys')

//Require models
const Greetings = require('./models/greetings')
const Photo = require('./models/photos')
const Rsvp = require('./models/rsvp')
const Song = require('./models/song')

//Connect mongoose to mongoDB
mongoose.connect(keys.mongoURIProd, { useNewUrlParser: true })

//Express setup
const app = express()
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'admin_client/build')))

//Routes
app.get('/api/greetings', (req, res) => {
  Greetings.find((err, chunk) => {
    if (err) {
      res.send(err)
    } else {
      res.send(chunk)
    }
  })
})

app.delete('/api/greetings/:id', (req, res) => {
  Greetings.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.send(err)
    } else {
      res.send('Success')
    }
  })
})

app.get('/api/rsvp', (req, res) => {
  Rsvp.find((err, chunk) => {
    if (err) {
      res.send(err)
    } else {
      res.send(chunk)
    }
  })
})

app.delete('/api/rsvp/:id', (req, res) => {
  Rsvp.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.send(err)
    } else {
      res.send('Success')
    }
  })
})

app.get('/api/song', (req, res) => {
  Song.find((err, chunk) => {
    if (err) {
      res.send(err)
    } else {
      res.send(chunk)
    }
  })
})

app.delete('/api/song/:id', (req, res) => {
  Song.findByIdAndRemove(req.params.id, err => {
    if (err) {
      res.send(err)
    } else {
      res.send('Success')
    }
  })
})

app.get('/api/photos', (req, res) => {
  Photo.find((err, chunk) => {
    if (err) {
      res.send(err)
    } else {
      res.send(chunk)
    }
  })
})

app.put('/api/photos', (req, res) => {
  let photo = req.body
  Photo.findByIdAndUpdate(photo._id, photo, err => {
    if (err) {
      res.send(err)
    } else {
      res.send('Success')
    }
  })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin_client/build', 'index.html'))
})

app.listen(5000, 'localhost', err => {
  if (err) {
    console.log(err)
  } else {
    console.log('Server is up!')
  }
})
