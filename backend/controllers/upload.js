const Image = require("../models/Image");

exports.uploadImages = async (req, res) => {
  try {
    const file = req.files && req.files.file;
    if (!file) {
      return res.status(400).json({ message: "No image was uploaded." });
    }
    if (!/^image\//.test(file.mimetype)) {
      return res.status(400).json({ message: "Only image files are allowed." });
    }
    const image = await new Image({ data: file.data, contentType: file.mimetype }).save();
    const url = `${req.protocol}://${req.get("host")}/image/${image._id}`;
    res.json([{ url }]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found." });
    }
    res.set("Content-Type", image.contentType);
    res.set("Cache-Control", "public, max-age=31536000, immutable");
    res.send(image.data);
  } catch (error) {
    return res.status(404).json({ message: "Image not found." });
  }
};
