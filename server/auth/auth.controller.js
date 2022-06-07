const uuid = require("uuid");
const crypto = require("../tools/crypto");
const { to } = require("../tools/to");
const mongoose = require("mongoose");

const userModel = mongoose.model("User", {
  userId: String,
  email: String,
  password: String,
  data: {
    userName: String,
    bio: String,
    phone: String,
    photo_url: String,
  },
});

const cleanUpUsers = () => {
  return new Promise(async (resolve, reject) => {
    await userModel.deleteMany({}).exec();
    resolve();
  });
};

const registerUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(userModel.findOne({ email: email }).exec());
    if (err || !user) {
      let hashedPwd = crypto.hashPasswordSync(password);
      let userId = uuid.v4();
      let newUser = new userModel({
        userId: userId,
        email: email,
        password: hashedPwd,
        data: {
          userName: "",
          photo_url: "",
          bio: "",
          phone: "",
        },
      });

      await newUser.save();
      resolve(newUser);
    } else {
      reject(`There is already an account with that email (${email})`);
    }
    reject();
  });
};

const checkUserCredentials = (email, password) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(getUserFromEmail(email));
    if (err || user == null) {
      reject(err);
    } else {
      crypto.comparePassword(password, user.password, (err, user) => {
        if (err) {
          reject(err);
        } else {
          resolve(user);
        }
      });
    }
  });
};

const getUserFromEmail = (email) => {
  return new Promise(async (resolve, reject) => {
    let [err, user] = await to(userModel.findOne({ email: email }).exec());
    if (err || !user) {
      reject(err);
    }
    resolve(user);
  });
};

module.exports = {
  cleanUpUsers,
  registerUser,
  checkUserCredentials,
  getUserFromEmail,
  userModel,
};
