const User = require("../models/user.model");  // import user model
const jwt = require("jsonwebtoken");


const generateToken = (res, user) => {
    const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true, // Secure againt client-side JavaScript
        secure: process.env.NODE_ENV === "production", // Use HTTPS in production
        sameSite: "strict", // Protect against CSRF
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days expiry
    });
};


// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });


        user = await User.create({ name, email, password });
        generateToken(res, user); // Set JWT in cookie

        res.status(201).json({ msg: "User registered successfully", user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ msg: "Invaliid email or password" });
        }

        generateToken(res, user); // Set JWT in cookie
        
        res.json({ msg: "Login successful", user });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
};


// Logout user
const logoutUser = (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    res.json({ msg: "User logged out successfully" });
};


module.exports = { registerUser, loginUser, logoutUser };