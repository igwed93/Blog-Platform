const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
{
    title: { type: String, required: true },
    content: { type: String, requred: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
},
{ timestamps: true }
);


module.exports = mongoose.model("Blog", BlogSchema);