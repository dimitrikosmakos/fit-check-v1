const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();


// set up express

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
console.log("Starting server.");
app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));

// set up routes
app.use('/tests', require('./routes/testRoutes'));
app.use('/auth', require('./routes/authRoutes'));
app.use('/outfits', require('./routes/outfitRoutes'));
app.use('/social', require('./routes/socialRoutes'));

// set up mongoose

console.log("Connecting to MongoDB.");
mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.error(err);
    console.log("MongoDB connection established.");
  }
);
