const express = require('express')
const Users = require("../models/UserModel");
const router = express.Router();

const {auth} = require("../middlewares/authMiddleware")
const {sendOTP, signUp, login, changePassword} = require("../controllers/AuthController")
const {resetPassword, resetPasswordToken} = require("../controllers/resetPassController")

router.post("/login", login);
router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/changePassword", auth, changePassword)

router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword)

module.exports = router;






















// const { login, signup } = require("../Controller/Auth");
// const { auth, isAdmin, isStudent } = require("../middlewares/authMiddleware");
// const User = require('../Models/User');

// router.post("/signup", signup);
// router.post("/login", login);

// router.get("/test", auth, (req, res) => {
    
// })

// // Protected Route
// router.get("/student", auth, isStudent, (req, res) => {
//     res.json({
//         success: true,
//         message: "Welcome to Protected Route for Students"
//     });
// })
// // Protected Route
// router.get("/admin", auth, isAdmin, (req, res) => {
//     res.json({
//         success: true,
//         message: "Welcome to Protected Route for Students"
//     });
// })

// router.get("/getEmail", auth, async(req, res) => {
    
//     try{
//         const id = req.user.id;
//         const user = await User.findById({id});
//         res.json({
//             success: true,
//             user: user,
//             message: "Welcome to Email route"
//         });
//     } catch(error){
//         res.status(501).json({
//             success: false,
//             message: "Failed to get into Email"
//         });
//     }   

//     console.log("ID : ",id);
// })




// module.exports = router;