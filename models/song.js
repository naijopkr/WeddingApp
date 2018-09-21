const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  name: String,
  artist: String,
  song: String
});

module.exports = mongoose.model('Song', SongSchema);