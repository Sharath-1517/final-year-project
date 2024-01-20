//import services
const user_services = require("../services/user.services");

//register a user
const register_user_controller = async (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const { email, password, password_confirmation, first_name, last_name } =
		req.body;

	console.group("User registration");

	const final_result = await user_services.registerUserService(
		email,
		password,
		password_confirmation,
		first_name,
		last_name,
	);

	console.groupEnd("User registration");

	const status = final_result.status;
	if (status && status === 200) {
		//Set login cookies
		const jwt = final_result.jwt;

		res.status(202).cookie("jwt", jwt, {
			path: "/",
			expires: new Date(Date.now() + 900000),
			secure: true,
			httpOnly: false,
			sameSite: "None",
		});
		res.status(202).cookie("loggedIn", true, {
			path: "/",
			expires: new Date(Date.now() + 900000),
			secure: true,
			httpOnly: false,
			sameSite: "None",
		});
	}

	return res.status(final_result.status).json(final_result);
};

//login user
const loginUserController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	console.group("\nLogin");
	console.time("login time");

	const { email, password } = req.body;

	var final_result = await user_services.loginUserService(email, password);

	const status = final_result.status;

	if (status) {
		if (status === 200) {
			//Set login cookies
			const jwt = final_result.jwt;

			res.status(202).cookie("jwt", jwt, {
				path: "/",
				expires: new Date(Date.now() + 900000),
				secure: true,
				httpOnly: false,
				sameSite: "None",
			});
			res.status(202).cookie("loggedIn", true, {
				path: "/",
				expires: new Date(Date.now() + 900000),
				secure: true,
				httpOnly: false,
				sameSite: "None",
			});

			//console.log("jwt", jwt);

			console.timeEnd("login time");
			console.groupEnd("\nLogin");

			return await res.status(status).json(final_result);
		} else {
			console.timeEnd("login time");
			console.groupEnd("\nLogin");

			console.error("Status present but not 200");
			return res.status(status).json(final_result);
		}
	} else {
		console.timeEnd("login time");
		console.groupEnd("\nLogin");
		console.error("Status code not present");
		return res.json(final_result);
	}
};

//register course controller
const registerCourseController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");

	const { _id } = req;
	const { course_id } = req.body;
	const final_result = await user_services.registerCourseService(
		_id,
		course_id,
	);

	return res.status(final_result.status).json(final_result);
};

//mark course completed
const markCourseCompletedController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const { _id } = req;
	const { course_id } = req.body;
	const final_result = await user_services.markCourseCompletedService(
		_id,
		course_id,
	);
	return res.status(final_result.status).json(final_result);
};

//get applied courses controller
const getAppliedCoursesController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const { _id } = req;

	const final_result = await user_services.getAppliedCoursesService(_id);
	return res.status(final_result.status).json(final_result);
};

//get completed courses controller
const getCompletedCoursesController = async (req, res) => {
	res.setHeader("Content-Type", "application/json");
	const { _id } = req;

	const final_result = await user_services.getCompletedCoursesService(_id);
	return res.status(final_result.status).json(final_result);
};

module.exports = {
	register_user_controller,
	loginUserController,
	registerCourseController,
	markCourseCompletedController,
	getAppliedCoursesController,
	getCompletedCoursesController,
};
