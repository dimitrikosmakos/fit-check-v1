// User model for retaining user-unique information
// - contains {name, email, password}
//    - password is sent through hashing function and not retained explicitly

const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  outfits: [{ type: mongoose.Schema.ObjectId, ref: 'Outfit' }],
});

module.exports = User = mongoose.model('User', userSchema)