require("dotenv").config();
const path = require("path");
const express = require("express");
const { sequelize } = require("./models/index");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const user = require("./routes/User");
const errorHandler = require("./middlewares/error.middleware");
const resolve = require("./routes/resolveAccount");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res, next) => res.send("welcome"));
app.use(user);
app.use(resolve);
app.use("/avatar", express.static(path.join(__dirname + "/avatars")));
//error middleware
app.use(errorHandler);
sequelize
  .sync()
  .then((e) => {
    app.listen(port, () => {
      console.log("started on port :: ", port);
    });
  })
  .catch((err) => console.log(err));
