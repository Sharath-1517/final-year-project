//To enable .env file
require("dotenv").config();

const express = require("express");
const app = express();

//Cookie
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//body parser deprecation replacement
//Used to read data from req.body
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	}),
);

//NoSQL injection prevention
const mongoSanitize = require("express-mongo-sanitize");
app.use(mongoSanitize());

//morgan logging middleware
const morgan = require("morgan");
app.use(morgan("combined"));

var cors = require("cors");
var corsOptions = {
	origin: ["http://localhost:3000"],
	optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
	credentials: true,
};

app.use(cors(corsOptions));

//DB connection
require("./src/models/");

//Redirect http to https protocol
if (process.env.NODE_ENV === "production") {
	app.use((req, res, next) => {
		if (req.header("x-forwarded-proto") !== "https")
			res.redirect(`https://${req.header("host")}${req.url}`);
		else next();
	});
}

//import routes
const routes = require("./src/routes/");
app.use(routes);

//serve static assets if in production
if (process.env.NODE_ENV === "production" || true) {
	//Set static folder
	app.use(express.static("client/build"));

	//Serve build file in front react
	app.get("*", (req, res) => {
		const client_path = path.resolve(
			__dirname,
			"client",
			"build",
			"index.html",
		);

		res.sendFile(client_path);
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started on  port ${PORT}`);
});
