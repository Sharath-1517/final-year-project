const config = {
	JWT_EXPIRES: 900000, //15 MINUTES,
	cookie: {
		cookie_options: {
			jwt_cookie_option: {
				path: "/",
				expires: new Date(Date.now() + 900000),
				secure: true,
				httpOnly: true,
				sameSite: "Strict",
			},
			logged_in_cookie_option: {
				path: "/",
				expires: new Date(Date.now() + 900000),
				secure: true,
				httpOnly: false,
				sameSite: "Strict",
			},
		},
	},
};

module.exports = config;
