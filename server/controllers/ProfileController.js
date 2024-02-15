const Profile = require('../models/ProfileModel');
const User = require('../models/UserModel');

exports.updateProfile = async (req, res) => {
    try{
        // Fetch Data, with User Id and Validate id
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;
        const id = req.user.id;
        if(!contactNumber || !gender || !id){
            return res.status(500).json({
                success: false,
                message: "All data is not present",
            })
        }

        console.log("Before Find user ")

        // Find Profile and Update Profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await  Profile.findById(profileId);

        console.log("Fetched Profile Details")
        
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        console.log("Updated Profile details");

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",
            profileDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// HW Delete Account
exports.deleteProfileAccount = async (req, res) => {
    try{
        // Fetch data and validate
        const id = req.user.id;
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(500).json({
                success: false,
                message: "User with this ID Does not exist",
            })
        }

        // Delete Profile and Delete User
        await Profile.findByIdAndDelete({id: userDetails.additionalDetails} )
        await User.findByIdAndDelete({_id: id})

        // Return Response
        return res.status(200).json({
            success: true,
            message: "ID Successfully Deleted",
        })

        // HW Unenroll user from all Enrolled Courses
        // Schedule Account Deletion
        // Crone Job
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// Get all of User's Details
exports.getAllUserDetails = async (req, res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();

        return res.status(200).json({
            success: true,
            userDetails,
            message: "User Data Successfully Fetched"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}