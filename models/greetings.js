const mongoose = require('mongoose');

const GreetingsSchema = new mongoose.Schema({
  name: String,
  message: String
});

module.exports = mongoose.model('Greetings', GreetingsSchema);