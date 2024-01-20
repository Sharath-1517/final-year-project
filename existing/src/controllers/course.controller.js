const courseServices = require("../services/course.service");

//get all courses controller
const getAllCoursesController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	const final_result = await courseServices.getAllCoursesService();

	return res.status(final_result.status).json(final_result);
};

//post a course
const postCourseController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	const { name, description } = req.body;
	const final_result = await courseServices.postCourseService(
		name,
		description,
	);

	return res.status(final_result.status).json(final_result);
};

module.exports = {
	getAllCoursesController,
	postCourseController,
};
