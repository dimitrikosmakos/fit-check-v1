// Route established to handle new and returning users
// Communicates with MongoDB to check for user information and login credentials

const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const validateSignUp = require("../helpers/auth/signup");
const validateSignIn = require("../helpers/auth/signin");

router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateSignUp(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // retrieve the data from the request
  const { name, email, password } = req.body;

  const foundUser = await User.findOne({ email: email });
  if (foundUser) {
    return res.status(400).json({ email: "Email already in use " });
  }

  // construct the test model
  const newUser = new User({
    name,
    email,
    password,
    following: [],
    followers: [],
  });

  // used to encode user password and not store explicitly
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    });
  });
});

router.post("/signin", async (req, res) => {
  const { errors, isValid } = validateSignIn(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const { email, password } = req.body;

  // check if user exists in DB
  const foundUser = await User.findOne({ email });
  if (!foundUser) {
    return res.status(400).json({ emailNotFound: "email not found" });
  }

  // checks if entered password is correct
  bcrypt.compare(password, foundUser.password).then((isMatch) => {
    if (isMatch) {
      const accessToken = jwt.sign(
        { id: foundUser._id },
        process.env.SUPER_SECRET_ACCESS_TOKEN
      );
      res.json({ success: true, token: accessToken });
    } else {
      return res.status(400).json({ passwordIncorrect: "Password incorrect" });
    }
  });
});

module.exports = router;
