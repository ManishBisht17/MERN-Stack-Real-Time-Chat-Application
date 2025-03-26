const express = require("express");
const User = require("../models/UserModel");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

//Register route

userRouter.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      username,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        username: user.username,
        email: user.email,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//Login

User.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      res.json({
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// generate token

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
