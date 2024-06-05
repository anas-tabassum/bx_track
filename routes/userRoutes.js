const UserModel = require("../models/User");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const authenticate = require("../middlewares/authincate");

// User register route
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    const user = await newUser.save();

    res
      .status(201)
      .json({ status: "success", message: "User signed up successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving user");
  }
});

// User login route
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const secret_key = "bx_track";
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, secret_key);
    res.status(200).json({ status: "success", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//  User post user-info route
router.post("/user-info", authenticate, async (req, res) => {
  const { username } = req.body;

  try {
    let user;

    if (username) {
      user = await UserModel.findOne({ username });
    } else {
      user = req.user;
    }

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    res.send({
      username: user.username,
      role: user.role,
      permissions: user.permissions,
      // Add any other fields you want to return
    });
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

// Update user profile
router.put("/profile", authenticate, async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = req.user;

    if (username) {
      user.username = username;
    }
    if (password) {
      user.password = await bcrypt.hash(password, 8);
    }

    await user.save();

    res.send("User profile updated");
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

module.exports = router;
