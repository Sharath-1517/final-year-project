//repositories
const courseRepositories = require("../repositories/course.repository");

//utils
const isString = require("../utils/common/isString");
const throwError = require("../utils/common/throwError");
const isValidCourse = require("../utils/course/isValidCourse");

//services
const getAllCoursesService = async () => {
	try {
		const courses = await courseRepositories
			.getAllCoursesRepository()
			.then((courses) => {
				return courses;
			});

		return {
			courses: courses,
			status: 200,
		};
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);

		//check if error is class code 4.(Eg 400 , 401)
		var class_code = error.status.toString()[0];

		const result = {
			message: class_code === "4" ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

//post course service
const postCourseService = async (name, description) => {
	try {
		return await isValidCourse(name).then(async () => {
			const course_obj = {
				name: name,
				description: description,
			};
			console.log(description);
			return await courseRepositories
				.postCourseRepository(course_obj)
				.then(async () => {
					return {
						message: "Course posted",
						status: 200,
					};
				});
		});
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);

		//check if error is class code 4.(Eg 400 , 401)
		var class_code = error.status.toString()[0];

		const result = {
			message: class_code === "4" ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

module.exports = {
	getAllCoursesService,
	postCourseService,
};
