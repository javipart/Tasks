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
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'teams',
  },
});

module.exports = mongoose.model('users', userModel);
