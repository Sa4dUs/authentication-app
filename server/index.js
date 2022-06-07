const express = require("express");
const app = express();

var cors = require("cors");
app.use(cors());
app.use(express.static("public"));

if (process.env.NODE_ENV != "development") {
  require("dotenv").config();
}

require("./database.js")();

const PORT = process.env.PORT || 3000;

const middlewares = require("./middlewares.js");
middlewares.setupMiddlewares(app);

// Router
const authRoutes = require("./auth/auth.router.js").router;
app.use("/auth", authRoutes);
const adminRoutes = require("./admin/admin.router.js").router;
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.get("/", (req, res) => {
  res.status(200).send("Connected to Auth API");
});

// Run server
app.listen(PORT, () => {
  console.log(`Running... http://localhost:${PORT}`);
});

exports.app = app;
