const mongoose = require('mongoose');

const { Schema } = mongoose;
const userModel = new Schema({
  user: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('users', userModel);
