const mongoose = require('mongoose');

const ReactionSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    contentType: { 
        type: String, 
        enum: ["Blog", "Comment"], 
        required: true 
    },
    contentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        index: true 
    },
    emoji: { 
        type: String, 
        enum: ["😂", "🔥", "💯", "❤️", "👏", "👎", "👍", "🎉"],
        required: true,
    },
},
{ timestamps: true }
);

// Compound index for unique user reactions per content
ReactionSchema.index(
    { user: 1, contentType: 1, contentId: 1, emoji: 1 },
    { unique: true }
);

module.exports = mongoose.model("Reaction", ReactionSchema);