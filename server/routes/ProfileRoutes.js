const express = require('express')
const Users = require("../models/UserModel");
const router = express.Router();
const {auth, isInstructor} = require("../middlewares/authMiddleware");

const {
    deleteProfileAccount,
    updateProfile,
    getAllUserDetails,
    updateDisplayPicture,
    getEnrolledCourses
} = require("../controllers/ProfileController");



router.delete("/deleteProfile", deleteProfileAccount);
router.put("/updateProfile", auth, updateProfile);
router.get("/getUserDetails",auth, getAllUserDetails);
// router.get("/getEnrolledCourses", auth, getEnrolledCourses);
// router.put("/updateDisplayPicture", auth, updateDisplayPicture);
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;