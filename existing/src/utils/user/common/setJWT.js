const jwt = require("jsonwebtoken");
require("dotenv").config();

//config
const config = require("../../../config/config");

const setJWT = async (_id, admin) => {
	console.time("jwt signing time");

	const JWT_EXPIRES = Number(config.JWT_EXPIRES);
	const JWT_SECRET = process.env.JWT_SECRET;

	const jwtData = { id: _id, admin: admin };
	const token = await jwt.sign(jwtData, JWT_SECRET, { expiresIn: JWT_EXPIRES });

	if (!token) {
		console.error("token error", token);
	} else {
		console.log("token", token);
	}
	console.timeEnd("jwt signing time");

	return token;
};

module.exports = setJWT;
