const mongoose = require("../db");
const cuid = require("cuid");
const { isEmail } = require("validator");

const entityType = ["organization", "individual"];

const userSchema = mongoose.Schema({
	_id: { type: String, default: cuid },
	name: { type: String, required: true },
	idImgUrl: { type: String },
	username: {
		type: String,
		required: true,
		unique: true,
		validate: { validator: isEmail },
	},
	passwordHash: { type: String, required: true },
	country: { type: String, required: true },
	city: { type: String, required: true },
	category: {
		type: String,
		enum: entityType,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
