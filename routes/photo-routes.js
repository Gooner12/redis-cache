const express = require("express");
const router = express.Router();

const {getPhotos, getSinglePhoto} = require("../controller/photo-controller");

router.get("/photos", getPhotos);
router.get("/photos/:id", getSinglePhoto);

module.exports = router;
