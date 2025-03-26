const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware"); // Ensures only logged-in users can comment

const router = express.Router();

router.post("/:blogId", protect, addComment); // Add a comment
router.get("/:blogId", getComments); // Get comments for a blog
router.delete("/:commentId", protect, deleteComment); // Delete a comment (only owner/admin)

module.exports = router;
