const isString = require("../common/isString");
const throwError = require("../common/throwError");

const isValidCourse = async (name) => {
	if (name) {
		if (isString(name)) {
			return true;
		} else {
			await throwError("Enter a valid course name", 422);
		}
	} else {
		await throwError("Enter the course name", 422);
	}
};

module.exports = isValidCourse;
