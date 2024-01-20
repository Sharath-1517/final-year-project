//Modules
const mongoose = require("mongoose");
const throwError = require("../utils/common/throwError");

//Models

const UserModel = mongoose.model("user");

//utils
const getObjectIdIndex = async (id_arr, target_id) => {
	target_id = target_id.toString();
	var index = 0;
	for (var id of id_arr) {
		id = id.toString();

		if (id === target_id) {
			return index;
		}
		index += 1;
	}
	return false;
};

const ObjectArrayIncludesObjectId = async (id_arr, target_id) => {
	target_id = target_id.toString();
	for (var id of id_arr) {
		id = id.toString();

		if (id === target_id) {
			return true;
		}
	}
	return false;
};

const createUserRepository = async (
	email,
	hashed_password,
	first_name,
	last_name,
) => {
	const user = new UserModel();

	user.first_name = first_name;
	user.last_name = last_name;
	user.password = hashed_password;
	user.email = email;

	return await user.save();
};

//Used for login
const getUserByEmailRepository = async (email) => {
	const filter = {
		email: email,
	};
	const user = await UserModel.findOne(filter).select("id email password");
	return user;
};

//register course
const registerCourseRepository = async (user_id, course_id) => {
	await UserModel.findById(user_id)
		.lean()
		.then(async (user) => {
			var courses_applied = user.courses_applied;

			if (!(await ObjectArrayIncludesObjectId(courses_applied, course_id))) {
				await courses_applied.push(course_id);

				const filter = {
					_id: user_id,
				};
				const update = {
					courses_applied: courses_applied,
				};

				await UserModel.updateOne(filter, update);
			} else {
				await throwError("Course already registered", 422);
			}
		});
};

//mark course as completed
const markCourseCompletedRepository = async (user_id, course_id) => {
	await UserModel.findById(user_id)
		.lean()
		.then(async (user) => {
			var courses_applied = user.courses_applied || [];
			var courses_completed = user.courses_completed || [];

			//check if course is already completed
			if (await ObjectArrayIncludesObjectId(courses_completed, course_id)) {
				await throwError("Course already completed", 422);
			} else {
				//Check if course is already  registered
				if (await ObjectArrayIncludesObjectId(courses_applied, course_id)) {
					//add course to completed
					await courses_completed.push(course_id);

					//remove course from applied
					var indexOfAppliedCourse = await getObjectIdIndex(
						courses_applied,
						course_id,
					);
					await courses_applied.splice(indexOfAppliedCourse);

					const filter = {
						_id: user_id,
					};
					const update = {
						courses_applied: courses_applied,
						courses_completed: courses_completed,
					};

					await UserModel.updateOne(filter, update);
				} else {
					await throwError("You need to register the course first", 422);
				}
			}
		});
};

//get all registered courses
const getRegisteredCoursesRepository = async (user_id) => {
	return await UserModel.findById(user_id)
		.populate("courses_applied", "_id name")
		.select("courses_applied -_id")
		.lean();
};

//get all completed courses
const getCompletedCoursesRepository = async (user_id) => {
	return await UserModel.findById(user_id)
		.populate("courses_completed", "_id name")
		.select("courses_completed -_id")
		.lean();
};

module.exports = {
	createUserRepository,
	getUserByEmailRepository,
	registerCourseRepository,
	markCourseCompletedRepository,
	getRegisteredCoursesRepository,
	getCompletedCoursesRepository,
};
