const express = require("express");
const router = express.Router();
const Donation = require("../models/Donation");
const adminAuth = require("../middleware/adminAuth");
// Create Donation
router.post("/", async (req, res) => {
  try {
    const { donorName, item, category, quantity } = req.body;
    const donation = new Donation({ donorName, item, category, quantity });
    await donation.save();
    res.json({ message: "Donation added", donation });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Donations
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find().populate("category");
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Donations by User
router.get("/user/:userId", async (req, res) => {
  try {
    const donations = await Donation.find({ userId: req.params.userId });
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
  const { status } = req.body; // status should be "approved" or "rejected"
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
