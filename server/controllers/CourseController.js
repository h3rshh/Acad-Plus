const Course = require("../models/Course");
const Tag = require("../models/Tag");
const User = require("../models/UserModel")
const {uploadImageToCloudinary} = require("../utils/imageUploader");

// Create Course Handler Functions
exports.createCourse = async (req, res) => {
    try{

        // Fetch Data and Thumbnail
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body
        // const Thumbnail = req.files.thumbnailImage;

        // Validation
        // if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !Thumbnail){
        if(!courseName || !courseDescription || !whatYouWillLearn || !price ){
            return res.status(400).json({
                success: false,
                message: "All fields are not present",
            })
        }

        // Check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details : ", instructorDetails);

        if(!instructorDetails){
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
        console.log("Instructor Verified")

        // Check if Given Tag is valid or not
        // const tagDetails = await Tag.findById(tag);
        // if(!tagDetails){
        //         return res.status(500).json({
        //             success: false,
        //             message: error.message,
        //         })
        // }

        // Upload Image to Cloudinary

        // const thumbnailImage = await uploadImageToCloudinary(Thumbnail, process.env.FOLDER_NAME);
        // console.log("Thumbnail Uploaded")

        // Create an entry for the new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails,
            whatYouWillLearn: whatYouWillLearn,
            price,
            // tag: tagDetails._id,
            // thumbnail: thumbnailImage.secure_url,
        }) 

        // Add the new Course to the Schema of the Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {courses: newCourse._id}
            },
            {new: true},
        )

        // HW Update the Tag Schema
        // await Tag.findByIdAndUpdate(
        //     {id: tag._id},
        //     {
        //         $push: {courses: newCourse._id},
        //     },
        //     {new: true}
        // )

        return res.status(200).json({
            success: true,
            message: "Course Created Successfully",
            data: newCourse,
        })


    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


// Get All Courses Handler Function
exports.getAllCourses = async (req, res) => {
    try{
        const allCourses = await Course.find(
            {status: "Published"}, 
            {courseName: true,
             price: true,
            thumbnail: true,
            instructor: true,
            ratingsAndReviews: true,
            studentsEnrolled: true}, 
            ).populate("instructor")
            .exec();

        console.log("All Courses data : ", allCourses)

        return res.status(200).json({
            success: true,
            message: "Data for all courses Fetched Successfully",
            data: allCourses 
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// HW Get Course Details
exports.getCourseDetails = async (req, res) => {
    try{
        const {courseId} = req.body;
        const courseDetails = await Course.find(
            {_id: courseId})
        
            .populate(
                {
                    path: "instructor",
                    populate: {
                        path: "additionalDetails"
                    },
                }
            )

            .populate("category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: {
                    path: "subSection"
                }
            })

            .exec()
        
        if(!courseDetails) {
            return res.status(500).json({
                success: false,
                message: `Could Not find a course with ID ${courseId}`,
            })
        }

        return res.status(200).json({
            success: true,
            message: "Course Data Fetched",
            data: courseDetails,
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}