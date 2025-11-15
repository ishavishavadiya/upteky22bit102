const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");

// POST → Create Feedback
router.post("/feedback", async (req, res) => {
  try {
    console.log("📩 Incoming Data:", req.body);

    const feedback = new Feedback(req.body);
    await feedback.save();

    return res.status(201).json({ success: true, message: "Feedback saved!" });
  } catch (err) {
    console.error("❌ Feedback Save Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET → All Feedback
router.get("/feedback", async (req, res) => {
  try {
    const feedbackList = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbackList);
  } catch (err) {
    console.error("❌ Fetch Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
