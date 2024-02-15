const jwt = require("jsonwebtoken");
const user = require("../models/UserModel");
require("dotenv").config();

// Auth
exports.auth = async (req, res, next) => {
    try{
        // Extract Token
        const token = req.cookies.token 
                        || req.body.token       
                        || req.header("Authorisation").replace("Bearer ", "");

        if(!token){
            return res.status(401).json({
                success: false,
                message: "The token is missing"
            })
        }    
        
        console.log("Token fetched Successfully")
        
        // Verify the token
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decode : ", decode);
            req.user = decode;
        }
        catch(err){
            return res.status(402).json({
                // Verification Issue
                success : false,
                message: "Token is invalid"
            })    
        }

        next();
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Something went wrong verifying the token"
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try{
        //
        if(req.user.accountType !=="Student"){
            return res.status(400).json({
                success: false,
                message: "This is a protected route for students "
            })
        }
        next();
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Not verified for student, please try again"
        })
    }
}

exports.isInstructor = async (req, res, next) => {
    try{
        //
        if(req.user.accountType !=="Instructor"){
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Instructors "
            })
        }
        next();
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Not verified for instructor, please try again"
        })
    }
}

exports.isAdmin = async (req, res, next) => {
    try{
        //
        if(req.user.accountType !=="Admin"){
            console.log("Admin verified")
            return res.status(400).json({
                success: false,
                message: "This is a protected route for Admin "
            })
        }
        next();
    } catch(error){
        res.status(500).json({
            success: false,
            message: "Not verified for Admin, please try again"
        })
    }
}