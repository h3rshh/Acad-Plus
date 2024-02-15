const {instance} = require("../config/razorpayConfig");
const Course = require("../models/Course");
const User = require("../models/UserModel");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")

// Capture the payment and initiate th eRazorpay Order
exports.capturePayment = async (req, res) => {  
    try{

        // Get CourseId and UserId
        const {course_id} = req.body;
        const userId = req.user.id;
        if(!course_id){
            return res.status(500).json({
                success: false,
                message: "Please Provide valid course ID",
            })
        }

        try{
            // Valid CourseDetail
            let course;
            course = await Course.findById(course_id);
            if(!course){
                return res.status(500).json({
                    success: false,
                    message: "Could not find the course",
                })
            }

            // User already has paid for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(500).json({
                    success: false,
                    message: "Student is already Enrolled",
                })
            }
        }
        catch(error){
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }


        // Order Create
        const amount = course.price;
        const currency = "INR";

        // Return Response
        const options = {
            amount: amount * 100,
            currency,
            reciept: Math.random(Date.now()).toString(),
            notes: {
                courseId: course_id,
                userId,
            }
        }

        // Initiate the payment using razpopay function
        const paymentResponse = await instance.orders.create(options);
        console.log("Paument Response : ", paymentResponse);

        // Return Response
        return res.status(200).json({
            success: true,
            courseName: course.courseName,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
            message: "Razorpay Request Successful",
            paymentResponse
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

// Verify Signature of Razorpay and Server
exports.verifySignature = async (req, res) => {
    try{
        const webhookSecret = "12345678";
        const signature = req.header("x-razorpay-signature");
        
        const shasum = crypto.createHmac("sha256", webhookSecret) 
        shasum.update(JSON.stringify(req.body));
        const digest = shasum.digest("hex");

        if(signature === digest){


            console.log("Payment is Authorized");
            const {courseId, userId} = req.body.payload.payment.entity.notes;

            try{
                // Fulfill the action

                // Find the course and enroll the student into it
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id: course_id},
                    {$push: {studentsEnrolled: userId}},
                    {new: true}
                );

                if(!enrolledCourse){
                    return res.status(500).json({
                        success: false,
                        message: "Course Not Found",
                    })
                }

                console.log("Enrolled Course : ", enrolledCourse);

                // find the student and add the course to their purchased courses
                const enrollledStudent = await User.findOneAndUpdate(
                    {_id: userId},
                    {$push: {courses: courseId}},
                    {new: true}
                )
                console.log("Enrolled Student : ", enrollledStudent);

                // Mail Sender
                const mailResponse = await mailSender(
                    enrollledStudent.email,
                    "Congratulations dear viewer",
                    "Congratulations, you are onboarded into new Course",
                )

                console.log("Email Response : ", mailResponse);

                return res.status(200).json({
                    success: true,
                    message: "Signature verified and course added",
                })
            }   
            catch(error){
                return res.status(500).json({
                    success: false,
                    message: error.message,
                })
            }
        }

        else{
            return res.status(500).json({
                success: false,
                message: "Invalid Request",
            })
        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// HW
// Get course details handler - It gives all the detail of the chosen course (use populate, dont return IDs)
exports.selectedCourseDetails = async (req, res) => {
    try{
        const {course_id} = req.body;
        const selectedCoousesResponse = await Course.findById({_id: course_id})
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
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
// Find Check Sum