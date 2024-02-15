const User = require("../models/UserModel");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto")

// Reset Password Token (Send Email)
exports.resetPasswordToken = async (req, res) => {
    
    try{
        // Get Email from Body and verify It
        const email = req.body.email;
        const user = await User.findOne({email: email});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User does not exist"
            })
        }
        
        // Generate Token
        const token = crypto.randomUUID();

        // Update user by adding token and expiry time
        const updatedDetals = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordExpires: Date.now() + 5*60*1000,
            },
            {new: true},
        )

        // Send mail

        // const url = `http://localhost:4000/update-password/${token}`;
        // await mailSender(email, "Password Reset Link", `Password Reset Link : ${url}`);

        // Return response
        return res.json({
            success: true,
            token: token,
            message: "Email sent successfully"
        })
    }

    catch(error){
        console.log("Error : ", error)
        res.json({
            success: false,
            message: "Something went wrong resetting the password"
        })
    }
}

// Reset Password
exports.resetPassword = async (req, res) => {

    try{
        // Date fetch and Validation
        const {password, confirmPassword, token} = req.body;
        // Normally, token is not present in body, but this is a
        // special case where frontent places token in body before req
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: "Password Not Matching"
            })
        }
        console.log("Token successfully fetched")

        // Get Userdetails from DB using token and verify
        const userDetails = await User.findOne({token: token});
        if(!userDetails){
            return res.json({
                success: false,
                message: "Token is invalid"
            });
        }

        // Check if reset Time has expired
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success: false,
                message: "Reset Time has Expired"
            })
        }
        console.log("Token and time verified")

        // Hash Password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update Password
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
            {new: true}
        )

        console.log("Updated successfully");
        
        return res.status(200).json({
            success: true,
            message: "Password Successfully Updated"
        })
    }
    catch(error){
        return res.json({
            success: false,
            message: "Reset password failed"
        })
    }
}