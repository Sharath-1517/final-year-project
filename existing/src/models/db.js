const mongoose = require("mongoose");
const MONGODB_CONNECTION_URI = process.env.MONGODB_CONNECTION_URI;

mongoose.connect(
	MONGODB_CONNECTION_URI,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(error) => {
		if (!error) {
			console.info("Success connecting to the database");
		} else {
			console.error("Error connecting to the database");
		}
	},
);
