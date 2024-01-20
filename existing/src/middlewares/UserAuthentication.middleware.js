//THIS MIDDLEWARE ALLOWS ONLY ADMIN

var cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const throwError = require("../utils/common/throwError");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = async function jwtLoginAuthentication(req, res, next) {
	return await cookieParser()(req, res, async function () {
		try {
			//check if cookies are present

			if (req.cookies.jwt || req.body.jwt) {
				const jwtToken = req.cookies.jwt || req.body.jwt;
				try {
					var decoded = jwt.verify(jwtToken, JWT_SECRET);
				} catch {
					await throwError("Please login", 401);
				}

				const decoded_id = decoded.id;

				req._id = decoded_id;

				return next();
			} else {
				console.info("Cookies are undefined", req.cookies);
				await throwError("Please login", 401);
			}
		} catch (error) {
			console.error("Try catch error caught");
			console.error(error);
			const result = {
				message: error.status === 401 ? error.message : "Something went wrong",
				status: error.status || 500,
			};

			return await res.status(result.status).json(result);
		}
	});
};
