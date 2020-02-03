const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));
//MONGODB USERNAME:gurungabit PASSWORD: 90ECxjuAy0wxmvdw
//===================================================================================
// // parse application/json, basically parse incoming Request Object as a JSON Object
// app.use(bodyParser.json());
// // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
// app.use(bodyParser.urlencoded({ extended: false }));
// // combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
// app.use(bodyParser.urlencoded({ extended: true }));
//====================================================================================
mongoose
  .connect(
    "mongodb+srv://gurungabit:90ECxjuAy0wxmvdw@cluster0-rcldy.mongodb.net/AngularApp",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => {
    console.log("Connected to DB!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use("/app/posts", postRoutes);
app.use("/app/user", userRoutes);

module.exports = app;
