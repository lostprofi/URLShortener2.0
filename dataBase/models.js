const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  _password: {
    type: String,
    require: true,
  },
  links: [{
    fullURL: String,
    shortenURL: String,
    tags: [String],
    description: String,
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
