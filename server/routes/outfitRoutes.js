// Route specific for transporting outfit files and information
// Parses and sends data segments added from UI upload screen to MongoDB

const File = require("../models/fileModel");
const Outfit = require("../models/outfitModel");
const router = require("express").Router();
const { upload } = require("../middleware/uploadFile");
const jwtAuth = require("../middleware/jwtAuth");
const path = require("path");

const getRecommendation = require("../helpers/ai/recommendation.js");
const getRating = require("../helpers/ai/rating");

router.post(
  "/",
  [jwtAuth, upload.single("file")],
  async (req, res) => {
    try {
      let { tags, description, preference } = req.body;
      console.log("PREFERENCE IS "+preference)
      const { path, mimetype } = req.file;
      const file = new File({
        filePath: path,
        fileMimetype: mimetype,
        owner: req.user.id,
      });
      await file.save();
      // parse different tags associated with image
      tags = tags.split(",");
      const [rating, attributes, categories] = await getRating(path, preference, tags);

      
      const outfit = new Outfit({
        description: description,
        tags: tags,
        preference: preference,
        img: file,
        owner: req.user.id,
        rating: rating,
        attributes: attributes,
        categories: categories,
      });
      await outfit.save();
      await User.findByIdAndUpdate(
        { _id: req.user.id },
        { $push: { outfits: outfit } },
        { new: true }
      );

      // send uploaded image file to MongoDB
      res.send(outfit);
    } catch (error) {
      console.log(error);
      res.status(400).send("Error while creating outfit. Try again later.");
    }
  },
  (error, req, res, next) => {
    if (error) {
      console.log(error);
      res.status(500).send(error.message);
    }
  }
);

// get all of a users outfits
router.get("/", jwtAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const outfits = await Outfit.find({ owner: userId }).populate("img");
    res.send(outfits);
  } catch (error) {
    res.status(400).send("Error while getting outfits data. Try again later.");
  }
});

// get users single outfit data (not image)
router.get("/:outfitId", jwtAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const outfitId = req.params.outfitId;
    const outfit = await Outfit.findOne({
      _id: outfitId,
      owner: userId,
    }).populate("img");
    res.send(outfit);
  } catch (error) {
    res.status(400).send("Error while getting outfit data. Try again later.");
  }
});

// get an outfit image (DEPRECATED!)
router.get("/image/:outfitId", jwtAuth, async (req, res) => {
  try {
    const outfitId = req.params.outfitId;
    // get user id from jwt auth
    const currUser = req.user.id;

    // get the outfit id (pass user id param to verify correct ownership)
    // make sure to populate img
    const outfit = await Outfit.findOne({
      _id: outfitId,
      owner: currUser,
    }).populate("img");

    // return outfit
    res.sendFile(path.join(__dirname, "..", outfit.img.filePath));
  } catch (error) {
    console.log(error);
    res.status(400).send("Error while getting outfit image. Try again later.");
  }
});

router.get("/recommendation/:outfitId", jwtAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    const outfitId = req.params.outfitId;
    const outfit = await Outfit.findOne({
      _id: outfitId,
      owner: userId,
    }).populate("img");
    //TODO: Replace gender with user preference
    const rec = await getRecommendation(outfit);
    res.status(200).send(rec);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
