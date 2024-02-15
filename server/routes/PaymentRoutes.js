const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature } = require("../controllers/PaymentController");
const { auth, isInstructor, isAdmin, isStudent } = require("../middlewares/authMiddleware");
router.post("/capturepayment", auth, isStudent, capturePayment);
router.post("/verifySignature", verifySignature);

module.exports = router;