const express = require('express')
const router = express.Router();

// Import the controllers
const {createCourse, getAllCourses, getCourseDetails} = require("../controllers/CourseController");
const {showAllCategories, createCategory, categoryPageDetails} = require("../controllers/categoryController");
const {createSection, updateSection, deleteSection} = require("../controllers/SectionController")
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSectionController");
const {createRating, getAverageRating, getAllRatingsAndReviews} = require("../controllers/RatingAndReviewController");
const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/authMiddleware");

router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/addSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);

router.get("/getAllCourses", getAllCourses);
router.post("/getCourseDetails", getCourseDetails);
// router.post("/getFullCourseDetails", )
// router.post("/editCourse", auth, isInstructor, editCourse);
// router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// router.delete("/deleteCourse", deleteCourse)
// router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

router.post("/createCategory", auth, isAdmin, createCategory);
// router.post("/createCategory", auth, createCategory);

router.get("/showAllCategories", showAllCategories);
router.post("/getCategoryPageDetails", categoryPageDetails);

router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRatingsAndReviews);

module.exports = router;