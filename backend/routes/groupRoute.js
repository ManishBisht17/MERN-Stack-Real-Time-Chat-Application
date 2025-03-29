const express = require("express");
const Group = require("../models/GroupModel");
const groupRouter = express.Router();
const { protect, isAdmin } = require("../middleware/authMiddleware");
//create a new group

groupRouter.post("/", protect, isAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const group = await Group.create({
      name,
      description,
      admin: req.user._id,
      member: [req.user._id],
    });
    const populatedGroup = await Group.findById(group._id)
      .populate("admin", "username email")
      .populate("members", "username email");
    res.status(201).json({ populatedGroup });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

//get all group

groupRouter.get("/", protect, async (req, res) => {
  try {
    const groups = await Group.find()
      .populate("admin", "username email")
      .populate("members", "username email");
    res.json(groups);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//join group
groupRouter.post("/:groupId/join", protect, async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    // Check if user is already a member
    if (group.members.includes(req.user._id)) {
      console.log(req.user.username);
      return res
        .status(400)
        .json({ message: "Already a member of this group" });
    }

    // Add user to the group
    group.members.push(req.user._id);
    await group.save();

    res.status(200).json({ message: "Successfully joined this group" });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = groupRouter;
