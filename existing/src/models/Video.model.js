const mongoose = require("mongoose");

var videoSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
			minlength: 1,
		},
		course: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Class",
		},
	},
	{
		timestamps: true,
	},
);

mongoose.model("video", videoSchema);
