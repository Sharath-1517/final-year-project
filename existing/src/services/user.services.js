//repositories
const { isValidObjectId } = require("mongoose");
const userRepositories = require("../repositories/user.repository");
const throwError = require("../utils/common/throwError");
const isValidEmail = require("../utils/user/common/isValidEmail");
const setJWT = require("../utils/user/common/setJWT");
const verifyPassword = require("../utils/user/login/verifyPassword");

//utils
const hashPassword = require("../utils/user/registration/hashPassword");
const isValidUser = require("../utils/user/registration/isValidUser");

const registerUserService = async (
	email,
	password,
	password_confirmation,
	first_name,
	last_name,
) => {
	try {
		return await isValidUser(
			first_name,
			last_name,
			email,
			password,
			password_confirmation,
		).then(async () => {
			return await hashPassword(password).then(async (hashedPassword) => {
				return await userRepositories
					.createUserRepository(email, hashedPassword, first_name, last_name)
					.then(async (user) => {
						return await setJWT(user._id, user.admin).then(
							async (json_web_token) => {
								result = {
									message: "Registered successfuly",
									status: 200,
									jwt: json_web_token,
								};
								return result;
							},
						);
					});
			});
		});
	} catch (error) {
		console.error(error);
		let result;

		//duplicate email id error handling
		if (error.code && error.code === 11000 && error.keyPattern.email) {
			result = {
				message: `Email '${error.keyValue.email}' is already in use by another account`,
				status: 422,
			};
			return result;
		}

		//If error status code is found
		if (error.status) {
			const class_code = Math.floor(error.status / 100);

			//If the error is of user's fault
			if (class_code === 4) {
				result = {
					message: error.message,
					status: error.status,
				};
				return result;
			} else {
				//Error class 5 maybe due to server problems and may reveal internal code so custom messages are used
				result = {
					message: "Unable to register",
					status: 500,
				};
				return result;
			}
		} else {
			//If error class is not found then declare internal server error
			result = {
				message: "Something went wrong",
				status: 500,
			};
		}

		return result;
	}
};

//login
const loginUserService = async (email, password) => {
	let result;

	try {
		return await isValidEmail(email).then(async () => {
			if (!password) {
				//if password not found
				await throwError("Please enter a password", 422);
			} else {
				return await userRepositories
					.getUserByEmailRepository(email)
					.then(async (user) => {
						//User will be undefined if the email is not registered
						if (!user) {
							console.log("Email id is not registered");
							await throwError("Invalid credentials", 401);
						} else {
							//check if the password is correct
							try {
								var verify_password_check = await verifyPassword(
									user.password,
									password,
								);
							} catch (error) {
								console.error(
									"argon2 verify password function throws error \n",
									error,
								);
							}

							if (verify_password_check !== true) {
								console.log("Invalid password");
								await throwError("Invalid credentials", 401);
							} else {
								return await setJWT(user._id, user.admin).then(
									async (json_web_token) => {
										result = {
											message: "Login success",
											status: 200,
											jwt: json_web_token,
										};
										return result;
									},
								);
							}
						}
					});
			}
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

//register course
const registerCourseService = async (user_id, course_id) => {
	try {
		return await userRepositories
			.registerCourseRepository(user_id, course_id)
			.then(async () => {
				return {
					message: "Course registered",
					status: 200,
				};
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

//mark course as completed
const markCourseCompletedService = async (user_id, course_id) => {
	try {
		console.log(user_id, course_id);
		if (!(await isValidObjectId(course_id))) {
			await throwError("Invalid course id", 422);
		}

		return await userRepositories
			.markCourseCompletedRepository(user_id, course_id)
			.then(async () => {
				return {
					message: "Course complted",
					status: 200,
				};
			});
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);

		//check if error is class code 4.(Eg 400 , 401)
		var class_code = 5;
		if (error.status) {
			class_code = error.status.toString()[0];
		}

		const result = {
			message: class_code === "4" ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

//get applied courses
const getAppliedCoursesService = async (user_id) => {
	try {
		return await userRepositories
			.getRegisteredCoursesRepository(user_id)
			.then((courses) => {
				return {
					courses: courses.courses_applied,
					status: 200,
				};
			});
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);

		//check if error is class code 4.(Eg 400 , 401)
		var class_code = 5;
		if (error.status) {
			class_code = error.status.toString()[0];
		}

		const result = {
			message: class_code === "4" ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

//get completed courses
const getCompletedCoursesService = async (user_id) => {
	try {
		return await userRepositories
			.getCompletedCoursesRepository(user_id)
			.then((courses) => {
				return {
					courses: courses.courses_completed,
					status: 200,
				};
			});
	} catch (error) {
		console.error("Try catch error caught");
		console.error(error);

		//check if error is class code 4.(Eg 400 , 401)
		var class_code = 5;
		if (error.status) {
			class_code = error.status.toString()[0];
		}

		const result = {
			message: class_code === "4" ? error.message : "Something went wrong",
			status: error.status || 500,
		};
		return result;
	}
};

module.exports = {
	registerUserService,
	loginUserService,
	registerCourseService,
	markCourseCompletedService,
	getAppliedCoursesService,
	getCompletedCoursesService,
};
