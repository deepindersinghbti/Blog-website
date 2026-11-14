const { model, Schema } = require("mongoose");

// Uploaded images are stored in MongoDB so no external image host is needed.
const imageSchema = new Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, default: "image/jpeg" },
  },
  { timestamps: true }
);

module.exports = model("Image", imageSchema);
