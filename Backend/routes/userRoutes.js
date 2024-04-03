const express = require("express");
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const { name, email, pass } = req.body;
  try {
    bcrypt.hash(pass, 5, async (err, hash) => {
      // Store hash in your password DB.
      if (err) {
        res.send({ msg: "Something Went Wrong", error: err.message });
      } else {
        const user = new UserModel({ name, email, pass: hash });
        await user.save();
        res.send({ msg: "new User has been Registered Successful" });
      }
    });
  } catch (error) {
    res.send({ msg: "Something Went Wrong", error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(pass, user[0].pass, (err, result) => {
        if (result) {
          const token = jwt.sign({ course: "bacakend" }, "masai");
          res.send({ msg: "logged in Successful", token: token });
        } else {
          res.send({ msg: "Wrong Credential" });
        }
      });
    } else {
      res.send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.send({ msg: "Something Went Wrong", error: error.message });
  }
});

module.exports = { userRoute };
