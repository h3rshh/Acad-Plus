const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender")

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 5*60
    }
});

// Function to send our mails
async function sendVerificationEmail(email, otp){
    try{
        const mailResponse = await mailSender(email, "Verification Email from Acad Zenith", otp);
        console.log("Mail sent Successfully : ", mailResponse);
    }
    catch(error){
        console.log("Error occured while sending mails : ", error);
        throw error
    }
}

// Middleware call
// OTPSchema.pre("save", async function(next){
//     await sendVerificationEmail(this.mail, this.otp);
//     next();
// })

module.exports = mongoose.model("OTP", OTPSchema)