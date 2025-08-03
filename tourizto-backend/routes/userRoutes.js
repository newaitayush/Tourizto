const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "your_secret_key"; // use env file in production

// Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: newUser._id, name: newUser.name, email: newUser.email }, JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, name: user.name, email: user.email }, JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
});

module.exports = router;
