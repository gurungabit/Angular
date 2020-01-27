const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const postRoutes = require("./routes/post");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//MONGODB USERNAME:gurungabit PASSWORD: 90ECxjuAy0wxmvdw
//===================================================================================
// // parse application/json, basically parse incoming Request Object as a JSON Object
// app.use(bodyParser.json());
// // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
// app.use(bodyParser.urlencoded({ extended: false }));
// // combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
// app.use(bodyParser.urlencoded({ extended: true }));
//====================================================================================

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    'Origin, X-Requested-With, Content-Type, "Accept'
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, DELETE"
  );

  next();
});
app.use("/app/posts", postRoutes);

module.exports = app;
