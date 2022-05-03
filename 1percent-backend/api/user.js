var express = require("express");
var router = express.Router();

var User = require("../models/User");
const grantAccess = require("../utils/verifytoken");
var multer = require("multer");
const { nanoid } = require("nanoid");
const mongoose = require("mongoose");
const sharp = require("sharp");
sharp.cache(false);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "image/png") {
      cb(null, "./static/pfp");
    } else if (file.mimetype === "image/jpeg") {
      cb(null, "./static/pfp");
    } else if (file.mimetype === "image/jpg") {
      cb(null, "./static/pfp");
    } else if (file.mimetype === "image/gif") {
      cb(null, "./static/pfp");
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

router.get("/get/:id", grantAccess(), async (req, res) => {
  try {
    const user = await User.findOne({ userID: req.params.id });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error",
      details: "Failed to Reterive Data",
    });
  }
});

router.get("/publicget/:id", async (req, res) => {
  try {
    const user = await User.findOne({ subname: req.params.id }).lean();
    delete user["_id"];
    delete user["userID"];
    delete user["email"];
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.json({
      message: "error",
      details: "Failed to Reterive Data",
    });
  }
});
module.exports = router;
