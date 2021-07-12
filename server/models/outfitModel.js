// Model for user outfits
// - Contains {description, tags, rating, attributes, img, owner}
//    - img is a file (uploaded image)

const { json } = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const File = require('./fileModel');
const User = require('./userModel');

const outfitSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: Array,
    required: false,
  },  
  preference: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  attributes: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true
  },
  img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: File,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
},
  {
    timestamps: true,
  }
);

module.exports = Outfit = mongoose.model('Outfit', outfitSchema)