const userModel = require('../Models/user.model');
const jwt = require(jsonwebtoken)

module.exports.authUser = async(req,res,next)=>{
    const token = req.cookies.token || req.header.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message : "Unauthozied"})
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();
    }
    catch(err){
        return res.status(401).json({message : "Unauthorized"})
    }
}