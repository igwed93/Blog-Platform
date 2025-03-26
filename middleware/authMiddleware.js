const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    const token = req.cookies.token; // Get token from cookies


    if (!token) {
        return res.status(401).json({ msg: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ msg: "Not authorized, invalid token" });
    }
};


module.exports = { protect };