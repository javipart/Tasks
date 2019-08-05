const mongoose = require('mongoose');
const { Schema } = mongoose;

const Team = new Schema({
  name: String,
});

module.exports = mongoose.model('teams', Team);
