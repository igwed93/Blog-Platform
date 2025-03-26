const Reaction = require("../models/reaction.model");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");
const mongoose = require("mongoose");

// Reaction handler
const toggleReaction = async (req, res) => {
    try {
        const { type, id } = req.params;
        const { emoji } = req.body;
        const userId = req.user.id;
        

        // Validate content type
        if (!["blog", "comment"].includes(type)) {
            return res.status(400).json({ msg: "Invalid content type" });
        }

        // Validate emoji exists
        if (!emoji) {
            return res.status(400).json({ msg: "Emoji is required" });
        } 
        
        // Verify content exists
        const ContentModel = type === "blog" ? Blog : Comment;
        const content = await ContentModel.findById(id);
        if (!content) {
            return res.status(404).json({ msg: `${type} not found` });
        }

        // Check for existing reaction
        const existingReaction = await Reaction.findOne({
            user: userId,
            contentType: type === "blog" ? "Blog" : "Comment",
            contentId: id,
            emoji
        });

        if (existingReaction) {
            // Remove reaction if exists
            await Reaction.deleteOne({ _id: existingReaction._id });
            return res.json({
                msg: "Reaction removed",
                action: "removed",
                emoji,
                reactions: await getReactionCounts(id, type)
            });
        }

        // Add new reaction
        const newReaction = new Reaction({
            user: userId,
            contentType: type === "blog" ? "Blog" : "Comment",
            contentId: id,
            emoji  
        });

        await newReaction.save();
        res.json({
            msg: "Reaction added",
            action: "added",
            emoji,
            reactions: await getReactionCounts(id, type)
        });

    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


// Function to get reaction counts
const getReactionCounts = async (contentId, contentType) => {
    const counts = await Reaction.aggregate([
        {
            $match: {
                contentId: new mongoose.Types.ObjectId(contentId),
                contentType: contentType === "blog" ? "Blog" : "Comment"
            }
        },
        {
            $group: {
                _id: "$emoji",
                count: { $sum: 1 },
                users: { $push: "$user" }
            }
        }
    ]);

    return counts.reduce((acc, curr) => {
        acc[curr._id] = {
            count: curr.count,
            users: curr.users
        };
        return acc;
    }, {});
};


// Get reactions for content
const getContentReactions = async (req, res) => {
    try {
        const { type, id } = req.params;
        
        if (!["blog", "comment"].includes(type)) {
            return res.status(400).json({ msg: "Invalid content type" });
        }

        const reactions = await getReactionCounts(id, type);
        res.json({ reactions });
    } catch (err) {
        res.status(500).json({ msg: "Server error", error: err.message });
    }
};


module.exports = { toggleReaction, getContentReactions };