const User = require("../models/UserModel");
const Profile = require("../models/ProfileModel")
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender")
require("dotenv").config();

// Send OTP
exports.sendOTP = async (req, res) => {
    try{
        // Fetch Email from body and verify
        const {email} = req.body;
        console.log("Email id is : ", email);
        const checkUser = await User.findOne({email});
        
        // If user with that mail Id already exists
        if(checkUser){
            return res.status(401).json({
                success: false,
                messages: "User already exists"
            })
        }

        // Generate OTP
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        })
        console.log("OTP Generated : ", otp)

        // Verify OTP
        const result = await OTP.findOne({otp: otp})

        // Keep generating a new OTP until you find a unique OTP
        // This is bad practice as you are needing to generate new
        // OTPS again and again and put them in the DB
        while(result){
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false
            })
            result = await OTP.findOne({otp: otp})
        }

        const otpPayload = {email, otp};
        
        // DB Entry for OTP
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody);

        res.status(200).json({
            success: true,
            message: 'OTP Sent successfully',
            otp
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            messages: `Complete Failure : ${error.message}`, 
            // messages: error.message,
        })
    }
}

exports.signUp = async (req, res) => {
    try{
        // Data Fetch
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;
        if(!firstName || !lastName || !email || !password || !accountType  || !confirmPassword || !otp){
            return  res.status(401).json({
                success: false,
                messages: "All fields are required"
            })
        }

        if(password !== confirmPassword){
            return res.status(401).json({
                success: false,
                messages: "Password does not Match ConfirmPassword"
            })
        }

        // Check if user Exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(401).json({
                success: false,
                messages: "User already exists"
            })
        }

        // Find most recent OTP stored for the user
        // const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
        // console.log("Recent OTP : ", recentOtp)

        // if(recentOtp.length === 0){
        //     //OTp not found
        //     return res.status(401).json({
        //         success: false,
        //         messages: "OTP not Found"
        //     })
        // }
        // else if(otp !== recentOtp){
        //     // Mismatch
        //     return res.status(401).json({
        //         success: false,
        //         messages: "Incorrect OTP"
        //     })
        // }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Hashed Password created : ", hashedPassword)

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contact: null,
        })

        console.log("Profile Created : ", profileDetails)

        // Entry in DB
        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            confirmPassword: hashedPassword,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        })

        // Return Response
        return res.status(200).json({
            success: true,
            message: "User Registered Successfully",
            user,
        })
    }
    catch(error){
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try Again",
        })
    }
}

exports.login = async (req, res) => {
    try{
        // Get data
        const {email, password} = req.body

        // Check user
        if(!email || !password){
            return res.status(403).json ({
                success: false,
                message: "Enter all fields"
            })
        }
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered, please Signup First"
            })
        }

        // Match Password and then Generate JWT 
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h",
            })
            user.token = token;
            user.password = undefined;

            // Create Cookie and send Response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true
            }
            res.cookie("token", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            })
        }   

        else{
            return res.status(401).json({
                success: false,
                message: "Password is Incorrect"
            })
        }
    
    }
    catch(error){
        console.log("Error : ", error);
        return res.status(500).json({
            success: false,
            message: "User login failed completey",
        })
    }
}

// HW
exports.changePassword = async (req, res) => {

    // Fetch req data
    const {email, password, newPassword, confirmNewPassword} = req.body;
    const user = await User.findOne({email});
    if(!email || !password){
        return res.status(403).json ({
            success: false,
            message: "Enter all fields"
        })
    }

    if(await bcrypt.compare(password, user.password)){
        if(newPassword !== confirmNewPassword){
            return res.status(403).json ({
                success: false,
                message: "New password and Confirm new password dont match"
            })
        }

        else{
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;

            return res.status(200).json({
                success: true,
                message: "Password Successfully changed",
                user,
            })
        }
    }
    else{
        return res.status(403).json ({
            success: false,
            message: "The old password is incorrect"
        })
    }

    // Get Oldpwd, NewPwd, confirmNewPwd

    // Update Pwd in Db

    // Send mail to user's Email

    // Return Response
}