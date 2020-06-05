const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },

  links: [{
    fullURL: String,
    shortenURL: String,
    tags: [String],
    description: String,
  }],

  refreshSessions: [{
    refreshToken: String,
    expiresIn: Number,
    fingerprint: String,
    userId: String,
  }],


});

const User = mongoose.model('User', userSchema);

module.exports = User;
