const { connect, connection } = require("mongoose");
const { config } = require("dotenv")

if (process.env.NODE_ENV === "development") {
  module.exports = () => {
    config();
    const uri = process.env.DB_URI;

    connect(uri, {
      dbName: process.env.DB_NAME_TEST,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
      .then(() => {
        console.log("Connection established with MongoDB --test");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
} else {
  module.exports = () => {
    config();
    const uri = process.env.DB_URI;

    connect(uri, {
      dbName: process.env.DB_NAME,
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
      .then(() => {
        console.log("Connection established with MongoDB");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
}
