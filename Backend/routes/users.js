const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Update profile
router.put("/profile", async (req, res) => {
  // Expecting token in Authorization header
  const token = req.headers["authorization"];
  if (!token) return res.status(401).json({ message: "No token provided" });
  let decoded;
  try {
    decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    const updateFields = {};
    ["name", "phone", "address"].forEach(field => {
      if (req.body[field]) updateFields[field] = req.body[field];
    });
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { $set: updateFields },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
