const Blog = require("../models/blog.model");

// Create a new blog post
const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const blog = await Blog.create({ title, content, author: req.user.id });
        res.status(201).json({ msg: "Blog created successfully", blog });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate("author", "name email").sort({ createdAt: -1 });
        res.json({ blogs });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


// Get a single blog post
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "name email");
        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        res.json({ blog });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


// Update a blog post (only the author can update)
const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        if (blog.author.toString() !== req.user.id) {
            return res.status(403).json({ msg: "Not authorized to update this blog" });
        }

        const { title, content } = req.body;
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        await blog.save();

        res.json({ msg: "Blog updated successfully", blog });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


// Delete a blog post (only the author or admin can delete)
const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ msg: "Blog not found" });

        if (blog.author.toString() !== req.user.id && req.user.role !== "admin") {
            return res.staus(404).json({ msg: "Not authorized to delete this blog" });
        }

        await blog.deleteOne();
        res.status(200).json({ msg: "Blog deleted successfully" });
    } catch (err) {
        return res.status(500).json({ msg: "Server error", error: err.message });
    }
};


module.exports = { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog };