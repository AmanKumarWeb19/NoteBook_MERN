const express = require("express");
const { UserModel } = require("../model/userModel");
const jwt = require("jsonwebtoken");

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const payload = req.body;
  try {
    const user = new UserModel(payload);
    await user.save();
    res.send({ msg: "new User has been Registered Successful" });
  } catch (error) {
    res.send({ msg: "Something Went Wrong", error: error.message });
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const token = jwt.sign({ course: "bacakend" }, "masai");
  try {
    const user = await UserModel.find({ email, pass });
    if (user.length > 0) {
      res.send({ msg: "logged in Successful", token: token });
    } else {
      res.send({ msg: "Wrong Credential" });
    }
  } catch (error) {
    res.send({ msg: "Something Went Wrong", error: error.message });
  }
});

module.exports = { userRoute };
