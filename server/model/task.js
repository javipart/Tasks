const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
  title: String,
  description: String,
  responsable: String,
  estimatedTime: Number,
});

module.exports = mongoose.model('Task', Task);
