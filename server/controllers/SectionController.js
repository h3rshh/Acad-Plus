const Section = require("../models/Section");
const Course = require("../models/Course");
const { findByIdAndDelete } = require("../models/UserModel");

exports.createSection = async (req, res) => {
    try{
        // Data fetch and validation
        const {sectionName, courseId} = req.body;
        if(!sectionName || !courseId){
            return res.status(500).json({
                success: false,
                message: "Missing Properties",
            })
        }

        // Create Section 
        const newSection = await Section.create({sectionName});

        // HW Update Course with section ObjectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: {
                courseContent: newSection._id}
            },
            {new: true},
        ).populate("courseContent")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        })
        .exec();

        // Use Populate to get Data for section and sub-sections in updatedCourseDetails

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Section Successfully Created",
            updatedCourseDetails,
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//
exports.updateSection = async (req, res) => {
    try{
        // Data Fetch and Validation
        const {sectionName, sectionId, courseId} = req.body;
        if(!sectionName || !sectionId || !courseId){
            return res.status(500).json({
                success: false,
                message: "Missing Properties",
            })
        }

        // Update Data 
        const section = await Section.findByIdAndUpdate(sectionId,
            {sectionName}, {new: true});

        // Update Course
        const course = await Course.findById(courseId)
		.populate({
			path:"courseContent",
			populate:{
				path:"subSection",
			},
		})
		.exec();    

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Section Successfully Updated",
            section,
            course,
        })

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// 
exports.deleteSection = async (req, res) => {
    try{
        // Fetch Id and Validate
        const {sectionId, courseId} = req.body;
        if(!sectionId){
            return res.status(500).json({
                success: false,
                message: "Missing Properties",
            })
        }

        // Delete
        await Section.findByIdAndDelete(sectionId);

        // HW Update the Course Array since a Section has been deleted
        await Course.updateOne(
            { _id: courseId },
            { $pull: { sections: sectionId } }
        );
        

        return res.status(200).json({
            success: false,
            message: "Successfully Deleted",
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}