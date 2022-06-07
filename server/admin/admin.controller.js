const { to } = require("../tools/to.js");
const authController = require("../auth/auth.controller");

let empty = new RegExp(" *");

const userModel = authController.userModel;

const getDataFromUserId = (userId) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(userModel.findOne({ userId: userId }).exec());
    if (err || !user) {
      reject("There's no user with that userId");
    } else {
      resolve(user.data);
    }
  });
};

const updateData = (userId, data) => {
  return new Promise(async (resolve, reject) => {
    let [err, newData] = await to(getDataFromUserId(userId));
    if (!err || newData) {
      Object.entries(data).forEach((item) => {
        if (!(item[1] == "")) {
          newData[item[0]] = item[1];
        }
      });

      let [err, dbData] = await to(
        userModel.updateOne({ userId: userId }, { data: newData }).exec()
      );
      if (!err || newData) {
        resolve(dbData);
      } else {
        reject("Could not update data");
      }
    } else {
      reject("Invalid user");
    }
  });
};

const updateImagePath = (userId, path) => {
  return new Promise(async (resolve, reject) => {
    let [err, dbData] = await to(updateData(userId, { photo_url: path }));
    if (!err || dbData) {
      resolve(dbData);
    } else {
      reject("Could not update image path");
    }
  });
};

module.exports = { getDataFromUserId, updateData, updateImagePath };
