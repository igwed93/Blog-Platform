const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog", // Reference to the blog model
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Ref to the User model
        required: true
    },
    text: {
        type: String,
        required: true
    },
},
{ timestamps: true }
);


module.exports = mongoose.model("Comment", CommentSchema);