const express = require("express");
const router = express.Router();

//controllers
const user_controllers = require("../../controllers/user.controller");

//middlewares
const UserAuthenticationMiddleware = require("../../middlewares/UserAuthentication.middleware");

//routes
//register user
router.post("/", user_controllers.register_user_controller);

//login user
router.post("/login", user_controllers.loginUserController);

//register course
router.post(
	"/register_course",
	UserAuthenticationMiddleware,
	user_controllers.registerCourseController,
);

//mark course completed
router.post(
	"/mark_course_completed",
	UserAuthenticationMiddleware,
	user_controllers.markCourseCompletedController,
);

//view applied courses
router.post(
	"/applied_courses",
	UserAuthenticationMiddleware,
	user_controllers.getAppliedCoursesController,
);

//view completed courses
router.post(
	"/completed_courses",
	UserAuthenticationMiddleware,
	user_controllers.getCompletedCoursesController,
);

module.exports = router;
