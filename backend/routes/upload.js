const express = require("express");
const { uploadImages, getImage } = require("../controllers/upload");
const { authUser } = require("../middleware/auth");

const router = express.Router();

router.post("/uploadImages", authUser, uploadImages);
router.get("/image/:id", getImage);

module.exports = router;
