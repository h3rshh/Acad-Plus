const express = require("express");
const app = express();

const userRoutes = require("./routes/UserRoutes");
const profileRoutes = require("./routes/ProfileRoutes");
const paymentRoutes = require("./routes/PaymentRoutes");
const courseRoutes = require("./routes/CourseRoutes");

const database = require("./config/configDatabase");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinaryConfig")
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 4000;

dotenv.config();
database.connect();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "https://localhost:3000",
        credentials: true,
    })
)

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp"
    })
)

cloudinaryConnect();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running",
    })
})

app.listen(PORT, () => {
    console.log(`The app is running at PORT : ${PORT}`);
})