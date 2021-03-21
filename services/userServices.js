const bcrypt = require("bcrypt");
const User = require("../models/user");

const SALT_ROUNDS = 10;

async function createUser(fields) {
	await new User({
		...fields,
		password: await bcrypt.hash(fields.password, SALT_ROUNDS),
	}).save();
}
