const mongoose = require("../db");
const cuid = require("cuid");
const { isEmail } = require("validator");

const userCategories = ["organization", "individual"];

const userSchema = mongoose.Schema({
	_id: { type: String, default: cuid },
	name: { type: String, required: true },
	username: {
		type: String,
		required: true,
		validate: { validator: isEmail },
	},
	password: { type: String, required: true },
	country: { type: String, required: true },
	city: { type: String, required: true },
	category: {
		type: String,
		enum: userCategories,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
