const isString = require("../../common/isString");
const throwError = require("../../common/throwError");

const isValidPassword = async (password, password_confirmation) => {
	if (password) {
		if (password_confirmation) {
			if (await isString(password)) {
				if (await isString(password_confirmation)) {
					if (password !== password_confirmation) {
						await throwError("Both the passwords do not match", 422);
					} else {
						return true;
					}
				} else {
					console.error("Password confirmation is not a string");
					await throwError("Please enter a valid password confirmation", 422);
				}
			} else {
				console.error("Password is not a string");
				await throwError("Please enter a valid password", 422);
			}
		} else {
			await throwError("Please enter a password confirmation", 422);
		}
	} else {
		await throwError("Please enter a password", 422);
	}
};

module.exports = isValidPassword;
