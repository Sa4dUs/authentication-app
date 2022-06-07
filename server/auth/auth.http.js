const authController = require("./auth.controller.js");
jwt = require("jsonwebtoken");
const { to } = require("../tools/to.js");

let empty = new RegExp(" *");

const signupUser = async (req, res) => {
  if (
    !req.body ||
    !req.body.email ||
    !req.body.password ||
    req.body.email == empty ||
    req.body.password == empty
  ) {
    return res.status(400).json({ message: "Missing data" });
  }

  // if (!(req.body.email == email_template)){
  //   return res.status(400).json({message: "Wrong email"})
  // }

  let [err, user] = await to(
    authController.registerUser(req.body.email, req.body.password)
  );

  if (err || !user) {
    return res.status(409).json({ message: "There's already an account registered with that email" });
  }

  res.status(200).send();
};

const loginUser = async (req, res) => {
  if (
    !req.body ||
    !req.body.email ||
    !req.body.password ||
    req.body.email == empty ||
    req.body.password == empty
  ) {
    return res.status(400).json({ message: "Missing data" });
  }
  let [err, result] = await to(
    authController.checkUserCredentials(req.body.email, req.body.password)
  );
  if (err || !result) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  let user = await authController.getUserFromEmail(req.body.email);
  const token = jwt.sign({ userId: user.userId }, "secretPassword");
  res.status(200).json({ token: token, userId: user.userId });
};

module.exports = { signupUser, loginUser };
