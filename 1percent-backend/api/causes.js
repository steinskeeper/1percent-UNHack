var express = require("express");
var router = express.Router();

var Causes = require("../models/Causes");
var User = require("../models/User");
const grantAccess = require("../utils/verifytoken");
var multer = require("multer");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
sharp.cache(false);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/png") {
      cb(null, "./static/photos");
    } else if (file.mimetype === "image/jpeg") {
      cb(null, "./static/photos");
    } else if (file.mimetype === "image/jpg") {
      cb(null, "./static/photos");
    } else {
      console.log(file.mimetype);
      cb({ error: "Mime type not supported" });
    }
  },
  filename: function (req, file, cb) {
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    var date_now = new Date();
    let dd = String(date_now.getDate()).padStart(2, "0");
    let mm = String(date_now.getMonth() + 1).padStart(2, "0");
    let yy = date_now.getFullYear();
    let timestamp = dd + "-" + mm + "-" + yy + "";
    let uniqid = nanoid();
    cb(null, uniqid + "." + extension);
  },
});

var upload = multer({ storage: storage });
router.post("/create", async function (req, res) {
  var { causeTitle, causeDescription, causeImage } = req.body;
  const cause = await Causes.create({
    causeTitle,
    causeDescription,
    causeImage,
  });
  res.status(200).json({
    message: "Cause created successfully",
    cause,
  });
});

router.post("/getall", async (req, res) => {
  try {
    const causes = await Causes.find();

    res.status(200).json(causes);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error",
      details: "Failed to Reterive Data",
    });
  }
});

router.post("/getone", async function (req, res) {
  try {
    const { causeID } = req.body;

    const cause = await Bucket.findOne({ causeID });

    res.status(200).json({
      status: "success",
      cause,
    });
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error",
      details: "Failed to Reterive Data",
    });
  }
});

module.exports = router;
