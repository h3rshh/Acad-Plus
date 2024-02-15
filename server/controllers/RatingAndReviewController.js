const RatingAndReview =  require("../models/RatingAndReview");
const Course = require("../models/Course");

exports.createRating = async (req, res) => {
    try{
        // Get User Id, Fetch Rating Data see if He has purchased the Course
        const userId = req.user.id;
        const {rating, review, courseId} = req.body;
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled: {$elemMatch: {$eq: userId }},
            },
        )

        // Check if User doesnt have other reviews
        const alreadyReviewed = await RatingAndReview.find({
            user: userId,
            course: courseId 
        })
        if(alreadyReviewed){
            return res.status(500).json({
                success: false,
                message: "User has already Reviewd",
            })
        }


        // Create Rating
        const ratingReview = await RatingAndReview.create({
            rating, review, 
            course: courseId,
            user: userId,
        })

        // Update Course With Rating
        await Course.findByIdAndUpdate(courseId,
            {
                $push: {
                    ratingAndReviews: ratingReview._id
                }
            },
            {new: true}
        )
        
        return res.status(200).json({
            success: false,
            message: "Rating and review Created Successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

exports.getAverageRating = async (req, res) => {
    try{
        // Get Course Id
        const courseId = req.body.courseId;

        // Average Rating Calculation
        const result = await RatingAndReview.aggregate([
                {
                    $match: {
                        course: new mongoose.Types.ObjectId(courseId)
                    }
                },
                {
                    $group: {
                        _id: null,
                        getAverageRating: { $avg: "$rating"}
                    }
                }
            ]    
        )

        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            })
        }

        // If no ratings or reviews exist
        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no ratings have been given yet",
            averageRating: 0,
        })


    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


exports.getAllRatingsAndReviews = async (req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path: "user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path: "course",
                                                    select: "courseName",
                                                })
                                                .exec
        
        return res.status(200).json({
            success: true,
            message: "Student Reviews Fetched"
        })                                            

    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
