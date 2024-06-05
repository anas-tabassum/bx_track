const authenticate = require("../middlewares/authincate");
const authorizeAdmin = require("../middlewares/authorizeAdmin");
const User = require("../models/User");
const express = require("express");
const router = express.Router();

// Create or modify role
router.post("/create-role", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { username, role } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    if (user.role) {
      user.role = role;
    } else {
      user.role = role;
    }
    await user.save();

    res.status(201).send({ message: "Role added to user successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// Delete role
router.delete(
  "/delete-role",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    try {
      const { username } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).send({ error: "User not found" });
      }

      // Remove the role from the user
      user.role = "";
      await user.save();

      res.status(200).send({ message: "Role deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
);

// Add permession
router.post(
  "/add-permission",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    const { username, permission } = req.body;
    console.log(permission);
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.permissions.includes(permission)) {
        return res
          .status(400)
          .json({ error: "This permission already exists for the user" });
      }

      user.permissions.push(permission);
      await user.save();

      res
        .status(200)
        .json({ message: "Permission added to user successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Delete permission
router.delete(
  "/delete-permission",
  authenticate,
  authorizeAdmin,
  async (req, res) => {
    const { username, permission } = req.body;

    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const permissionIndex = user.permissions.indexOf(permission);
      if (permissionIndex === -1) {
        return res
          .status(400)
          .json({ error: "Permission not found for the user" });
      }

      user.permissions = user.permissions.filter((p) => p !== permission);
      await user.save();

      res
        .status(200)
        .json({ message: "Permission removed from user successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
