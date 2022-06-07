const { to } = require("../tools/to.js");
const adminController = require("./admin.controller.js");

const showData = async (req, res) => {
  if (!req.body || !req.body.userId) {
    return res.status(400).json({ message: "Missing data" });
  }
  let [err, data] = await to(
    adminController.getDataFromUserId(req.body.userId)
  );
  if (!err || data) {
    return res.status(200).json({ data: data });
  }
  return res.status(404).json({ message: "No user found" });
};

const setData = async (req, res) => {
  if (
    !req.body ||
    !req.body.userId ||
    !req.body.data ||
    typeof req.body.data != "object"
  ) {
    return res.status(400).json({ message: "Missing data" });
  }

  let [err, data] = await to(
    adminController.updateData(req.body.userId, req.body.data)
  );

  if (!err || data) {
    return res.status(200).json({ data: data });
  }

  return res.status(400).json({ message: "An error connecting with db has occurred" });
};

const fileUpload = async (req, res) => {
  if (!req.file || !req.body.userId) {
    return res.status(400).json({ message: "Missing data" });
  }

  adminController.updateImagePath(
    req.body.userId,
    `/uploads/${req.file.filename}`
  );
  
  res.status(200).json({ path: `/uploads/${req.file.filename}` });
};

module.exports = { showData, setData, fileUpload };
