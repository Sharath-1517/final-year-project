//Modules
const mongoose = require("mongoose");

//Models
const CourseModel = mongoose.model("Course");

//get all courses
const getAllCoursesRepository = async () => {
	return CourseModel.find().lean().select("_id name description createdAt");
};

const postCourseRepository = async (course_obj) => {
	course = new CourseModel(course_obj);
	await course.save();
};

module.exports = {
	getAllCoursesRepository,
	postCourseRepository,
};
