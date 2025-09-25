const { validationResult } = require("express-validator")
const userModel = require('../Models/user.model')


module.exports.registerUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try{
        const {fullname,email,password,code} = req.body;

        if(code != process.env.CODE){
            return res.status(400).json({
                message : "Enter Correct Code"
            })
         }

        const isUserAlready = await userModel.findOne({
            email
        })
         if(isUserAlready){
            return res.status(400).json({message : "User Already Registered"})
         }
         const hashedPassword = await userModel.hashPassword(password);
         const hashedCode = await userModel.hashPassword(code)
         const firstname = fullname.firstname
         if(!firstname || !email || !password || !code){
            throw new Error("All fields are required ");
         }
         const user = await userModel.create({
            fullname:{
                firstname : fullname.firstname,
                lastname : fullname.lastname
            },
            email,
            password : hashedPassword,
            code : hashedCode
         })

         const token =  user.generateAuthToken();
         res.cookie('token',token);
         console.log("User Registered");
         res.status(201).json({token,user})
    }catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error"});
    }
}

module.exports.loginUser = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try {
        const {email,password} = req.body;

        const user = await userModel.findOne({email}).select('+password');

        if(!user){
            return res.status(401).json({message : "User not found"})
        }

        const isMatch = await user.comparePassword(password);

        if(!isMatch){
            return res.status(401).json({
                message : "User not found"
            })
        }

        const token = user.generateAuthToken();

        res.cookie('token',token);
        console.log("User Logined");
        res.status(200).json({token,user});
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message : "Server Error"
        })

    }
}