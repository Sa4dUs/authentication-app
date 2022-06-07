const express = require("express");
const router = express.Router();
const upload = require("../tools/admin-middleware").upload;

const adminHttpHandler = require("./admin.http.js");

router.route("/").post(adminHttpHandler.showData);
router.route("/update").post(adminHttpHandler.setData);
router
  .route("/upload")
  .post(upload.single("image"), adminHttpHandler.fileUpload);

exports.router = router;
