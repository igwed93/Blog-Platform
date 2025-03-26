const express = require("express");
const { 
    toggleReaction, 
    getContentReactions 
} = require("../controllers/reactionController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Route for content reactions
router.post("/:type(blog|comment)/:id", protect, toggleReaction);
router.get("/:type(blog|comment)/:id", protect, getContentReactions);

module.exports = router;