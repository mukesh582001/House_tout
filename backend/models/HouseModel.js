const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
  name: String,
  description: String,
  modelUrl: String
});

module.exports = mongoose.model('House', houseSchema);
