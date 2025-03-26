require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const reactionRoutes = require("./routes/reactionRoutes");


const app = express();


// Connect to MongoDB
connectDB();


// Middleware
app.use(express.json()); // Parse JSON body
app.use(cookieParser()); // Parse cookies
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Enable CORS


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/reactions", reactionRoutes);


// Start server
const PORT = process.env.PORT || 4010;
app.listen(PORT, () => console.log(`Server runnning on port ${PORT}`));