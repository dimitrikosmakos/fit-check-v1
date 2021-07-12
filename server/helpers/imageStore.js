const OutfitImageStore = multer.diskStorage({
  destination: function (req, file, callback) {
    const userId = req.userId;
    const dir = `instrumentImgs/${userId}`;
    fs.exists(dir, (exist) => {
      if (!exist) {
        return fs.mkdir(dir, (error) => callback(error, dir));
      }
      return callback(null, dir);
    });

  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = OutfitImageStore;