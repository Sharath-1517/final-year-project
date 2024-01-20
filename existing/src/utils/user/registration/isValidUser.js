const isValidEmail = require("../common/isValidEmail");
const isValidName = require("./isValidName");
const isValidPassword = require("./isValidPassword");

const isValidUser = async (
	first_name,
	last_name,
	email,
	password,
	password_confirmation,
) => {
	await isValidEmail(email);
	await isValidName(first_name, last_name);
	await isValidPassword(password, password_confirmation);
};

module.exports = isValidUser;
