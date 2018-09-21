const mongoose = require('mongoose');

const PhotoSchema = new mongoose.Schema({
  key: String,
  location: String,
  height: String,
  width: String,
  authorized: { type: Boolean, default: false }
});

module.exports = mongoose.model('Photo', PhotoSchema);