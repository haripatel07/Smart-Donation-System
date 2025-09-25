const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Donation = require("../models/Donation");
const Category = require("../models/Category");
const adminAuth = require("../middleware/adminAuth");

// Protect all admin routes
router.use(adminAuth);

router.get("/stats", async (req, res) => {
  const users = await User.countDocuments();
  const donations = await Donation.countDocuments();
  const categories = await Category.countDocuments();
  res.json({ users, donations, categories });
});

// View all users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
