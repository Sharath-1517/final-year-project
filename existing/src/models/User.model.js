const mongoose = require("mongoose");

var userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			trim: true,
			required: true,
			unique: true,
			minlength: 3,
			maxlength: 320,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		first_name: {
			type: String,
			trim: true,
			required: true,
			minlength: 1,
		},
		last_name: {
			type: String,
			trim: true,
			required: false,
			minlength: 0,
		},
		courses_applied: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
				unique: true,
			},
		],

		courses_completed: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
				unique: true,
			},
		],
	},
	{
		timestamps: true,
	},
);

mongoose.model("user", userSchema);
