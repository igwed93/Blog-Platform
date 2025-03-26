const Comment = require("../models/comment.model");
const Blog = require("../models/blog.model");


// Add a comment to a blog post
const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const { blogId } = req.params;
        const userId = req.user.id;   // Extracted from JWT

        // Check if the blog post exists
        const blog = await Blog.findById(blogId);
        if (!blog) return res.status(404).json({ msg: "Blog post not found" });

        // Create and save comment
        const comment = await Comment.create({ text, blog: blogId, user: userId });

        res.status(201).json({ msg: "Comment added", comment });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};

// Get all comments for a specific blog post
const getComments = async (req, res) => {
    try {
        const { blogId } = req.params;
        const comments = await Comment.find({ blog: blogId }).populate("user", "name");
        res.json(comments);
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


// Delete a comment (Only the user who wrote it or an admin)
const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId);

        if (!comment) return res.status(404).json({ msg: "Comment not found" });

        if (req.user.id !== comment.user.toString() && req.user.role !== "admin") {
            return res.status(403).json({ msg: "Not authorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(commentId);
        res.json({ msg: "Comment deleted" });
    } catch (err) { 
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


module.exports = { addComment, getComments, deleteComment };