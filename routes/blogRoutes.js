const express = require("express");
const { protect } = require("../middleware/authMiddleware"); // authorization middleware
const {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
} = require("../controllers/blogController");

const router = express.Router();

router.post("/", protect, createBlog);
router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", protect, updateBlog);
router.delete("/:id", protect, deleteBlog);


module.exports = router;