const mongoose = require("mongoose");

var courseSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minlength: 1,
		},

		description: {
			type: String,
			trim: true,
			required: true,
			minlength: 1,
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("Course", courseSchema);
