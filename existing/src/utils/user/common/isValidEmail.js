const isString = require("../../common/isString");
const throwError = require("../../common/throwError");

const isValidEmail = async (email) => {
	let message;
	//email
	if (email) {
		//check if email is a string
		if (await isString(email)) {
			email = email.trim();

			//check if email contains a maximum length of 320 characters
			if (email.length > 320) {
				console.log(
					`Email can have a maximum length of 320 characters. Email "${email}" is invalid`,
				);

				message = `Email can have a maximum length of 320 characters`;

				await throwError(message, 422);
			} else if (email.length < 3) {
				//check if email has a minimum length of 3 characters

				console.log(
					`Email should have a minimum length of 3 characters. Email "${email}" is invalid`,
				);

				message = `Email should have a minimum length of 3 characters`;

				await throwError(message, 422);
			} else {
				//check if email contains a minimum length of 3 if split into three parts using @
				const text = email.split("@");
				if (text.length < 2) {
					console.log(`Email '${email}' is invalid`, text);

					message = `Email '${email}' is invalid`;

					await throwError(message, 422);
				} else if (text[0].trim().length < 1 || text[1].trim().length < 1) {
					console.log(`Email '${email}' is invalid`, text);

					message = `Email '${email}' is invalid`;
					await throwError(message, 422);
				}
			}
		}
	} else {
		await throwError("Please enter an email", 422);
	}
};

module.exports = isValidEmail;
