const isString = require("../../common/isString");
const throwError = require("../../common/throwError");

const isValidName = async (first_name, last_name) => {
	//first name
	if (first_name) {
		if (await isString(first_name)) {
			first_name = first_name.trim();

			if (first_name.length < 1) {
				//status 422 means response is understood but invalid
				await throwError("Please enter a first name", 422);
			}
		} else {
			//First name is not a string
			console.error("First name is not a valid string");
			await throwError("Please enter a valid first name", 422);
		}
	} else {
		//status 422 means response is understood but invalid
		await throwError("Please enter a first name", 422);
	}

	//last name
	if (last_name) {
		if (await isString(last_name)) {
			last_name = last_name.trim();

			if (last_name.length < 1) {
				//status 422 means response is understood but invalid
				await throwError("Please enter a last name", 422);
			}
		} else {
			//Last name is not a string
			console.error("Last name is not a valid string");
			await throwError("Please enter a valid last name", 422);
		}
	} else {
		//last name not found
		//status 422 means response is understood but invalid
		await throwError("Please enter a last name", 422);
	}
};

module.exports = isValidName;
