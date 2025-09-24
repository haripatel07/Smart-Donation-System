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

module.exports = router;
