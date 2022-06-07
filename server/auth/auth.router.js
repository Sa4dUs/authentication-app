const express = require("express");
const router = express.Router();

const authHttpHandler = require("./auth.http.js");

router.route("/signup").post(authHttpHandler.signupUser);
router.route("/login").post(authHttpHandler.loginUser);

exports.router = router;
