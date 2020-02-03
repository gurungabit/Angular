const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user
      .save()
      .then(result => {
        res.status(201).json({
          message: "User created!",
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let getUser;
  User.find({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      getUser = user[0];
      return bcrypt.compare(req.body.password, user[0].password);
    })
    .then(result => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed!"
        });
      }
      const token = jwt.sign(
        { email: getUser.email, id: getUser._id },
        "secret_password_here_this_is_Temporary",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});
module.exports = router;
