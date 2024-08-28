const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.token;

        if (!token) {
            return res.status(401).json({ msg: "You are not authorized" });
        }
        else{
            const verifiedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);

            if (!verifiedToken) {
                return res.status(401).json({ msg: "You are not authorized" });
            }
            else{
                req.body.userId = verifiedToken.id;  
                next();
            }
        }
       

        
    } 
    catch (err) {
        return res.status(500).json({ msg: "Something went wrong with authMiddleware!", err: err.message });
    }
};

module.exports = authMiddleware;
