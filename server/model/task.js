const mongoose = require('mongoose');
const { Schema } = mongoose;

const Task = new Schema({
  title: String,
  description: String,
  responsable: String,
  estimatedTime: Number,
  statusTask: String,
  team: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
  },
});

module.exports = mongoose.model('Task', Task);
