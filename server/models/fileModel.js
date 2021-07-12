// Model for uploaded files (images)
// - contains {filePath, fileMimetype, owner}

const mongoose = require("mongoose");
const User = require('./userModel');

const fileSchema = mongoose.Schema(
  {
    filePath: {
      type: String,
      required: true
    },
    fileMimetype: {
      type: String,
      required: true
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
