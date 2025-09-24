const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Donation = require("../models/Donation");
const Category = require("../models/Category");

router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonations = await Donation.countDocuments();
    const totalCategories = await Category.countDocuments();
    res.json({ totalUsers, totalDonations, totalCategories });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
