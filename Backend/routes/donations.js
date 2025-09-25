const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const adminAuth = require("../middleware/adminAuth");
const authMiddleware = require("../middleware/authMiddleware");
// Create Donation
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { item, category, quantity } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized: user not authenticated" });
    }

    if (!item || !category) {
      return res.status(400).json({ error: "Item and category are required" });
    }

    const donation = new Donation({
      donorName: req.user.name || "Anonymous",
      userId: req.user.id,
      item,
      category,
      quantity: quantity || 1
    });

    await donation.save();
    res.json({ message: "Donation added", donation });
  } catch (err) {
    console.error("Create donation error:", err);
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(e => e.message).join(', ');
      return res.status(400).json({ error: `Donation validation failed: ${messages}` });
    }
    res.status(500).json({ error: err.message });
  }
});

// Get All Donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().populate("category").populate("userId", "name email");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Donations by User
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    if (req.user.id !== req.params.userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }
    const donations = await Donation.find({ userId: req.params.userId }).populate("category");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Donation Status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Donation updated", donation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Donation
router.delete("/:id", async (req, res) => {
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: "Donation deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin: Approve/Reject donation
router.patch("/:id/status", adminAuth, async (req, res) => {
  const { status } = req.body; 
  if (!["approved", "rejected"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!donation) return res.status(404).json({ message: "Donation not found" });
    res.json(donation);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
