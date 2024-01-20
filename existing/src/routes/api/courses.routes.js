const express = require("express");
const router = express.Router();

//controllers
const coursesController = require("../../controllers/course.controller");

//routes
//get courses
router.get("/", coursesController.getAllCoursesController);

//post course
router.post("/", coursesController.postCourseController);

module.exports = router;
