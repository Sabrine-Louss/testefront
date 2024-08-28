const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ msg: "You are not authorized" });
        }

        const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

        if (!verifiedToken) {
            return res.status(401).json({ msg: "You are not authorized" });
        }

        if(verifiedToken.role=="admin")
            
        next();
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong!", err: err.message });
    }
};

module.exports = adminMiddleware 
