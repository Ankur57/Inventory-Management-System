const userModel = require('../Models/user.model');
const jwt = require("jsonwebtoken");


module.exports.authUser = async(req,res,next)=>{
    // Try to get token from multiple sources
    const token = req.cookies.token || 
                 (req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
                  ? req.headers.authorization.split(' ')[1] 
                  : null);

    if(!token){
        console.log("No token found in cookies or Authorization header");
        return res.status(401).json({
            message: "Authentication required. Please log in.",
            code: "NO_TOKEN"
        });
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded._id) {
            return res.status(401).json({
                message: "Invalid token format",
                code: "INVALID_TOKEN"
            });
        }

        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                code: "USER_NOT_FOUND"
            });
        }

        req.user = user;
        req.token = token; // Store token for potential use in route handlers
        return next();
    }
    catch(err){
        console.error("Auth Error:", err.message);
        return res.status(401).json({
            message: "Session expired or invalid. Please log in again.",
            code: "INVALID_TOKEN"
        });
    }
}